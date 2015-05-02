<?php

require('config.inc.php');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$mobile = R::load('android', $request->id);

$brand = $mobile->brand->name;
$model = $mobile->model;

try{
    R::trash($mobile);
}catch(Exception $e){
    echo "Error on delete " . $brand . " " . model;
}

echo $brand . " " . $model . " has been deleted successfully";