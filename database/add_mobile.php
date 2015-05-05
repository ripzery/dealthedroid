<?php
require('config.inc.php');

// file_get_contents("php://input") is use to get content from $http.post
// $http.post will send Content-Type: application/json
// so, we need to decode it first

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//create android row and set all data

$android = R::dispense('android');
$android->model = $request->model;
$android->brand_id = $request->brandid;
$android->price = $request->price;
$android->quantity = $request->quantity;

// create relation table between mobiles and brands ( one-to-many )
$brand = R::load('brand', $android->brand_id);
$brand->ownMobileList[] = $android;

try {
    $test = R::store($brand);
    $id = R::store($android);
} catch (Exception $e) {
    echo false;
    return;
}

//export added mobile object to ajax call
echo json_encode(R::exportAll($android,true));
