/**
 * @typedef {object} FadeSlideConf
 * @property {boolean} autoplay
 * @property {number} delay
 * @property {boolean} disableOnInteraction
 * @property {boolean} nav
 * @property {string} nextEl
 * @property {string} prevEl
 * @property {boolean} pag
 * @property {string} pagEl
 * @property {number} startIndex
 */

const initialConf = {
    autoplay: true,
    delay: 2000,
    disableOnInteraction: false,
    nav: false,
    nextEl: '.slide-nav .next',
    prevEl: '.slide-nav .prev',
    pag: false,
    pagEl: '.slide-pag',
    startIndex: 0,
    clickablePagination: false,
  };
  
  /**
   *
   * @param {string} parentElem
   * @param {FadeSlideConf} conf
   */
  export function fadeSlide(parentElem, conf = {}) {
    const mergedConf = { ...initialConf, ...conf };
    const slideParent = document.getElementById(parentElem);
    const itemList = slideParent.querySelectorAll('.slide-item');
  
    /** @type {number} */
    let startX;
    let isSlideActive = false;
    let activeIndex = 0;
    let intervId = null;
  
    function handleSlideChange(index, getEvent = undefined) {
      if (index <= itemList.length - 1 && index >= 0) {
        itemList.forEach((elem, i) => {
          if (i === index) {
            elem.classList.add('active');
          } else {
            elem.classList.remove('active');
          }
        });
      } else {
        if (index < 0) {
          activeIndex = 0;
        } else {
          clearInterval(intervId);
          intervId = null;
          activeIndex = itemList.length - 1;
        }
      }
      if (getEvent && !mergedConf.disableOnInteraction) {
        setTimeout(() => {
          clearInterval(intervId);
          intervId = null;
          startNewInterval();
        }, 3000);
      }
      slideParent.removeEventListener('mousemove', handleMouseMove);
      
      if(mergedConf.pag){
        const pagItems = slideParent.querySelectorAll('.pag-item');
        pagItems.forEach((elem, i) => {
          if(i === activeIndex){
            elem.classList.add('active');
          }else{
            elem.classList.remove('active');
          }
        });
      }
  
    }
  
    handleSlideChange(activeIndex);
  
    function handleMouseDown(e) {
      isSlideActive = true;
      startX = e.clientX;
      slideParent.addEventListener('mousemove', handleMouseMove);
    }
  
    function handleMouseLeave() {
      isSlideActive = false;
    }
  
    function handleMouseUp() {
      isSlideActive = false;
    }
  
    function handleMouseMove(e) {
      if (isSlideActive) {
        let moveX = e.clientX - startX;
        if (moveX > 50) {
          activeIndex -= 1;
          handleSlideChange(activeIndex, e);
        }
        if (moveX < -50) {
          activeIndex += 1;
          handleSlideChange(activeIndex, e);
        }
      }
    }
  
    function startNewInterval() {
      if (intervId !== null) {
        clearInterval(intervId);
        intervId = null;
      }
  
      intervId = setInterval(() => {
        activeIndex += 1;
        handleSlideChange(activeIndex);
        if (activeIndex === itemList.length - 1) {
          clearInterval(intervId);
          intervId = null;
        }
      }, mergedConf.delay);
    }
  
    slideParent.removeEventListener('mousedown', handleMouseDown);
    slideParent.removeEventListener('mouseleave', handleMouseLeave);
    slideParent.removeEventListener('mouseup', handleMouseUp);
    slideParent.removeEventListener('mousemove', handleMouseMove);
  
    slideParent.addEventListener('mousedown', handleMouseDown);
    slideParent.addEventListener('mouseleave', handleMouseLeave);
    slideParent.addEventListener('mouseup', handleMouseUp);
    itemList.forEach((elem) => {
      elem.addEventListener('mousedown', (e) => {
        e.preventDefault();
        return false;
      });
    });
    slideParent.addEventListener('mousemove', handleMouseMove);
  
    if (mergedConf.nav) {
      const navNext = slideParent.querySelector(mergedConf.nextEl);
      const navPrev = slideParent.querySelector(mergedConf.prevEl);
  
      navNext.addEventListener('click', () => {
        activeIndex +=  1;
        handleSlideChange(activeIndex);
      });
      navPrev.addEventListener('click', () => {
        activeIndex -= 1;
        handleSlideChange(activeIndex);
      });
    }
  
    if(mergedConf.pag){
      const pagEl = slideParent.querySelector(mergedConf.pagEl);
      for(let i = 0; i < itemList.length; i++){
        const pagItem = document.createElement('div');
        pagItem.classList.add('pag-item');
        pagEl.appendChild(pagItem);
      }
      const pagItems = pagEl.querySelectorAll('.pag-item');
      pagItems.forEach((elem, i) => {
        i === mergedConf.startIndex && elem.classList.add('active');
        if(mergedConf.clickablePagination){
          elem.addEventListener('click', () => {
            activeIndex = i;
            handleSlideChange(activeIndex);
          });
        }
      });
    }
  
    mergedConf.autoplay && startNewInterval();
  }
  