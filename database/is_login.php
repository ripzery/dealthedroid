<?php
require('config.inc.php');

session_start();

if(isset($_SESSION['logged_in'])){
    if($_SESSION['uid'] == 1){ // admin
        echo "admin";
        return;
    }else{ // user
       $user = R::load('users', $_SESSION['uid']);
        echo $user->username;
        return;
    }
}
echo "fail";

