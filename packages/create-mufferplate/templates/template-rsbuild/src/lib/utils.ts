import IMask from "imask";

export const DOMAIN = document.body.dataset.url;


export function $<
  T1 extends HTMLElement = HTMLDivElement,
  T2 extends HTMLElement = HTMLDivElement
>(selector: string, parent: Document | T2 = document) {
  return parent.querySelector<T1>(selector) as T1;
}

export function $$<
  T1 extends HTMLElement = HTMLDivElement,
  T2 extends HTMLElement = HTMLDivElement
>(
  selector: string,
  parent: Document | T2 = document
): NodeListOf<T1> {
  return parent.querySelectorAll<T1>(selector);
}

function toggleMenu(isActive: boolean) {
  if (isActive) {
    $$("'body, .mobileMenu, .menuButton, html'").forEach((e) => {
      e.classList.add('show');
    });
  } else {
    $$('body, .mobileMenu, .menuButton, html').forEach((e) => {
      e.classList.remove('show');
    });
  }
}

function resizeMenu(menu: HTMLElement) {
  menu.style.paddingTop = $('.header_sm').clientHeight * 1.5 + 'px';
}

export function mobileMenu(): void {
  let showMenu = false;
  const mobileMenu = $('.mobileMenu');
  const mainNav = $<HTMLElement>('.header_lg nav');
  const mobileNav = $<HTMLElement>('.mobileMenu nav');


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


export function applyMask(selector: string){
  IMask($(selector), {
    mask: '0 (000) 000 00 00'
  })
}