export function mobileMenu() {
  let showMenu = false;
  const mobileMenu = document.querySelector('.mobileMenu');
  function toggleMenu(isActive) {
    if (isActive) {
      document
        .querySelectorAll('body, .mobileMenu, .menuButton')
        .forEach((e) => {
          e.classList.add('show');
        });
    } else {
      document
        .querySelectorAll('body, .mobileMenu, .menuButton')
        .forEach((e) => {
          e.classList.remove('show');
        });
    }
  }

  document
    .querySelector('.menuButton')
    .addEventListener('click', () => {
      showMenu = !showMenu;
      toggleMenu(showMenu);
    });

  mobileMenu.innerHTML =
    document.querySelector('nav.navbar').innerHTML;

  mobileMenu.style.paddingTop =
    document.querySelector('.mobileHeader').clientHeight * 1.5 + 'px';
}
