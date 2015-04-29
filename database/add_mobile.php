<?php
require('config.inc.php');

// file_get_contents("php://input") is use to get content from $http.post
// $http.post will send Content-Type: application/json
// so, we need to decode it first
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$android = R::dispense('android');
//$android->model = $_POST['model'];
//$android->brandid = $_POST['brandid'];
//$android->price = $_POST['price'];
//$android->quantity = $_POST['quantity'];


$android->model = $request->model;
$android->brandid = $request->brandid;
$android->price = $request->price;
$android->quantity = $request->quantity;

try {
   $id =  R::store($android);
}catch(Exception $e){
    echo false;
    return;
}

echo json_encode($android->export());
