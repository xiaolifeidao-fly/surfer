"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/framework-utils";
exports.ids = ["vendor-chunks/framework-utils"];
exports.modules = {

/***/ "(ssr)/./node_modules/framework-utils/dist/utils.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/framework-utils/dist/utils.esm.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Properties: () => (/* binding */ Properties),\n/* harmony export */   prefixCSS: () => (/* binding */ prefixCSS),\n/* harmony export */   prefixNames: () => (/* binding */ prefixNames),\n/* harmony export */   ref: () => (/* binding */ ref),\n/* harmony export */   refs: () => (/* binding */ refs),\n/* harmony export */   withMethods: () => (/* binding */ withMethods)\n/* harmony export */ });\n/*\nCopyright (c) 2019 Daybrush\nname: framework-utils\nlicense: MIT\nauthor: Daybrush\nrepository: git+https://github.com/daybrush/framework-utils.git\nversion: 1.1.0\n*/\nfunction prefixNames(prefix) {\n  var classNames = [];\n\n  for (var _i = 1; _i < arguments.length; _i++) {\n    classNames[_i - 1] = arguments[_i];\n  }\n\n  return classNames.map(function (className) {\n    return className.split(\" \").map(function (name) {\n      return name ? \"\" + prefix + name : \"\";\n    }).join(\" \");\n  }).join(\" \");\n}\nfunction prefixCSS(prefix, css) {\n  return css.replace(/([^}{]*){/gm, function (_, selector) {\n    return selector.replace(/\\.([^{,\\s\\d.]+)/g, \".\" + prefix + \"$1\") + \"{\";\n  });\n}\n/* react */\n\nfunction ref(target, name) {\n  return function (e) {\n    e && (target[name] = e);\n  };\n}\nfunction refs(target, name, i) {\n  return function (e) {\n    e && (target[name][i] = e);\n  };\n}\n/* Class Decorator */\n\nfunction Properties(properties, action) {\n  return function (component) {\n    var prototype = component.prototype;\n    properties.forEach(function (property) {\n      action(prototype, property);\n    });\n  };\n}\n/* Property Decorator */\n\nfunction withMethods(methods, duplicate) {\n  if (duplicate === void 0) {\n    duplicate = {};\n  }\n\n  return function (prototype, propertyName) {\n    methods.forEach(function (name) {\n      var methodName = duplicate[name] || name;\n\n      if (methodName in prototype) {\n        return;\n      }\n\n      prototype[methodName] = function () {\n        var _a;\n\n        var args = [];\n\n        for (var _i = 0; _i < arguments.length; _i++) {\n          args[_i] = arguments[_i];\n        }\n\n        var result = (_a = this[propertyName])[name].apply(_a, args);\n\n        if (result === this[propertyName]) {\n          return this;\n        } else {\n          return result;\n        }\n      };\n    });\n  };\n}\n\n\n//# sourceMappingURL=utils.esm.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZnJhbWV3b3JrLXV0aWxzL2Rpc3QvdXRpbHMuZXNtLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQix1QkFBdUI7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSwyQkFBMkIsSUFBSTtBQUMvQixtQ0FBbUMsc0NBQXNDO0FBQ3pFLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVzRTtBQUN0RSIsInNvdXJjZXMiOlsid2VicGFjazovL25leHQtYWRtaW4vLi9ub2RlX21vZHVsZXMvZnJhbWV3b3JrLXV0aWxzL2Rpc3QvdXRpbHMuZXNtLmpzP2JiYzMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbkNvcHlyaWdodCAoYykgMjAxOSBEYXlicnVzaFxubmFtZTogZnJhbWV3b3JrLXV0aWxzXG5saWNlbnNlOiBNSVRcbmF1dGhvcjogRGF5YnJ1c2hcbnJlcG9zaXRvcnk6IGdpdCtodHRwczovL2dpdGh1Yi5jb20vZGF5YnJ1c2gvZnJhbWV3b3JrLXV0aWxzLmdpdFxudmVyc2lvbjogMS4xLjBcbiovXG5mdW5jdGlvbiBwcmVmaXhOYW1lcyhwcmVmaXgpIHtcbiAgdmFyIGNsYXNzTmFtZXMgPSBbXTtcblxuICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgIGNsYXNzTmFtZXNbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gIH1cblxuICByZXR1cm4gY2xhc3NOYW1lcy5tYXAoZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgIHJldHVybiBjbGFzc05hbWUuc3BsaXQoXCIgXCIpLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgcmV0dXJuIG5hbWUgPyBcIlwiICsgcHJlZml4ICsgbmFtZSA6IFwiXCI7XG4gICAgfSkuam9pbihcIiBcIik7XG4gIH0pLmpvaW4oXCIgXCIpO1xufVxuZnVuY3Rpb24gcHJlZml4Q1NTKHByZWZpeCwgY3NzKSB7XG4gIHJldHVybiBjc3MucmVwbGFjZSgvKFtefXtdKil7L2dtLCBmdW5jdGlvbiAoXywgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gc2VsZWN0b3IucmVwbGFjZSgvXFwuKFteeyxcXHNcXGQuXSspL2csIFwiLlwiICsgcHJlZml4ICsgXCIkMVwiKSArIFwie1wiO1xuICB9KTtcbn1cbi8qIHJlYWN0ICovXG5cbmZ1bmN0aW9uIHJlZih0YXJnZXQsIG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChlKSB7XG4gICAgZSAmJiAodGFyZ2V0W25hbWVdID0gZSk7XG4gIH07XG59XG5mdW5jdGlvbiByZWZzKHRhcmdldCwgbmFtZSwgaSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcbiAgICBlICYmICh0YXJnZXRbbmFtZV1baV0gPSBlKTtcbiAgfTtcbn1cbi8qIENsYXNzIERlY29yYXRvciAqL1xuXG5mdW5jdGlvbiBQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIGFjdGlvbikge1xuICByZXR1cm4gZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgIHZhciBwcm90b3R5cGUgPSBjb21wb25lbnQucHJvdG90eXBlO1xuICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgIGFjdGlvbihwcm90b3R5cGUsIHByb3BlcnR5KTtcbiAgICB9KTtcbiAgfTtcbn1cbi8qIFByb3BlcnR5IERlY29yYXRvciAqL1xuXG5mdW5jdGlvbiB3aXRoTWV0aG9kcyhtZXRob2RzLCBkdXBsaWNhdGUpIHtcbiAgaWYgKGR1cGxpY2F0ZSA9PT0gdm9pZCAwKSB7XG4gICAgZHVwbGljYXRlID0ge307XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKHByb3RvdHlwZSwgcHJvcGVydHlOYW1lKSB7XG4gICAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgbWV0aG9kTmFtZSA9IGR1cGxpY2F0ZVtuYW1lXSB8fCBuYW1lO1xuXG4gICAgICBpZiAobWV0aG9kTmFtZSBpbiBwcm90b3R5cGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcblxuICAgICAgICB2YXIgYXJncyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IChfYSA9IHRoaXNbcHJvcGVydHlOYW1lXSlbbmFtZV0uYXBwbHkoX2EsIGFyZ3MpO1xuXG4gICAgICAgIGlmIChyZXN1bHQgPT09IHRoaXNbcHJvcGVydHlOYW1lXSkge1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCB7IFByb3BlcnRpZXMsIHByZWZpeENTUywgcHJlZml4TmFtZXMsIHJlZiwgcmVmcywgd2l0aE1ldGhvZHMgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWxzLmVzbS5qcy5tYXBcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/framework-utils/dist/utils.esm.js\n");

/***/ })

};
;