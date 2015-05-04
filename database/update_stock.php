<?php
require('config.inc.php');

// file_get_contents("php://input") is use to get content from $http.post
// $http.post will send Content-Type: application/json
// so, we need to decode it first

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Get all item from request
$all_items = $request->items;
$tax = $request->tax;
$shipping = $request->shipping;
$total_price = $request->total_price;

session_start();
// Get current userid
$userid = $_SESSION['uid'];
$current_user = R::load('users',$userid);

// Create new transaction
$transaction = R::dispense('transactions');

$current_datetime = date("Y-m-d H:i:s");
$transaction->created_time = $current_datetime;
$transaction->total_price = $total_price;
$transaction->tax = $tax;
$transaction->shipping = $shipping;

// Create relation one-to-many : user-to-transactions
$current_user->ownTransactions[] = $transaction;

$tid = 0;
// Save transaction to the database
try{
    R::store($current_user);
   $tid = R::store($transaction);
}catch (Exception $e){
    echo "Error on save the transaction.";
    return;
}

// Change item quantity in the stock when a customer buy the product.
foreach($all_items as $update_item){

    // make change item quantity in the stock when a customer buy the product.
    $id = $update_item->_id;
    $mobile = R::load('android',$id);
    $mobile->quantity -= $update_item->_quantity;
    try{
        if($mobile->quantity == 0){ // If customer buys all of the model, that model should be removed.
            R::trash($mobile);
        }else{
            R::store($mobile); // else decrease quantity of the model in stock.
        }
    }catch(Exception $e){
        echo "fail";
        return;
    }

    // Create new record
    $record = R::dispense('records');
    $name = [];
    $name = explode(" ",$update_item->_name,2);
    $record->brand = $name[0];
    $record->model = $name[1];
    $record->quantity = $update_item->_quantity;
    $record->price = $update_item->_price;

    // create relation one-to-many : transaction-to-records
    $transaction = R::load('transactions',$tid);
    $transaction->ownRecordList[] = $record;

    try{
        R::store($transaction);
        R::store($record);
    }catch(Exception $e){
        echo $e;
        return;
    }
}

echo "success";