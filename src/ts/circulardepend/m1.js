"use strict";
exports.__esModule = true;
exports.foo = 'bar';
setTimeout(function () { return exports.foo = '123'; }, 500);
