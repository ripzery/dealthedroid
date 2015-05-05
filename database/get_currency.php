<?php

require('config.inc.php');

// file_get_contents("php://input") is use to get content from $http.post
// $http.post will send Content-Type: application/json
// so, we need to decode it first

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Check request value and take request to web services
if($request->currency == "TH-baht"){
    $from_currency = "USD";
    $to_currency = "THB";
}else{
    $from_currency = "THB";
    $to_currency = "USD";
}

$url = "http://www.webservicex.net/CurrencyConvertor.asmx/ConversionRate?FromCurrency=". $from_currency . "&ToCurrency=" .$to_currency;

$doc = new DOMDocument();
$doc->load($url);
$doc->saveXML();

$currency = $doc->firstChild->firstChild->textContent;

// return result to ajax
echo $currency;