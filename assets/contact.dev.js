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

/***/ "./src/components/form-contact.js":
/*!****************************************!*\
  !*** ./src/components/form-contact.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validateFormContact: () => (/* binding */ validateFormContact)\n/* harmony export */ });\n/* harmony import */ var _utils_numeric_validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/numeric-validation */ \"./src/utils/numeric-validation.js\");\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n\n\nconst validateForm = e => {\n  e.preventDefault();\n  const form = e.target.closest('form');\n  const checkAccept = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#validation', form);\n  const requiredInputs = [...form.elements].filter(tag => tag.required).every(tag => tag.value);\n  if (!checkAccept.checked || !requiredInputs) {\n    (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.error-check-js').style.display = 'flex';\n    return false;\n  }\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.error-check-js').style.display = 'none';\n  return form.submit();\n};\nconst validateFormContact = () => {\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.send-contact').addEventListener('click', validateForm);\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('input[type=\"number\"]').addEventListener('input', _utils_numeric_validation__WEBPACK_IMPORTED_MODULE_0__.forceNumeric);\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/form-contact.js?");

/***/ }),

/***/ "./src/templates/contact.js":
/*!**********************************!*\
  !*** ./src/templates/contact.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_form_contact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/form-contact */ \"./src/components/form-contact.js\");\n\n(0,_components_form_contact__WEBPACK_IMPORTED_MODULE_0__.validateFormContact)();\n\n//# sourceURL=webpack://theme-base-shopify/./src/templates/contact.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/templates/contact.js");
/******/ 	
/******/ })()
;