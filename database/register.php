<?php
require('config.inc.php');

$username = $_POST['username'];
$password = $_POST['password'];
$user = R::dispense('users');

$user->username = $username;
$user->password = sha1($password);
$user->role = "user";
$id = R::store($user);
echo "User ". $user->username . " has been save successfully.";