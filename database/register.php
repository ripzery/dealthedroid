<?php
require('config.inc.php');

$username = $_POST['username'];
$password = $_POST['password'];
$user = R::dispense('users');

$user->username = $username;
$user->password = sha1($password);
$user->role = "user";
try{
    $id = R::store($user);
}catch(Exception $e){
    echo "Username " . $username . " is already taken.";
    return;
}

if($id != null){
    echo "User ". $user->username . " has been save successfully.";
}