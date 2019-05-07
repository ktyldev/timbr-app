<?php

// required headers
header("access-control-allow-origin: *");
header("content-type: application/json; charset=utf-8");

include_once './database.php';
include_once './tree.php';

$database = new Database();
$db = $database->getConnection();

$tree = new Tree($db);

$statement = $tree->search("nw10ab", 50);
$count = $statement->rowCount();

if ($count > 0) {
    $trees=array();
    $trees["trees"]=array();

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

        $tree_item=array(
            "id"            => $row['id'],
            "commonname"    => $row['commonname'],
            "distance"      => $row['distance']
        );

        array_push($trees["trees"], $tree_item);
    }

    http_response_code(200);

    echo json_encode($trees);
} else {
    http_response_code(404);

    echo json_encode(
        array("message" => "no trees found")
    );
}

?>
