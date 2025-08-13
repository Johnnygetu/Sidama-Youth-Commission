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

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    echo json_encode([
        'success' => false,
        'message' => 'Only PUT method allowed',
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
    
    // Prepare update data
    $updateData = [];
    if (isset($input['title'])) $updateData['title'] = $input['title'];
    if (isset($input['content'])) $updateData['content'] = $input['content'];
    if (isset($input['author'])) $updateData['author'] = $input['author'];
    if (isset($input['image_url'])) $updateData['image_url'] = $input['image_url'];
    $updateData['updated_at'] = date('Y-m-d H:i:s');
    
    $db->update('news', $updateData, 'id = ?', [$input['id']]);
    
    echo json_encode([
        'success' => true,
        'message' => 'News updated successfully',
        'data' => ['id' => $input['id']]
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
}
 