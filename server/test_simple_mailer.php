<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Testing Simple Mailer Fixed...\n\n";

require 'utils/simple_mailer_fixed.php';

$mailer = new SimpleMailerFixed();
echo "✓ Simple mailer created\n";

$result = $mailer->sendReply(
    'syc@eltechsolutions-et.com',
    'Test User',
    'Test Subject',
    'Original message content',
    'This is a test reply from the simplified mailer.'
);

if ($result) {
    echo "✓ Email sent successfully!\n";
} else {
    echo "✗ Email sending failed\n";
}
