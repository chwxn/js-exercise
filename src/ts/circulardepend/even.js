"use strict";
exports.__esModule = true;
var odd_1 = require("./odd.js");
exports.counter = 0;
function even(n) {
    exports.counter++;
    return n == 0 || odd_1.odd(n - 1);
}
exports.even = even;
