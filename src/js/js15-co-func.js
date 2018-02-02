/* 异步编程系列03
   co function
   npm install co
   ref: http://www.ruanyifeng.com/blog/2015/05/co.html
   
   co 函数原理
   co函数将两种自动执行器（thunk函数和promise函数）包装成一个库
   co函数使用条件：yield后 是thunk函数或promise对象
   
   generator函数是一个异步操作容器，异步操作有结果后，自动交回执行权
   两种方法实现generator函数自动执行：1.thunk函数 2.promise对象

   异步执行观察输出顺序
*/
console.log('---------co func -----------');
var fs=require('fs');
var co=require('co');
var thunk=require('thunkify');
//#region annotation
// var thunk=function(fn){
//     var args=new Array(arguments.length);
//     var ctx=this;
//     for(x in arguments){
//         args[x]=arguments[x];
//     }
//     return function (callback){
//         var called;
//         args.push(function(){
//             if(called)return;
//             callback.apply(this,arguments);
//         });
//         try{
//             fn.apply(ctx,args);
//         }catch(e){
//             callback(e);
//         }
//     }
// }
//#endregion
var readfile=thunk(fs.readFile);

var gen=function*(){
    var f1=yield readfile('tmp/a.txt');
    var f2=yield readfile('tmp/b.txt');
    console.log(f1.toString());
    console.log(f2.toString());
}
console.log('');
co(gen).then(function(){
    console.log('func after gen');
});//co(gen)返回的是promise对象
// co(gen).then(function(){
//     console.log('func after gen1');
// });

console.log('---------co func 1-----------');
//1.thunk函数自动执行generator - 参考js14-thunk.js
//2.promise对象的自动执行generator
//fs.readFile 用promise对象包装
var readfile=function(filename){
    return new Promise(function(resolve,reject){
        fs.readFile(filename,function(err,data){
            if(err) reject(err);
            resolve(data);
        });
    });
}

var g=gen();
//generator函数手动执行
g.next().value.then(function(data){
    g.next(data).value.then(function(data){
        g.next(data);
        console.log('hand gen end');
    });
})

//自动执行
var run=function(gen){
    var g=gen();
    function next(data){
        var result=g.next(data);
        if(result.done){ 
            console.log('run gen end');
            return result.value;
        }
        result.value.then(function(data){
            next(data);
        });
    }
    next();
}
run(gen);
