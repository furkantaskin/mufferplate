import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
import { Collapse } from 'bootstrap';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Scrollbar],
  speed: 500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // ...
});

const accordionParent = document.getElementById('abilitiesFaq');

new Collapse(accordionParent, {
  toggle: false,
});
