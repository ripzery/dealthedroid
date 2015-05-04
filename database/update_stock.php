<?php
require('config.inc.php');

// file_get_contents("php://input") is use to get content from $http.post
// $http.post will send Content-Type: application/json
// so, we need to decode it first

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

//$item_count = count($request[0]);
$all_items = $request[0];


foreach($all_items as $update_item){
    $id = $update_item->_id;
    $mobile = R::load('android',$id);
    $mobile->quantity -= $update_item->_quantity;
    try{
        if($mobile->quantity == 0){
            R::trash($mobile);
        }else{
            R::store($mobile);
        }
    }catch(Exception $e){
        echo "fail";
        return;
//        echo "updating the stock has been failed";
    }
}
echo "success";
//echo "Stock has been updated successfully";

//$mobile = R::load('mobile',$request->_id);

//echo $mobile->model;