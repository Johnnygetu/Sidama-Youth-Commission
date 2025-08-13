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

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode([
        'success' => false,
        'message' => 'Only GET method allowed',
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$id = $_GET['id'] ?? null;
if (!$id) {
    echo json_encode([
        'success' => false,
        'message' => 'News ID is required',
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    $db = Database::getInstance();
    $news = $db->fetchOne('SELECT * FROM news WHERE id = ?', [$id]);
    if (!$news) throw new Exception('News not found');
    echo json_encode([
        'success' => true,
        'message' => 'News retrieved successfully',
        'data' => $news
    ], JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
}
 