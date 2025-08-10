<?php
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class AlternativeMailer
{
    private $mailer;

    public function __construct()
    {
        $this->mailer = new PHPMailer(true);

        // Alternative server settings
        $this->mailer->isSMTP();
        $this->mailer->Host = 'mail.eltechsolutions-et.com';
        $this->mailer->SMTPAuth = true;
        $this->mailer->Username = 'syc@eltechsolutions-et.com';
        $this->mailer->Password = 'syc@eltech';

        // Try different security settings
        $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL instead of STARTTLS
        $this->mailer->Port = 465; // SSL port instead of 587

        // Additional settings
        $this->mailer->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        // Default settings
        $this->mailer->setFrom('syc@eltechsolutions-et.com', 'Sidama Youth Commission');
        $this->mailer->isHTML(true);
    }

    public function sendReply($toEmail, $toName, $subject, $originalMessage, $replyContent)
    {
        try {
            $this->mailer->addAddress($toEmail, $toName);
            $this->mailer->Subject = 'Re: ' . $subject;

            // Simple email body for testing
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

            $this->mailer->send();
            return true;
        } catch (Exception $e) {
            error_log("Alternative Mailer Error: " . $e->getMessage());
            return false;
        }
    }
}
