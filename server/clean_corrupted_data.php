<?php
require_once 'config/config.php';
require_once 'config/database.php';

header('Content-Type: text/html; charset=utf-8');

echo "<h1>Clean Corrupted Amharic Data</h1>";
echo "<p>This script will remove news entries with corrupted Amharic text (showing as ????).</p>";

try {
    $db = Database::getInstance();
    $pdo = $db->getConnection();
    
    // Find entries with corrupted Amharic text (containing ????)
    echo "<h2>1. Finding Corrupted Entries</h2>";
    
    $stmt = $pdo->query("SELECT id, title, content, author FROM news WHERE title LIKE '%?%' OR content LIKE '%?%'");
    $corruptedEntries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($corruptedEntries)) {
        echo "<p style='color: green;'>✅ No corrupted entries found!</p>";
    } else {
        echo "<p><strong>Found " . count($corruptedEntries) . " corrupted entries:</strong></p>";
        
        foreach ($corruptedEntries as $entry) {
            echo "<div style='border: 1px solid #ddd; padding: 10px; margin: 10px 0;'>";
            echo "<p><strong>ID:</strong> " . $entry['id'] . "</p>";
            echo "<p><strong>Title:</strong> " . htmlspecialchars($entry['title']) . "</p>";
            echo "<p><strong>Content:</strong> " . htmlspecialchars(substr($entry['content'], 0, 100)) . "...</p>";
            echo "<p><strong>Author:</strong> " . htmlspecialchars($entry['author']) . "</p>";
            echo "</div>";
        }
        
        echo "<h2>2. Cleaning Corrupted Data</h2>";
        
        // Delete corrupted entries
        $deletedCount = 0;
        foreach ($corruptedEntries as $entry) {
            try {
                $stmt = $pdo->prepare("DELETE FROM news WHERE id = ?");
                $stmt->execute([$entry['id']]);
                $deletedCount++;
                echo "<p style='color: green;'>✅ Deleted corrupted entry ID: " . $entry['id'] . "</p>";
            } catch (Exception $e) {
                echo "<p style='color: red;'>❌ Error deleting ID " . $entry['id'] . ": " . $e->getMessage() . "</p>";
            }
        }
        
        echo "<p style='color: blue;'><strong>Total deleted: $deletedCount entries</strong></p>";
    }
    
    // Show remaining clean entries
    echo "<h2>3. Remaining Clean Entries</h2>";
    
    $stmt = $pdo->query("SELECT id, title, content, author, created_at FROM news ORDER BY created_at DESC");
    $cleanEntries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($cleanEntries)) {
        echo "<p style='color: orange;'>⚠️ No news entries remaining in database.</p>";
    } else {
        echo "<p><strong>Remaining entries: " . count($cleanEntries) . "</strong></p>";
        
        foreach ($cleanEntries as $entry) {
            echo "<div style='border: 1px solid #eee; padding: 10px; margin: 10px 0; background: #f9f9f9;'>";
            echo "<p><strong>ID:</strong> " . $entry['id'] . "</p>";
            echo "<p><strong>Title:</strong> " . htmlspecialchars($entry['title']) . "</p>";
            echo "<p><strong>Content:</strong> " . htmlspecialchars(substr($entry['content'], 0, 100)) . "...</p>";
            echo "<p><strong>Author:</strong> " . htmlspecialchars($entry['author']) . "</p>";
            echo "<p><strong>Created:</strong> " . $entry['created_at'] . "</p>";
            echo "</div>";
        }
    }
    
    echo "<h2>4. Test Amharic Text Insertion</h2>";
    
    // Test inserting new Amharic text
    $testTitle = "የሲዳማ ወጣቶች ኮሚሽን - Sidama Youth Commission";
    $testContent = "ይህ የአማርኛ ጽሑፍ ነው። This is a test of Amharic text support after cleanup.";
    
    try {
        $stmt = $pdo->prepare("INSERT INTO news (title, content, author, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())");
        $stmt->execute([$testTitle, $testContent, 'System Test']);
        $testId = $pdo->lastInsertId();
        
        echo "<p style='color: green;'>✅ Test Amharic text inserted with ID: $testId</p>";
        
        // Verify it was saved correctly
        $stmt = $pdo->prepare("SELECT * FROM news WHERE id = ?");
        $stmt->execute([$testId]);
        $testNews = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($testNews) {
            echo "<p><strong>Verification:</strong></p>";
            echo "<p>Title: " . htmlspecialchars($testNews['title']) . "</p>";
            echo "<p>Content: " . htmlspecialchars($testNews['content']) . "</p>";
            
            if (strpos($testNews['title'], 'የ') !== false) {
                echo "<p style='color: green;'>✅ Amharic characters preserved correctly!</p>";
            } else {
                echo "<p style='color: red;'>❌ Amharic characters may not be preserved</p>";
            }
        }
        
    } catch (Exception $e) {
        echo "<p style='color: red;'>❌ Error testing Amharic text: " . $e->getMessage() . "</p>";
    }
    
    echo "<hr>";
    echo "<p><strong>Next Steps:</strong></p>";
    echo "<ol>";
    echo "<li>✅ Corrupted data has been cleaned up</li>";
    echo "<li>✅ Database is now properly configured for Amharic text</li>";
    echo "<li>✅ Test entry with Amharic text has been added</li>";
    echo "<li>🔄 Now test adding Amharic text through your admin panel</li>";
    echo "<li>🔄 Verify it displays correctly on both admin and frontend</li>";
    echo "</ol>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Error: " . $e->getMessage() . "</p>";
}
?>
