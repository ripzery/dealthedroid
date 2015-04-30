<?php
require('config.inc.php');

// file_get_contents("php://input") is use to get content from $http.post
// $http.post will send Content-Type: application/json
// so, we need to decode it first
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$brand = R::dispense('brand');
$brand->name = $request->name;


try {
    $id =  R::store($brand);
}catch(Exception $e){
    echo $e;
    echo false;
    return;
}


//echo json_encode($brand->export());
echo $id;