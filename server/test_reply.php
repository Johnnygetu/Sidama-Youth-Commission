<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Only POST method allowed',
        'data' => null
    ]);
    exit();
}

// Test data
$testData = [
    'id' => 1, // Use an existing message ID from your database
    'reply' => 'This is a test reply to verify email functionality.'
];

try {
    // First, get a real message from the database
    $pdo = new PDO('mysql:host=eltechsolutions-et.com;dbname=eltechev_sidamaYouthComission;charset=utf8mb4', 'eltechev_syc', 'Qwertyuiop123');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the first available message
    $stmt = $pdo->query('SELECT id, name, email, subject, message FROM contact_messages ORDER BY created_at DESC LIMIT 1');
    $message = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$message) {
        echo json_encode([
            'success' => false,
            'message' => 'No messages found in database',
            'data' => null
        ]);
        exit();
    }

    // Test email sending
    require_once __DIR__ . '/utils/mailer.php';
    $mailer = new Mailer();

    $emailSent = $mailer->sendReply(
        $message['email'],
        $message['name'],
        $message['subject'],
        $message['message'],
        $testData['reply']
    );

    if ($emailSent) {
        echo json_encode([
            'success' => true,
            'message' => 'Test email sent successfully to ' . $message['email'],
            'data' => [
                'to_email' => $message['email'],
                'to_name' => $message['name'],
                'subject' => $message['subject'],
                'reply_content' => $testData['reply']
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send test email',
            'data' => null
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage(),
        'data' => null
    ]);
}
