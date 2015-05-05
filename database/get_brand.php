<?php
require('config.inc.php');
//get all brands
echo json_encode(R::findAndExport('brand'));