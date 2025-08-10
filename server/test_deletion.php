<?php
// Test script to verify message deletion functionality
echo "🧪 Testing Message Deletion Functionality\n";
echo "==========================================\n\n";

// Test database connection
try {
    $pdo = new PDO('mysql:host=eltechsolutions-et.com;dbname=eltechev_sidamaYouthComission;charset=utf8mb4', 'eltechev_syc', 'Qwertyuiop123');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ Database connection successful\n";
} catch (Exception $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "\n";
    exit(1);
}

// Check current message count
try {
    $stmt = $pdo->query('SELECT COUNT(*) as count FROM contact_messages');
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "📊 Current messages in database: " . $result['count'] . "\n";
} catch (Exception $e) {
    echo "❌ Failed to count messages: " . $e->getMessage() . "\n";
    exit(1);
}

// Show some sample messages
try {
    $stmt = $pdo->query('SELECT id, name, email, subject, status, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 5');
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($messages) > 0) {
        echo "\n📋 Sample messages in database:\n";
        foreach ($messages as $msg) {
            echo "  ID: {$msg['id']} | {$msg['name']} | {$msg['subject']} | {$msg['status']} | {$msg['created_at']}\n";
        }
    } else {
        echo "\n📋 No messages found in database\n";
    }
} catch (Exception $e) {
    echo "❌ Failed to fetch sample messages: " . $e->getMessage() . "\n";
}

echo "\n🔍 Deletion Process Flow:\n";
echo "1. Admin sends reply via markAsReplied.php\n";
echo "2. Message status updated to 'replied'\n";
echo "3. Email sent successfully\n";
echo "4. Message deleted from database\n";
echo "5. Admin redirected to messages list\n";

echo "\n📝 To test the deletion:\n";
echo "1. Go to admin panel\n";
echo "2. Click on a message\n";
echo "3. Send a reply\n";
echo "4. Check that message disappears from the list\n";
echo "5. Check logs: tail -f server/logs/reply_sending.log\n";

echo "\n✅ Test script completed!\n";
