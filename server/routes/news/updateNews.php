<?php
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    Response::methodNotAllowed('Only PUT method allowed');
    exit();
}

try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        Response::validationError(['message' => 'Invalid JSON input']);
        exit();
    }

    if (!isset($input['id'])) {
        Response::validationError(['id' => 'News ID is required']);
        exit();
    }

    $db = Database::getInstance();

    // Check if news exists
    $existing = $db->fetchOne("SELECT id FROM news WHERE id = :id", ['id' => $input['id']]);
    if (!$existing) {
        Response::notFound('News not found');
        exit();
    }

    // Validate fields
    $errors = [];

    if (isset($input['title']) && (empty($input['title']) || strlen($input['title']) < 3)) {
        $errors['title'] = 'Title must be at least 3 characters long';
    }

    if (isset($input['content']) && (empty($input['content']) || strlen($input['content']) < 10)) {
        $errors['content'] = 'Content must be at least 10 characters long';
    }

    if (isset($input['author']) && strlen($input['author']) < 2) {
        $errors['author'] = 'Author name must be at least 2 characters long';
    }

    if (!empty($errors)) {
        Response::validationError($errors);
        exit();
    }

    $data = [];
    if (isset($input['title'])) $data['title'] = $input['title'];
    if (isset($input['content'])) $data['content'] = $input['content'];
    if (isset($input['author'])) $data['author'] = $input['author'];
    if (isset($input['image_url'])) $data['image_url'] = $input['image_url'];
    $data['updated_at'] = date('Y-m-d H:i:s');

    $db->update('news', $data, 'id = :id', ['id' => $input['id']]);

    Response::success(['id' => $input['id']], 'News updated successfully');
} catch (Exception $e) {
    Response::serverError($e->getMessage());
}
