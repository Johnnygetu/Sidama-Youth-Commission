<?php
// Test alternative email configuration
echo "Testing Alternative Email Configuration...\n\n";

if (!file_exists('vendor/autoload.php')) {
    echo "ERROR: PHPMailer not installed. Please run: composer install\n";
    exit;
}

echo "✓ PHPMailer found\n";

try {
    require 'vendor/autoload.php';

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);

    // Alternative SMTP settings
    $mail->isSMTP();
    $mail->Host = 'mail.eltechsolutions-et.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'syc@eltechsolutions-et.com';
    $mail->Password = 'syc@eltech';
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS; // SSL
    $mail->Port = 465; // SSL port

    // SSL options
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // Enable debug
    $mail->SMTPDebug = 2;

    echo "Testing SSL connection on port 465...\n";

    // Set recipients
    $mail->setFrom('syc@eltechsolutions-et.com', 'Sidama Youth Commission');
    $mail->addAddress('syc@eltechsolutions-et.com', 'Test');

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Alternative Test - ' . date('H:i:s');
    $mail->Body = 'This is a test using SSL on port 465. Sent at ' . date('Y-m-d H:i:s');

    $mail->send();
    echo "\n✓ Alternative email sent successfully!\n";
} catch (Exception $e) {
    echo "\n✗ Alternative Error: " . $e->getMessage() . "\n";
}
