<?php

// required headers
header("access-control-allow-origin: *");
header("content-type: application/json; charset=utf-8");

include_once '../core/database.php';
include_once '../core/tree.php';

$database = new Database();
$db = $database->getConnection();

$tree = new Tree($db);

$postcode = $_GET['postcode'];
$radius = $_GET['radius'];
// TODO: validate input

//$statement = $tree->search("nw10ab", 50);
$statement = $tree->search($postcode, $radius);
$count = $statement->rowCount();

if ($count > 0) {
    $trees=array();
    $trees["count"]=$count;
    $trees["trees"]=array();

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

        $tree_item=array(
            "id"                => $row['id'],
            "scientificname"    => $row['scientificname'],
            "commonname"        => $row['commonname'],
            "distance"          => $row['distance'],
            "pollution"         => $row['pollutionremoval'],
            "rating"            => $row['rating']
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
