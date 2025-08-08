<?php
try {
    $db = Database::getInstance();
    $sql = "SELECT * FROM news ORDER BY created_at DESC";
    $news = $db->fetchAll($sql);

    Response::success($news, 'News retrieved successfully');
} catch (Exception $e) {
    Response::serverError($e->getMessage());
}
