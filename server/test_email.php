<?php
// Test script for email functionality
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Testing Email System...\n\n";

// Test 1: Check if PHPMailer is installed
echo "1. Checking PHPMailer installation...\n";
if (file_exists('vendor/autoload.php')) {
    echo "✓ PHPMailer autoloader found\n";
} else {
    echo "✗ PHPMailer not installed. Please run: composer install\n";
    exit(1);
}

// Test 2: Test basic PHPMailer functionality
echo "\n2. Testing PHPMailer basic functionality...\n";
try {
    require 'vendor/autoload.php';
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    $mail = new PHPMailer(true);
    echo "✓ PHPMailer class loaded successfully\n";
} catch (Exception $e) {
    echo "✗ PHPMailer error: " . $e->getMessage() . "\n";
    exit(1);
}

// Test 3: Test SMTP connection
echo "\n3. Testing SMTP connection...\n";
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
    
    // Enable debug output
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {
        echo "SMTP Debug: $str\n";
    };
    
    echo "Attempting SMTP connection...\n";
    $mail->smtpConnect();
    echo "✓ SMTP connection successful\n";
    
} catch (Exception $e) {
    echo "✗ SMTP connection failed: " . $e->getMessage() . "\n";
    echo "Please check:\n";
    echo "- SMTP credentials are correct\n";
    echo "- Server allows connections on port 587\n";
    echo "- Firewall settings\n";
    exit(1);
}

// Test 4: Test actual email sending
echo "\n4. Testing email sending...\n";
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
    $mail->addAddress('syc@eltechsolutions-et.com', 'Test Recipient'); // Send to yourself for testing
    
    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Test Email from Sidama Youth Commission';
    $mail->Body = '
    <h2>Test Email</h2>
    <p>This is a test email to verify the email system is working correctly.</p>
    <p>If you receive this email, the SMTP configuration is working properly.</p>
    <p>Time sent: ' . date('Y-m-d H:i:s') . '</p>
    ';
    $mail->AltBody = 'This is a test email to verify the email system is working correctly.';
    
    $mail->send();
    echo "✓ Test email sent successfully to syc@eltechsolutions-et.com\n";
    echo "Please check your email inbox for the test message.\n";
    
} catch (Exception $e) {
    echo "✗ Email sending failed: " . $e->getMessage() . "\n";
    exit(1);
}

echo "\n✓ All tests completed successfully!\n";
echo "If you received the test email, the system is working correctly.\n";
echo "If you didn't receive it, check your spam folder or contact your email provider.\n";
?> 