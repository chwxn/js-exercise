"use strict";
exports.__esModule = true;
var even_1 = require("./even");
function odd(n) {
    return n != 0 || even_1.even(n - 1);
}
exports.odd = odd;
