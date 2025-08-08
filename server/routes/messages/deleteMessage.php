<?php
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    Response::methodNotAllowed('Only DELETE method allowed');
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

    $db->delete('contact_messages', 'id = :id', ['id' => $input['id']]);

    Response::success(['id' => $input['id']], 'Message deleted successfully');
} catch (Exception $e) {
    Response::serverError($e->getMessage());
}
