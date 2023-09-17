<?php

include "components/define-domain.php";
include "components/svg-sprite.php";

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
    <link rel="stylesheet" href="<?= domain ?>assets/css/<?= $call_css ?>.css?v=<?= rand() ?>">
    <script>
        let getIndex=1;function $(a){return document.querySelector(a)}function loopMenu(a){let e;if(getIndex===1)e=$(`#nav-mobile-${getIndex}`);else{e=document.createElement("nav"),e.setAttribute("aria-label",`Mobile menu ${getIndex}`),e.setAttribute("id",`nav-mobile-${getIndex}`),$(".mobileMenu").appendChild(e),e.style.paddingTop=$(".header_sm").clientHeight*1.5+"px";let t=document.createElement("button");t.classList.add("close"),t.textContent="Kapat",t.dataset.target=`#${e.getAttribute("id")}`,e.appendChild(t)}a.forEach(t=>{let n=document.createElement("a");n.textContent=t.name,t.isActive&&n.classList.add("active"),n.setAttribute("href",t.url),e.appendChild(n),t.submenu&&(n.classList.add("submenu"),getIndex++,n.dataset.target=`#nav-mobile-${getIndex}`,loopMenu(t.submenu.menus))})}var getData;fetch("theme/menuList.json").then(a=>a.json()).then(a=>{loopMenu(a.menus),document.querySelectorAll(".mobileMenu .submenu").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),$(`${e.dataset.target}`).setAttribute("class","show")})}),document.querySelectorAll(".mobileMenu button.close").forEach(e=>{e.addEventListener("click",t=>{$(`${e.dataset.target}`).removeAttribute("class")})})}).catch(a=>console.log("Error happened",a));
    </script>
</head>

<body>

    <header class="header_lg">
        <div class="container">
            <nav aria-label="Main menu" id="main-nav"></nav>
        </div>
    </header>

    <header class="header_sm">
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <a href="" class="logo">
                        <img src="<?= domain ?>assets/img/svg/logo.svg" alt="">
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
    </header>

    <div class="mobileMenu">
        <nav aria-label="Mobile menu" id="nav-mobile-1"></nav>
    </div>