<?php
// Include centralized CORS configuration
require_once '../config/cors.php';

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
    require_once '../config/config.php';
    require_once '../config/database.php';
    $db = Database::getInstance();
    logReply("✅ Server: Database connection established");

    // Get message details for email
    logReply("🔍 Server: Fetching message details", ['id' => $input['id']]);
    $message = $db->fetchOne('SELECT name, email, subject, message FROM contact_messages WHERE id = :id', ['id' => $input['id']]);

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

    // Update message status to 'replied' first
    logReply("🔄 Server: Updating message status to 'replied'");
    $db->update('contact_messages', ['status' => 'replied', 'updated_at' => date('Y-m-d H:i:s')], 'id = :id', ['id' => $input['id']]);
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
        // Delete the message from database after successful email sending
        logReply("🗑️ Server: Deleting message from database after successful reply");
        try {
            $db->delete('contact_messages', 'id = ?', [$input['id']]);
            logReply("✅ Server: Message deleted successfully from database");
        } catch (Exception $e) {
            logReply("💥 Server: Message deletion exception", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
        }
        
        logReply("✅ Server: Reply process completed successfully - message deleted");
        echo json_encode([
            'success' => true,
            'message' => 'Reply sent successfully and message deleted',
            'data' => ['id' => $input['id']]
        ]);
    } else {
        logReply("⚠️ Server: Message marked as replied but email failed - keeping message in database");
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
 