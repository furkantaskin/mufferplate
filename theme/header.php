<?php
define("domain", "http://$_SERVER[HTTP_HOST]/boilerplate/theme/");

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
    <link rel="stylesheet" href="<?=domain?>assets/css/<?=$call_file?>.css?v=<?=rand()?>">
</head>
<body>

<header></header>

<div class="mobileHeader">
    <div class="container">
        <div class="row">
            <div class="col-6">
                <a href="" class="logo">
                    <img src="<?=domain?>assets/img/svg/logo.svg" alt="">
                </a>
            </div>
            <div class="col-6">
                <div class="menuButton">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="mobileMenu"></div>