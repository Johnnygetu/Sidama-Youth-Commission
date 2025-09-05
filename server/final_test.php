<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Final Email Test\n\n";

// Load dependencies
require 'vendor/autoload.php';
require 'utils/mailer.php';

echo "✓ Dependencies loaded\n";

// Create mailer instance
$mailer = new Mailer();
echo "✓ Mailer instance created\n";

// Test sending email
$result = $mailer->sendReply(
    'syc@eltechsolutions-et.com',
    'Test User',
    'Test Subject',
    'Original message content',
    'This is a test reply from the admin system.'
);

if ($result) {
    echo "✓ Email sent successfully!\n";
    echo "Check your email inbox for the test message.\n";
} else {
    echo "✗ Email sending failed\n";
}
