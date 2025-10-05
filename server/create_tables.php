<?php
// Include centralized CORS configuration
require_once 'config/cors.php';

echo "<h2>Creating Database Tables</h2>";

// Test database connection and create tables
require_once 'config/config.php';

try {
    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    echo "<p style='color: green;'>✅ Database connection successful!</p>";
    echo "<p><strong>Database:</strong> " . DB_NAME . "</p>";
    echo "<p><strong>User:</strong> " . DB_USER . "</p>";
    
    // Create contact_messages table
    $createMessagesTable = "
    CREATE TABLE IF NOT EXISTS `contact_messages` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `email` varchar(255) NOT NULL,
        `subject` varchar(500) DEFAULT NULL,
        `message` text NOT NULL,
        `status` enum('unread','read','replied') DEFAULT 'unread',
        `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        KEY `status` (`status`),
        KEY `created_at` (`created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    
    $pdo->exec($createMessagesTable);
    echo "<p style='color: green;'>✅ Table 'contact_messages' created successfully!</p>";
    
    // Create news table
    $createNewsTable = "
    CREATE TABLE IF NOT EXISTS `news` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `title` varchar(500) NOT NULL,
        `content` longtext NOT NULL,
        `author` varchar(255) DEFAULT NULL,
        `image_url` varchar(1000) DEFAULT NULL,
        `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        KEY `created_at` (`created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    
    $pdo->exec($createNewsTable);
    echo "<p style='color: green;'>✅ Table 'news' created successfully!</p>";
    
    // Insert sample data
    echo "<h3>Inserting Sample Data</h3>";
    
    // Sample news
    $sampleNews = [
        [
            'title' => 'Welcome to Sidama Youth Commission',
            'content' => 'We are excited to announce the launch of our new website. The Sidama Youth Commission is committed to empowering young people and building a better future for our community.',
            'author' => 'Admin',
            'image_url' => null
        ],
        [
            'title' => 'Youth Development Programs',
            'content' => 'Our youth development programs are designed to provide skills training, education, and opportunities for young people in the Sidama region. Join us in building a brighter future.',
            'author' => 'Admin',
            'image_url' => null
        ]
    ];
    
    $stmt = $pdo->prepare("INSERT IGNORE INTO news (title, content, author, image_url) VALUES (?, ?, ?, ?)");
    foreach ($sampleNews as $news) {
        $stmt->execute([$news['title'], $news['content'], $news['author'], $news['image_url']]);
    }
    echo "<p style='color: green;'>✅ Sample news inserted successfully!</p>";
    
    // Sample contact message
    $sampleMessage = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'subject' => 'Test Message',
        'message' => 'This is a test message to verify the contact form is working properly.',
        'status' => 'unread'
    ];
    
    $stmt = $pdo->prepare("INSERT IGNORE INTO contact_messages (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$sampleMessage['name'], $sampleMessage['email'], $sampleMessage['subject'], $sampleMessage['message'], $sampleMessage['status']]);
    echo "<p style='color: green;'>✅ Sample contact message inserted successfully!</p>";
    
    // Verify tables
    echo "<h3>Database Verification</h3>";
    
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM contact_messages");
    $result = $stmt->fetch();
    echo "<p><strong>Contact Messages:</strong> {$result['count']} records</p>";
    
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM news");
    $result = $stmt->fetch();
    echo "<p><strong>News Articles:</strong> {$result['count']} records</p>";
    
    echo "<h3 style='color: green;'>🎉 Database Setup Complete!</h3>";
    echo "<p>Your database is now ready. You can:</p>";
    echo "<ul>";
    echo "<li>Test the API endpoints</li>";
    echo "<li>Add news articles through the admin panel</li>";
    echo "<li>Receive contact messages</li>";
    echo "</ul>";
    
    echo "<h3>Test Your API Endpoints:</h3>";
    echo "<ul>";
    echo "<li><a href='test_local_db.php'>Test Database Connection</a></li>";
    echo "<li><a href='news/allNews.php'>Test News API</a></li>";
    echo "<li><a href='messages/allMessages.php'>Test Messages API</a></li>";
    echo "</ul>";
    
} catch (PDOException $e) {
    echo "<p style='color: red;'><strong>❌ Database setup failed:</strong> " . $e->getMessage() . "</p>";
    echo "<h3>Troubleshooting</h3>";
    echo "<p>Make sure:</p>";
    echo "<ul>";
    echo "<li>Database credentials are correct in config.php</li>";
    echo "<li>Database user has proper permissions</li>";
    echo "<li>Database exists</li>";
    echo "</ul>";
}
?>




















