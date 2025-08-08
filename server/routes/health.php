<?php
Response::success([
    'status' => 'OK',
    'timestamp' => date('Y-m-d H:i:s'),
    'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'PHP'
], 'Health check successful');
