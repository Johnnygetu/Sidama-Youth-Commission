<?php
// Include centralized CORS configuration
require_once '../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    echo json_encode([
        'success' => false,
        'message' => 'Only DELETE method allowed',
        'data' => null
    ]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Message ID is required',
        'data' => null
    ]);
    exit();
}

try {
    require_once '../config/config.php';
    require_once '../config/database.php';
    $db = Database::getInstance();
    
    // Check if message exists
    $existing = $db->fetchOne('SELECT id FROM contact_messages WHERE id = :id', ['id' => $input['id']]);
    if (!$existing) throw new Exception('Message not found');
    
    // Delete the message
    $db->delete('contact_messages', 'id = :id', ['id' => $input['id']]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Message deleted successfully',
        'data' => ['id' => $input['id']]
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
}
 