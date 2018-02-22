//参见 src/ts/circulardepend

// import {foo} from './tmp/b.js';
// console.log(foo);
// setTimeout(()=>console.log(foo),500);


//根据打印结果：b.js中，仅执行a.js的第一行
var a=require('./tmp/a');
var b=require('./tmp/b');//可注释测试，此行无输出

console.log('circulardepend a.done=%j b.done=%j',a.done,b.done);
