<?php
// Simple email test
echo "Testing Email System...\n\n";

// Check if PHPMailer exists
if (!file_exists('vendor/autoload.php')) {
    echo "ERROR: PHPMailer not installed. Please run: composer install\n";
    exit;
}

echo "✓ PHPMailer found\n";

try {
    require 'vendor/autoload.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);

    // SMTP settings
    $mail->isSMTP();
    $mail->Host = 'mail.eltechsolutions-et.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'syc@eltechsolutions-et.com';
    $mail->Password = 'syc@eltech';
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Enable debug
    $mail->SMTPDebug = 2;

    echo "Attempting to send test email...\n";

    // Set recipients
    $mail->setFrom('syc@eltechsolutions-et.com', 'Sidama Youth Commission');
    $mail->addAddress('syc@eltechsolutions-et.com', 'Test');

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Test Email - ' . date('H:i:s');
    $mail->Body = 'This is a test email sent at ' . date('Y-m-d H:i:s');

    $mail->send();
    echo "\n✓ Email sent successfully!\n";
} catch (Exception $e) {
    echo "\n✗ Error: " . $e->getMessage() . "\n";
}
