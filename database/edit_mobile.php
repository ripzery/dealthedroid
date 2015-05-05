<?php
require('config.inc.php');

// file_get_contents("php://input") is use to get content from $http.post
// $http.post will send Content-Type: application/json
// so, we need to decode it first

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// load mobile by request id
$android = R::load('android', $request->id);

// set new mobile data
$android->model = $request->model;
$android->brand_id = $request->brandid;
$android->price = $request->price;
$android->quantity = $request->quantity;

// create relation 1:many if android has brandid
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
// return result to the ajax
echo $android->brand->name . " " .$android->model . " has been updated successfully.";
