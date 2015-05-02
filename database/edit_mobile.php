<?php
require('config.inc.php');

// file_get_contents("php://input") is use to get content from $http.post
// $http.post will send Content-Type: application/json
// so, we need to decode it first

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$android = R::load('android', $request->id);


//$android->model = $_POST['model'];
//$android->brand_id = $_POST['brandid'];
//$android->price = $_POST['price'];
//$android->quantity = $_POST['quantity'];
//
$android->model = $request->model;
$android->brand_id = $request->brandid;
$android->price = $request->price;
$android->quantity = $request->quantity;

if($android->brand_id != null) {
    $brand = R::load('brand', $android->brand_id);
    $brand->ownMobileList[] = $android;
}

try {
    if($brand != null)
        $test = R::store($brand);
    $id = R::store($android);
} catch (Exception $e) {
//    echo false;
    return;
}

echo json_encode(R::exportAll($android,true));
