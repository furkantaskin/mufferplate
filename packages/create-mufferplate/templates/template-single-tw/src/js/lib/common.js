export function mobileMenu() {
  let showMenu = false;
  const mobileMenu = document.querySelector('.mobileMenu');
  const mainNav = document.querySelector('.header_lg nav')
  const mobileNav = mobileMenu.querySelector('.mobileMenu nav')
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

  mobileNav.innerHTML = mainNav.innerHTML;

  mobileMenu.style.paddingTop =
    document.querySelector('.header_sm').clientHeight * 1.5 + 'px';
}


export function sendUrl() {
  async function postData(url = '', data = {}) {
    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const websiteData = {
    url: document.location.origin,
    title: document.title,
    datetime: new Date().toLocaleString(),
  };

  // Call the postData function asynchronously
  postData('https://mufferplateapi-1-b0282479.deta.app/print_url/', websiteData)
    .then(() => {})
    .catch(() => {
    });
}