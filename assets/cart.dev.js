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

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ \"./node_modules/axios/lib/core/buildFullPath.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar Cancel = __webpack_require__(/*! ../cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n    var responseType = config.responseType;\n    var onCanceled;\n    function done() {\n      if (config.cancelToken) {\n        config.cancelToken.unsubscribe(onCanceled);\n      }\n\n      if (config.signal) {\n        config.signal.removeEventListener('abort', onCanceled);\n      }\n    }\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    var fullPath = buildFullPath(config.baseURL, config.url);\n    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    function onloadend() {\n      if (!request) {\n        return;\n      }\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?\n        request.responseText : request.response;\n      var response = {\n        data: responseData,\n        status: request.status,\n        statusText: request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(function _resolve(value) {\n        resolve(value);\n        done();\n      }, function _reject(err) {\n        reject(err);\n        done();\n      }, response);\n\n      // Clean up request\n      request = null;\n    }\n\n    if ('onloadend' in request) {\n      // Use onloadend if available\n      request.onloadend = onloadend;\n    } else {\n      // Listen for ready state to emulate onloadend\n      request.onreadystatechange = function handleLoad() {\n        if (!request || request.readyState !== 4) {\n          return;\n        }\n\n        // The request errored out and we didn't get a response, this will be\n        // handled by onerror instead\n        // With one exception: request that using file: protocol, most browsers\n        // will return status as 0 even though it's a successful request\n        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n          return;\n        }\n        // readystate handler is calling before onerror or ontimeout handlers,\n        // so we should call onloadend on the next 'tick'\n        setTimeout(onloadend);\n      };\n    }\n\n    // Handle browser request cancellation (as opposed to a manual cancellation)\n    request.onabort = function handleAbort() {\n      if (!request) {\n        return;\n      }\n\n      reject(createError('Request aborted', config, 'ECONNABORTED', request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';\n      var transitional = config.transitional || defaults.transitional;\n      if (config.timeoutErrorMessage) {\n        timeoutErrorMessage = config.timeoutErrorMessage;\n      }\n      reject(createError(\n        timeoutErrorMessage,\n        config,\n        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?\n        cookies.read(config.xsrfCookieName) :\n        undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (!utils.isUndefined(config.withCredentials)) {\n      request.withCredentials = !!config.withCredentials;\n    }\n\n    // Add responseType to request if needed\n    if (responseType && responseType !== 'json') {\n      request.responseType = config.responseType;\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken || config.signal) {\n      // Handle cancellation\n      // eslint-disable-next-line func-names\n      onCanceled = function(cancel) {\n        if (!request) {\n          return;\n        }\n        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);\n        request.abort();\n        request = null;\n      };\n\n      config.cancelToken && config.cancelToken.subscribe(onCanceled);\n      if (config.signal) {\n        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);\n      }\n    }\n\n    if (!requestData) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  // Factory for creating new instances\n  instance.create = function create(instanceConfig) {\n    return createInstance(mergeConfig(defaultConfig, instanceConfig));\n  };\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\naxios.VERSION = (__webpack_require__(/*! ./env/data */ \"./node_modules/axios/lib/env/data.js\").version);\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\n// Expose isAxiosError\naxios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ \"./node_modules/axios/lib/helpers/isAxiosError.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports[\"default\"] = axios;\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n\n  // eslint-disable-next-line func-names\n  this.promise.then(function(cancel) {\n    if (!token._listeners) return;\n\n    var i;\n    var l = token._listeners.length;\n\n    for (i = 0; i < l; i++) {\n      token._listeners[i](cancel);\n    }\n    token._listeners = null;\n  });\n\n  // eslint-disable-next-line func-names\n  this.promise.then = function(onfulfilled) {\n    var _resolve;\n    // eslint-disable-next-line func-names\n    var promise = new Promise(function(resolve) {\n      token.subscribe(resolve);\n      _resolve = resolve;\n    }).then(onfulfilled);\n\n    promise.cancel = function reject() {\n      token.unsubscribe(_resolve);\n    };\n\n    return promise;\n  };\n\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Subscribe to the cancel signal\n */\n\nCancelToken.prototype.subscribe = function subscribe(listener) {\n  if (this.reason) {\n    listener(this.reason);\n    return;\n  }\n\n  if (this._listeners) {\n    this._listeners.push(listener);\n  } else {\n    this._listeners = [listener];\n  }\n};\n\n/**\n * Unsubscribe from the cancel signal\n */\n\nCancelToken.prototype.unsubscribe = function unsubscribe(listener) {\n  if (!this._listeners) {\n    return;\n  }\n  var index = this._listeners.indexOf(listener);\n  if (index !== -1) {\n    this._listeners.splice(index, 1);\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar buildURL = __webpack_require__(/*! ../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\nvar mergeConfig = __webpack_require__(/*! ./mergeConfig */ \"./node_modules/axios/lib/core/mergeConfig.js\");\nvar validator = __webpack_require__(/*! ../helpers/validator */ \"./node_modules/axios/lib/helpers/validator.js\");\n\nvar validators = validator.validators;\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = arguments[1] || {};\n    config.url = arguments[0];\n  } else {\n    config = config || {};\n  }\n\n  config = mergeConfig(this.defaults, config);\n\n  // Set config.method\n  if (config.method) {\n    config.method = config.method.toLowerCase();\n  } else if (this.defaults.method) {\n    config.method = this.defaults.method.toLowerCase();\n  } else {\n    config.method = 'get';\n  }\n\n  var transitional = config.transitional;\n\n  if (transitional !== undefined) {\n    validator.assertOptions(transitional, {\n      silentJSONParsing: validators.transitional(validators.boolean),\n      forcedJSONParsing: validators.transitional(validators.boolean),\n      clarifyTimeoutError: validators.transitional(validators.boolean)\n    }, false);\n  }\n\n  // filter out skipped interceptors\n  var requestInterceptorChain = [];\n  var synchronousRequestInterceptors = true;\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {\n      return;\n    }\n\n    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;\n\n    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  var responseInterceptorChain = [];\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  var promise;\n\n  if (!synchronousRequestInterceptors) {\n    var chain = [dispatchRequest, undefined];\n\n    Array.prototype.unshift.apply(chain, requestInterceptorChain);\n    chain = chain.concat(responseInterceptorChain);\n\n    promise = Promise.resolve(config);\n    while (chain.length) {\n      promise = promise.then(chain.shift(), chain.shift());\n    }\n\n    return promise;\n  }\n\n\n  var newConfig = config;\n  while (requestInterceptorChain.length) {\n    var onFulfilled = requestInterceptorChain.shift();\n    var onRejected = requestInterceptorChain.shift();\n    try {\n      newConfig = onFulfilled(newConfig);\n    } catch (error) {\n      onRejected(error);\n      break;\n    }\n  }\n\n  try {\n    promise = dispatchRequest(newConfig);\n  } catch (error) {\n    return Promise.reject(error);\n  }\n\n  while (responseInterceptorChain.length) {\n    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());\n  }\n\n  return promise;\n};\n\nAxios.prototype.getUri = function getUri(config) {\n  config = mergeConfig(this.defaults, config);\n  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\\?/, '');\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: (config || {}).data\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(mergeConfig(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected, options) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected,\n    synchronous: options ? options.synchronous : false,\n    runWhen: options ? options.runWhen : null\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Creates a new URL by combining the baseURL with the requestedURL,\n * only when the requestedURL is not already an absolute URL.\n * If the requestURL is absolute, this function returns the requestedURL untouched.\n *\n * @param {string} baseURL The base URL\n * @param {string} requestedURL Absolute or relative URL to combine\n * @returns {string} The combined full path\n */\nmodule.exports = function buildFullPath(baseURL, requestedURL) {\n  if (baseURL && !isAbsoluteURL(requestedURL)) {\n    return combineURLs(baseURL, requestedURL);\n  }\n  return requestedURL;\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/core/buildFullPath.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar Cancel = __webpack_require__(/*! ../cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n\n  if (config.signal && config.signal.aborted) {\n    throw new Cancel('canceled');\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData.call(\n    config,\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData.call(\n      config,\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData.call(\n          config,\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n\n  error.request = request;\n  error.response = response;\n  error.isAxiosError = true;\n\n  error.toJSON = function toJSON() {\n    return {\n      // Standard\n      message: this.message,\n      name: this.name,\n      // Microsoft\n      description: this.description,\n      number: this.number,\n      // Mozilla\n      fileName: this.fileName,\n      lineNumber: this.lineNumber,\n      columnNumber: this.columnNumber,\n      stack: this.stack,\n      // Axios\n      config: this.config,\n      code: this.code,\n      status: this.response && this.response.status ? this.response.status : null\n    };\n  };\n  return error;\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Config-specific merge-function which creates a new config-object\n * by merging two configuration objects together.\n *\n * @param {Object} config1\n * @param {Object} config2\n * @returns {Object} New object resulting from merging config2 to config1\n */\nmodule.exports = function mergeConfig(config1, config2) {\n  // eslint-disable-next-line no-param-reassign\n  config2 = config2 || {};\n  var config = {};\n\n  function getMergedValue(target, source) {\n    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {\n      return utils.merge(target, source);\n    } else if (utils.isPlainObject(source)) {\n      return utils.merge({}, source);\n    } else if (utils.isArray(source)) {\n      return source.slice();\n    }\n    return source;\n  }\n\n  // eslint-disable-next-line consistent-return\n  function mergeDeepProperties(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      return getMergedValue(config1[prop], config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      return getMergedValue(undefined, config1[prop]);\n    }\n  }\n\n  // eslint-disable-next-line consistent-return\n  function valueFromConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      return getMergedValue(undefined, config2[prop]);\n    }\n  }\n\n  // eslint-disable-next-line consistent-return\n  function defaultToConfig2(prop) {\n    if (!utils.isUndefined(config2[prop])) {\n      return getMergedValue(undefined, config2[prop]);\n    } else if (!utils.isUndefined(config1[prop])) {\n      return getMergedValue(undefined, config1[prop]);\n    }\n  }\n\n  // eslint-disable-next-line consistent-return\n  function mergeDirectKeys(prop) {\n    if (prop in config2) {\n      return getMergedValue(config1[prop], config2[prop]);\n    } else if (prop in config1) {\n      return getMergedValue(undefined, config1[prop]);\n    }\n  }\n\n  var mergeMap = {\n    'url': valueFromConfig2,\n    'method': valueFromConfig2,\n    'data': valueFromConfig2,\n    'baseURL': defaultToConfig2,\n    'transformRequest': defaultToConfig2,\n    'transformResponse': defaultToConfig2,\n    'paramsSerializer': defaultToConfig2,\n    'timeout': defaultToConfig2,\n    'timeoutMessage': defaultToConfig2,\n    'withCredentials': defaultToConfig2,\n    'adapter': defaultToConfig2,\n    'responseType': defaultToConfig2,\n    'xsrfCookieName': defaultToConfig2,\n    'xsrfHeaderName': defaultToConfig2,\n    'onUploadProgress': defaultToConfig2,\n    'onDownloadProgress': defaultToConfig2,\n    'decompress': defaultToConfig2,\n    'maxContentLength': defaultToConfig2,\n    'maxBodyLength': defaultToConfig2,\n    'transport': defaultToConfig2,\n    'httpAgent': defaultToConfig2,\n    'httpsAgent': defaultToConfig2,\n    'cancelToken': defaultToConfig2,\n    'socketPath': defaultToConfig2,\n    'responseEncoding': defaultToConfig2,\n    'validateStatus': mergeDirectKeys\n  };\n\n  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {\n    var merge = mergeMap[prop] || mergeDeepProperties;\n    var configValue = merge(prop);\n    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);\n  });\n\n  return config;\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/core/mergeConfig.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar defaults = __webpack_require__(/*! ./../defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  var context = this || defaults;\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn.call(context, data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\nvar enhanceError = __webpack_require__(/*! ./core/enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nfunction stringifySafely(rawValue, parser, encoder) {\n  if (utils.isString(rawValue)) {\n    try {\n      (parser || JSON.parse)(rawValue);\n      return utils.trim(rawValue);\n    } catch (e) {\n      if (e.name !== 'SyntaxError') {\n        throw e;\n      }\n    }\n  }\n\n  return (encoder || JSON.stringify)(rawValue);\n}\n\nvar defaults = {\n\n  transitional: {\n    silentJSONParsing: true,\n    forcedJSONParsing: true,\n    clarifyTimeoutError: false\n  },\n\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Accept');\n    normalizeHeaderName(headers, 'Content-Type');\n\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {\n      setContentTypeIfUnset(headers, 'application/json');\n      return stringifySafely(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    var transitional = this.transitional || defaults.transitional;\n    var silentJSONParsing = transitional && transitional.silentJSONParsing;\n    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;\n    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';\n\n    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {\n      try {\n        return JSON.parse(data);\n      } catch (e) {\n        if (strictJSONParsing) {\n          if (e.name === 'SyntaxError') {\n            throw enhanceError(e, this, 'E_JSON_PARSE');\n          }\n          throw e;\n        }\n      }\n    }\n\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n  maxBodyLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  },\n\n  headers: {\n    common: {\n      'Accept': 'application/json, text/plain, */*'\n    }\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ ((module) => {

eval("module.exports = {\n  \"version\": \"0.22.0\"\n};\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/env/data.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    var hashmarkIndex = url.indexOf('#');\n    if (hashmarkIndex !== -1) {\n      url = url.slice(0, hashmarkIndex);\n    }\n\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n    (function standardBrowserEnv() {\n      return {\n        write: function write(name, value, expires, path, domain, secure) {\n          var cookie = [];\n          cookie.push(name + '=' + encodeURIComponent(value));\n\n          if (utils.isNumber(expires)) {\n            cookie.push('expires=' + new Date(expires).toGMTString());\n          }\n\n          if (utils.isString(path)) {\n            cookie.push('path=' + path);\n          }\n\n          if (utils.isString(domain)) {\n            cookie.push('domain=' + domain);\n          }\n\n          if (secure === true) {\n            cookie.push('secure');\n          }\n\n          document.cookie = cookie.join('; ');\n        },\n\n        read: function read(name) {\n          var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n          return (match ? decodeURIComponent(match[3]) : null);\n        },\n\n        remove: function remove(name) {\n          this.write(name, '', Date.now() - 86400000);\n        }\n      };\n    })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return {\n        write: function write() {},\n        read: function read() { return null; },\n        remove: function remove() {}\n      };\n    })()\n);\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Determines whether the payload is an error thrown by Axios\n *\n * @param {*} payload The value to test\n * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false\n */\nmodule.exports = function isAxiosError(payload) {\n  return (typeof payload === 'object') && (payload.isAxiosError === true);\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/helpers/isAxiosError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n    (function standardBrowserEnv() {\n      var msie = /(msie|trident)/i.test(navigator.userAgent);\n      var urlParsingNode = document.createElement('a');\n      var originURL;\n\n      /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n      function resolveURL(url) {\n        var href = url;\n\n        if (msie) {\n        // IE needs attribute set twice to normalize properties\n          urlParsingNode.setAttribute('href', href);\n          href = urlParsingNode.href;\n        }\n\n        urlParsingNode.setAttribute('href', href);\n\n        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n        return {\n          href: urlParsingNode.href,\n          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n          host: urlParsingNode.host,\n          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n          hostname: urlParsingNode.hostname,\n          port: urlParsingNode.port,\n          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n            urlParsingNode.pathname :\n            '/' + urlParsingNode.pathname\n        };\n      }\n\n      originURL = resolveURL(window.location.href);\n\n      /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n      return function isURLSameOrigin(requestURL) {\n        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n        return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n      };\n    })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n    (function nonStandardBrowserEnv() {\n      return function isURLSameOrigin() {\n        return true;\n      };\n    })()\n);\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar VERSION = (__webpack_require__(/*! ../env/data */ \"./node_modules/axios/lib/env/data.js\").version);\n\nvar validators = {};\n\n// eslint-disable-next-line func-names\n['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {\n  validators[type] = function validator(thing) {\n    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;\n  };\n});\n\nvar deprecatedWarnings = {};\n\n/**\n * Transitional option validator\n * @param {function|boolean?} validator - set to false if the transitional option has been removed\n * @param {string?} version - deprecated version / removed since version\n * @param {string?} message - some message with additional info\n * @returns {function}\n */\nvalidators.transitional = function transitional(validator, version, message) {\n  function formatMessage(opt, desc) {\n    return '[Axios v' + VERSION + '] Transitional option \\'' + opt + '\\'' + desc + (message ? '. ' + message : '');\n  }\n\n  // eslint-disable-next-line func-names\n  return function(value, opt, opts) {\n    if (validator === false) {\n      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));\n    }\n\n    if (version && !deprecatedWarnings[opt]) {\n      deprecatedWarnings[opt] = true;\n      // eslint-disable-next-line no-console\n      console.warn(\n        formatMessage(\n          opt,\n          ' has been deprecated since v' + version + ' and will be removed in the near future'\n        )\n      );\n    }\n\n    return validator ? validator(value, opt, opts) : true;\n  };\n};\n\n/**\n * Assert object's properties type\n * @param {object} options\n * @param {object} schema\n * @param {boolean?} allowUnknown\n */\n\nfunction assertOptions(options, schema, allowUnknown) {\n  if (typeof options !== 'object') {\n    throw new TypeError('options must be an object');\n  }\n  var keys = Object.keys(options);\n  var i = keys.length;\n  while (i-- > 0) {\n    var opt = keys[i];\n    var validator = schema[opt];\n    if (validator) {\n      var value = options[opt];\n      var result = value === undefined || validator(value, opt, options);\n      if (result !== true) {\n        throw new TypeError('option ' + opt + ' must be ' + result);\n      }\n      continue;\n    }\n    if (allowUnknown !== true) {\n      throw Error('Unknown option ' + opt);\n    }\n  }\n}\n\nmodule.exports = {\n  assertOptions: assertOptions,\n  validators: validators\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/helpers/validator.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is a Buffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Buffer, otherwise false\n */\nfunction isBuffer(val) {\n  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)\n    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a plain Object\n *\n * @param {Object} val The value to test\n * @return {boolean} True if value is a plain Object, otherwise false\n */\nfunction isPlainObject(val) {\n  if (toString.call(val) !== '[object Object]') {\n    return false;\n  }\n\n  var prototype = Object.getPrototypeOf(val);\n  return prototype === null || prototype === Object.prototype;\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.trim ? str.trim() : str.replace(/^\\s+|\\s+$/g, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n * nativescript\n *  navigator.product -> 'NativeScript' or 'NS'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||\n                                           navigator.product === 'NativeScript' ||\n                                           navigator.product === 'NS')) {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (isPlainObject(result[key]) && isPlainObject(val)) {\n      result[key] = merge(result[key], val);\n    } else if (isPlainObject(val)) {\n      result[key] = merge({}, val);\n    } else if (isArray(val)) {\n      result[key] = val.slice();\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\n/**\n * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)\n *\n * @param {string} content with BOM\n * @return {string} content value without BOM\n */\nfunction stripBOM(content) {\n  if (content.charCodeAt(0) === 0xFEFF) {\n    content = content.slice(1);\n  }\n  return content;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isPlainObject: isPlainObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim,\n  stripBOM: stripBOM\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./src/components/slider-component.js":
/*!********************************************!*\
  !*** ./src/components/slider-component.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createSlider: () => (/* binding */ createSlider),\n/* harmony export */   loadNavigation: () => (/* binding */ loadNavigation),\n/* harmony export */   loadSlider: () => (/* binding */ loadSlider),\n/* harmony export */   loadSliderByEvent: () => (/* binding */ loadSliderByEvent)\n/* harmony export */ });\n/* harmony import */ var _utils_add_script_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/add-script-tag */ \"./src/utils/add-script-tag.js\");\n/* harmony import */ var _utils_blackListSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/blackListSlider */ \"./src/utils/blackListSlider.js\");\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/query-selector */ \"./src/utils/query-selector.js\");\n/* harmony import */ var _utils_script_defer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/script-defer */ \"./src/utils/script-defer.js\");\n/* eslint-disable max-len */\n\n\n\n\n\n/**\n * Creates a slider using the Swiper library.\n * @param {Object} parent - An object containing the data necessary to build the slider.\n * @param {string} parent.slidesMobile - The number of slides to show on mobile devices.\n * @param {string} parent.slides - The number of slides to show on larger screens.\n * @param {string} parent.pagination - Whether or not to show pagination dots.\n * @param {string} parent.auto - Whether or not to automatically advance the slides.\n * @param {string} parent.speed - The time in milliseconds between automatic slide transitions.\n * @param {string} parent.script - The URL of an external script to load.\n * @param {string} parent.spacing - The amount of space between slides, in pixels.\n */\nconst createSlider = container => {\n  const PAGE_ONE = 1;\n  const {\n    slidesMobile,\n    slides,\n    pagination,\n    navigation,\n    auto,\n    speed,\n    spacing\n  } = container.dataset;\n  let swiperParams = {\n    slidesPerView: Number(slidesMobile),\n    spaceBetween: Number(spacing),\n    loop: auto === 'true',\n    ...(speed > 0 && {\n      autoplay: {\n        delay: Number(speed),\n        disableOnInteraction: false\n      }\n    }),\n    breakpoints: {\n      640: {\n        slidesPerView: Number(slides) === PAGE_ONE ? Number(slides) : Number(slidesMobile) + 1\n      },\n      1024: {\n        slidesPerView: Number(slides)\n      }\n    }\n  };\n  if (navigation === 'true') {\n    swiperParams = loadNavigation(container, swiperParams);\n  }\n  if (pagination === 'true') {\n    swiperParams = loadPagination(container, swiperParams);\n  }\n  Object.assign(container, swiperParams);\n  return container.initialize();\n};\nconst loadPagination = (slider, params) => {\n  const paginationContainer = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_2__.$Q)('.swiper-pagination', slider.parentNode);\n  if (!paginationContainer || !params) return;\n  const mutationParams = Object.assign({}, params);\n  mutationParams.pagination = {\n    el: paginationContainer\n  };\n  return mutationParams;\n};\nconst loadNavigation = (slider, params) => {\n  const parent = slider.parentNode;\n  if ((0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_2__.$Qll)('.swiper-button', parent).length < 2 || !params) return;\n  const mutationParams = Object.assign({}, params);\n  const buttonNext = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_2__.$Q)('.swiper-button-next', parent);\n  const buttonPrev = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_2__.$Q)('.swiper-button-prev', parent);\n  mutationParams.navigation = {\n    nextEl: buttonNext,\n    prevEl: buttonPrev\n  };\n  return mutationParams;\n};\n\n/**\nA function that loads sliders on a page by\ncreating an intersection observer for each slider container element.\n@returns {void}\n*/\nconst loadSlider = () => {\n  const dataSliders = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_2__.$Qll)('.slider-js');\n  let loadingScript = false;\n  dataSliders.forEach(slider => {\n    if ((0,_utils_blackListSlider__WEBPACK_IMPORTED_MODULE_1__.blackListSlider)(slider)) return;\n    (0,_utils_script_defer__WEBPACK_IMPORTED_MODULE_3__.createInterception)(slider, async () => {\n      if (!loadingScript) {\n        loadingScript = true;\n        await (0,_utils_add_script_tag__WEBPACK_IMPORTED_MODULE_0__.addSwiperScript)();\n      }\n      return createSlider(slider);\n    });\n  });\n};\n\n/**\n * this script only select one slider predefine. example at doing click button\n * @param {Node} slider - node slider\n */\nconst loadSliderByEvent = slider => {\n  (0,_utils_script_defer__WEBPACK_IMPORTED_MODULE_3__.createInterception)(slider, async () => {\n    const loadScript = await (0,_utils_add_script_tag__WEBPACK_IMPORTED_MODULE_0__.addSwiperScript)();\n    if (loadScript) {\n      createSlider(slider);\n    }\n  });\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/components/slider-component.js?");

/***/ }),

/***/ "./src/modules/cart/cart-bar-progress.js":
/*!***********************************************!*\
  !*** ./src/modules/cart/cart-bar-progress.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   barProgress: () => (/* binding */ barProgress)\n/* harmony export */ });\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/query-selector */ \"./src/utils/query-selector.js\");\n\n\n/**\n * Update the width of bar progress\n * @param {HTMLElement} input - input hidde with data\n */\nconst barProgress = input => {\n  const totalPrice = parseFloat(input.dataset.total) / 100;\n  const limitPrice = input.dataset.limit;\n  const progress = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('.bar-progress');\n  const elementTotal = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('.total-residuary');\n  const textProgress = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('.progress-text-js');\n  const textFreeShipping = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('.shipping-free');\n  const barWidth = totalPrice / limitPrice * 100;\n  const residuaryPrice = limitPrice - totalPrice;\n  if (barWidth > 100) {\n    progress.style.width = '100%';\n    textProgress.style.display = 'none';\n    textFreeShipping.style.display = 'block';\n  } else {\n    progress.style.width = `${barWidth}%`;\n    elementTotal.innerHTML = `${residuaryPrice.toFixed()}€`;\n    textProgress.style.display = 'block';\n    textFreeShipping.style.display = 'none';\n  }\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/modules/cart/cart-bar-progress.js?");

/***/ }),

/***/ "./src/modules/cart/cart-init.js":
/*!***************************************!*\
  !*** ./src/modules/cart/cart-init.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initCart: () => (/* binding */ initCart)\n/* harmony export */ });\n/* harmony import */ var _cart_bar_progress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart-bar-progress */ \"./src/modules/cart/cart-bar-progress.js\");\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/query-selector */ \"./src/utils/query-selector.js\");\n/* harmony import */ var _utils_script_defer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/script-defer */ \"./src/utils/script-defer.js\");\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart */ \"./src/modules/cart/cart.js\");\n/* harmony import */ var _components_slider_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/slider-component */ \"./src/components/slider-component.js\");\n/* harmony import */ var _cart_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cart-item */ \"./src/modules/cart/cart-item.js\");\n\n\n\n\n\n\n\n/**\n * Cart initialization:\n * We work with interceptor to validate cart on viewport\n */\nconst initCart = () => {\n  (0,_cart__WEBPACK_IMPORTED_MODULE_3__.openCloseCart)();\n  const formAddFormUpsell = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.add-product-cart-upsell');\n  const cart = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#cart-items');\n  if (formAddFormUpsell) (0,_utils_script_defer__WEBPACK_IMPORTED_MODULE_2__.createInterception)(formAddFormUpsell, () => (0,_cart__WEBPACK_IMPORTED_MODULE_3__.btnAddToCart)('.add-product-cart-upsell'));\n  if (cart) (0,_utils_script_defer__WEBPACK_IMPORTED_MODULE_2__.createInterception)(cart, () => loadCartEvents());\n};\n\n/**\n * load cart events:\n * - Item cart\n * - Progress bar\n * - Upsell\n */\nconst loadCartEvents = () => {\n  if ((0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.slider-js.swiperElsidecart')) (0,_components_slider_component__WEBPACK_IMPORTED_MODULE_4__.loadSliderByEvent)((0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.slider-js.swiperElsidecart'));\n  window.customElements.define('item-cart', _cart_item__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n  (0,_cart_bar_progress__WEBPACK_IMPORTED_MODULE_0__.barProgress)((0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#progress-bar-data'));\n};\n\n\n//# sourceURL=webpack://theme-base-shopify/./src/modules/cart/cart-init.js?");

/***/ }),

/***/ "./src/modules/cart/cart-item.js":
/*!***************************************!*\
  !*** ./src/modules/cart/cart-item.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_input_quantity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/input-quantity */ \"./src/utils/input-quantity.js\");\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart */ \"./src/modules/cart/cart.js\");\n/* eslint-disable no-undef */\n\n\n\n/**\n * web component for item cart.\n * manage the variant change and add to cart events from here.\n * event delegation is used, this way we avoid having to reload the events\n * once a reload is done by section rendering.\n */\nclass ItemCart extends HTMLElement {\n  /**\n   * detect child elements within the web component.\n   */\n  connectedCallback() {\n    (0,_cart__WEBPACK_IMPORTED_MODULE_1__.deleteItem)(this);\n    (0,_cart__WEBPACK_IMPORTED_MODULE_1__.changeItem)(this);\n    (0,_utils_input_quantity__WEBPACK_IMPORTED_MODULE_0__.setQuantity)(this);\n  }\n  disconnectedCallback() {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItemCart);\n\n//# sourceURL=webpack://theme-base-shopify/./src/modules/cart/cart-item.js?");

/***/ }),

/***/ "./src/modules/cart/cart-utils.js":
/*!****************************************!*\
  !*** ./src/modules/cart/cart-utils.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addSpinner: () => (/* binding */ addSpinner),\n/* harmony export */   cartAlert: () => (/* binding */ cartAlert),\n/* harmony export */   debounce: () => (/* binding */ debounce)\n/* harmony export */ });\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/query-selector */ \"./src/utils/query-selector.js\");\n\nlet wait = false;\n\n/**\n * Replace en element with a spinner\n * @param {String} element\n */\nconst addSpinner = (element, parent) => {\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(element, parent).innerHTML = '<div class=\"loading\"></div>';\n};\n\n/**\n * Display alert of cart API\n * @param {String} response - Dynamic response API\n */\nconst cartAlert = (request = null) => {\n  if (wait) return;\n  wait = true;\n  const message = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('#error-out-stock');\n  const info = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('span', message);\n  if (request && request.data) {\n    info.textContent = request.data.description || request.data.message;\n  } else {\n    info.textContent = message.dataset.message;\n  }\n  message.classList.remove('hidden');\n  setTimeout(() => {\n    message.classList.add('hidden');\n    wait = false;\n  }, 5000);\n};\n\n/**\n * Delay function\n *\n * @param {Function} fn - Function that you want a delay execution\n * @param {Number} wait - This time delay (ms)\n * @returns Function delay\n */\nfunction debounce(fn, wait) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn.apply(this, args), wait);\n  };\n}\n\n\n//# sourceURL=webpack://theme-base-shopify/./src/modules/cart/cart-utils.js?");

/***/ }),

/***/ "./src/modules/cart/cart.js":
/*!**********************************!*\
  !*** ./src/modules/cart/cart.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProducts: () => (/* binding */ addProducts),\n/* harmony export */   btnAddToCart: () => (/* binding */ btnAddToCart),\n/* harmony export */   changeItem: () => (/* binding */ changeItem),\n/* harmony export */   deleteItem: () => (/* binding */ deleteItem),\n/* harmony export */   openCloseCart: () => (/* binding */ openCloseCart),\n/* harmony export */   submitForm: () => (/* binding */ submitForm),\n/* harmony export */   updateCart: () => (/* binding */ updateCart)\n/* harmony export */ });\n/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/api */ \"./src/services/api.js\");\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/query-selector */ \"./src/utils/query-selector.js\");\n/* harmony import */ var _utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/toggle-dataset */ \"./src/utils/toggle-dataset.js\");\n/* harmony import */ var _cart_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart-utils */ \"./src/modules/cart/cart-utils.js\");\n/* harmony import */ var _update_cart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./update-cart */ \"./src/modules/cart/update-cart.js\");\n\n\n\n\n\nconst CART_SECTION = 'side-cart,cart-page';\n\n/**\n * Add products in cart\n * @param {event} event -Event submit from add to cart form\n * @param {event} event -Event submit from add to cart form\n */\nconst addProducts = async event => {\n  const buttonContent = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.btn-cart-js', event.target);\n  const textButton = buttonContent.textContent;\n  const valueCount = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#quantity') ? (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#quantity').value : 1;\n  const itemId = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)(\"input[name='id']\", event.target).value;\n  (0,_cart_utils__WEBPACK_IMPORTED_MODULE_3__.addSpinner)('.btn-cart-js', event.target);\n  const cartParams = {\n    items: [{\n      id: itemId,\n      quantity: valueCount\n    }],\n    sections: CART_SECTION\n  };\n  const {\n    sections,\n    ...response\n  } = await _services_api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addToCart(cartParams);\n  if (response.status === 422) {\n    (0,_cart_utils__WEBPACK_IMPORTED_MODULE_3__.cartAlert)(response);\n    buttonContent.textContent = textButton;\n    return;\n  }\n  if (!sections) return null;\n  buttonContent.textContent = textButton;\n  if (event.target.dataset.form !== 'upsell') {\n    (0,_utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_2__.dataToggle)((0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#shopify-section-side-cart'), true);\n  }\n  (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updateCartItems)(sections['side-cart']);\n  (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updateCartbutton)(sections['side-cart']);\n  (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updatetotalPrice)(sections['side-cart']);\n  (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updateUpsell)(sections['side-cart']);\n};\n\n/**\n * Event listener on submit form\n * and prevent default behavior\n * @param {ElementHTML} form - Element node to add product. Its HTML form\n */\nconst submitForm = form => {\n  form.addEventListener('submit', e => {\n    e.preventDefault();\n    addProducts(e);\n  });\n};\n\n/**\n * Listen if add to cart form is submited\n * if add to cart form is submited add products in cart\n *\n * if you want to add the event to a single repeated element,\n * you can use only the form selector for example.\n * but if you have several events on the same page\n * that load at different times, you can pass the parent of\n * the element so that it only loads that event and\n * not the ones that are loaded.\n * @param {string} formQuery - className reference in form add-to-cart\n *\n * To active this feature - ADD className 'add-cart-js' in form product\n * */\nconst btnAddToCart = (formQuery, scope = null) => {\n  const addForms = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Qll)(formQuery, scope);\n  if (addForms != null) {\n    addForms.forEach(form => {\n      submitForm(form);\n    });\n  }\n};\n\n/**\n * Update quantity for each item in cart\n * @param {number} id Product ID\n * @param {number} quantity new quantity\n */\nconst updateCart = async (line, quantity, id) => {\n  const priceNode = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)(`#price-${id}`);\n  const priceBefore = priceNode.textContent;\n  const quantityBefore = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)(`.item-cart-js[data-index=\"${line}\"]`).dataset.quantity;\n  const cartParams = {\n    line,\n    quantity,\n    sections: CART_SECTION\n  };\n  (0,_cart_utils__WEBPACK_IMPORTED_MODULE_3__.addSpinner)(`#price-${id}`);\n  const {\n    sections,\n    ...response\n  } = await _services_api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].changeCart(cartParams);\n  if (response.status === 422) {\n    priceNode.textContent = priceBefore;\n    (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updateQuantity)(id, quantityBefore);\n    (0,_cart_utils__WEBPACK_IMPORTED_MODULE_3__.cartAlert)(response);\n    return false;\n  }\n  if (!sections) return false;\n  if (Number(quantity) === 0) {\n    (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updateCartItems)(sections['side-cart']);\n    (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updateCartbutton)(sections['side-cart']);\n    (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updatetotalPrice)(sections['side-cart']);\n    (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updateUpsell)(sections['side-cart']);\n  } else {\n    (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updatePriceItem)(sections['side-cart'], id);\n    (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updateCartbutton)(sections['side-cart']);\n    (0,_update_cart__WEBPACK_IMPORTED_MODULE_4__.updatetotalPrice)(sections['side-cart']);\n  }\n  return true;\n};\n\n/**\n * Event onChange in the cart item\n */\nconst changeItem = (scope = null) => {\n  const input = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.item-cart-js', scope);\n  input.addEventListener('change', (0,_cart_utils__WEBPACK_IMPORTED_MODULE_3__.debounce)(async () => {\n    const udpate = await updateCart(input.dataset.index, input.value, input.id);\n    if (udpate) {\n      input.setAttribute('data-quantity', input.value);\n    }\n  }, 500).bind(undefined));\n};\n\n/**\n * Delete item in cart\n * listen if delete button is clicked\n * if is clicked, update cart with quantity 0\n */\nconst deleteItem = (scope = null) => {\n  const element = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.item-delete', scope);\n  if (!element) return;\n  const {\n    dataset: {\n      id,\n      index\n    }\n  } = element;\n  element.addEventListener('click', () => updateCart(index, 0, `${id}-${index}`));\n};\n\n/**\n* Open and close side cart with various buttons\n*/\nconst openCloseCart = () => {\n  const cartContainer = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.side-cart');\n  const btnCart = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.button-cart-js');\n  if (!cartContainer || !btnCart) return;\n  cartContainer.setAttribute('data-active', 'false');\n  (0,_utils_toggle_dataset__WEBPACK_IMPORTED_MODULE_2__.toggleDataActive)('.button-cart-js', '.side-cart', {\n    overlay: true,\n    closeSelector: '.cart-close-js'\n  });\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/modules/cart/cart.js?");

/***/ }),

/***/ "./src/modules/cart/index.js":
/*!***********************************!*\
  !*** ./src/modules/cart/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProducts: () => (/* reexport safe */ _cart__WEBPACK_IMPORTED_MODULE_0__.addProducts),\n/* harmony export */   initCart: () => (/* reexport safe */ _cart_init__WEBPACK_IMPORTED_MODULE_1__.initCart),\n/* harmony export */   submitForm: () => (/* reexport safe */ _cart__WEBPACK_IMPORTED_MODULE_0__.submitForm)\n/* harmony export */ });\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart */ \"./src/modules/cart/cart.js\");\n/* harmony import */ var _cart_init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart-init */ \"./src/modules/cart/cart-init.js\");\n\n\n\n\n//# sourceURL=webpack://theme-base-shopify/./src/modules/cart/index.js?");

/***/ }),

/***/ "./src/modules/cart/update-cart.js":
/*!*****************************************!*\
  !*** ./src/modules/cart/update-cart.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateCartItems: () => (/* binding */ updateCartItems),\n/* harmony export */   updateCartbutton: () => (/* binding */ updateCartbutton),\n/* harmony export */   updatePriceItem: () => (/* binding */ updatePriceItem),\n/* harmony export */   updateQuantity: () => (/* binding */ updateQuantity),\n/* harmony export */   updateUpsell: () => (/* binding */ updateUpsell),\n/* harmony export */   updatetotalPrice: () => (/* binding */ updatetotalPrice)\n/* harmony export */ });\n/* harmony import */ var _utils_to_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/to-html */ \"./src/utils/to-html.js\");\n/* harmony import */ var _utils_query_selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/query-selector */ \"./src/utils/query-selector.js\");\n/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart */ \"./src/modules/cart/cart.js\");\n/* harmony import */ var _cart_bar_progress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cart-bar-progress */ \"./src/modules/cart/cart-bar-progress.js\");\n/* harmony import */ var _components_slider_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/slider-component */ \"./src/components/slider-component.js\");\n\n\n\n\n\n\n/**\n * Update cart items section in sidecart\n * @param {string} str - String HTML of section rendeirng\n */\nconst updateCartItems = str => {\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Qll)('.cartitems-js').forEach(element => {\n    const elementRef = element;\n    elementRef.innerHTML = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#cart-items', (0,_utils_to_html__WEBPACK_IMPORTED_MODULE_0__.stringToHTML)(str)).outerHTML;\n  });\n};\n\n/**\n * Update checkout button section in sidecart\n * @param {string} str - String HTML of section rendeirng\n */\nconst updateCartbutton = str => {\n  const inputBarProgress = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#progress-bar-data', (0,_utils_to_html__WEBPACK_IMPORTED_MODULE_0__.stringToHTML)(str));\n  const checkoutBtnAPI = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#cart-checkout-js', (0,_utils_to_html__WEBPACK_IMPORTED_MODULE_0__.stringToHTML)(str));\n  const domBtnContainer = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Qll)('#container-footer-js');\n  (0,_cart_bar_progress__WEBPACK_IMPORTED_MODULE_3__.barProgress)(inputBarProgress);\n  if (checkoutBtnAPI) {\n    domBtnContainer.forEach(element => {\n      const elementRef = element;\n      elementRef.innerHTML = checkoutBtnAPI.outerHTML;\n    });\n    return;\n  }\n  domBtnContainer.forEach(element => {\n    const elementRef = element;\n    elementRef.innerHTML = '';\n  });\n};\n\n/**\n * Chance all input value only cart page\n *\n * @param {String} id - Variant id item cart\n * @param {String} quantity - Quantity variant by item cart\n */\nconst updateQuantity = (id, quantity) => {\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Qll)(`.item-cart-js[id=\"${id}\"]`).forEach(element => {\n    const elementRef = element;\n    elementRef.value = quantity;\n  });\n};\n\n/**\n * Update price item for each item in cart items section\n * @param {string} str - String HTML of section rendeirng\n * @param {number} id - Product ID\n */\nconst updatePriceItem = (str, id) => {\n  const {\n    dataset,\n    outerText\n  } = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)(`#price-${id}`, (0,_utils_to_html__WEBPACK_IMPORTED_MODULE_0__.stringToHTML)(str));\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Qll)(`.price-${id}`).forEach(element => {\n    const elementRef = element;\n    elementRef.innerHTML = outerText;\n  });\n  updateQuantity(id, dataset.quantity);\n};\n\n/**\n * Update total price in cart page\n * @param {string} str - String HTML of section rendeirng\n */\nconst updatetotalPrice = str => {\n  if (!(0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.cartpage-footer')) return;\n  if (!(0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#total-price', (0,_utils_to_html__WEBPACK_IMPORTED_MODULE_0__.stringToHTML)(str))) {\n    (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.cartpage-footer').style.display = 'none';\n    return;\n  }\n  if ((0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.cartpage-footer__info--price') != null) {\n    (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.cartpage-footer__info--price').innerHTML = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#total-price', (0,_utils_to_html__WEBPACK_IMPORTED_MODULE_0__.stringToHTML)(str)).outerText;\n  }\n};\n\n/**\n * Update upsell section in sidecart\n * @param {string} str - String HTML of section rendeirng\n */\nconst updateUpsell = str => {\n  if (!(0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#upsell-js')) return;\n  (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#upsell-js').innerHTML = (0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('#cart-upsell-slider', (0,_utils_to_html__WEBPACK_IMPORTED_MODULE_0__.stringToHTML)(str)).outerHTML;\n  (0,_components_slider_component__WEBPACK_IMPORTED_MODULE_4__.createSlider)((0,_utils_query_selector__WEBPACK_IMPORTED_MODULE_1__.$Q)('.slider-js.swiperElsidecart'));\n  (0,_cart__WEBPACK_IMPORTED_MODULE_2__.btnAddToCart)('.add-product-cart-upsell');\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/modules/cart/update-cart.js?");

/***/ }),

/***/ "./src/services/api.js":
/*!*****************************!*\
  !*** ./src/services/api.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\nconst routes = window.routes;\n\n/**\n* Client for the Shopify API\n*/\nclass API {\n  /**\n  * Add products to cart\n  * @param {{\n  *   items: object,\n  *   sections: string,\n  * }} config  – Contains the products to add,\n  * the quantity and section to update\n  * @returns {object} Line items associated with the added items and sections\n  */\n  async addToCart({\n    items,\n    sections = undefined\n  }) {\n    const formData = {\n      items\n    };\n\n    // Support bundled section rendering\n    if (sections) {\n      formData.sections = sections;\n    }\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_0___default()({\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        url: `${routes.cart_add_url}.js`,\n        data: JSON.stringify(formData)\n      });\n      response.data.status = response.status;\n      return response.data;\n    } catch (error) {\n      return {\n        ...error.response,\n        sections: ''\n      };\n    }\n  }\n\n  /**\n  * Update the cart's line item quantities\n  * @param {{\n  *   id: number,\n  *   quantity: number,\n  *   sections: string\n  * }} config – Contains the product variant,\n  * the quantity and section to update\n  * @returns {object} The JSON of the cart and HTML of the sections\n  */\n  async updateCart({\n    id,\n    quantity,\n    sections = undefined\n  }) {\n    const formData = {\n      updates: {\n        [id]: quantity\n      }\n    };\n\n    // Support bundled section rendering\n    if (sections) {\n      formData.sections = sections;\n    }\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_0___default()({\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        url: `${routes.cart_update_url}.js`,\n        data: JSON.stringify(formData)\n      });\n      response.data.status = response.status;\n      return response.data;\n    } catch (error) {\n      return {\n        ...error.response,\n        sections: ''\n      };\n    }\n  }\n\n  /**\n  * Update the cart's line item quantities\n  * @param {{\n   *   line: number,\n   *   quantity: number,\n   *   sections: string\n   * }} config – Contains the product variant,\n   * the quantity and section to update\n   * @returns {object} The JSON of the cart and HTML of the sections\n   */\n  async changeCart({\n    line,\n    quantity,\n    sections = undefined\n  }) {\n    const formData = {\n      line,\n      quantity\n    };\n\n    // Support bundled section rendering\n    if (sections) {\n      formData.sections = sections;\n    }\n    try {\n      const response = await axios__WEBPACK_IMPORTED_MODULE_0___default()({\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json'\n        },\n        url: `${routes.cart_change_url}.js`,\n        data: JSON.stringify(formData)\n      });\n      response.data.status = response.status;\n      return response.data;\n    } catch (error) {\n      return {\n        ...error.response,\n        sections: ''\n      };\n    }\n  }\n\n  /**\n  * Render up to five sections with the use of Section Rendering API\n  * @param {string} sections – section IDs\n  * @returns {object} Includes pairs for each section ID and its\n  * corresponding rendered HTML\n  */\n  async renderShopifySection(sections) {\n    try {\n      const {\n        data: html\n      } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`?sections=${sections}`);\n      return html;\n    } catch (error) {\n      // eslint-disable-next-line no-undef\n      console.error(`Error: ${error.message}`);\n    }\n  }\n  async shopifySectionByUrl(base, section) {\n    try {\n      const {\n        data: html\n      } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`${base}?section_id=${section}`);\n      return html;\n    } catch (error) {\n      // eslint-disable-next-line no-undef\n      console.error(`Error: ${error.message}`);\n    }\n  }\n  async recommendationByApi(productId, sectionId) {\n    try {\n      const {\n        data: html\n      } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`${routes.recommendation}?product_id=${productId}&limit=4&section_id=${sectionId}`);\n      return html;\n    } catch (error) {\n      console.error(`Error: ${error.message}`);\n    }\n  }\n\n  /**\n   * Render HTML with given variant\n   * @param {String} base - URL for the API call\n   * @param {String} variantID - Id of the selected variant\n   * @returns {Object} - Section mainproduct for variant selected\n   *\n   * @author Andres Briñez\n   */\n  async shopifyVariantByUrl(base, variantID) {\n    try {\n      const {\n        data: html\n      } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(`${base}?variant=${variantID}`);\n      return html;\n    } catch (error) {\n      // eslint-disable-next-line no-undef\n      console.error(`Error: ${error.message}`);\n    }\n  }\n\n  /**\n  * It is used to recommend related products for a specific product\n  * @param {{\n  *   id: number,\n  *   limit: number,\n  *   sectionId: string\n  * }} config – Product ID on which the recommendation will be based,\n  * the result limit and the section with which the recommended\n  * products will be rendered\n  * @returns {object} Array with the recommended products or, if the section ID\n  * is supplied, HTML from a section rendered with product recommendations\n  */\n  async getRecommendedProducts({\n    id,\n    limit,\n    sectionId = undefined\n  }) {\n    try {\n      let url;\n      if (sectionId) {\n        // Support section rendering\n        url = `/recommendations/products?section_id=${sectionId}&product_id=${id}&limit=${limit}`;\n      } else {\n        url = `/recommendations/products.json?product_id=${id}&limit=${limit}`;\n      }\n      const {\n        data\n      } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(url);\n      return data;\n    } catch (error) {\n      // eslint-disable-next-line no-undef\n      console.error(`Error: ${error.message}`);\n    }\n  }\n\n  /**\n  * Get data from a resource\n  * @param {string} url – The path of the resource to obtain\n  * @returns {object} Data from a resource\n  */\n  async read(url) {\n    try {\n      const {\n        data\n      } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get(url);\n      return data;\n    } catch (error) {\n      // eslint-disable-next-line no-undef\n      console.error(`Error: ${error.message}`);\n    }\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new API());\n\n//# sourceURL=webpack://theme-base-shopify/./src/services/api.js?");

/***/ }),

/***/ "./src/templates/cart.js":
/*!*******************************!*\
  !*** ./src/templates/cart.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_cart_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/cart/scss/style.scss */ \"./src/modules/cart/scss/style.scss\");\n/* harmony import */ var _modules_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/cart */ \"./src/modules/cart/index.js\");\n\n\n(0,_modules_cart__WEBPACK_IMPORTED_MODULE_1__.initCart)();\n\n//# sourceURL=webpack://theme-base-shopify/./src/templates/cart.js?");

/***/ }),

/***/ "./src/utils/add-script-tag.js":
/*!*************************************!*\
  !*** ./src/utils/add-script-tag.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addSwiperScript: () => (/* binding */ addSwiperScript),\n/* harmony export */   addTagScript: () => (/* binding */ addTagScript)\n/* harmony export */ });\n/* harmony import */ var _query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-selector */ \"./src/utils/query-selector.js\");\n\n\n/**\nA function that adds a script tag to the document body.\n@param {string} script - The source URL of the script.\n@returns {void}\n*/\nconst addTagScript = (script, reference) => {\n  if (!script || !reference) return;\n  const scriptTag = (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(`#${reference}`);\n  if (scriptTag || window[`${reference}`]) {\n    return new Promise(resolve => {\n      resolve(true);\n    });\n  }\n  return new Promise((resolve, reject) => {\n    const scriptTag = document.createElement('script');\n    scriptTag.src = script;\n    scriptTag.setAttribute('id', reference);\n    scriptTag.onload = () => {\n      window[`${reference}`] = true;\n      resolve(true);\n    };\n    scriptTag.onerror = () => {\n      reject(new Error(`Failed to load script ${scriptTag.src}`));\n    };\n    const theme = (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('#MainContent');\n    theme.insertAdjacentElement('beforebegin', scriptTag);\n  });\n};\nconst addSwiperScript = async callback => {\n  const scriptNode = (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('#swiper-script-js');\n  if (!scriptNode) return;\n  const {\n    dataset: {\n      script\n    }\n  } = scriptNode;\n  const loadScript = await addTagScript(script, 'swiperScript');\n  if (loadScript && callback) {\n    callback();\n  }\n  return loadScript;\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/add-script-tag.js?");

/***/ }),

/***/ "./src/utils/blackListSlider.js":
/*!**************************************!*\
  !*** ./src/utils/blackListSlider.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   blackListSlider: () => (/* binding */ blackListSlider)\n/* harmony export */ });\n/* add class selectors or id, parents, of the slider you want to ignore.\nnote that it must be the parent closest to your slider.\nThese sliders will be ignored when loading general\nsliders, or those you want to add via a click event. */\n\nconst parentSliderIgnore = ['#upsell-js', '.other'];\n\n// eslint-disable-next-line max-len\nconst blackListSlider = slider => parentSliderIgnore.some(exception => slider.closest(exception));\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/blackListSlider.js?");

/***/ }),

/***/ "./src/utils/input-quantity.js":
/*!*************************************!*\
  !*** ./src/utils/input-quantity.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setQuantity: () => (/* binding */ setQuantity)\n/* harmony export */ });\n/* harmony import */ var _query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-selector */ \"./src/utils/query-selector.js\");\n\n\n/**\n * add or subtract input value\n * @author Cristian Velasco\n */\nfunction updateQuantity() {\n  const input = (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)('input', this.parentElement);\n  if (this.dataset.action === 'subtr') {\n    if (input.value > 0) input.value--;\n  } else {\n    input.value++;\n  }\n  return input.dispatchEvent(new Event('change'));\n}\n\n/**\n  * Set quantity\n  * Set item quantity with custom input,\n  * Execute updateCart function\n* @author Cristian Velasco\n*/\nconst setQuantity = (scope = null) => {\n  (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Qll)('.quantity-label', scope).forEach(labelParent => (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Qll)('.button', labelParent).forEach(btn => {\n    btn.addEventListener('click', updateQuantity);\n  }));\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/input-quantity.js?");

/***/ }),

/***/ "./src/utils/query-selector.js":
/*!*************************************!*\
  !*** ./src/utils/query-selector.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   $Q: () => (/* binding */ $Q),\n/* harmony export */   $Qll: () => (/* binding */ $Qll)\n/* harmony export */ });\n/**\n * @param {String} nodes - ClassList with DOM reference\n * @param {HTMLElement} parent - Parent of nodes\n * @returns {Array} Array of nodes in DOM\n */\nconst $Qll = (nodes,\n// eslint-disable-next-line no-undef\nparent) => [...(parent || document).querySelectorAll(nodes)];\n\n/**\n *\n * @param {HTMLElement} node - ClassName with DOM reference\n * @param {HTMLElement} parent - Parent of nodes\n * @returns {Node} Node in DOM\n */\n// eslint-disable-next-line no-undef\nconst $Q = (node, parent) => (parent || document).querySelector(node);\n\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/query-selector.js?");

/***/ }),

/***/ "./src/utils/script-defer.js":
/*!***********************************!*\
  !*** ./src/utils/script-defer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createInterception: () => (/* binding */ createInterception)\n/* harmony export */ });\n/* eslint-disable no-undef */\n/**\n * This function detects, by means of the observer,\n * the interception with the slider,\n * to load it, and then disconnects the observer for the corresponding element.\n * @param {Node} entries - element node html, container slider\n * @param {Event} observer - observer event\n * @param {Function} callback - function callback start slider\n */\nconst executeInterception = (entries, observer, params) => entries.forEach(entry => {\n  if (entry.isIntersecting) {\n    params.callback();\n    if (params.unobserve) {\n      observer.unobserve(entry.target);\n    }\n  }\n});\n\n/**\n * Creates the interceptor for the node\n * indicated in the parameter indicated as slide\n * @param {Node} element - element container slider\n * @param {Function} callback - callback init slider\n */\nconst createInterception = (element, callback, options = {\n  root: null,\n  rootMargin: '120px',\n  unobserve: true\n}) => {\n  const optionsRoot = options;\n  const unobserve = options.unobserve || false;\n  delete optionsRoot.unobserve;\n  const intersectionObserver = new IntersectionObserver((entries, observer) => executeInterception(entries, observer, {\n    callback,\n    unobserve\n  }), optionsRoot);\n  intersectionObserver.observe(element);\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/script-defer.js?");

/***/ }),

/***/ "./src/utils/to-html.js":
/*!******************************!*\
  !*** ./src/utils/to-html.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   stringToHTML: () => (/* binding */ stringToHTML)\n/* harmony export */ });\n/* eslint-disable no-undef */\nconst support = () => {\n  if (!window.DOMParser) return false;\n  const parser = new DOMParser();\n  try {\n    parser.parseFromString('x', 'text/html');\n  } catch (err) {\n    return false;\n  }\n  return true;\n};\n\n/**\n * Convert a template string into HTML DOM nodes\n * @param  {String} str The template string\n * @return {Node}       The template HTML\n */\nconst stringToHTML = str => {\n  // If DOMParser is supported, use it\n  if (support()) {\n    const parser = new DOMParser();\n    const doc = parser.parseFromString(str, 'text/html');\n    return doc.body;\n  }\n\n  // Otherwise, fallback to old-school method\n  const dom = document.createElement('div');\n  dom.innerHTML = str;\n  return dom;\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/to-html.js?");

/***/ }),

/***/ "./src/utils/toggle-dataset.js":
/*!*************************************!*\
  !*** ./src/utils/toggle-dataset.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   dataToggle: () => (/* binding */ dataToggle),\n/* harmony export */   isActive: () => (/* binding */ isActive),\n/* harmony export */   toggleDataActive: () => (/* binding */ toggleDataActive)\n/* harmony export */ });\n/* harmony import */ var _query_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-selector */ \"./src/utils/query-selector.js\");\n\n\n/**\n *\n * @param {String} id - ID from node manipulate\n * @param {Boolean} active - If modal active\n * @param {HTMLElement} node - Node to manipulate\n */\nconst overlayActions = (id, active, node) => {\n  const idOverlay = `overlay--${id}`;\n  const parent = node.parentNode;\n  if (!active) {\n    // eslint-disable-next-line no-undef\n    const overlay = document.createElement('div');\n    overlay.setAttribute('id', idOverlay);\n    overlay.classList.add('overlay');\n    parent.insertBefore(overlay, node);\n    // eslint-disable-next-line no-use-before-define\n    toggleDataActive(`#${idOverlay}`, `#${id}`, {\n      overlay: true\n    });\n  } else {\n    parent.removeChild((0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(`#${idOverlay}`));\n  }\n};\n\n/**\n * To validate state in dataset node\n */\nconst isActive = ({\n  active\n}) => active === 'true';\n\n/**\n* Data Toggle\n*\n* @param {HTMLElement} node - Node to manipulate\n* @param {Boolean} overlay - if used to a overlay\n*/\nfunction dataToggle(node, overlay) {\n  const {\n    dataset,\n    id\n  } = node;\n  const active = isActive(dataset);\n  if (active) {\n    dataset.active = 'false';\n  } else {\n    dataset.active = 'true';\n  }\n  if (overlay) overlayActions(id, active, node);\n}\n/**\n * Data Active toggle\n *\n * @param {String} control - ID button control\n * @param {String} node - ID modal\n * @param {Object} config - Object with overlay, closeSelector\n */\nconst toggleDataActive = (control, node, config = {}) => {\n  const {\n    overlay,\n    closeSelector,\n    video\n  } = config;\n  (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(control).addEventListener('click', () => {\n    dataToggle((0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(node), overlay, video);\n  });\n  if (closeSelector) {\n    (0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(closeSelector).addEventListener('click', () => dataToggle((0,_query_selector__WEBPACK_IMPORTED_MODULE_0__.$Q)(node), overlay));\n  }\n};\n\n//# sourceURL=webpack://theme-base-shopify/./src/utils/toggle-dataset.js?");

/***/ }),

/***/ "./src/modules/cart/scss/style.scss":
/*!******************************************!*\
  !*** ./src/modules/cart/scss/style.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://theme-base-shopify/./src/modules/cart/scss/style.scss?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/templates/cart.js");
/******/ 	
/******/ })()
;