<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include configuration and utilities
require_once 'config/database.php';
require_once 'config/config.php';
require_once 'utils/Response.php';

// Get request method and URI
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = trim($uri, '/');

// Remove 'server' from URI if present
if (strpos($uri, 'server/') === 0) {
    $uri = substr($uri, 7);
}

// Remove index.php from URI if present
$uri = str_replace('index.php', '', $uri);
$uri = trim($uri, '/');

// If no URI, show API info
if (empty($uri)) {
    Response::success([
        'message' => 'Welcome to Sidama Youth Commission API',
        'version' => '1.0.0',
        'status' => 'running',
        'endpoints' => [
            'GET /health' => 'Health check',
            'GET /news/allNews.php' => 'Get all news',
            'POST /news/createNews.php' => 'Create news',
            'GET /news/getNews.php?id={id}' => 'Get specific news',
            'PUT /news/updateNews.php' => 'Update news',
            'DELETE /news/deleteNews.php' => 'Delete news',
            'GET /messages/allMessages.php' => 'Get all messages',
            'POST /messages/createMessage.php' => 'Create message',
            'GET /messages/getMessage.php?id={id}' => 'Get specific message',
            'PUT /messages/updateMessage.php' => 'Update message',
            'DELETE /messages/deleteMessage.php' => 'Delete message',
            'PUT /messages/markAsRead.php' => 'Mark message as read',
            'PUT /messages/markAsReplied.php' => 'Mark message as replied'
        ]
    ], 'API information retrieved successfully');
    exit();
}

// Build the file path
$filePath = 'routes/' . $uri . '.php';

// Check if the route file exists
if (file_exists($filePath)) {
    include $filePath;
} else {
    Response::notFound('Route not found');
}
