<?php
require_once '../config/config.php';
require_once '../config/database.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('X-Endpoint-Name: news/createNews');
header('X-Endpoint-Build: ' . gmdate('c'));

// Ensure notices/warnings do not corrupt JSON output
ini_set('display_errors', '0');
error_reporting(E_ALL);
set_error_handler(function ($severity, $message, $file, $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

// Unified JSON responder that survives invalid UTF-8
function respond_json(array $payload, int $statusCode = 200): void {
    http_response_code($statusCode);
    $json = json_encode(
        $payload,
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | (defined('JSON_INVALID_UTF8_SUBSTITUTE') ? JSON_INVALID_UTF8_SUBSTITUTE : 0)
    );
    if ($json === false) {
        $fallback = [
            'success' => false,
            'message' => 'JSON encoding error: ' . json_last_error_msg(),
            'data' => null,
        ];
        $json = json_encode($fallback, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
    echo $json;
}

function get_post_string(string $key): ?string {
    if (!isset($_POST[$key])) {
        return null;
    }
    $value = $_POST[$key];
    if (is_array($value)) {
        $value = implode(' ', array_map('strval', $value));
    }
    return (string)$value;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond_json([
        'success' => false,
        'message' => 'Only POST method allowed',
        'data' => null
    ], 405);
    exit();
}

try {
    $title = null;
    $content = null;
    $author = null;
    $uploadedUrls = [];

    $contentType = $_SERVER['CONTENT_TYPE'] ?? ($_SERVER['HTTP_CONTENT_TYPE'] ?? '');
    $looksMultipart = stripos($contentType, 'multipart/form-data') !== false;
    $hasFiles = !empty($_FILES); // accept any file field name, not only 'images'
    $hasPostFields = !empty($_POST); // treat any POST field as form-data indicator

    if ($looksMultipart || $hasFiles || $hasPostFields) {
        // Handle multipart/form-data (preferred when any POST fields/files exist)
        $title = get_post_string('title');
        $content = get_post_string('content');
        $authorRaw = get_post_string('author');
        $author = isset($authorRaw) && strlen($authorRaw) >= 2 ? $authorRaw : 'Anonymous';

        // Process any uploaded files regardless of field name
        if ($hasFiles) {
            $documentRoot = rtrim($_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__, 2), '/\\');
            $uploadDir = $documentRoot . '/uploads/news/';
            if (!is_dir($uploadDir)) {
                if (!mkdir($uploadDir, 0775, true) && !is_dir($uploadDir)) {
                    throw new Exception('Failed to create uploads directory');
                }
            }

            $scheme = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https' : 'http';
            $host = $_SERVER['HTTP_HOST'] ?? '';
            $baseUrl = $scheme . '://' . $host;
            $publicPath = '/uploads/news/';

            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
            $maxFiles = 20; // generous upper bound
            $processedCount = 0;

            foreach ($_FILES as $fieldName => $fileInfo) {
                // Normalize to arrays
                $names = is_array($fileInfo['name']) ? $fileInfo['name'] : [$fileInfo['name']];
                $tmpNames = is_array($fileInfo['tmp_name']) ? $fileInfo['tmp_name'] : [$fileInfo['tmp_name']];
                $errors = is_array($fileInfo['error']) ? $fileInfo['error'] : [$fileInfo['error']];
                $sizes = is_array($fileInfo['size']) ? $fileInfo['size'] : [$fileInfo['size']];

                for ($i = 0; $i < count($names); $i++) {
                    if ($processedCount >= $maxFiles) {
                        break 2; // stop processing if we reach the cap
                    }

                    if ($errors[$i] !== UPLOAD_ERR_OK) {
                        continue;
                    }

                    $original = basename($names[$i] ?? '');
                    if ($original === '') {
                        continue;
                    }

                    $safeName = preg_replace('/[^A-Za-z0-9_.-]/', '_', $original);
                    $ext = strtolower(pathinfo($safeName, PATHINFO_EXTENSION));

                    if (!in_array($ext, $allowedExtensions, true)) {
                        continue;
                    }

                    // Optional size validation (allow several MB per file)
                    // Accept the user's ~700KB total easily; set per-file to 10MB
                    if (!empty($sizes[$i]) && $sizes[$i] > 10 * 1024 * 1024) {
                        continue;
                    }

                    $finalName = uniqid('news_', true) . '.' . $ext;
                    $dest = $uploadDir . $finalName;
                    $tmpName = $tmpNames[$i];

                    if (!is_uploaded_file($tmpName)) {
                        continue;
                    }

                    if (!move_uploaded_file($tmpName, $dest)) {
                        continue;
                    }

                    $uploadedUrls[] = $baseUrl . $publicPath . $finalName;
                    $processedCount++;
                }
            }
        }
    } else {
        // Fallback: JSON body
        $raw = file_get_contents('php://input');
        $input = json_decode($raw, true);
        if (!is_array($input)) {
            throw new Exception('Invalid input; expected JSON or multipart form data');
        }
        $title = $input['title'] ?? null;
        $content = $input['content'] ?? null;
        $author = isset($input['author']) && strlen($input['author']) >= 2 ? $input['author'] : 'Anonymous';
        $imageUrl = $input['image_url'] ?? null;
        if ($imageUrl) {
            $uploadedUrls[] = $imageUrl;
        }
    }

    if (empty($title) || strlen($title) < 3) throw new Exception('Title is required and must be at least 3 characters long');
    if (empty($content) || strlen($content) < 10) throw new Exception('Content is required and must be at least 10 characters long');

    $image_url_field = !empty($uploadedUrls) ? implode(',', $uploadedUrls) : null;

    $db = Database::getInstance();
    $id = $db->insert('news', [
        'title' => $title,
        'content' => $content,
        'author' => $author,
        'image_url' => $image_url_field,
        'created_at' => date('Y-m-d H:i:s'),
        'updated_at' => date('Y-m-d H:i:s')
    ]);

    respond_json([
        'success' => true,
        'message' => 'News created successfully',
        'data' => [
            'id' => $id,
            'title' => $title,
            'content' => $content,
            'author' => $author,
            'image_url' => $image_url_field,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]
    ]);
} catch (Exception $e) {
    respond_json([
        'success' => false,
        'message' => $e->getMessage(),
        'data' => null
    ], 400);
}
 