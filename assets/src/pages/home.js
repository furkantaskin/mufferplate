import Swiper, { Navigation, Pagination } from 'swiper';
import { Collapse } from 'bootstrap';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

document.querySelectorAll('.prodgallery a img').forEach((e) => {
  e.parentElement.dataset.pswpWidth = e.naturalWidth;
  e.parentElement.dataset.pswpHeight = e.naturalHeight;
});

const accordionParent = document.getElementById('abilitiesFaq');

new Collapse(accordionParent, {
  toggle: false,
});

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
});

document.querySelectorAll('.prodgallery a img').forEach((e) => {
  e.parentElement.dataset.pswpWidth = e.naturalWidth;
  e.parentElement.dataset.pswpHeight = e.naturalHeight;
});

const prodGallery = new PhotoSwipeLightbox({
  gallery: '.prodgallery',
  children: 'a',
  pswpModule: () => import('photoswipe'),
});

prodGallery.init();
