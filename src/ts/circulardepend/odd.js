"use strict";
exports.__esModule = true;
var even_1 = require("./even.js");
function odd(n) {
    // console.log(n);
    return n != 0 && even_1.even(n - 1);
}
exports.odd = odd;
