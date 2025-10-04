<?php
// Include centralized CORS configuration
require_once '../config/cors.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode([
        'success' => false,
        'message' => 'Only GET method allowed',
        'data' => null
    ]);
    exit();
}

$id = $_GET['id'] ?? null;
if (!$id) {
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
    $message = $db->fetchOne('SELECT * FROM contact_messages WHERE id = :id', ['id' => $id]);
    if (!$message) throw new Exception('Message not found');
    echo json_encode([
        'success' => true,
        'message' => 'Message retrieved successfully',
        'data' => $message
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
}
 