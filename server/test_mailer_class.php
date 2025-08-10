<?php
// Test the mailer class directly
echo "Testing Mailer Class...\n\n";

if (!file_exists('vendor/autoload.php')) {
    echo "ERROR: PHPMailer not installed\n";
    exit;
}

echo "✓ PHPMailer found\n";

try {
    require_once 'utils/mailer.php';
    $mailer = new Mailer();
    echo "✓ Mailer class loaded\n";

    // Test sending a reply
    $emailSent = $mailer->sendReply(
        'syc@eltechsolutions-et.com',
        'Test User',
        'Test Subject',
        'This is the original message content.',
        'This is a test reply from the mailer class.'
    );

    if ($emailSent) {
        echo "✓ Mailer class test email sent successfully!\n";
    } else {
        echo "✗ Mailer class test failed\n";
    }
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
}
