<?php
header('Content-Type: text/html; charset=utf-8');

echo "<h1>Amharic Text Test - Step by Step</h1>";

// Test 1: Direct PHP output
echo "<h2>Test 1: Direct PHP Output</h2>";
echo "<p>Amharic: የሲዳማ ወጣቶች ኮሚሽን</p>";
echo "<p>English: Sidama Youth Commission</p>";

// Test 2: JSON encoding
echo "<h2>Test 2: JSON Encoding</h2>";
$testData = [
    'amharic' => 'የሲዳማ ወጣቶች ኮሚሽን',
    'english' => 'Sidama Youth Commission',
    'mixed' => 'የሲዳማ ወጣቶች ኮሚሽን - Sidama Youth Commission'
];

echo "<p><strong>Without JSON_UNESCAPED_UNICODE:</strong></p>";
echo "<pre>" . json_encode($testData) . "</pre>";

echo "<p><strong>With JSON_UNESCAPED_UNICODE:</strong></p>";
echo "<pre>" . json_encode($testData, JSON_UNESCAPED_UNICODE) . "</pre>";

// Test 3: Database connection and query
echo "<h2>Test 3: Database Test</h2>";
try {
    require_once 'config/config.php';
    require_once 'config/database.php';
    
    $db = Database::getInstance();
    $pdo = $db->getConnection();
    
    // Check connection charset
    $stmt = $pdo->query("SELECT @@character_set_connection, @@collation_connection");
    $charsetInfo = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo "<p><strong>Connection Charset:</strong> " . $charsetInfo['@@character_set_connection'] . "</p>";
    echo "<p><strong>Connection Collation:</strong> " . $charsetInfo['@@collation_connection'] . "</p>";
    
    // Test database query
    $stmt = $pdo->query("SELECT title, content FROM news ORDER BY created_at DESC LIMIT 3");
    $news = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<p><strong>Latest News from Database:</strong></p>";
    foreach ($news as $index => $article) {
        echo "<p><strong>Article " . ($index + 1) . ":</strong></p>";
        echo "<p>Title: " . htmlspecialchars($article['title']) . "</p>";
        echo "<p>Content: " . htmlspecialchars(substr($article['content'], 0, 100)) . "...</p>";
        
        // Check for Amharic characters
        if (preg_match('/[\x{1200}-\x{137F}]/u', $article['title'])) {
            echo "<p style='color: green;'>✅ Found Amharic characters in title</p>";
        }
        if (preg_match('/[\x{1200}-\x{137F}]/u', $article['content'])) {
            echo "<p style='color: green;'>✅ Found Amharic characters in content</p>";
        }
    }
    
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Database Error: " . $e->getMessage() . "</p>";
}

// Test 4: API Response Simulation
echo "<h2>Test 4: API Response Simulation</h2>";
echo "<p>This simulates what your API should return:</p>";

header('Content-Type: application/json; charset=utf-8');
$apiResponse = [
    'success' => true,
    'message' => 'Test response',
    'data' => [
        [
            'id' => 999,
            'title' => 'የሲዳማ ወጣቶች ኮሚሽን - Sidama Youth Commission',
            'content' => 'ይህ የአማርኛ ጽሑፍ ነው። This is a test.',
            'author' => 'Test User',
            'created_at' => date('Y-m-d H:i:s')
        ]
    ],
    'debug' => [
        'charset' => 'utf-8',
        'json_flags' => 'JSON_UNESCAPED_UNICODE',
        'test_time' => date('Y-m-d H:i:s')
    ]
];

echo json_encode($apiResponse, JSON_UNESCAPED_UNICODE);
?>
