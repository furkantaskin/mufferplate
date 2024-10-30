/*!
**********

30/10/2024
Made with mufferplate
Visit: https://github.com/furkantaskin/mufferplate

**********
!*/document.body.dataset.url;function t(e,n=document){return n.querySelector(e)}function o(e,n=document){return n.querySelectorAll(e)}function s(e){e?o("'body, .mobileMenu, .menuButton, html'").forEach(n=>{n.classList.add("show")}):o("body, .mobileMenu, .menuButton, html").forEach(n=>{n.classList.remove("show")})}function u(e){e.style.paddingTop=t(".header_sm").clientHeight*1.5+"px"}function c(){let e=!1;const n=t(".mobileMenu"),i=t(".header_lg nav"),l=t(".mobileMenu nav");t(".menuButton").addEventListener("click",()=>{e=!e,s(e)}),l.innerHTML=i.innerHTML,window.addEventListener("resize",()=>{u(n)}),u(n)}c();
