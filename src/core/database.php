<?php
class Database {
    public $conn;

    private $host = "localhost";
    private $db_name = "appdev";
    private $username = "root";
    private $password = "";

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name, 
                $this->username, 
                $this->password); 
            $this->conn->exec("set names utf8");
        } catch (PDOException $e) {
            echo "connection error: " . $e->getMessage();
        }

        return $this->conn;
    }
}
