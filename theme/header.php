<?php
define("domain", "http://$_SERVER[HTTP_HOST]/promosyonjet/theme/");

function giveAttr($file)
{
    return strval(getimagesize($file)[3]);
}

?>
<!doctype html>
<html lang="tr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="Starter kit for people">
    <title>Starter Kit</title>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="assets/css/vendors/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/pages/<?=$call_css?>.css?v=<?=rand()?>">
</head>
<body>

<header></header>