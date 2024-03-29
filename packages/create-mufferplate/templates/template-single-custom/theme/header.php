<?php

include "components/define-domain.php";
include "components/svg-sprite.php";
$inline_css = false;
?>
<!doctype html>
<html lang="tr" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="Starter kit for people">
    <title>Starter Kit</title>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link media="print" onload="this.onload=null;this.removeAttribute('media');"
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700&display=swap"
        rel="stylesheet">
    <?php if ($inline_css == true): ?>
        <style>
            <?php
            $css_file = file_get_contents(domain . 'assets/css/main.css');
            echo str_replace('../', domain . 'assets/', $css_file);
            ?>
        </style>
    <?php else: ?>
        <link rel="stylesheet"
            href="<?= domain ?>assets/css/main.css<?= $_SERVER['REMOTE_ADDR'] == '::1' ? '?v=' . rand() : '' ?>">
    <?php endif; ?>
</head>

<body>

    <header class="header_lg block md:hidden">
        <div class="container">
            <nav aria-label="Main menu" id="main-nav"></nav>
        </div>
    </header>

    <header class="header_sm relative hidden md:block bg-primary z-5">
        <div class="container-lg">
            <div class="row">
                <div class="col-md-4 col-6">
                    <a href="" class="logo block">
                        <img src="<?= domain ?>assets/img/svg/logo.svg" alt="" class="block w-full">
                    </a>
                </div>
                <div class="col-md-8 col-6 flex items-center">
                    <div class="menuButton relative flex flex-col items-center justify-between">
                        <span class="block w-full"></span>
                        <span class="block w-full absolute"></span>
                        <span class="block w-full"></span>
                        <span class="block w-full"></span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div class="mobileMenu hidden md:block fixed w-screen h-screen z-4 bg-primary">
        <nav aria-label="Mobile menu" id="nav-mobile-1"></nav>
    </div>