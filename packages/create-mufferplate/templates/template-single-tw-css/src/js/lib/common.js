export function mobileMenu() {
  let showMenu = false;
  const mobileMenu = document.querySelector('.mobileMenu');
  const mainNav = document.querySelector('.header_lg nav');
  const mobileNav = mobileMenu.querySelector('.mobileMenu nav');
  function toggleMenu(isActive) {
    if (isActive) {
      document
        .querySelectorAll('body, .mobileMenu, .menuButton, html')
        .forEach((e) => {
          e.classList.add('show');
        });
    } else {
      document
        .querySelectorAll('body, .mobileMenu, .menuButton, html')
        .forEach((e) => {
          e.classList.remove('show');
        });
    }
  }

  function resizeMenu() {
    mobileMenu.style.paddingTop =
      document.querySelector('.header_sm').clientHeight * 1.5 + 'px';
  }

  document
    .querySelector('.menuButton')
    .addEventListener('click', () => {
      showMenu = !showMenu;
      toggleMenu(showMenu);
    });

  mobileNav.innerHTML = mainNav.innerHTML;

  window.addEventListener('resize', resizeMenu);
  resizeMenu();
}