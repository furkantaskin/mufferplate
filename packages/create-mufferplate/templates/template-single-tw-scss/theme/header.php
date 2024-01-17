<?php

include "components/define-domain.php";
include "components/svg-sprite.php";
$inline_css = false;
?>
<!doctype html>
<html lang="tr" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="Starter kit for people">
    <title>Starter Kit</title>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <?php if ($inline_css == true): ?>
        <style>
            <?php
            $css_file = file_get_contents(domain . 'assets/css/app.css');
            echo str_replace('../', domain . 'assets/', $css_file);
            ?>
        </style>
    <?php else: ?>
        <link rel="stylesheet"
            href="<?= domain ?>assets/css/app.css<?= $_SERVER['REMOTE_ADDR'] == '::1' ? '?v=' . rand() : '' ?>">
    <?php endif; ?>
</head>

<body>

    <header class="header_lg md:hidden block">
        <div class="container">
            <nav aria-label="Main menu"></nav>
        </div>
    </header>

    <header class="header_sm relative z-5 bg-primary/100 hidden md:block">
        <div class="container">
            <div class="row">
                <div class="bs-sm:col-4 col-6">
                    <a href="" class="logo">
                        <img src="<?= domain ?>assets/img/svg/logo.svg" alt="">
                    </a>
                </div>
                <div class="bs-sm:col-8 col-6 flex items-center">
                    <div class="menuButton relative flex flex-col items-end ml-auto">
                        <span class="block w-full relative"></span>
                        <span class="block w-full absolute"></span>
                        <span class="block w-full relative"></span>
                        <span class="block w-full relative"></span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div class="mobileMenu hidden md:block fixed w-screen h-screen z-4 bg-primary/100">
        <nav aria-label="Mobile menu"></nav>
    </div>