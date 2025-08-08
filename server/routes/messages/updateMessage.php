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
        Response::validationError(['id' => 'Message ID is required']);
        exit();
    }

    $db = Database::getInstance();

    // Check if message exists
    $existing = $db->fetchOne("SELECT id FROM contact_messages WHERE id = :id", ['id' => $input['id']]);
    if (!$existing) {
        Response::notFound('Message not found');
        exit();
    }

    // Validate fields
    $errors = [];

    if (isset($input['name']) && (empty($input['name']) || strlen($input['name']) < 2)) {
        $errors['name'] = 'Name must be at least 2 characters long';
    }

    if (isset($input['email']) && (!filter_var($input['email'], FILTER_VALIDATE_EMAIL))) {
        $errors['email'] = 'Valid email address is required';
    }

    if (isset($input['subject']) && (empty($input['subject']) || strlen($input['subject']) < 3)) {
        $errors['subject'] = 'Subject must be at least 3 characters long';
    }

    if (isset($input['message']) && (empty($input['message']) || strlen($input['message']) < 10)) {
        $errors['message'] = 'Message must be at least 10 characters long';
    }

    if (isset($input['status']) && !in_array($input['status'], ['unread', 'read', 'replied', 'archived'])) {
        $errors['status'] = 'Invalid status value';
    }

    if (!empty($errors)) {
        Response::validationError($errors);
        exit();
    }

    $data = [];
    if (isset($input['name'])) $data['name'] = $input['name'];
    if (isset($input['email'])) $data['email'] = $input['email'];
    if (isset($input['subject'])) $data['subject'] = $input['subject'];
    if (isset($input['message'])) $data['message'] = $input['message'];
    if (isset($input['status'])) $data['status'] = $input['status'];
    $data['updated_at'] = date('Y-m-d H:i:s');

    $db->update('contact_messages', $data, 'id = :id', ['id' => $input['id']]);

    Response::success(['id' => $input['id']], 'Message updated successfully');
} catch (Exception $e) {
    Response::serverError($e->getMessage());
}
