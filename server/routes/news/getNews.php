<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    Response::methodNotAllowed('Only GET method allowed');
    exit();
}

try {
    $id = $_GET['id'] ?? null;

    if (!$id) {
        Response::validationError(['id' => 'News ID is required']);
        exit();
    }

    $db = Database::getInstance();
    $sql = "SELECT * FROM news WHERE id = :id";
    $news = $db->fetchOne($sql, ['id' => $id]);

    if (!$news) {
        Response::notFound('News not found');
        exit();
    }

    Response::success($news, 'News retrieved successfully');
} catch (Exception $e) {
    Response::serverError($e->getMessage());
}
