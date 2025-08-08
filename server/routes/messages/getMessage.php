<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    Response::methodNotAllowed('Only GET method allowed');
    exit();
}

try {
    $id = $_GET['id'] ?? null;

    if (!$id) {
        Response::validationError(['id' => 'Message ID is required']);
        exit();
    }

    $db = Database::getInstance();
    $sql = "SELECT * FROM contact_messages WHERE id = :id";
    $message = $db->fetchOne($sql, ['id' => $id]);

    if (!$message) {
        Response::notFound('Message not found');
        exit();
    }

    Response::success($message, 'Message retrieved successfully');
} catch (Exception $e) {
    Response::serverError($e->getMessage());
}
