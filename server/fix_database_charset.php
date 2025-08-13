<?php
require_once 'config/config.php';
require_once 'config/database.php';

header('Content-Type: text/html; charset=utf-8');

echo "<h1>Database Charset Fix & Debug</h1>";
echo "<p>Checking and fixing database charset for Amharic text support...</p>";

try {
    $db = Database::getInstance();
    $pdo = $db->getConnection();
    
    echo "<h2>1. Current Database Connection Info</h2>";
    echo "<p><strong>Database:</strong> " . DB_NAME . "</p>";
    echo "<p><strong>Charset:</strong> " . DB_CHARSET . "</p>";
    
    // Check current database charset
    $stmt = $pdo->query("SELECT @@character_set_database, @@collation_database");
    $charsetInfo = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo "<p><strong>Current DB Charset:</strong> " . $charsetInfo['@@character_set_database'] . "</p>";
    echo "<p><strong>Current DB Collation:</strong> " . $charsetInfo['@@collation_database'] . "</p>";
    
    // Check table charset
    echo "<h2>2. Checking Table Charsets</h2>";
    
    $tables = ['news', 'contact_messages'];
    foreach ($tables as $table) {
        try {
            $stmt = $pdo->query("SHOW CREATE TABLE `$table`");
            $createTable = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (isset($createTable['Create Table'])) {
                echo "<p><strong>Table: $table</strong></p>";
                if (strpos($createTable['Create Table'], 'utf8mb4') !== false) {
                    echo "<p style='color: green;'>✅ Table $table is using utf8mb4 charset</p>";
                } else {
                    echo "<p style='color: red;'>❌ Table $table is NOT using utf8mb4 charset</p>";
                }
            }
        } catch (Exception $e) {
            echo "<p style='color: orange;'>⚠️ Could not check table $table: " . $e->getMessage() . "</p>";
        }
    }
    
    // Fix database charset if needed
    echo "<h2>3. Fixing Database Charset</h2>";
    
    if ($charsetInfo['@@character_set_database'] !== 'utf8mb4') {
        echo "<p>Fixing database charset to utf8mb4...</p>";
        $pdo->exec("ALTER DATABASE `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        echo "<p style='color: green;'>✅ Database charset updated to utf8mb4</p>";
    } else {
        echo "<p style='color: green;'>✅ Database already using utf8mb4 charset</p>";
    }
    
    // Fix table charsets if needed
    echo "<h2>4. Fixing Table Charsets</h2>";
    
    foreach ($tables as $table) {
        try {
            // Check if table exists
            $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
            if ($stmt->rowCount() > 0) {
                echo "<p>Fixing table $table charset...</p>";
                $pdo->exec("ALTER TABLE `$table` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                echo "<p style='color: green;'>✅ Table $table charset updated to utf8mb4</p>";
            } else {
                echo "<p style='color: orange;'>⚠️ Table $table does not exist</p>";
            }
        } catch (Exception $e) {
            echo "<p style='color: red;'>❌ Error fixing table $table: " . $e->getMessage() . "</p>";
        }
    }
    
    // Test Amharic text insertion
    echo "<h2>5. Testing Amharic Text</h2>";
    
    $testTitle = "የሲዳማ ወጣቶች ኮሚሽን - Sidama Youth Commission";
    $testContent = "ይህ የአማርኛ ጽሑፍ ለመሞከር ነው። This is a test of Amharic text support.";
    
    try {
        // Insert test data
        $stmt = $pdo->prepare("INSERT INTO news (title, content, author, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())");
        $stmt->execute([$testTitle, $testContent, 'Test User']);
        $testId = $pdo->lastInsertId();
        
        echo "<p style='color: green;'>✅ Test Amharic text inserted with ID: $testId</p>";
        
        // Retrieve and display the test data
        $stmt = $pdo->prepare("SELECT * FROM news WHERE id = ?");
        $stmt->execute([$testId]);
        $testNews = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($testNews) {
            echo "<h3>Retrieved Test Data:</h3>";
            echo "<p><strong>Title:</strong> " . htmlspecialchars($testNews['title']) . "</p>";
            echo "<p><strong>Content:</strong> " . htmlspecialchars($testNews['content']) . "</p>";
            
            // Check if Amharic characters are preserved
            if (strpos($testNews['title'], 'የ') !== false) {
                echo "<p style='color: green;'>✅ Amharic characters preserved correctly!</p>";
            } else {
                echo "<p style='color: red;'>❌ Amharic characters may not be preserved</p>";
            }
        }
        
        // Clean up test data
        $stmt = $pdo->prepare("DELETE FROM news WHERE id = ?");
        $stmt->execute([$testId]);
        echo "<p style='color: blue;'>🧹 Test data cleaned up</p>";
        
    } catch (Exception $e) {
        echo "<p style='color: red;'>❌ Error testing Amharic text: " . $e->getMessage() . "</p>";
    }
    
    // Final verification
    echo "<h2>6. Final Verification</h2>";
    
    $stmt = $pdo->query("SELECT @@character_set_database, @@collation_database");
    $finalCharsetInfo = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo "<p><strong>Final DB Charset:</strong> " . $finalCharsetInfo['@@character_set_database'] . "</p>";
    echo "<p><strong>Final DB Collation:</strong> " . $finalCharsetInfo['@@collation_database'] . "</p>";
    
    if ($finalCharsetInfo['@@character_set_database'] === 'utf8mb4') {
        echo "<p style='color: green; font-weight: bold;'>🎉 SUCCESS: Database is now properly configured for Amharic text!</p>";
    } else {
        echo "<p style='color: red; font-weight: bold;'>❌ FAILED: Database charset not properly configured</p>";
    }
    
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Error: " . $e->getMessage() . "</p>";
}

echo "<hr>";
echo "<p><strong>Next Steps:</strong></p>";
echo "<ol>";
echo "<li>Run this script on your server</li>";
echo "<li>Check if all steps show ✅ (success)</li>";
echo "<li>Test adding Amharic text through your admin panel</li>";
echo "<li>Verify it displays correctly on both admin and frontend</li>";
echo "</ol>";

echo "<p><strong>Debug Info:</strong></p>";
echo "<p>Server Time: " . date('Y-m-d H:i:s') . "</p>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>PDO Drivers: " . implode(', ', PDO::getAvailableDrivers()) . "</p>";
?>
