<?php
require('config.inc.php');
dmp(json_encode(R::findAndExport('brand')));
echo json_encode(R::findAndExport('brand'));