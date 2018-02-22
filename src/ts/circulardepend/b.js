"use strict";
exports.__esModule = true;
var a_1 = require("./a");
function bar() {
    if (Math.random() > 0.5) {
        a_1.foo();
    }
}
exports.bar = bar;
