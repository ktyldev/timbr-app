<?php
class Tree {
    private $conn;

    public $id;
    public $commonname;
    //public $distance;

    public function __construct($db){
        $this->conn = $db; 
    }

    public function search($postcode, $radius) {

        $sql = "call get_trees(:postcode,:radius)";

        $statement = $this->conn->prepare($sql);
        $statement->execute(array(':postcode' => $postcode, ':radius' => $radius));

        return $statement;
    }
}
?>
