"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/flru";
exports.ids = ["vendor-chunks/flru"];
exports.modules = {

/***/ "(ssr)/./node_modules/flru/dist/flru.mjs":
/*!*****************************************!*\
  !*** ./node_modules/flru/dist/flru.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(max) {\n\tvar num, curr, prev;\n\tvar limit = max || 1;\n\n\tfunction keep(key, value) {\n\t\tif (++num > limit) {\n\t\t\tprev = curr;\n\t\t\treset(1);\n\t\t\t++num;\n\t\t}\n\t\tcurr[key] = value;\n\t}\n\n\tfunction reset(isPartial) {\n\t\tnum = 0;\n\t\tcurr = Object.create(null);\n\t\tisPartial || (prev=Object.create(null));\n\t}\n\n\treset();\n\n\treturn {\n\t\tclear: reset,\n\t\thas: function (key) {\n\t\t\treturn curr[key] !== void 0 || prev[key] !== void 0;\n\t\t},\n\t\tget: function (key) {\n\t\t\tvar val = curr[key];\n\t\t\tif (val !== void 0) return val;\n\t\t\tif ((val=prev[key]) !== void 0) {\n\t\t\t\tkeep(key, val);\n\t\t\t\treturn val;\n\t\t\t}\n\t\t},\n\t\tset: function (key, value) {\n\t\t\tif (curr[key] !== void 0) {\n\t\t\t\tcurr[key] = value;\n\t\t\t} else {\n\t\t\t\tkeep(key, value);\n\t\t\t}\n\t\t}\n\t};\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZmxydS9kaXN0L2ZscnUubWpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSw2QkFBZSxvQ0FBVTtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25leHQtYWRtaW4vLi9ub2RlX21vZHVsZXMvZmxydS9kaXN0L2ZscnUubWpzPzZmZWEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG1heCkge1xuXHR2YXIgbnVtLCBjdXJyLCBwcmV2O1xuXHR2YXIgbGltaXQgPSBtYXggfHwgMTtcblxuXHRmdW5jdGlvbiBrZWVwKGtleSwgdmFsdWUpIHtcblx0XHRpZiAoKytudW0gPiBsaW1pdCkge1xuXHRcdFx0cHJldiA9IGN1cnI7XG5cdFx0XHRyZXNldCgxKTtcblx0XHRcdCsrbnVtO1xuXHRcdH1cblx0XHRjdXJyW2tleV0gPSB2YWx1ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlc2V0KGlzUGFydGlhbCkge1xuXHRcdG51bSA9IDA7XG5cdFx0Y3VyciA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cdFx0aXNQYXJ0aWFsIHx8IChwcmV2PU9iamVjdC5jcmVhdGUobnVsbCkpO1xuXHR9XG5cblx0cmVzZXQoKTtcblxuXHRyZXR1cm4ge1xuXHRcdGNsZWFyOiByZXNldCxcblx0XHRoYXM6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHJldHVybiBjdXJyW2tleV0gIT09IHZvaWQgMCB8fCBwcmV2W2tleV0gIT09IHZvaWQgMDtcblx0XHR9LFxuXHRcdGdldDogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0dmFyIHZhbCA9IGN1cnJba2V5XTtcblx0XHRcdGlmICh2YWwgIT09IHZvaWQgMCkgcmV0dXJuIHZhbDtcblx0XHRcdGlmICgodmFsPXByZXZba2V5XSkgIT09IHZvaWQgMCkge1xuXHRcdFx0XHRrZWVwKGtleSwgdmFsKTtcblx0XHRcdFx0cmV0dXJuIHZhbDtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdGlmIChjdXJyW2tleV0gIT09IHZvaWQgMCkge1xuXHRcdFx0XHRjdXJyW2tleV0gPSB2YWx1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGtlZXAoa2V5LCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/flru/dist/flru.mjs\n");

/***/ })

};
;