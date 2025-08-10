<?php
class Response
{
    public static function success($data = null, $message = 'Success', $statusCode = 200)
    {
        http_response_code($statusCode);
        echo json_encode([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    }

    public static function error($message = 'Error', $statusCode = 400, $errors = null)
    {
        http_response_code($statusCode);
        echo json_encode([
            'success' => false,
            'message' => $message,
            'data' => null,
            'errors' => $errors,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    }

    public static function notFound($message = 'Resource not found')
    {
        self::error($message, 404);
    }

    public static function unauthorized($message = 'Unauthorized')
    {
        self::error($message, 401);
    }

    public static function forbidden($message = 'Forbidden')
    {
        self::error($message, 403);
    }

    public static function methodNotAllowed($message = 'Method not allowed')
    {
        self::error($message, 405);
    }

    public static function validationError($errors, $message = 'Validation failed')
    {
        self::error($message, 422, $errors);
    }

    public static function serverError($message = 'Internal server error')
    {
        self::error($message, 500);
    }

    public static function created($data = null, $message = 'Resource created successfully')
    {
        self::success($data, $message, 201);
    }

    public static function noContent()
    {
        http_response_code(204);
        echo json_encode([
            'success' => true,
            'message' => 'No content',
            'data' => null,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    }
}
 