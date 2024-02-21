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

/***/ "./src/components/form-addresses.js":
/*!******************************************!*\
  !*** ./src/components/form-addresses.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_numeric_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/numeric-validation */ \"./src/utils/numeric-validation.js\");\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n\n\n\n/**\n * Handle form events\n * @param {String} eventType\n * @param {String} id\n * @returns {Function}\n */\nconst eventHandler = currents => {\n  currents.forEach(current => {\n    const [{\n      dataset\n    }, isEdit = false] = current;\n    if (isEdit) {\n      dataset.active = true;\n    } else {\n      dataset.active = false;\n    }\n  });\n};\nconst addressForm = (form, parentNode, isCancel = false) => {\n  if (!form) return null;\n  const formById = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)(`.address__edit[data-form=\"${form}\"]`);\n  const detailsById = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)(`.address__detail[data-form=\"${form}\"]`);\n  if (isCancel) {\n    const actionsById = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)(`.address__actions[data-form=\"${form}\"]`);\n    return eventHandler([[formById], [detailsById, true], [actionsById, true]]);\n  }\n  return eventHandler([[formById, true], [detailsById], [parentNode]]);\n};\n\n/**\n * Event handler form Addresses\n * @param {String} ev event\n */\nconst clickFormAddresse = ev => {\n  const {\n    target\n  } = ev;\n  const {\n    parentNode,\n    nextElementSibling,\n    dataset: {\n      event,\n      form\n    }\n  } = target;\n  const actions = {\n    edit: () => addressForm(form, parentNode),\n    new: () => eventHandler([[nextElementSibling, true], [target]]),\n    cancel: () => {\n      if (form) {\n        return addressForm(form, null, true);\n      }\n      return eventHandler([[parentNode], [(0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)(`.address-js[data-event=\"new\"]`), true]]);\n    }\n  };\n  return actions[event]();\n};\n\n/**\n * Open address edit form\n */\n(function initAdresses() {\n  if ((0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Qll)('.address-js').length === 0) return;\n  const buttonEdit = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Qll)('.address-js');\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('input[type=number]').addEventListener('input', _utils_numeric_validation__WEBPACK_IMPORTED_MODULE_0__.forceNumeric);\n  buttonEdit.forEach(button => {\n    button.addEventListener('click', e => {\n      clickFormAddresse(e);\n    });\n  });\n})();\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/form-addresses.js?");

/***/ }),

/***/ "./src/templates/customer.js":
/*!***********************************!*\
  !*** ./src/templates/customer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_customer_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/customer.scss */ \"./src/scss/customer.scss\");\n/* harmony import */ var _components_form_addresses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/form-addresses */ \"./src/components/form-addresses.js\");\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n\n\n\nconst toggleContainer = (elementShow, elementhidden) => {\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_2__.$Q)(elementShow).dataset.active = true;\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_2__.$Q)(elementhidden).dataset.active = false;\n};\n(function recoverToggle() {\n  if (!(0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_2__.$Q)('#display-recover')) return;\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_2__.$Q)('#display-recover').addEventListener('click', () => toggleContainer('#recover-container', '#login-container'));\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_2__.$Q)('#recover-hidden').addEventListener('click', () => toggleContainer('#login-container', '#recover-container'));\n})();\n\n//# sourceURL=webpack://theme-base-shopify/./src/templates/customer.js?");

/***/ }),

/***/ "./src/utils/numeric-validation.js":
/*!*****************************************!*\
  !*** ./src/utils/numeric-validation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   forceNumeric: () => (/* binding */ forceNumeric)\n/* harmony export */ });\nconst forceNumeric = e => {\n  e.target.value = e.target.value.replace(/[^\\d]/, '');\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/numeric-validation.js?");

/***/ }),

/***/ "./src/utils/query-selector.js":
/*!*************************************!*\
  !*** ./src/utils/query-selector.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   $Q: () => (/* binding */ $Q),\n/* harmony export */   $Qll: () => (/* binding */ $Qll)\n/* harmony export */ });\n/**\n * @param {String} nodes - ClassList with DOM reference\n * @param {HTMLElement} parent - Parent of nodes\n * @returns {Array} Array of nodes in DOM\n */\nconst $Qll = (nodes,\n// eslint-disable-next-line no-undef\nparent) => [...(parent || document).querySelectorAll(nodes)];\n\n/**\n *\n * @param {HTMLElement} node - ClassName with DOM reference\n * @param {HTMLElement} parent - Parent of nodes\n * @returns {Node} Node in DOM\n */\n// eslint-disable-next-line no-undef\nconst $Q = (node, parent) => (parent || document).querySelector(node);\n\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/query-selector.js?");

/***/ }),

/***/ "./src/scss/customer.scss":
/*!********************************!*\
  !*** ./src/scss/customer.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://theme-base-shopify/./src/scss/customer.scss?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/templates/customer.js");
/******/ 	
/******/ })()
;