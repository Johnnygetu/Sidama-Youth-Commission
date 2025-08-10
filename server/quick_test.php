<?php
// Quick test script - run this in your browser
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>Email System Test</h2>";

// Check if PHPMailer is installed
if (!file_exists('vendor/autoload.php')) {
    echo "<p style='color: red;'>❌ PHPMailer not installed. Please run: composer install</p>";
    exit;
}

echo "<p style='color: green;'>✅ PHPMailer found</p>";

// Test basic email sending
try {
    require 'vendor/autoload.php';
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
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
    $mail->addAddress('syc@eltechsolutions-et.com', 'Test Recipient');
    
    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Test Email - ' . date('Y-m-d H:i:s');
    $mail->Body = '
    <h2>Test Email</h2>
    <p>This is a test email to verify the email system is working correctly.</p>
    <p>If you receive this email, the SMTP configuration is working properly.</p>
    <p>Time sent: ' . date('Y-m-d H:i:s') . '</p>
    ';
    $mail->AltBody = 'This is a test email to verify the email system is working correctly.';
    
    $mail->send();
    echo "<p style='color: green;'>✅ Test email sent successfully to syc@eltechsolutions-et.com</p>";
    echo "<p>Please check your email inbox (and spam folder) for the test message.</p>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Email sending failed: " . $e->getMessage() . "</p>";
    echo "<h3>Common Issues:</h3>";
    echo "<ul>";
    echo "<li>SMTP credentials are incorrect</li>";
    echo "<li>Server firewall blocking port 587</li>";
    echo "<li>SMTP server is down</li>";
    echo "<li>Email provider blocking outgoing emails</li>";
    echo "</ul>";
}

echo "<hr>";
echo "<h3>Next Steps:</h3>";
echo "<ol>";
echo "<li>If the test email was sent successfully, the system is working</li>";
echo "<li>If not, check the error message above and troubleshoot</li>";
echo "<li>Try sending a reply through the admin interface</li>";
echo "</ol>";
?> 