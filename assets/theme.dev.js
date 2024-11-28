/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/filter-books.js":
/*!****************************************!*\
  !*** ./src/components/filter-books.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   filterBooks: () => (/* binding */ filterBooks)\n/* harmony export */ });\nconst filterBooks = () => {\n  console.log(\"hola vic\");\n  document.addEventListener(\"DOMContentLoaded\", function () {\n    const filters = document.querySelectorAll(\".cont-filters__badge\");\n    const bookCards = document.querySelectorAll(\".book-card\");\n    let activeFilters = {\n      authors: [],\n      genders: []\n    };\n\n    // Helper function to update book card visibility\n    function applyFilters() {\n      bookCards.forEach(card => {\n        const cardAuthor = card.querySelector(\".book-card__author\")?.textContent.trim();\n        const cardGenders = Array.from(card.querySelectorAll(\".book-card__gender\")).map(gender => gender.textContent.trim());\n        const matchesAuthor = activeFilters.authors.length === 0 || activeFilters.authors.includes(cardAuthor);\n        const matchesGender = activeFilters.genders.length === 0 || cardGenders.some(gender => activeFilters.genders.includes(gender));\n        card.style.display = matchesAuthor && matchesGender ? \"block\" : \"none\";\n      });\n    }\n\n    // Event listener for filter clicks\n    filters.forEach(filter => {\n      filter.addEventListener(\"click\", function () {\n        const filterName = this.closest(\".section_filters\").querySelector(\"h4\").textContent.trim();\n        const filterValue = this.textContent.trim();\n        if (filterName.includes(\"authors\")) {\n          toggleFilter(activeFilters.authors, filterValue);\n        } else if (filterName.includes(\"genders\")) {\n          toggleFilter(activeFilters.genders, filterValue);\n        }\n        applyFilters();\n      });\n    });\n\n    // Helper function to toggle filter\n    function toggleFilter(filterArray, value) {\n      const index = filterArray.indexOf(value);\n      if (index === -1) {\n        filterArray.push(value);\n      } else {\n        filterArray.splice(index, 1);\n      }\n    }\n\n    // Add \"Remove filter\" functionality\n    document.querySelectorAll(\".cont-filters__badge\").forEach(filter => {\n      if (filter.textContent.includes(\"Remove filter\")) {\n        filter.addEventListener(\"click\", function () {\n          activeFilters.authors = [];\n          activeFilters.genders = [];\n          applyFilters();\n        });\n      }\n    });\n  });\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/filter-books.js?");

/***/ }),

/***/ "./src/components/header-footer-defer.js":
/*!***********************************************!*\
  !*** ./src/components/header-footer-defer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerFooterDefer: () => (/* binding */ headerFooterDefer)\n/* harmony export */ });\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n/* harmony import */ var _utils_script_defer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/script-defer */ \"./src/utils/script-defer.js\");\n/* harmony import */ var _utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/toggle-dataset */ \"./src/utils/toggle-dataset.js\");\n/* harmony import */ var _news_letters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./news-letters */ \"./src/components/news-letters.js\");\n\n\n\n\nconst headerFooterDefer = () => {\n  const formNewLetter = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('#NewsletterForm--footer');\n  (0,_utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_2__.toggleDataActive)('#burger-nav-js', '#nav-list-js');\n  if (formNewLetter) {\n    (0,_utils_script_defer__WEBPACK_IMPORTED_MODULE_1__.createInterception)(formNewLetter, () => (0,_news_letters__WEBPACK_IMPORTED_MODULE_3__.isRegisteredUser)());\n  }\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/header-footer-defer.js?");

/***/ }),

/***/ "./src/components/news-letters.js":
/*!****************************************!*\
  !*** ./src/components/news-letters.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isRegisteredUser: () => (/* binding */ isRegisteredUser)\n/* harmony export */ });\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n/* harmony import */ var _utils_validate_customer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/validate-customer */ \"./src/utils/validate-customer.js\");\n\n\nconst isRegisteredUser = () => {\n  // eslint-disable-next-line no-undef\n  const isRegistered = (0,_utils_validate_customer__WEBPACK_IMPORTED_MODULE_1__.validateRegisterCustomer)();\n  if (isRegistered) {\n    (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('.error-js').style.display = 'block';\n    (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('input[type=\"email\"]').value = '';\n  }\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/news-letters.js?");

/***/ }),

/***/ "./src/components/sections-defer.js":
/*!******************************************!*\
  !*** ./src/components/sections-defer.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sectionsLoadDefer: () => (/* binding */ sectionsLoadDefer)\n/* harmony export */ });\n/* harmony import */ var _utils_accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/accordion */ \"./src/utils/accordion.js\");\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n/* harmony import */ var _utils_script_defer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/script-defer */ \"./src/utils/script-defer.js\");\n/* harmony import */ var _video_frame__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./video-frame */ \"./src/components/video-frame.js\");\n\n\n\n\nconst sectionsLoadDefer = () => {\n  const accordions = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.accordions');\n  const videoModal = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.video__button');\n  if (accordions) (0,_utils_script_defer__WEBPACK_IMPORTED_MODULE_2__.createInterception)(accordions, () => (0,_utils_accordion__WEBPACK_IMPORTED_MODULE_0__.openAccordion)());\n  if (videoModal) (0,_utils_script_defer__WEBPACK_IMPORTED_MODULE_2__.createInterception)(videoModal, () => (0,_video_frame__WEBPACK_IMPORTED_MODULE_3__.initVideoFrame)());\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/sections-defer.js?");

/***/ }),

/***/ "./src/components/slider-component.js":
/*!********************************************!*\
  !*** ./src/components/slider-component.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createSlider: () => (/* binding */ createSlider),\n/* harmony export */   loadNavigation: () => (/* binding */ loadNavigation),\n/* harmony export */   loadPagination: () => (/* binding */ loadPagination),\n/* harmony export */   loadSlider: () => (/* binding */ loadSlider)\n/* harmony export */ });\n/* harmony import */ var _utils_blackListSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/blackListSlider */ \"./src/utils/blackListSlider.js\");\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n/* harmony import */ var _utils_script_defer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/script-defer */ \"./src/utils/script-defer.js\");\n\n\n\n\n/**\n * Creates a slider using the Swiper library.\n * @param {Object} parent - An object containing the data necessary to build the slider.\n * @param {string} parent.slidesMobile - The number of slides to show on mobile devices.\n * @param {string} parent.slides - The number of slides to show on larger screens.\n * @param {string} parent.pagination - Whether or not to show pagination dots.\n * @param {string} parent.auto - Whether or not to automatically advance the slides.\n * @param {string} parent.speed - The time in milliseconds between automatic slide transitions.\n * @param {string} parent.script - The URL of an external script to load.\n * @param {string} parent.spacing - The amount of space between slides, in pixels.\n */\nconst createSlider = container => {\n  const PAGE_ONE = 1;\n  const {\n    slidesMobile,\n    slides,\n    pagination,\n    navigation,\n    auto,\n    speed,\n    spacing\n  } = container.dataset;\n  let swiperParams = {\n    slidesPerView: Number(slidesMobile),\n    spaceBetween: Number(spacing),\n    loop: auto === 'true',\n    ...(speed > 0 && {\n      autoplay: {\n        delay: Number(speed),\n        disableOnInteraction: false\n      }\n    }),\n    breakpoints: {\n      640: {\n        slidesPerView: Number(slides) === PAGE_ONE ? Number(slides) : Number(slidesMobile) + 1\n      },\n      1024: {\n        slidesPerView: Number(slides)\n      }\n    }\n  };\n  if (navigation === 'true') {\n    swiperParams = loadNavigation(container, swiperParams);\n  }\n  if (pagination === 'true') {\n    swiperParams = loadPagination(container, swiperParams);\n  }\n  Object.assign(container, swiperParams);\n  return container.initialize();\n};\n\n/**\n * Mount pagination config\n * @param {HTMLElement} slider - Slider element, swiper will initialized\n * @param {Object} params - Swiper params - configuration to initialized slider\n * @returns {Object} - New params with pagination\n */\nconst loadPagination = (slider, params) => {\n  const paginationContainer = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.swiper-pagination', slider.parentNode);\n  if (!paginationContainer || !params) return;\n  const mutationParams = Object.assign({}, params);\n  mutationParams.pagination = {\n    el: paginationContainer\n  };\n  return mutationParams;\n};\n\n/**\n * Mount navigation config\n * @param {HTMLElement} slider - Slider element, swiper will initialized\n * @param {Object} params - Swiper params - configuration to initialized slider\n * @returns {Object} - New params with navigation\n */\nconst loadNavigation = (slider, params) => {\n  const parent = slider.parentNode;\n  if ((0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Qll)('.swiper-button', parent).length < 2 || !params) return;\n  const mutationParams = Object.assign({}, params);\n  const buttonNext = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.swiper-button-next', parent);\n  const buttonPrev = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.swiper-button-prev', parent);\n  mutationParams.navigation = {\n    nextEl: buttonNext,\n    prevEl: buttonPrev\n  };\n  return mutationParams;\n};\n\n/**\n * A function that loads sliders on a page by\n * creating an intersection observer for each slider container element.\n * @returns {void}\n */\nconst loadSlider = () => {\n  const dataSliders = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Qll)('.slider-js');\n  dataSliders.forEach(slider => {\n    if ((0,_utils_blackListSlider__WEBPACK_IMPORTED_MODULE_0__.blackListSlider)(slider)) return;\n    (0,_utils_script_defer__WEBPACK_IMPORTED_MODULE_2__.createInterception)(slider, () => createSlider(slider));\n  });\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/slider-component.js?");

/***/ }),

/***/ "./src/components/video-frame.js":
/*!***************************************!*\
  !*** ./src/components/video-frame.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initVideoFrame: () => (/* binding */ initVideoFrame),\n/* harmony export */   resetVideo: () => (/* binding */ resetVideo)\n/* harmony export */ });\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n/* harmony import */ var _utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toggle-dataset */ \"./src/utils/toggle-dataset.js\");\n\n\n\n/**\n * Reset re-render DOM\n * @param {HTMLElement} modal - node content video frame\n */\nfunction resetVideo(modal) {\n  console.log('reset');\n  const wrapper = modal;\n  wrapper.innerHTML = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('.video__modal-wrapper', modal).outerHTML;\n}\n\n/**\n * Init video section by id\n */\nconst initVideoFrame = () => {\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Qll)('.video__button').forEach(button => {\n    const {\n      dataset: {\n        section\n      }\n    } = button;\n    (0,_utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_1__.toggleDataActive)(`#play-button-${section}-js`, `#modal-video-${section}-js`, {\n      overlay: true,\n      closeSelector: '.video__close'\n    });\n  });\n  document.addEventListener('keydown', event => {\n    if (event.code === 'Escape') {\n      const modal = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('.video__modal');\n      if (modal.dataset.active === 'true') {\n        (0,_utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_1__.dataToggle)(modal, true);\n      }\n    }\n  });\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/video-frame.js?");

/***/ }),

/***/ "./src/components/window.js":
/*!**********************************!*\
  !*** ./src/components/window.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n/* harmony import */ var _utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toggle-dataset */ \"./src/utils/toggle-dataset.js\");\n\n\n\n/**\n * Init resource windows\n * @param {{ control: string, target: string }} params - Init parametres\n * @param {String} params.control - Reference controller the open modal window\n * @param {String} params.target - Reference of the modal window\n */\nconst initWindows = ({\n  control,\n  target\n}) => {\n  windowsToggle(target);\n  (0,_utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_1__.toggleDataActive)(control, target, {\n    overlay: true,\n    closeSelector: '.window-close-js'\n  });\n};\n\n/**\n * Action on click item window\n *\n * @param {HTMLElement} scope - scope or parent target\n */\nconst windowsToggle = scope => {\n  const parentNode = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(scope);\n  const itemToggle = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Qll)('.window-item-js', parentNode);\n  const layerItems = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Qll)('.window-layer-close-js', parentNode);\n  itemToggle.forEach(item => item.addEventListener('click', () => {\n    item.setAttribute('data-active', 'true');\n  }));\n  layerItems.forEach(layeritem => {\n    layeritem.addEventListener('click', () => {\n      const layer = layeritem.closest('.window-layer-js');\n      if (!layer) return null;\n      const sibling = layer.previousElementSibling;\n      sibling.setAttribute('data-active', 'false');\n    });\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initWindows);\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/window.js?");

/***/ }),

/***/ "./src/templates/index.js":
/*!********************************!*\
  !*** ./src/templates/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ \"./src/scss/main.scss\");\n/* harmony import */ var _components_slider_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/slider-component */ \"./src/components/slider-component.js\");\n/* harmony import */ var _components_header_footer_defer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/header-footer-defer */ \"./src/components/header-footer-defer.js\");\n/* harmony import */ var _components_sections_defer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/sections-defer */ \"./src/components/sections-defer.js\");\n/* harmony import */ var _components_window__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/window */ \"./src/components/window.js\");\n/* harmony import */ var _components_filter_books__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/filter-books */ \"./src/components/filter-books.js\");\n\n\n\n\n\n\n(0,_components_header_footer_defer__WEBPACK_IMPORTED_MODULE_2__.headerFooterDefer)();\n(0,_components_slider_component__WEBPACK_IMPORTED_MODULE_1__.loadSlider)();\n(0,_components_sections_defer__WEBPACK_IMPORTED_MODULE_3__.sectionsLoadDefer)();\n(0,_components_filter_books__WEBPACK_IMPORTED_MODULE_5__[\"default\"])();\n(0,_components_window__WEBPACK_IMPORTED_MODULE_4__[\"default\"])({\n  control: \"#burger-nav-js\",\n  target: \"#nav-list-movil-js\"\n});\n\n//# sourceURL=webpack://theme-base-shopify/./src/templates/index.js?");

/***/ }),

/***/ "./src/utils/accordion.js":
/*!********************************!*\
  !*** ./src/utils/accordion.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeAll: () => (/* binding */ closeAll),\n/* harmony export */   openAccordion: () => (/* binding */ openAccordion)\n/* harmony export */ });\n/* harmony import */ var _query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-selector */ \"./src/utils/query-selector.js\");\n/* harmony import */ var _toggle_dataset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toggle-dataset */ \"./src/utils/toggle-dataset.js\");\n\n\n\n/**\n * Loop to change all dataset active in button accordions\n *\n * @param {String} nodeAll - Reference to search in parent element\n * @param {HTMLElement} parent - Parent to valuate\n * @returns Action to change dataset active to 'false' at all buttons\n */\nfunction closeAll(nodeAll, parent) {\n  return (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Qll)(nodeAll, parent).forEach(node => {\n    // eslint-disable-next-line no-param-reassign\n    node.children[0].dataset.active = 'false';\n  });\n}\n\n/**\n * Accordion Action\n * This function change the dataset active in\n * button element accordion (on click event)\n *\n * @param {HTMLElement} element - Button to change data active\n * @param {NodeListOf} accordions - All accordions in DOM\n */\nfunction accordionAction(element, accordions) {\n  const EXIST_CLASS = element.classList.contains('accordion-item__button');\n  if (accordions.dataset.toggle === 'true' && EXIST_CLASS) {\n    closeAll('.accordion-item', accordions);\n  }\n  (0,_toggle_dataset__WEBPACK_IMPORTED_MODULE_1__.dataToggle)(element);\n}\n\n/**\n * Open accordion\n * This function valuate all nodes with the class\n * \".accordions\" and add new event listener\n */\nfunction openAccordion() {\n  (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Qll)('.accordions').forEach(accordion => {\n    (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Qll)('.accordion-item__button', accordion).forEach(item => {\n      item.addEventListener('click', () => {\n        accordionAction(item, accordion);\n      });\n    });\n  });\n}\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/accordion.js?");

/***/ }),

/***/ "./src/utils/blackListSlider.js":
/*!**************************************!*\
  !*** ./src/utils/blackListSlider.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   blackListSlider: () => (/* binding */ blackListSlider)\n/* harmony export */ });\n/* add class selectors or id, parents, of the slider you want to ignore.\nnote that it must be the parent closest to your slider.\nThese sliders will be ignored when loading general\nsliders, or those you want to add via a click event. */\n\nconst parentSliderIgnore = ['#upsell-js', '.other'];\n\n// eslint-disable-next-line max-len\nconst blackListSlider = slider => parentSliderIgnore.some(exception => slider.closest(exception));\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/blackListSlider.js?");

/***/ }),

/***/ "./src/utils/query-selector.js":
/*!*************************************!*\
  !*** ./src/utils/query-selector.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   $Q: () => (/* binding */ $Q),\n/* harmony export */   $Qll: () => (/* binding */ $Qll)\n/* harmony export */ });\n/**\n * @param {String} nodes - ClassList with DOM reference\n * @param {HTMLElement} parent - Parent of nodes\n * @returns {Array} Array of nodes in DOM\n */\nconst $Qll = (nodes, parent) => [...(parent || document).querySelectorAll(nodes)];\n\n/**\n *\n * @param {HTMLElement} node - ClassName with DOM reference\n * @param {HTMLElement} parent - Parent of nodes\n * @returns {Node} Node in DOM\n */\nconst $Q = (node, parent) => (parent || document).querySelector(node);\n\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/query-selector.js?");

/***/ }),

/***/ "./src/utils/script-defer.js":
/*!***********************************!*\
  !*** ./src/utils/script-defer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createInterception: () => (/* binding */ createInterception)\n/* harmony export */ });\n/**\n * This function detects, by means of the observer,\n * the interception with the slider,\n * to load it, and then disconnects the observer for the corresponding element.\n * @param {Node} entries - element node html, container slider\n * @param {Event} observer - observer event\n * @param {Function} callback - function callback start slider\n */\nconst executeInterception = (entries, observer, params) => entries.forEach(entry => {\n  if (entry.isIntersecting) {\n    params.callback();\n    if (params.unobserve) {\n      observer.unobserve(entry.target);\n    }\n  }\n});\n\n/**\n * Creates the interceptor for the node\n * indicated in the parameter indicated as slide\n * @param {Node} element - element container slider\n * @param {Function} callback - callback init slider\n */\nconst createInterception = (element, callback, options = {\n  root: null,\n  rootMargin: '120px',\n  unobserve: true\n}) => {\n  const optionsRoot = options;\n  const unobserve = options.unobserve || false;\n  delete optionsRoot.unobserve;\n  const intersectionObserver = new IntersectionObserver((entries, observer) => executeInterception(entries, observer, {\n    callback,\n    unobserve\n  }), optionsRoot);\n  intersectionObserver.observe(element);\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/script-defer.js?");

/***/ }),

/***/ "./src/utils/toggle-dataset.js":
/*!*************************************!*\
  !*** ./src/utils/toggle-dataset.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dataToggle: () => (/* binding */ dataToggle),\n/* harmony export */   isActive: () => (/* binding */ isActive),\n/* harmony export */   toggleDataActive: () => (/* binding */ toggleDataActive)\n/* harmony export */ });\n/* harmony import */ var _query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-selector */ \"./src/utils/query-selector.js\");\n\n\n/**\n *\n * @param {String} id - ID from node manipulate\n * @param {Boolean} active - If modal active\n * @param {HTMLElement} node - Node to manipulate\n */\nconst overlayActions = (id, active, node) => {\n  const idOverlay = `overlay--${id}`;\n  const parent = node.parentNode;\n  if (!active) {\n    // eslint-disable-next-line no-undef\n    const overlay = document.createElement('div');\n    overlay.setAttribute('id', idOverlay);\n    overlay.classList.add('overlay');\n    parent.insertBefore(overlay, node);\n    // eslint-disable-next-line no-use-before-define\n    toggleDataActive(`#${idOverlay}`, `#${id}`, {\n      overlay: true\n    });\n  } else {\n    parent.removeChild((0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(`#${idOverlay}`));\n  }\n};\n\n/**\n * To validate state in dataset node\n */\nconst isActive = ({\n  active\n}) => active === 'true';\n\n/**\n* Data Toggle\n*\n* @param {HTMLElement} node - Node to manipulate\n* @param {Boolean} overlay - if used to a overlay\n*/\nfunction dataToggle(node, overlay) {\n  const {\n    dataset,\n    id\n  } = node;\n  const active = isActive(dataset);\n  if (active) {\n    dataset.active = 'false';\n  } else {\n    dataset.active = 'true';\n  }\n  if (overlay) overlayActions(id, active, node);\n}\n/**\n * Data Active toggle\n *\n * @param {String} control - ID button control\n * @param {String} node - ID modal\n * @param {Object} config - Object with overlay, closeSelector\n */\nconst toggleDataActive = (control, node, config = {}) => {\n  const {\n    overlay,\n    closeSelector,\n    video\n  } = config;\n  const controlNode = (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(control);\n  const elementActive = (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(node);\n  const closeNode = (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(closeSelector);\n  if (!controlNode || !elementActive) return;\n  controlNode.addEventListener('click', () => {\n    dataToggle(elementActive, overlay, video);\n  });\n  if (closeNode) {\n    closeNode.addEventListener('click', () => dataToggle(elementActive, overlay));\n  }\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/toggle-dataset.js?");

/***/ }),

/***/ "./src/utils/validate-customer.js":
/*!****************************************!*\
  !*** ./src/utils/validate-customer.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validateRegisterCustomer: () => (/* binding */ validateRegisterCustomer)\n/* harmony export */ });\nconst validateRegisterCustomer = () => {\n  // eslint-disable-next-line no-undef\n  const queryUrl = window.location.href;\n  return queryUrl.includes('form_type=customer');\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/validate-customer.js?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://theme-base-shopify/./src/scss/main.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/templates/index.js");
/******/ 	
/******/ })()
;