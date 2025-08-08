<?php
header('Content-Type: application/json');

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
        'message' => 'Message ID is required',
        'data' => null
    ]);
    exit();
}

try {
    $pdo = new PDO('mysql:host=localhost;dbname=sidama_youth_db;charset=utf8mb4', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare('SELECT id FROM contact_messages WHERE id = ?');
    $stmt->execute([$input['id']]);
    if (!$stmt->fetch()) throw new Exception('Message not found');
    $fields = [];
    $params = [];
    if (isset($input['name'])) {
        $fields[] = 'name = ?';
        $params[] = $input['name'];
    }
    if (isset($input['email'])) {
        $fields[] = 'email = ?';
        $params[] = $input['email'];
    }
    if (isset($input['subject'])) {
        $fields[] = 'subject = ?';
        $params[] = $input['subject'];
    }
    if (isset($input['message'])) {
        $fields[] = 'message = ?';
        $params[] = $input['message'];
    }
    if (isset($input['status'])) {
        $fields[] = 'status = ?';
        $params[] = $input['status'];
    }
    $fields[] = 'updated_at = NOW()';
    $params[] = $input['id'];
    $sql = 'UPDATE contact_messages SET ' . implode(', ', $fields) . ' WHERE id = ?';
    $pdo->prepare($sql)->execute($params);
    echo json_encode([
        'success' => true,
        'message' => 'Message updated successfully',
        'data' => ['id' => $input['id']]
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ]);
}
