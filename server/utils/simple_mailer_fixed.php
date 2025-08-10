<?php
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class SimpleMailerFixed
{
    private $mailer;

    public function __construct()
    {
        $this->mailer = new PHPMailer(true);

        // Server settings
        $this->mailer->isSMTP();
        $this->mailer->Host = 'mail.eltechsolutions-et.com';
        $this->mailer->SMTPAuth = true;
        $this->mailer->Username = 'syc@eltechsolutions-et.com';
        $this->mailer->Password = 'syc@eltech';
        $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $this->mailer->Port = 587;

        // Timeout settings
        $this->mailer->Timeout = 10;
        $this->mailer->SMTPKeepAlive = false;

        // Default settings
        $this->mailer->setFrom('syc@eltechsolutions-et.com', 'Sidama Youth Commission');
        $this->mailer->isHTML(true);
    }

    public function sendReply($toEmail, $toName, $subject, $originalMessage, $replyContent)
    {
        // Mailer logging function
        $logMailer = function ($message, $data = null) {
            $timestamp = date('Y-m-d H:i:s');
            $logEntry = "[{$timestamp}] MAILER: {$message}";
            if ($data !== null) {
                $logEntry .= " | Data: " . json_encode($data);
            }
            error_log($logEntry . "\n", 3, __DIR__ . '/../logs/reply_sending.log');
        };

        try {
            $logMailer("📧 Mailer: Starting email composition");

            $this->mailer->addAddress($toEmail, $toName);
            $logMailer("👤 Mailer: Recipient added", ['email' => $toEmail, 'name' => $toName]);

            $this->mailer->Subject = 'Re: ' . $subject;
            $logMailer("📋 Mailer: Subject set", ['subject' => 'Re: ' . $subject]);

            // Simple email body
            $htmlBody = "
            <h2>Reply from Sidama Youth Commission</h2>
            <p><strong>To:</strong> {$toName}</p>
            <p><strong>Subject:</strong> {$subject}</p>
            <hr>
            <h3>Our Response:</h3>
            <p>" . nl2br(htmlspecialchars($replyContent)) . "</p>
            <hr>
            <h3>Your Original Message:</h3>
            <p>" . nl2br(htmlspecialchars($originalMessage)) . "</p>
            <hr>
            <p><em>Sent at: " . date('Y-m-d H:i:s') . "</em></p>
            ";

            $this->mailer->Body = $htmlBody;
            $this->mailer->AltBody = "Reply: {$replyContent}\n\nOriginal: {$originalMessage}";
            $logMailer("📝 Mailer: Email body composed", ['htmlLength' => strlen($htmlBody)]);

            $logMailer("📤 Mailer: Attempting to send email");
            $this->mailer->send();
            $logMailer("✅ Mailer: Email sent successfully");

            return true;
        } catch (Exception $e) {
            $logMailer("💥 Mailer: Exception occurred", [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            error_log("Simple Mailer Error: " . $e->getMessage());
            return false;
        }
    }
}
