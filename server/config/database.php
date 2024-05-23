<?php
// server/config/database.php
class Database
{
    private $host = 'localhost';
    private $db_name = 'abyssinia_adventures';
    private $username = 'root';
    private $password = 'wonde67@AM';
    public $conn;

    public function getConnection()
    {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
