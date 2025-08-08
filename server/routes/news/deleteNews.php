<?php
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    Response::methodNotAllowed('Only DELETE method allowed');
    exit();
}

try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input || !isset($input['id'])) {
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

    $db->delete('news', 'id = :id', ['id' => $input['id']]);

    Response::success(['id' => $input['id']], 'News deleted successfully');
} catch (Exception $e) {
    Response::serverError($e->getMessage());
}
