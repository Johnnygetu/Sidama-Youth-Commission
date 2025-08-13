<?php
require_once '../config/config.php';
require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    echo json_encode([
        'success' => false,
        'message' => 'Only DELETE method allowed',
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'News ID is required',
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    $db = Database::getInstance();
    
    // Check if news exists
    $existing = $db->fetchOne('SELECT id FROM news WHERE id = ?', [$input['id']]);
    if (!$existing) throw new Exception('News not found');
    
    // Delete the news
    $db->delete('news', 'id = ?', [$input['id']]);
    
    echo json_encode([
        'success' => true,
        'message' => 'News deleted successfully',
        'data' => ['id' => $input['id']]
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
}
 