<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Debugging Mailer...\n\n";

// Step 1: Check if vendor exists
echo "1. Checking vendor directory...\n";
if (file_exists('vendor/autoload.php')) {
    echo "✓ vendor/autoload.php exists\n";
} else {
    echo "✗ vendor/autoload.php not found\n";
    exit;
}

// Step 2: Try to require autoload
echo "\n2. Loading autoloader...\n";
try {
    require 'vendor/autoload.php';
    echo "✓ Autoloader loaded\n";
} catch (Exception $e) {
    echo "✗ Autoloader error: " . $e->getMessage() . "\n";
    exit;
}

// Step 3: Try to create PHPMailer instance
echo "\n3. Creating PHPMailer instance...\n";
try {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    echo "✓ PHPMailer instance created\n";
} catch (Exception $e) {
    echo "✗ PHPMailer error: " . $e->getMessage() . "\n";
    exit;
}

// Step 4: Try to load mailer class
echo "\n4. Loading mailer class...\n";
try {
    require_once 'utils/mailer.php';
    echo "✓ Mailer class file loaded\n";
} catch (Exception $e) {
    echo "✗ Mailer class error: " . $e->getMessage() . "\n";
    exit;
}

// Step 5: Try to create mailer instance
echo "\n5. Creating mailer instance...\n";
try {
    $mailer = new Mailer();
    echo "✓ Mailer instance created\n";
} catch (Exception $e) {
    echo "✗ Mailer instance error: " . $e->getMessage() . "\n";
    exit;
}

echo "\n✓ All tests passed! Mailer should be working.\n";
