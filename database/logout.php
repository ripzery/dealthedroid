<?php

session_start();
if(isset($_SESSION['logged_in'])){
    session_destroy();
    echo "success";
}else{
    echo "fail";
}
