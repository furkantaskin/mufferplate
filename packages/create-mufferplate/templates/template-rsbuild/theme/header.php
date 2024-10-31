<?php

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
    <title>Mufferplate</title>
    <?php if ($get_dev == "true"): ?>
        <link rel="stylesheet" href="http://localhost:3000/css/main.css">
    <?php else: ?>
        <link rel="stylesheet"
            href="<?= domain ?>assets/css/main.css<?= $_SERVER['REMOTE_ADDR'] == '::1' ? '?v=' . rand() : '' ?>">
    <?php endif; ?>
</head>

<body data-domain="<?= domain ?>">

    <header class="header_lg md:block hidden">
        <div class="container">
            <nav aria-label="Main menu"></nav>
        </div>
    </header>

    <header class="header_sm relative z-5 md:hidden block bg-black/50">
        <div class="container">
            <div class="row">
                <div class="sm:col-4 col-6">
                    <a href="" class="logo">
                        <img src="" alt="">
                    </a>
                </div>
                <div class="sm:col-8 col-6 flex items-center">
                    <div class="menuButton relative flex flex-col items-end ml-auto size-7.5">
                        <span class="block w-full relative"></span>
                        <span class="block w-full absolute"></span>
                        <span class="block w-full relative"></span>
                        <span class="block w-full relative"></span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div class="mobileMenu md:hidden block fixed size-screen z-4 bg-black/60">
        <nav aria-label="Mobile menu"></nav>
    </div>