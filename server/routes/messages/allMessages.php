<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    Response::methodNotAllowed('Only GET method allowed');
    exit();
}

try {
    $db = Database::getInstance();
    $sql = "SELECT * FROM contact_messages ORDER BY created_at DESC";
    $messages = $db->fetchAll($sql);

    Response::success($messages, 'Messages retrieved successfully');
} catch (Exception $e) {
    Response::serverError($e->getMessage());
}
