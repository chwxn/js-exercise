
//var a=require('./a.js');

exports.done = false;
var a = require('./a.js');
console.log('b.js a.done = %j', a.done);
exports.done = true;
console.log('b.js done');