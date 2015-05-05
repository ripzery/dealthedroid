<?php
require('config.inc.php');

// file_get_contents("php://input") is use to get content from $http.post
// $http.post will send Content-Type: application/json
// so, we need to decode it first

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$tid = $request->tid;
//get all records that match current transaction
$records = R::find('records','transactions_id = ' . $tid);
echo json_encode(R::exportAll($records,true));