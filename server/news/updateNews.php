<?php
header('Content-Type: application/json');
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
    ]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'News ID is required',
        'data' => null
    ]);
    exit();
}

try {
    $pdo = new PDO('mysql:host=eltechsolutions-et.com;dbname=eltechev_sidamaYouthComission;charset=utf8mb4', 'eltechev_syc', 'Qwertyuiop123');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare('SELECT id FROM news WHERE id = ?');
    $stmt->execute([$input['id']]);
    if (!$stmt->fetch()) throw new Exception('News not found');
    $fields = [];
    $params = [];
    if (isset($input['title'])) {
        $fields[] = 'title = ?';
        $params[] = $input['title'];
    }
    if (isset($input['content'])) {
        $fields[] = 'content = ?';
        $params[] = $input['content'];
    }
    if (isset($input['author'])) {
        $fields[] = 'author = ?';
        $params[] = $input['author'];
    }
    if (isset($input['image_url'])) {
        $fields[] = 'image_url = ?';
        $params[] = $input['image_url'];
    }
    $params[] = $input['id'];
    $sql = 'UPDATE news SET ' . implode(', ', $fields) . ', updated_at = NOW() WHERE id = ?';
    $pdo->prepare($sql)->execute($params);
    echo json_encode([
        'success' => true,
        'message' => 'News updated successfully',
        'data' => ['id' => $input['id']]
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ]);
}
 