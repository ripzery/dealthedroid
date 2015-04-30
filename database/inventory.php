<?php
require('config.inc.php');
//R::debug(true);
$alldroids = R::findAll('android');

echo json_encode(R::exportAll($alldroids,TRUE));

//echo json_encode(R::exportAll($alldroids));
//echo json_encode(R::exportAll($brands));