<?php
require('config.inc.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
//$username = $_POST['username'];
//$password = $_POST['password'];

$user = R::findOne('users', ' username = :username AND password = :password ',
    array(
        ':username' => $request->username,
        ':password' => sha1($request->password)
    )
);

if($user){
    session_start();

    $_SESSION['uid'] = $user->id;
    $_SESSION['logged_in'] = true;

    echo $user->role;
}else{
    echo false;
}