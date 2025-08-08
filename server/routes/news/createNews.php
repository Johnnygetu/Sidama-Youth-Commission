<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Response::methodNotAllowed('Only POST method allowed');
    exit();
}

try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        Response::validationError(['message' => 'Invalid JSON input']);
        exit();
    }

    // Validate required fields
    $errors = [];

    if (empty($input['title']) || strlen($input['title']) < 3) {
        $errors['title'] = 'Title is required and must be at least 3 characters long';
    }

    if (empty($input['content']) || strlen($input['content']) < 10) {
        $errors['content'] = 'Content is required and must be at least 10 characters long';
    }

    if (isset($input['author']) && strlen($input['author']) < 2) {
        $errors['author'] = 'Author name must be at least 2 characters long';
    }

    if (!empty($errors)) {
        Response::validationError($errors);
        exit();
    }

    $db = Database::getInstance();

    $data = [
        'title' => $input['title'],
        'content' => $input['content'],
        'author' => $input['author'] ?? 'Anonymous',
        'image_url' => $input['image_url'] ?? null,
        'created_at' => date('Y-m-d H:i:s')
    ];

    $id = $db->insert('news', $data);
    $data['id'] = $id;

    Response::created($data, 'News created successfully');
} catch (Exception $e) {
    Response::serverError($e->getMessage());
}
