<?php


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// To detect Vite mode
$get_dev = json_decode(file_get_contents('./env.json'))->dev;

$directory = explode("/", $_SERVER['REQUEST_URI'])[1];
define("domain", "http://$_SERVER[HTTP_HOST]/$directory/theme/");
const temp_path = domain . "assets/img/temp/";


$includedPage = "index";

if (isset($_GET['route']) and !empty($_GET['route'])) {
    $includedPage = $_GET['route'];
}

include "theme/$includedPage.php";



