<?php
require("../library/php/rb.php");


// config file for redbeanphp
R::setup('mysql:host=localhost;dbname=ripzerycom_dtd','ripzerycom_dtd','Rabarip1');

function redirect($url){
    header("Location: ". $url);
    exit();
}