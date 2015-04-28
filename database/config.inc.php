<?php
/**
 * Created by PhpStorm.
 * User: visit
 * Date: 4/26/15 AD
 * Time: 9:06 AM
 */
require("../library/php/rb.php");

R::setup('mysql:host=localhost;dbname=dealthedroid;port=8889','root','root');

function redirect($url){
    header("Location: ". $url);
    exit();
}