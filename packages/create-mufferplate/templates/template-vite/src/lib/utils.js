import IMask from "imask";

export const DOMAIN = document.body.dataset.url;


export function $(selector, parent = document) {
    return parent.querySelector(selector);
}


export function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}


function toggleMenu(isActive) {
    if (isActive) {
        $$("'body, .mobileMenu, .menuButton, html'").forEach((e) => {
            e.classList.add('show');
        });
    }
    else {
        $$('body, .mobileMenu, .menuButton, html').forEach((e) => {
            e.classList.remove('show');
        });
    }
}


function resizeMenu(menu) {
    menu.style.paddingTop = $('.header_sm').clientHeight * 1.5 + 'px';
}


export function mobileMenu() {
    let showMenu = false;
    const mobileMenu = $('.mobileMenu');
    const mainNav = $('.header_lg nav');
    const mobileNav = $('.mobileMenu nav');
    $('.menuButton').addEventListener('click', () => {
        showMenu = !showMenu;
        toggleMenu(showMenu);
    });
    mobileNav.innerHTML = mainNav.innerHTML;
    window.addEventListener('resize', () => {
        resizeMenu(mobileMenu);
    });
    resizeMenu(mobileMenu);
}

export function applyMask(selector) {
    IMask($(selector), {
      mask: "0 (000) 000 00 00",
    });
  }
  