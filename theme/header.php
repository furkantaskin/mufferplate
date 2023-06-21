<?php

include "components/define-domain.php";
include "components/svg-sprite.php";

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

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link media="print" onload="this.onload=null;this.removeAttribute('media');" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?=domain?>assets/css/<?=$call_css?>.css?v=<?=rand()?>">
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
                <div class="menuButton d-flex a-c">
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