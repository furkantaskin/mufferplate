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
  loop: false,
};

/**
 *
 * @param {string} parentElem
 * @param {object} conf
 */
export function fadeSlide(parentElem, conf = {}) {
  const mergedConf = { ...initialConf, ...conf };
  const slideParent = document.getElementById(parentElem);
  if (!slideParent) {
    console.error('No element with id: ' + parentElem);
    return false;
  }
  const itemList = slideParent.querySelectorAll('.slide-item');
  const totalLength = itemList.length;

  let startX;
  let isSlideActive = false;
  let activeIndex = mergedConf.startIndex;
  let intervId = null;

  function handleSlideChange(index, getEvent = undefined) {
    if (index <= totalLength - 1 && index >= 0) {
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
        activeIndex = totalLength - 1;
      }
    }
    if (getEvent && !mergedConf.disableOnInteraction) {
      clearInterval(intervId);
      intervId = null;
      setTimeout(() => {
        startNewInterval();
      }, mergedConf.delay);
    }
    slideParent.removeEventListener('mousemove', handleMouseMove);

    if (mergedConf.pag) {
      const pagItems = slideParent.querySelectorAll('.pag-item');
      pagItems.forEach((elem, i) => {
        if (i === activeIndex) {
          elem.classList.add('active');
        } else {
          elem.classList.remove('active');
        }
      });
    }
    const slideChangeEvent = new CustomEvent('slideChange', {
      detail: {
        index: index,
        activeElem: itemList[index],
      },
    });
    slideParent.dispatchEvent(slideChangeEvent);
  }

  handleSlideChange(activeIndex);

  const slideInitEvent = new CustomEvent('slideInit', {
    detail: {
      index: activeIndex,
      activeElem: itemList[activeIndex],
    },
  });

  slideParent.dispatchEvent(slideInitEvent);

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
        if (activeIndex === 0) {
          if (!mergedConf.loop) {
            return false;
          } else {
            activeIndex = totalLength - 1;
          }
        } else {
          activeIndex -= 1;
        }
        handleSlideChange(activeIndex, e);
      }
      if (moveX < -50) {
        if (activeIndex === totalLength - 1) {
          if (!mergedConf.loop) {
            return false;
          } else {
            activeIndex = 0;
          }
        } else {
          activeIndex += 1;
        }
        handleSlideChange(activeIndex, e);
      }
    }
  }

  function handleTouchStart(e) {
    isSlideActive = true;
    startX = e.touches[0].clientX;
    slideParent.addEventListener('touchmove', handleTouchMove, {
      passive: true,
    });
  }

  function handleTouchMove(e) {
    if (isSlideActive) {
      let moveX = e.touches[0].clientX - startX;
      if (moveX > 50) {
        activeIndex -= 1;
        handleSlideChange(activeIndex, e);
        slideParent.removeEventListener('touchmove', handleTouchMove);
      }
      if (moveX < -50) {
        activeIndex += 1;
        handleSlideChange(activeIndex, e);
        slideParent.removeEventListener('touchmove', handleTouchMove);
      }
    }
  }

  function handleTouchEnd() {
    isSlideActive = false;
  }

  function startNewInterval() {
    if (intervId !== null) {
      clearInterval(intervId);
      intervId = null;
    }

    intervId = setInterval(() => {
      if (activeIndex === totalLength - 1) {
        if (!mergedConf.loop) {
          clearInterval(intervId);
          intervId = null;
        } else {
          activeIndex = 0;
        }
      } else {
        activeIndex += 1;
      }
      handleSlideChange(activeIndex);
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

  slideParent.addEventListener('touchstart', handleTouchStart, {
    passive: true,
  });
  slideParent.addEventListener('touchend', handleTouchEnd);
  slideParent.addEventListener('touchcancel', handleTouchEnd);

  if (mergedConf.nav) {
    const navNext = slideParent.querySelector(mergedConf.nextEl);
    const navPrev = slideParent.querySelector(mergedConf.prevEl);

    navNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeIndex === totalLength - 1) {
        if (!mergedConf.loop) {
          return false;
        } else {
          activeIndex = 0;
        }
      } else {
        activeIndex += 1;
      }
      handleSlideChange(activeIndex, true);
    });
    navPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeIndex === 0) {
        if (!mergedConf.loop) {
          return false;
        } else {
          activeIndex = totalLength - 1;
        }
      } else {
        activeIndex -= 1;
      }
      handleSlideChange(activeIndex, true);
    });
  }

  if (mergedConf.pag) {
    const pagEl = slideParent.querySelector(mergedConf.pagEl);
    if (!pagEl) {
      console.error(
        'No pagination element found for slide:',
        parentElem
      );
      return false;
    }
    for (let i = 0; i < totalLength; i++) {
      const pagItem = document.createElement('div');
      pagItem.classList.add('pag-item');
      pagEl.appendChild(pagItem);
    }
    const pagItems = pagEl.querySelectorAll('.pag-item');
    pagItems.forEach((elem, i) => {
      i === mergedConf.startIndex && elem.classList.add('active');
      if (mergedConf.clickablePagination) {
        elem.addEventListener('click', () => {
          activeIndex = i;
          handleSlideChange(activeIndex);
        });
      }
    });
  }

  mergedConf.autoplay && startNewInterval();
}
