<?php
require('config.inc.php');

// file_get_contents("php://input") is use to get content from $http.post
// $http.post will send Content-Type: application/json
// so, we need to decode it first

//$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);

//$tid = $request['tid'];

session_start();

$uid = $_SESSION['uid'];


$transactions = R::find('transactions',' users_id = ' . $uid);
//$records = R::find('records',' users_id = ' . $uid);

// true is mean relational export (export with it's parent)
echo json_encode(R::exportAll($transactions,true));