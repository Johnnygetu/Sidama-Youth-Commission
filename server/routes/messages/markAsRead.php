<?php
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    Response::methodNotAllowed('Only PUT method allowed');
    exit();
}

try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || !isset($input['id'])) {
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

    $data = [
        'status' => 'read',
        'updated_at' => date('Y-m-d H:i:s')
    ];

    $db->update('contact_messages', $data, 'id = :id', ['id' => $input['id']]);

    Response::success(['id' => $input['id']], 'Message marked as read');
} catch (Exception $e) {
    Response::serverError($e->getMessage());
}
