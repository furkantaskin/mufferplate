<?php
$directory = explode("/", $_SERVER['REQUEST_URI'])[1];
define("domain", "http://$_SERVER[HTTP_HOST]/$directory/theme/");
?>