// console.log('-------------module 2-------------');
// console.log(module.id);
// console.log(module.exports);
// console.log(module.parent);
// console.log(module.filename);
// console.log(module.loaded);
// console.log(module.children);
// console.log(module.paths);

exports.done=false;
var b =require('./b.js');
console.log('a.js b.done=%j',b.done);
exports.done=true;
console.log('a.js done');
