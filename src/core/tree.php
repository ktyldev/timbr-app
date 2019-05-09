<?php
class Tree {
    private $conn;

    public function __construct($db){
        $this->conn = $db; 
    }

    public function search($postcode, $radius) {

        $sql = "call get_trees(:postcode,:radius)";

        $statement = $this->conn->prepare($sql);
        $statement->execute(array(':postcode' => $postcode, ':radius' => $radius));

        return $statement;
    }

    public function vote($id, $vote) {
        $sql = "call vote(:id,:vote)"; 

        $statement = $this->conn->prepare($sql);
        $statement->execute(array(':id' => $id, ':vote' => $vote));

        return $statement;
    }
}
?>
