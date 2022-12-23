import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Scrollbar],
  speed: 500,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // ...
});