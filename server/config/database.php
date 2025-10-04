<?php
require_once 'config.php';

class Database
{
    private static $instance = null;
    private $connection;

    private function __construct()
    {
        // Try the configured connection first
        try {
            $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $this->connection = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_TIMEOUT => 30,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET,
            ]);
            
            // Test the connection
            $this->connection->query("SELECT 1");
            
        } catch (PDOException $e) {
            // If configured connection fails, try fallback methods
            error_log("Primary database connection failed: " . $e->getMessage());
            
            // Try fallback connection methods
            $fallbackMethods = [
                ['host' => 'localhost', 'port' => '3306', 'user' => 'root', 'pass' => '', 'db' => DB_NAME],
                ['host' => '127.0.0.1', 'port' => '3306', 'user' => 'root', 'pass' => '', 'db' => DB_NAME],
                ['host' => 'localhost', 'port' => '3306', 'user' => 'root', 'pass' => 'root', 'db' => DB_NAME],
                ['host' => 'localhost', 'port' => '3306', 'user' => 'root', 'pass' => 'password', 'db' => DB_NAME],
                ['host' => 'localhost', 'port' => '3306', 'user' => 'root', 'pass' => '', 'db' => null], // Try without database first
            ];
            
            $connected = false;
            foreach ($fallbackMethods as $method) {
                try {
                    if ($method['db']) {
                        $dsn = "mysql:host={$method['host']};port={$method['port']};dbname={$method['db']};charset=utf8mb4";
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
                    if (!$method['db']) {
                        $this->connection->exec("CREATE DATABASE IF NOT EXISTS `" . DB_NAME . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                        $this->connection->exec("USE `" . DB_NAME . "`");
                    }
                    
                    // Test the connection
                    $this->connection->query("SELECT 1");
                    $connected = true;
                    error_log("Database connection successful using fallback: {$method['host']}:{$method['port']} with user {$method['user']}");
                    break;
                    
                } catch (PDOException $e) {
                    error_log("Fallback connection failed for {$method['host']}:{$method['port']} with user {$method['user']}: " . $e->getMessage());
                    continue;
                }
            }
            
            if (!$connected) {
                throw new Exception("All database connection methods failed. Please check your MySQL installation and configuration.");
            }
        }
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
