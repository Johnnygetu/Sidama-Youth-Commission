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
    if (empty($input['name']) || strlen($input['name']) < 2) throw new Exception('Name is required and must be at least 2 characters long');
    if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) throw new Exception('Valid email address is required');
    if (empty($input['subject']) || strlen($input['subject']) < 3) throw new Exception('Subject is required and must be at least 3 characters long');
    if (empty($input['message']) || strlen($input['message']) < 10) throw new Exception('Message is required and must be at least 10 characters long');
    $pdo = new PDO('mysql:host=eltechsolutions-et.com;dbname=eltechev_sidamaYouthComission;charset=utf8mb4', 'eltechev_syc', 'Qwertyuiop123');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare('INSERT INTO contact_messages (name, email, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())');
    $stmt->execute([
        $input['name'],
        $input['email'],
        $input['subject'],
        $input['message'],
        'unread'
    ]);
    $id = $pdo->lastInsertId();
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully',
        'data' => [
            'id' => $id,
            'name' => $input['name'],
            'email' => $input['email'],
            'subject' => $input['subject'],
            'message' => $input['message'],
            'status' => 'unread'
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ]);
}
