/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/faq-section.core.js":
/*!************************************!*\
  !*** ./assets/faq-section.core.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initEventCategory: () => (/* binding */ initEventCategory)\n/* harmony export */ });\n/* harmony import */ var graditify_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graditify-utils */ \"./node_modules/graditify-utils/src/index.js\");\n/* harmony import */ var graditify_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graditify_utils__WEBPACK_IMPORTED_MODULE_0__);\n/* eslint-disable max-len */\n\nconst menu = (0,graditify_utils__WEBPACK_IMPORTED_MODULE_0__.$Q)('.categories-menu');\nconst menuItems = (0,graditify_utils__WEBPACK_IMPORTED_MODULE_0__.$Qll)('.categories-menu__item');\n\n/**\n * Initializes the category menu event listener\n * for showing or hiding the blocks on click\n * If the screen size is less than 767px\n * the scrollTop function will be executed\n */\nconst initEventCategory = () => {\n  if (!menu) return;\n  window.addEventListener('load', showMoreFAQ());\n  menuItems.forEach(item => {\n    item.addEventListener('click', () => {\n      const sectionContainer = item.parentNode.parentNode;\n      cleanCategories(sectionContainer);\n      categoryClicked(item);\n      if (window.innerWidth < 767) {\n        scrollTop(sectionContainer.offsetTop);\n      }\n    });\n  });\n};\n\n/**\n * Scrolls to a specific position on the page.\n * @param {number} toplock - The Y coordinate of the target element to scroll to.\n */\nconst scrollTop = toplock => {\n  window.scrollTo({\n    top: toplock,\n    behavior: 'smooth'\n  });\n};\n\n/**\n * Removes 'clicked-js' class from each '.categories-menu__item' element within the given section container,\n * and hides each '.categories-container' element.\n *\n * @param {HTMLElement} sectionContainer - The section container element that contains the categories to clean.\n */\nconst cleanCategories = sectionContainer => {\n  const items = (0,graditify_utils__WEBPACK_IMPORTED_MODULE_0__.$Qll)('.categories-menu__item', sectionContainer);\n  items.forEach(item => {\n    item.classList.remove('clicked-js');\n  });\n  const content = (0,graditify_utils__WEBPACK_IMPORTED_MODULE_0__.$Qll)('.categories-container', sectionContainer);\n  content.forEach(block => {\n    block.classList.remove('show');\n    block.classList.add('hide');\n  });\n};\n\n/**\n * Adds the 'clicked-js' class to the clicked menu item\n * @param {HTMLElement} item The clicked menu item element\n */\nconst categoryClicked = item => {\n  const dataHandle = item.dataset.handle;\n  item.classList.add('clicked-js');\n  showContentClicked(dataHandle);\n};\n\n/**\n * Shows the content of the clicked menu item\n * @param {string} data The data handle of the clicked menu item\n */\nconst showContentClicked = data => {\n  const itemShowed = document.querySelector(`.categories-container[data-handle=\"${data}\"]`);\n  itemShowed.classList.remove('hide');\n  itemShowed.classList.add('show');\n  showMoreFAQ();\n};\n\n/**\n * Shows a \"read more\" link for long FAQ answers\n * and toggles the display of the full answer.\n * @returns {void}\n */\nconst showMoreFAQ = () => {\n  const readMoreText = 'VOIR PLUS';\n  const readLessText = 'VOIR MOINS';\n  const contentItems = document.querySelectorAll('.block-container__content');\n  contentItems.forEach(item => {\n    const content = item.querySelector('.block-container__description').innerHTML;\n    if (!content.includes('<p>...</p>')) {\n      return;\n    }\n    const [content1, content2] = splitContent(content);\n    updateContent(item, content1, content2, readMoreText);\n    const dots = item.querySelectorAll('.dots');\n    dots.forEach(dot => {\n      // eslint-disable-next-line no-param-reassign\n      dot.onclick = () => {\n        handleDotsClick(dot, readLessText, readMoreText);\n      };\n    });\n  });\n};\n\n/**\nSplits the content of an FAQ answer if it contains a \"read more\" link.\n@param {string} content - The HTML content of an FAQ answer.\n@returns {string[]} An array with two strings:\nthe first part of the content and\nthe second part that will be hidden by the \"read more\" link (if it exists).\n*/\nconst splitContent = content => {\n  const [content1, content2] = content.split('<p>...</p>');\n  return [content1, content2];\n};\n\n/**\nUpdates the HTML of an FAQ answer to include the \"read more\" link.\n@param {HTMLElement} item - The FAQ item container element.\n@param {string} content1 - The first part of the answer content.\n@param {string} content2 - The second part of the answer content that will be hidden by the \"read more\" link.\n@param {string} readMoreText - The text to display in the \"read more\" link.\n@returns {void}\n*/\nconst updateContent = (item, content1, content2, readMoreText) => {\n  const description = item.querySelector('.block-container__description');\n  description.innerHTML = `\n    ${content1}\n    <span class=\"show\">${content2}</span>\n    <span class=\"dots\">${readMoreText}</span>\n  `;\n};\n\n/**\nToggles the display of the full FAQ answer when the \"read more\" link is clicked.\n@param {HTMLElement} dot - The \"read more\" link element.\n@param {string} readLessText - The text to display in the \"read less\" link.\n@returns {void}\n*/\nconst handleDotsClick = (dot, readLessText, readMoreText) => {\n  const parentContent = dot.closest('.block-container__description');\n  const more = parentContent.querySelector('.show');\n  const less = parentContent.querySelector('.dots');\n  more.classList.toggle('show-less');\n  less.innerText = more.classList.contains('show-less') ? readLessText : readMoreText;\n};\n\n//# sourceURL=webpack://theme-base-shopify/./assets/faq-section.core.js?");

/***/ }),

/***/ "./assets/faq-section.module.js":
/*!**************************************!*\
  !*** ./assets/faq-section.module.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _faq_section_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./faq-section.core */ \"./assets/faq-section.core.js\");\n/* harmony import */ var _faq_section_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./faq-section.scss */ \"./assets/faq-section.scss\");\n\n\n(0,_faq_section_core__WEBPACK_IMPORTED_MODULE_0__.initEventCategory)();\n\n//# sourceURL=webpack://theme-base-shopify/./assets/faq-section.module.js?");

/***/ }),

/***/ "./node_modules/graditify-utils/src/index.js":
/*!***************************************************!*\
  !*** ./node_modules/graditify-utils/src/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { formatMoney } = __webpack_require__(/*! ./utils/price */ \"./node_modules/graditify-utils/src/utils/price.js\")\r\nconst { $Q, $Qll } = __webpack_require__(/*! ./utils/query-selector */ \"./node_modules/graditify-utils/src/utils/query-selector.js\")\r\nconst { stringToHTML } = __webpack_require__(/*! ./utils/to-html */ \"./node_modules/graditify-utils/src/utils/to-html.js\")\r\nconst { toggleDataActive, dataToggle } = __webpack_require__(/*! ./utils/toggle-dataset */ \"./node_modules/graditify-utils/src/utils/toggle-dataset.js\")\r\n\r\nmodule.exports = {\r\n  stringToHTML,\r\n  formatMoney,\r\n  toggleDataActive,\r\n  dataToggle,\r\n  $Q,\r\n  $Qll\r\n}\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/graditify-utils/src/index.js?");

/***/ }),

/***/ "./node_modules/graditify-utils/src/utils/price.js":
/*!*********************************************************!*\
  !*** ./node_modules/graditify-utils/src/utils/price.js ***!
  \*********************************************************/
/***/ ((module) => {

eval("// eslint-disable-next-line no-template-curly-in-string\r\nconst moneyFormat = \"${{amount}}\";\r\n\r\nfunction defaultOption(opt, def) {\r\n  return typeof opt === \"undefined\" ? def : opt;\r\n}\r\n\r\n/* eslint-disable no-param-reassign */\r\n// eslint-disable-next-line max-params\r\nfunction formatWithDelimiters(number, precision, thousands, decimal) {\r\n  precision = defaultOption(precision, 2);\r\n  thousands = defaultOption(thousands, \".\");\r\n  decimal = defaultOption(decimal, \",\");\r\n\r\n  if (isNaN(number) || number == null) {\r\n    return 0;\r\n  }\r\n\r\n  number = (number / 100.0).toFixed(precision);\r\n\r\n  const parts = number.split(\".\");\r\n  const dollars = parts[0].replace(\r\n    /(\\d)(?=(\\d\\d\\d)+(?!\\d))/g,\r\n    `$1${thousands}`,\r\n  );\r\n  const cents = parts[1] ? decimal + parts[1] : \"\";\r\n\r\n  return dollars + cents;\r\n}\r\n/* eslint-enable no-param-reassign */\r\n\r\nfunction caseHandler(element, cents) {\r\n  let value = \"\";\r\n\r\n  switch (element) {\r\n    case \"amount\":\r\n      value = formatWithDelimiters(cents, 2);\r\n      break;\r\n    case \"amount_no_decimals\":\r\n      value = formatWithDelimiters(cents, 0);\r\n      break;\r\n    case \"amount_with_comma_separator\":\r\n      value = formatWithDelimiters(cents, 2, \".\", \",\");\r\n      break;\r\n    case \"amount_no_decimals_with_comma_separator\":\r\n      value = formatWithDelimiters(cents, 0, \".\", \",\");\r\n      break;\r\n    default:\r\n      value = \"\"\r\n  }\r\n  return value\r\n}\r\n\r\nconst formatMoney = (cents, format) => {\r\n  if (typeof cents === \"string\") {\r\n     // eslint-disable-next-line no-param-reassign\r\n     cents = cents.replace(\".\", \"\");\r\n  }\r\n  const placeholderRegex = /\\{\\{\\s*(\\w+)\\s*\\}\\}/;\r\n  const formatString = format || moneyFormat;\r\n\r\n  const value = caseHandler(formatString.match(placeholderRegex)[1], cents)\r\n\r\n  const price = formatString.replace(placeholderRegex, value);\r\n\r\n  return `${price.replace(\"$\", \"€\")} EUR`;\r\n}\r\n\r\nmodule.exports = {\r\n  formatMoney\r\n}\r\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/graditify-utils/src/utils/price.js?");

/***/ }),

/***/ "./node_modules/graditify-utils/src/utils/query-selector.js":
/*!******************************************************************!*\
  !*** ./node_modules/graditify-utils/src/utils/query-selector.js ***!
  \******************************************************************/
/***/ ((module) => {

eval("/**\r\n * Select all the nodes of the dom. you can indicate which one is the parent, otherwise it will be from the document\r\n * @param {String} nodes - ClassList with DOM reference\r\n * @param {HTMLElement} parent - Parent of nodes\r\n * @returns {Array} Array of nodes in DOM\r\n */\r\nconst $Qll = (\r\n  nodes,\r\n  parent) => [...(parent || document).querySelectorAll(nodes)]\r\n\r\n/**\r\n * Select one only node of the dom. you can indicate which one is the parent, otherwise it will be from the document\r\n * @param {HTMLElement} node - ClassName with DOM reference\r\n * @param {HTMLElement} parent - Parent of nodes\r\n * @returns {Node} Node in DOM\r\n */\r\nconst $Q = (node, parent) => (parent || document).querySelector(node)\r\n\r\nmodule.exports = {\r\n  $Qll,\r\n  $Q,\r\n}\r\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/graditify-utils/src/utils/query-selector.js?");

/***/ }),

/***/ "./node_modules/graditify-utils/src/utils/to-html.js":
/*!***********************************************************!*\
  !*** ./node_modules/graditify-utils/src/utils/to-html.js ***!
  \***********************************************************/
/***/ ((module) => {

eval("/* eslint-disable no-undef */\r\nconst support = () => {\r\n\tif (!window.DOMParser) return false;\r\n\r\n\tconst parser = new DOMParser();\r\n\r\n  try {\r\n\t\tparser.parseFromString('x', 'text/html');\r\n\t} catch (err) {\r\n\t\treturn false;\r\n\t}\r\n\r\n\treturn true;\r\n};\r\n\r\n/**\r\n * Convert a template string into HTML DOM nodes\r\n * @param  {String} str The template string\r\n * @return {Node}       The template HTML\r\n */\r\nconst stringToHTML = (str) => {\r\n\t// If DOMParser is supported, use it\r\n\tif (support()) {\r\n\t\tconst parser = new DOMParser();\r\n\t\tconst doc = parser.parseFromString(str, 'text/html');\r\n\t\treturn doc.body;\r\n\t}\r\n\r\n\t// Otherwise, fallback to old-school method\r\n\tconst dom = document.createElement('div');\r\n\tdom.innerHTML = str;\r\n\treturn dom;\r\n}\r\n\r\nmodule.exports = {\r\n\tstringToHTML\r\n}\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/graditify-utils/src/utils/to-html.js?");

/***/ }),

/***/ "./node_modules/graditify-utils/src/utils/toggle-dataset.js":
/*!******************************************************************!*\
  !*** ./node_modules/graditify-utils/src/utils/toggle-dataset.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { $Q } = __webpack_require__(/*! ./query-selector */ \"./node_modules/graditify-utils/src/utils/query-selector.js\");\r\n\r\n/**\r\n *\r\n * @param {String} id - ID from node manipulate\r\n * @param {Boolean} active - If modal active\r\n * @param {HTMLElement} node - Node to manipulate\r\n */\r\n const overlayActions = (id, active, node) => {\r\n  const idOverlay = `overlay--${id}`;\r\n  const parent = node.parentNode;\r\n\r\n  if (!active) {\r\n    // eslint-disable-next-line no-undef\r\n    const overlay = document.createElement(\"div\");\r\n\r\n    overlay.setAttribute(\"id\", idOverlay);\r\n    overlay.classList.add(\"overlay\");\r\n\r\n    parent.insertBefore(overlay, node);\r\n    // eslint-disable-next-line no-use-before-define\r\n    toggleDataActive(`#${idOverlay}`, `#${id}`, { overlay: true });\r\n  } else {\r\n    parent.removeChild($Q(`#${idOverlay}`));\r\n  }\r\n}\r\n\r\n/**\r\n * To validate state in dataset node\r\n */\r\n const isActive = ({ active }) => active === \"true\";\r\n\r\n/**\r\n* Data Toggle\r\n*\r\n* @param {HTMLElement} node - Node to manipulate\r\n* @param {Boolean} overlay - if used to a overlay\r\n*/\r\nfunction dataToggle(node, overlay) {\r\n  const { dataset, id } = node;\r\n  const active = isActive(dataset);\r\n\r\n  if (active) {\r\n    dataset.active = \"false\";\r\n  } else {\r\n    dataset.active = \"true\";\r\n  }\r\n\r\n  // eslint-disable-next-line no-unused-expressions\r\n  overlay && overlayActions(id, active, node);\r\n}\r\n\r\n/**\r\n * Data Active toggle\r\n *\r\n * @param {String} control - ID button control\r\n * @param {String} node - ID modal\r\n * @param {Object} config - Object with overlay, closeSelector\r\n */\r\nconst toggleDataActive = (control, node, config = {}) => {\r\n  if (!$Q(control)) return;\r\n  const { overlay, closeSelector } = config;\r\n\r\n  $Q(control).addEventListener(\"click\", () => {\r\n    dataToggle($Q(node), overlay);\r\n  });\r\n\r\n  // eslint-disable-next-line no-unused-expressions\r\n  closeSelector && $Q(closeSelector).addEventListener(\r\n    \"click\",\r\n    () => {\r\n      dataToggle($Q(node), overlay);\r\n    },\r\n  );\r\n}\r\n\r\nmodule.exports = {\r\n  toggleDataActive,\r\n  dataToggle\r\n}\r\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/graditify-utils/src/utils/toggle-dataset.js?");

/***/ }),

/***/ "./assets/faq-section.scss":
/*!*********************************!*\
  !*** ./assets/faq-section.scss ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://theme-base-shopify/./assets/faq-section.scss?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/faq-section.module.js");
/******/ 	
/******/ })()
;