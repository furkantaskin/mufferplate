import Swiper, { Navigation, Pagination } from 'swiper';
import BlazeSlider from "blaze-slider";
import { Collapse } from 'bootstrap';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { mobileMenu } from '../lib/common';

mobileMenu();

const exampleBlaze = document.querySelector(".example-blaze");

new BlazeSlider(exampleBlaze, {
  all: {
    slideGap: "0px",
    slidesToShow: 1
  }
});

document.querySelectorAll('.prodgallery a img').forEach((e) => {
  e.parentElement.dataset.pswpWidth = e.naturalWidth;
  e.parentElement.dataset.pswpHeight = e.naturalHeight;
});

const accordionParent = document.getElementById('abilitiesFaq');

new Collapse(accordionParent, {
  toggle: false,
});

new Swiper('.swiper', {
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
