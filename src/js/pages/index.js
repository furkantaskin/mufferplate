import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
import BlazeSlider from "blaze-slider";
import { Collapse } from 'bootstrap';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { mobileMenu, sendUrl } from '../lib/common';

mobileMenu();
sendUrl();

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