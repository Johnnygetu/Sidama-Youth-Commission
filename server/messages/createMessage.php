<?php
// Include centralized CORS configuration
require_once '../config/cors.php';

// Enable error logging
error_reporting(E_ALL);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/message_creation.log');

// Create logs directory if it doesn't exist
if (!is_dir(__DIR__ . '/../logs')) {
    mkdir(__DIR__ . '/../logs', 0755, true);
}

// Debug logging function
function logMessage($message, $data = null)
{
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[{$timestamp}] {$message}";
    if ($data !== null) {
        $logEntry .= " | Data: " . json_encode($data);
    }
    error_log($logEntry . "\n", 3, __DIR__ . '/../logs/message_creation.log');
}

logMessage("🔄 Server: Message creation endpoint accessed");
logMessage("📡 Server: Request method", $_SERVER['REQUEST_METHOD']);
logMessage("📡 Server: Request headers", getallheaders());

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    logMessage("❌ Server: Invalid request method", $_SERVER['REQUEST_METHOD']);
    echo json_encode([
        'success' => false,
        'message' => 'Only POST method allowed',
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    logMessage("📝 Server: Processing message creation request");

    $input = json_decode(file_get_contents('php://input'), true);
    logMessage("📄 Server: Raw input received", $input);

    if (!$input) {
        logMessage("❌ Server: Invalid JSON input");
        throw new Exception('Invalid JSON input');
    }

    logMessage("✅ Server: JSON input parsed successfully");

    // Validation logging
    if (empty($input['name']) || strlen($input['name']) < 2) {
        logMessage("❌ Server: Name validation failed", ['name' => $input['name'] ?? 'empty']);
        throw new Exception('Name is required and must be at least 2 characters long');
    }

    if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        logMessage("❌ Server: Email validation failed", ['email' => $input['email'] ?? 'empty']);
        throw new Exception('Valid email address is required');
    }

    if (empty($input['subject']) || strlen($input['subject']) < 3) {
        logMessage("❌ Server: Subject validation failed", ['subject' => $input['subject'] ?? 'empty']);
        throw new Exception('Subject is required and must be at least 3 characters long');
    }

    if (empty($input['message']) || strlen($input['message']) < 10) {
        logMessage("❌ Server: Message validation failed", ['messageLength' => strlen($input['message'] ?? '')]);
        throw new Exception('Message is required and must be at least 10 characters long');
    }

    logMessage("✅ Server: All validations passed");

    logMessage("🔗 Server: Connecting to database");
    require_once '../config/config.php';
    require_once '../config/database.php';
    $db = Database::getInstance();
    logMessage("✅ Server: Database connection established");

    logMessage("💾 Server: Inserting message into database");
    $id = $db->insert('contact_messages', [
        'name' => $input['name'],
        'email' => $input['email'],
        'subject' => $input['subject'],
        'message' => $input['message'],
        'status' => 'unread',
        'created_at' => date('Y-m-d H:i:s')
    ]);
    logMessage("✅ Server: Message inserted successfully", ['id' => $id]);

    $responseData = [
        'id' => $id,
        'name' => $input['name'],
        'email' => $input['email'],
        'subject' => $input['subject'],
        'message' => $input['message'],
        'status' => 'unread'
    ];

    logMessage("📤 Server: Sending success response", $responseData);
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully',
        'data' => $responseData
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    logMessage("💥 Server: Exception occurred", ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
}
