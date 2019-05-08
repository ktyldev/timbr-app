<?php

header("access-control-allow-origin: *");

include_once '../core/database.php';
include_once '../core/tree.php';

$database = new Database();
$db = $database->getConnection();

$tree = new Tree($db);

$vote = $_POST['vote'];
$id = $_POST['id'];

$statement = $tree->vote($id, $vote);
$count = $statement->rowCount();

if ($count > 0) {
    http_response_code(200);

    echo "vote successfully cast";
} else {
    http_response_code(400);

    echo "failed to cast vote";
}

?>
