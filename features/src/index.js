"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// require all modules on the path and with the pattern defined
var requireModule = require.context('./', true, /\.(js|ts)$/);
var modules = requireModule.keys().filter(function (fileName) { return fileName.indexOf("index") < 0; }).map(requireModule);
// export all modules
exports.default = modules;
