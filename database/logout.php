<?php

session_start();

// if user is logged in then logout
if(isset($_SESSION['logged_in'])){
    session_destroy();
    echo "success";
}else{
    echo "fail";
}
