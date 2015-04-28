<?php
require('config.inc.php');
//$data = json_decode(file_get_contents("database://input"));
$username = $_POST['username'];
$password = $_POST['password'];

$user = R::findOne('users', ' username = :username AND password = :password ',
    array(
        ':username' => $username,
        ':password' => sha1($password)
    )
);

if($user){
    session_start();

    $_SESSION['uid'] = $user->id;
    $_SESSION['logged_in'] = true;
    echo true;
}else{
    echo false;
}