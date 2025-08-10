<?php
// Enable error logging
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/reply_sending.log');

// Create logs directory if it doesn't exist
if (!is_dir(__DIR__ . '/../logs')) {
    mkdir(__DIR__ . '/../logs', 0755, true);
}

// Debug logging function
function logReply($message, $data = null)
{
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[{$timestamp}] {$message}";
    if ($data !== null) {
        $logEntry .= " | Data: " . json_encode($data);
    }
    error_log($logEntry . "\n", 3, __DIR__ . '/../logs/reply_sending.log');
}

logReply("🔄 Server: Reply sending endpoint accessed");
logReply("📡 Server: Request method", $_SERVER['REQUEST_METHOD']);
logReply("📡 Server: Request headers", getallheaders());

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    logReply("🔄 Server: OPTIONS request handled");
    http_response_code(204);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    logReply("❌ Server: Invalid request method", $_SERVER['REQUEST_METHOD']);
    echo json_encode([
        'success' => false,
        'message' => 'Only PUT method allowed',
        'data' => null
    ]);
    exit();
}

logReply("📝 Server: Processing reply request");

$input = json_decode(file_get_contents('php://input'), true);
logReply("📄 Server: Raw input received", $input);

if (!$input || !isset($input['id'])) {
    logReply("❌ Server: Message ID validation failed", $input);
    echo json_encode([
        'success' => false,
        'message' => 'Message ID is required',
        'data' => null
    ]);
    exit();
}

if (!isset($input['reply']) || empty(trim($input['reply']))) {
    logReply("❌ Server: Reply content validation failed", ['reply' => $input['reply'] ?? 'empty']);
    echo json_encode([
        'success' => false,
        'message' => 'Reply content is required',
        'data' => null
    ]);
    exit();
}

logReply("✅ Server: Input validation passed");

try {
    logReply("🔗 Server: Connecting to database");
    $pdo = new PDO('mysql:host=eltechsolutions-et.com;dbname=eltechev_sidamaYouthComission;charset=utf8mb4', 'eltechev_syc', 'Qwertyuiop123');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    logReply("✅ Server: Database connection established");

    // Get message details for email
    logReply("🔍 Server: Fetching message details", ['id' => $input['id']]);
    $stmt = $pdo->prepare('SELECT name, email, subject, message FROM contact_messages WHERE id = ?');
    $stmt->execute([$input['id']]);
    $message = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$message) {
        logReply("❌ Server: Message not found", ['id' => $input['id']]);
        throw new Exception('Message not found');
    }

    logReply("✅ Server: Message found", [
        'id' => $input['id'],
        'name' => $message['name'],
        'email' => $message['email'],
        'subject' => $message['subject']
    ]);

    // Update message status
    logReply("🔄 Server: Updating message status to 'replied'");
    $pdo->prepare('UPDATE contact_messages SET status = ?, updated_at = NOW() WHERE id = ?')->execute(['replied', $input['id']]);
    logReply("✅ Server: Message status updated successfully");

    // Send email reply
    logReply("📧 Server: Starting email sending process");
    try {
        logReply("📦 Server: Loading mailer class");
        require_once __DIR__ . '/../utils/simple_mailer_fixed.php';
        $mailer = new SimpleMailerFixed();
        logReply("✅ Server: Mailer class loaded successfully");

        logReply("📤 Server: Sending email", [
            'to' => $message['email'],
            'toName' => $message['name'],
            'subject' => $message['subject'],
            'replyLength' => strlen($input['reply'])
        ]);

        $emailSent = $mailer->sendReply(
            $message['email'],
            $message['name'],
            $message['subject'],
            $message['message'],
            $input['reply']
        );

        logReply("📊 Server: Email sending result", [
            'success' => $emailSent,
            'to' => $message['email'],
            'subject' => $message['subject']
        ]);
    } catch (Exception $e) {
        logReply("💥 Server: Email sending exception", [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        $emailSent = false;
    }

    if ($emailSent) {
        logReply("✅ Server: Reply process completed successfully");
        echo json_encode([
            'success' => true,
            'message' => 'Reply sent successfully and message marked as replied',
            'data' => ['id' => $input['id']]
        ]);
    } else {
        logReply("⚠️ Server: Message marked as replied but email failed");
        echo json_encode([
            'success' => false,
            'message' => 'Message marked as replied but email could not be sent',
            'data' => ['id' => $input['id']]
        ]);
    }
} catch (Exception $e) {
    logReply("💥 Server: Main exception occurred", [
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ]);
}
