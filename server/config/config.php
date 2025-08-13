<?php
// Application configuration
define('APP_NAME', 'Sidama Youth Commission');
define('APP_VERSION', '1.0.0');
define('APP_ENV', 'development'); // development, production

// Database configuration
define('DB_HOST', 'eltechsolutions-et.com');
define('DB_NAME', 'eltechev_sidamaYouthComission');
define('DB_USER', 'eltechev_syc');
define('DB_PASS', 'Qwertyuiop123');
define('DB_CHARSET', 'utf8mb4');

// File upload configuration
define('UPLOAD_DIR', 'uploads/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'pdf']);

// Security configuration
define('JWT_SECRET', 'your-secret-key-here');
define('JWT_EXPIRY', 3600); // 1 hour

// Error reporting
if (APP_ENV === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Timezone
date_default_timezone_set('Africa/Addis_Ababa');

// Session configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', APP_ENV === 'production');
