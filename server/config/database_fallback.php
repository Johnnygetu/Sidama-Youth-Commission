<?php
require_once 'config.php';

class DatabaseFallback
{
    private static $instance = null;
    private $connection;

    private function __construct()
    {
        // Try multiple connection methods
        $connectionMethods = [
            // Method 1: Standard localhost with root
            [
                'host' => 'localhost',
                'port' => '3306',
                'user' => 'root',
                'pass' => '',
                'name' => 'sidama_youth_commission'
            ],
            // Method 2: 127.0.0.1 with root
            [
                'host' => '127.0.0.1',
                'port' => '3306',
                'user' => 'root',
                'pass' => '',
                'name' => 'sidama_youth_commission'
            ],
            // Method 3: localhost with root and password
            [
                'host' => 'localhost',
                'port' => '3306',
                'user' => 'root',
                'pass' => 'root',
                'name' => 'sidama_youth_commission'
            ],
            // Method 4: localhost with root and common password
            [
                'host' => 'localhost',
                'port' => '3306',
                'user' => 'root',
                'pass' => 'password',
                'name' => 'sidama_youth_commission'
            ],
            // Method 5: Try without database name first
            [
                'host' => 'localhost',
                'port' => '3306',
                'user' => 'root',
                'pass' => '',
                'name' => null
            ]
        ];

        $lastError = null;
        
        foreach ($connectionMethods as $method) {
            try {
                if ($method['name']) {
                    $dsn = "mysql:host={$method['host']};port={$method['port']};dbname={$method['name']};charset=utf8mb4";
                } else {
                    $dsn = "mysql:host={$method['host']};port={$method['port']};charset=utf8mb4";
                }
                
                $this->connection = new PDO($dsn, $method['user'], $method['pass'], [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::ATTR_TIMEOUT => 10,
                ]);
                
                // If we connected without database, create it
                if (!$method['name']) {
                    $this->connection->exec("CREATE DATABASE IF NOT EXISTS `sidama_youth_commission` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                    $this->connection->exec("USE `sidama_youth_commission`");
                }
                
                // Test the connection with a simple query
                $this->connection->query("SELECT 1");
                
                // If we get here, connection is successful
                error_log("Database connection successful using: {$method['host']}:{$method['port']} with user {$method['user']}");
                return;
                
            } catch (PDOException $e) {
                $lastError = $e;
                error_log("Database connection failed for {$method['host']}:{$method['port']} with user {$method['user']}: " . $e->getMessage());
                continue;
            }
        }
        
        // If we get here, all connection methods failed
        throw new Exception("All database connection methods failed. Last error: " . ($lastError ? $lastError->getMessage() : 'Unknown error'));
    }

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection()
    {
        return $this->connection;
    }

    public function query($sql, $params = [])
    {
        try {
            $stmt = $this->connection->prepare($sql);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            throw new Exception("Query failed: " . $e->getMessage());
        }
    }

    public function fetchAll($sql, $params = [])
    {
        $stmt = $this->query($sql, $params);
        return $stmt->fetchAll();
    }

    public function fetchOne($sql, $params = [])
    {
        $stmt = $this->query($sql, $params);
        return $stmt->fetch();
    }

    public function insert($table, $data)
    {
        $columns = implode(', ', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));

        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
        $this->query($sql, $data);

        return $this->connection->lastInsertId();
    }

    public function update($table, $data, $where, $whereParams = [])
    {
        $setClause = [];
        foreach (array_keys($data) as $column) {
            $setClause[] = "$column = :$column";
        }
        $setClause = implode(', ', $setClause);

        $sql = "UPDATE $table SET $setClause WHERE $where";
        $params = array_merge($data, $whereParams);

        $stmt = $this->query($sql, $params);
        return $stmt->rowCount();
    }

    public function delete($table, $where, $params = [])
    {
        $sql = "DELETE FROM $table WHERE $where";
        $stmt = $this->query($sql, $params);
        return $stmt->rowCount();
    }

    // Prevent cloning
    private function __clone() {}

    // Prevent unserialization
    public function __wakeup()
    {
        throw new Exception("Cannot unserialize singleton");
    }
}
?>




















