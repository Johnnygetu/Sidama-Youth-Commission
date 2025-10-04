<?php
// Include centralized CORS configuration
require_once '../config/cors.php';
require_once '../config/config.php';
require_once '../config/database.php';

try {
    $db = Database::getInstance();
    $messages = $db->fetchAll('SELECT * FROM contact_messages ORDER BY created_at DESC');
    
    echo json_encode([
        'success' => true,
        'message' => 'Messages retrieved successfully',
        'data' => $messages
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
}
 