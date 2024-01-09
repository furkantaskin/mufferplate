<?php

$client_ip = $_SERVER["REMOTE_ADDR"];
$server_ip = $_SERVER["SERVER_ADDR"];
$block = true;

if (($client_ip != $server_ip) && ($client_ip != '::1') && $block):
    throw new Exception("No access");
endif;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include "theme/index.php"; ?>
