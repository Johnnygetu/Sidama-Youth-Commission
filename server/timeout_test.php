<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Timeout Test\n\n";

try {
    require 'vendor/autoload.php';
    echo "✓ Autoloader loaded\n";

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    echo "✓ PHPMailer created\n";

    // Set timeout
    $mail->Timeout = 10; // 10 seconds timeout
    $mail->SMTPKeepAlive = false;

    // Server settings
    $mail->isSMTP();
    $mail->Host = 'mail.eltechsolutions-et.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'syc@eltechsolutions-et.com';
    $mail->Password = 'syc@eltech';
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    echo "✓ Settings configured\n";

    // Recipients
    $mail->setFrom('syc@eltechsolutions-et.com', 'Sidama Youth Commission');
    $mail->addAddress('syc@eltechsolutions-et.com', 'Test');

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Timeout Test - ' . date('H:i:s');
    $mail->Body = 'This is a timeout test email.';

    echo "Attempting to send email...\n";
    $mail->send();
    echo "✓ Email sent successfully!\n";
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
}
