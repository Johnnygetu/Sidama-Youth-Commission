<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

class Mailer
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
        $this->mailer->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
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
        try {
            $this->mailer->addAddress($toEmail, $toName);
            $this->mailer->Subject = 'Re: ' . $subject;

            // Create HTML email body
            $htmlBody = $this->createReplyEmailBody($toName, $subject, $originalMessage, $replyContent);
            $this->mailer->Body = $htmlBody;

            // Create plain text version
            $textBody = $this->createPlainTextReply($toName, $subject, $originalMessage, $replyContent);
            $this->mailer->AltBody = $textBody;

            $this->mailer->send();
            return true;
        } catch (Exception $e) {
            error_log("Mailer Error: " . $e->getMessage());
            return false;
        }
    }

    private function createReplyEmailBody($toName, $subject, $originalMessage, $replyContent)
    {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Reply from Sidama Youth Commission</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #1a75c4 0%, #ff9219 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
                .reply-section { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #1a75c4; border-radius: 4px; }
                .original-message { background: #e9ecef; padding: 15px; margin: 15px 0; border-radius: 4px; font-style: italic; }
                .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 0.9em; }
                .contact-info { background: #e3f2fd; padding: 15px; margin: 15px 0; border-radius: 4px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Sidama Youth Commission</h1>
                    <p>Response to Your Message</p>
                </div>
                
                <div class='content'>
                    <p>Dear {$toName},</p>
                    
                    <p>Thank you for contacting the Sidama Youth Commission. We have received your message and are pleased to provide you with a response.</p>
                    
                    <div class='reply-section'>
                        <h3>Our Response:</h3>
                        <p>" . nl2br(htmlspecialchars($replyContent)) . "</p>
                    </div>
                    
                    <div class='original-message'>
                        <h4>Your Original Message:</h4>
                        <p><strong>Subject:</strong> {$subject}</p>
                        <p>" . nl2br(htmlspecialchars($originalMessage)) . "</p>
                    </div>
                    
                    <div class='contact-info'>
                        <h4>Contact Information:</h4>
                        <p><strong>Address:</strong> Hawassa, Sidama Region, Ethiopia</p>
                        <p><strong>Email:</strong> info@sidamayouth.org</p>
                        <p><strong>Phone:</strong> +251 911 234 567</p>
                        <p><strong>Website:</strong> www.sidamayouth.org</p>
                    </div>
                    
                    <p>If you have any further questions or need additional assistance, please don't hesitate to contact us.</p>
                    
                    <p>Best regards,<br>
                    <strong>Sidama Youth Commission Team</strong></p>
                </div>
                
                <div class='footer'>
                    <p>This is an automated response from the Sidama Youth Commission contact system.</p>
                    <p>&copy; " . date('Y') . " Sidama Youth Commission. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
    }

    private function createPlainTextReply($toName, $subject, $originalMessage, $replyContent)
    {
        return "Dear {$toName},

Thank you for contacting the Sidama Youth Commission. We have received your message and are pleased to provide you with a response.

OUR RESPONSE:
{$replyContent}

YOUR ORIGINAL MESSAGE:
Subject: {$subject}
{$originalMessage}

CONTACT INFORMATION:
Address: Hawassa, Sidama Region, Ethiopia
Email: info@sidamayouth.org
Phone: +251 911 234 567
Website: www.sidamayouth.org

If you have any further questions or need additional assistance, please don't hesitate to contact us.

Best regards,
Sidama Youth Commission Team

---
This is an automated response from the Sidama Youth Commission contact system.
© " . date('Y') . " Sidama Youth Commission. All rights reserved.";
    }
}
