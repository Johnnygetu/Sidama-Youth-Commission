<?php
// Simple mailer for testing
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function sendSimpleEmail($toEmail, $toName, $subject, $message)
{
    try {
        $mail = new PHPMailer(true);

        // Server settings
        $mail->isSMTP();
        $mail->Host = 'mail.eltechsolutions-et.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'syc@eltechsolutions-et.com';
        $mail->Password = 'syc@eltech';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom('syc@eltechsolutions-et.com', 'Sidama Youth Commission');
        $mail->addAddress($toEmail, $toName);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = "
        <h2>Test Email</h2>
        <p><strong>To:</strong> {$toName} ({$toEmail})</p>
        <p><strong>Subject:</strong> {$subject}</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br(htmlspecialchars($message)) . "</p>
        <p><em>Sent at: " . date('Y-m-d H:i:s') . "</em></p>
        ";
        $mail->AltBody = "Test Email\nTo: {$toName} ({$toEmail})\nSubject: {$subject}\nMessage: {$message}";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Simple Mailer Error: " . $e->getMessage());
        return false;
    }
}
