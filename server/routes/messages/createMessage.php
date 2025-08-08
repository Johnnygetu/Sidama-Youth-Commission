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

    if (empty($input['name']) || strlen($input['name']) < 2) {
        $errors['name'] = 'Name is required and must be at least 2 characters long';
    }

    if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Valid email address is required';
    }

    if (empty($input['subject']) || strlen($input['subject']) < 3) {
        $errors['subject'] = 'Subject is required and must be at least 3 characters long';
    }

    if (empty($input['message']) || strlen($input['message']) < 10) {
        $errors['message'] = 'Message is required and must be at least 10 characters long';
    }

    if (!empty($errors)) {
        Response::validationError($errors);
        exit();
    }

    $db = Database::getInstance();

    $data = [
        'name' => $input['name'],
        'email' => $input['email'],
        'subject' => $input['subject'],
        'message' => $input['message'],
        'status' => 'unread',
        'created_at' => date('Y-m-d H:i:s')
    ];

    $id = $db->insert('contact_messages', $data);
    $data['id'] = $id;

    Response::created($data, 'Message sent successfully');
} catch (Exception $e) {
    Response::serverError($e->getMessage());
}
