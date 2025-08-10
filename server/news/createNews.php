<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

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

try {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) throw new Exception('Invalid JSON input');
    if (empty($input['title']) || strlen($input['title']) < 3) throw new Exception('Title is required and must be at least 3 characters long');
    if (empty($input['content']) || strlen($input['content']) < 10) throw new Exception('Content is required and must be at least 10 characters long');
    $author = isset($input['author']) && strlen($input['author']) >= 2 ? $input['author'] : 'Anonymous';
    $image_url = $input['image_url'] ?? null;
    $pdo = new PDO('mysql:host=eltechsolutions-et.com;dbname=eltechev_sidamaYouthComission;charset=utf8mb4', 'eltechev_syc', 'Qwertyuiop123');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare('INSERT INTO news (title, content, author, image_url, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())');
    $stmt->execute([$input['title'], $input['content'], $author, $image_url]);
    $id = $pdo->lastInsertId();
    echo json_encode([
        'success' => true,
        'message' => 'News created successfully',
        'data' => [
            'id' => $id,
            'title' => $input['title'],
            'content' => $input['content'],
            'author' => $author,
            'image_url' => $image_url,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ]);
}
 