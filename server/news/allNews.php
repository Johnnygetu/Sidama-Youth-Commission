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

try {
    $db = Database::getInstance();
    $news = $db->fetchAll('SELECT * FROM news ORDER BY created_at DESC');
    
    // Debug: Log the raw data
    error_log("DEBUG: Raw news data from database: " . json_encode($news, JSON_UNESCAPED_UNICODE));
    
    // Debug: Check for Amharic characters
    foreach ($news as $index => $article) {
        if (isset($article['title']) && preg_match('/[\x{1200}-\x{137F}]/u', $article['title'])) {
            error_log("DEBUG: Found Amharic characters in title at index $index: " . $article['title']);
        }
        if (isset($article['content']) && preg_match('/[\x{1200}-\x{137F}]/u', $article['content'])) {
            error_log("DEBUG: Found Amharic characters in content at index $index: " . substr($article['content'], 0, 100));
        }
    }
    
    $response = [
        'success' => true,
        'message' => 'News retrieved successfully',
        'data' => $news,
        'debug' => [
            'charset' => 'utf-8',
            'json_flags' => 'JSON_UNESCAPED_UNICODE',
            'article_count' => count($news),
            'server_time' => date('Y-m-d H:i:s'),
            'php_version' => phpversion()
        ]
    ];
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    error_log("ERROR in allNews.php: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null,
        'debug' => [
            'error' => $e->getMessage(),
            'server_time' => date('Y-m-d H:i:s')
        ]
    ], JSON_UNESCAPED_UNICODE);
}
 