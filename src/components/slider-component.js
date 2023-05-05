/* eslint-disable max-len */
import { blackListSlider } from '../utils/blackListSlider';
import { $Q, $Qll } from '../utils/query-selector';
import { createInterception } from '../utils/script-defer';

/**
A function that adds a script tag to the document body.
@param {string} script - The source URL of the script.
@returns {void}
*/
const addTagScript = (script) => {
  if (window.sliderScript) {
  return new Promise((resolve) => {
      resolve(true);
    })
  }

  return new Promise((resolve, reject) => {
    const scriptTag = document.createElement('script');
    scriptTag.src = script;
    scriptTag.setAttribute("id", "swiper-script");

    scriptTag.onload = () => {
      window.sliderScript = true;
      resolve(true);
    };

    scriptTag.onerror = () => {
      reject(new Error(`Failed to load script ${src}`));
    };

    const theme = $Q("#MainContent");
    theme.insertAdjacentElement('beforebegin', scriptTag);
  })

}

/**
 * Creates a slider using the Swiper library.
 * @param {Object} parent - An object containing the data necessary to build the slider.
 * @param {string} parent.slidesMobile - The number of slides to show on mobile devices.
 * @param {string} parent.slides - The number of slides to show on larger screens.
 * @param {string} parent.pagination - Whether or not to show pagination dots.
 * @param {string} parent.auto - Whether or not to automatically advance the slides.
 * @param {string} parent.speed - The time in milliseconds between automatic slide transitions.
 * @param {string} parent.script - The URL of an external script to load.
 * @param {string} parent.spacing - The amount of space between slides, in pixels.
 */
export const createSlider = (container) => {
  const PAGE_ONE = 1;
  const {
    slidesMobile,
    slides,
    pagination,
    navigation,
    auto,
    speed,
    spacing,
  } = container.dataset;

  let swiperParams = {
    slidesPerView: Number(slidesMobile),
    spaceBetween: Number(spacing),
    loop: auto === "true",
    ...((speed > 0) && {
      autoplay: {
        delay: Number(speed),
        disableOnInteraction: false,
      },
    }),
    breakpoints: {
      640: {
        slidesPerView: Number(slides) === PAGE_ONE ? Number(slides) : Number(slidesMobile) + 1,
      },
      1024: {
        slidesPerView: Number(slides),
      },
    },
  };

  if (navigation === "true") {
    swiperParams = loadNavigation(container, swiperParams);
  }

  if (pagination === "true") {
    swiperParams = loadPagination(container, swiperParams);
  }

  Object.assign(container, swiperParams);
  return container.initialize();
}

const loadPagination = (slider, params) => {
  const paginationContainer = $Q('.swiper-pagination', slider.parentNode);
  if (!paginationContainer || !params) return;

  const mutationParams = Object.assign({}, params)

  mutationParams["pagination"] = {
    el: paginationContainer,
  };

  return mutationParams;
}

const loadNavigation = (slider, params) => {
  const parent = slider.parentNode;
  if ($Qll(".swiper-button", parent).length < 2 || !params) return;
  const mutationParams = Object.assign({}, params)

  const buttonNext = $Q('.swiper-button-next', parent);
  const buttonPrev = $Q('.swiper-button-prev', parent);

  mutationParams["navigation"] = {
    nextEl: buttonNext,
    prevEl: buttonPrev,
  }

  return mutationParams;
}

/**
A function that loads sliders on a page by
creating an intersection observer for each slider container element.
@returns {void}
*/
export const loadSlider = () => {
  const dataSliders = $Qll('.slider-js');

  dataSliders.forEach((slider) => {
    if (blackListSlider(slider)) return;

    createInterception(slider,
      async () => {
        const loadScript = await addTagScript(slider.dataset.script);

        if (loadScript) {
          createSlider(slider);
        }
      },
    )
  })
}

/**
 * this script only select one slider predefine. example at doing click button
 * @param {Node} slider - node slider
 */
export const loadSliderByEvent = (slider) => {
    createInterception(slider,
      async () => {
        const loadScript = await addTagScript(slider.dataset.script);

        if (loadScript) {
          createSlider(slider);
        }
      },
    )
}
