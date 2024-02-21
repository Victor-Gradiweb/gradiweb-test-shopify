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

/***/ "./src/components/filters-range.js":
/*!*****************************************!*\
  !*** ./src/components/filters-range.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   rangeFilters: () => (/* binding */ rangeFilters)\n/* harmony export */ });\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n\n\n/**\n *\n * we control the price range filter in order to avoid that the minimum\n * value is greater than the highest value and that the highest\n * value is not less than the lowest value\n *\n */\nfunction rangeFilters() {\n  const rangeIn = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Qll)(\".range-in input\");\n  const priceIn = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Qll)(\".price-in input\");\n  const progress = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('.slider-filter .pro');\n  const priceGap = 0;\n  rangeIn.forEach(input => {\n    if (priceIn[0].value) {\n      progress.style.left = `${priceIn[0].value / rangeIn[0].max * 10000}%`;\n      progress.style.right = `${100 - priceIn[1].value / rangeIn[1].max * 10000}%`;\n    }\n    input.addEventListener(\"input\", e => {\n      const minVal = Number(rangeIn[0].value);\n      const maxVal = Number(rangeIn[1].value);\n      if (maxVal - minVal < priceGap) {\n        if (e.target.className === \"range-min\") {\n          rangeIn[0].value = cents(maxVal - priceGap);\n        } else {\n          rangeIn[1].value = cents(minVal + priceGap);\n        }\n      } else {\n        priceIn[0].value = cents(minVal, true);\n        (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(\".range1 div\").textContent = cents(minVal, true);\n        priceIn[1].value = cents(maxVal, true);\n        (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(\".range2 div\").textContent = cents(maxVal, true);\n        progress.style.left = `${minVal / rangeIn[0].max * 100}%`;\n        progress.style.right = `${100 - maxVal / rangeIn[1].max * 100}%`;\n      }\n    });\n  });\n}\nfunction cents(str, fixed) {\n  const number = Number(str) / 100;\n  if (fixed) return number.toFixed(2);\n  return number;\n}\n(function formatValues() {\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Qll)('.price-in input').forEach(item => {\n    item.value = cents(item.value, true);\n  });\n})();\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/filters-range.js?");

/***/ }),

/***/ "./src/components/sort-by.js":
/*!***********************************!*\
  !*** ./src/components/sort-by.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   defaultSortBy: () => (/* binding */ defaultSortBy)\n/* harmony export */ });\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n\n\n// eslint-disable-next-line no-undef\nShopify.queryParams = {};\n\n/**\n * Update sort_by query parameter on select change\n */\nconst defaultSortBy = () => {\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('#sort-by').addEventListener('change', ({\n    target\n  }) => {\n    /* eslint-disable no-undef */\n    Shopify.queryParams.sort_by = target.value;\n    location.search = new URLSearchParams(Shopify.queryParams).toString();\n    /* eslint-enable no-undef */\n  });\n};\n\n/**\n * Preserve existing query parameters\n */\n// eslint-disable-next-line func-names\n(function () {\n  /* eslint-disable no-undef */\n  if (location.search.length) {\n    const params = location.search.substring(1).split('&');\n    for (let i = 0; i < params.length; i++) {\n      const keyValue = params[i].split('=');\n      if (keyValue.length) {\n        Shopify.queryParams[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);\n      }\n    }\n  }\n  /* eslint-enable no-undef */\n})();\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/sort-by.js?");

/***/ }),

/***/ "./src/templates/collection.js":
/*!*************************************!*\
  !*** ./src/templates/collection.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_collection_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/collection.scss */ \"./src/scss/collection.scss\");\n/* harmony import */ var _components_sort_by__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/sort-by */ \"./src/components/sort-by.js\");\n/* harmony import */ var _utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/toggle-dataset */ \"./src/utils/toggle-dataset.js\");\n/* harmony import */ var _components_filters_range__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/filters-range */ \"./src/components/filters-range.js\");\n\n\n\n\n(0,_components_sort_by__WEBPACK_IMPORTED_MODULE_1__.defaultSortBy)();\n(0,_components_filters_range__WEBPACK_IMPORTED_MODULE_3__.rangeFilters)();\n(0,_utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_2__.toggleDataActive)('#filter-open', '#filter', {\n  overlay: true\n});\n(0,_utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_2__.toggleDataActive)('.filter-form__name svg', '#filter', {\n  overlay: true\n});\n\n//# sourceURL=webpack://theme-base-shopify/./src/templates/collection.js?");

/***/ }),

/***/ "./src/utils/query-selector.js":
/*!*************************************!*\
  !*** ./src/utils/query-selector.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   $Q: () => (/* binding */ $Q),\n/* harmony export */   $Qll: () => (/* binding */ $Qll)\n/* harmony export */ });\n/**\n * @param {String} nodes - ClassList with DOM reference\n * @param {HTMLElement} parent - Parent of nodes\n * @returns {Array} Array of nodes in DOM\n */\nconst $Qll = (nodes,\n// eslint-disable-next-line no-undef\nparent) => [...(parent || document).querySelectorAll(nodes)];\n\n/**\n *\n * @param {HTMLElement} node - ClassName with DOM reference\n * @param {HTMLElement} parent - Parent of nodes\n * @returns {Node} Node in DOM\n */\n// eslint-disable-next-line no-undef\nconst $Q = (node, parent) => (parent || document).querySelector(node);\n\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/query-selector.js?");

/***/ }),

/***/ "./src/utils/toggle-dataset.js":
/*!*************************************!*\
  !*** ./src/utils/toggle-dataset.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dataToggle: () => (/* binding */ dataToggle),\n/* harmony export */   isActive: () => (/* binding */ isActive),\n/* harmony export */   toggleDataActive: () => (/* binding */ toggleDataActive)\n/* harmony export */ });\n/* harmony import */ var _query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-selector */ \"./src/utils/query-selector.js\");\n\n\n/**\n *\n * @param {String} id - ID from node manipulate\n * @param {Boolean} active - If modal active\n * @param {HTMLElement} node - Node to manipulate\n */\nconst overlayActions = (id, active, node) => {\n  const idOverlay = `overlay--${id}`;\n  const parent = node.parentNode;\n  if (!active) {\n    // eslint-disable-next-line no-undef\n    const overlay = document.createElement(\"div\");\n    overlay.setAttribute(\"id\", idOverlay);\n    overlay.classList.add(\"overlay\");\n    parent.insertBefore(overlay, node);\n    // eslint-disable-next-line no-use-before-define\n    toggleDataActive(`#${idOverlay}`, `#${id}`, {\n      overlay: true\n    });\n  } else {\n    parent.removeChild((0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(`#${idOverlay}`));\n  }\n};\n\n/**\n * To validate state in dataset node\n */\nconst isActive = ({\n  active\n}) => active === \"true\";\n\n/**\n* Data Toggle\n*\n* @param {HTMLElement} node - Node to manipulate\n* @param {Boolean} overlay - if used to a overlay\n*/\nfunction dataToggle(node, overlay) {\n  const {\n    dataset,\n    id\n  } = node;\n  const active = isActive(dataset);\n  if (active) {\n    dataset.active = \"false\";\n  } else {\n    dataset.active = \"true\";\n  }\n  if (overlay) overlayActions(id, active, node);\n}\n/**\n * Data Active toggle\n *\n * @param {String} control - ID button control\n * @param {String} node - ID modal\n * @param {Object} config - Object with overlay, closeSelector\n */\nconst toggleDataActive = (control, node, config = {}) => {\n  const {\n    overlay,\n    closeSelector,\n    video\n  } = config;\n  (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(control).addEventListener(\"click\", () => {\n    dataToggle((0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(node), overlay, video);\n  });\n  if (closeSelector) {\n    (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(closeSelector).addEventListener(\"click\", () => dataToggle((0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(node), overlay));\n  }\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/toggle-dataset.js?");

/***/ }),

/***/ "./src/scss/collection.scss":
/*!**********************************!*\
  !*** ./src/scss/collection.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://theme-base-shopify/./src/scss/collection.scss?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/templates/collection.js");
/******/ 	
/******/ })()
;