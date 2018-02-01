/* 异步编程系列03
   co function
   npm install co
   ref: http://www.ruanyifeng.com/blog/2015/05/co.html
   
   co 函数原理
   co函数将两种自动执行器（thunk函数和promise函数）包装成一个库
   co函数使用条件：yield后 是thunk函数或promise对象
   
   generator函数是一个异步操作容器，异步操作有结果后，自动交回执行权
   两种方法实现generator函数自动执行：1.thunk函数 2.promise对象
*/

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
co(gen);//co(gen)返回的是promise对象
co(gen).then(function(){
    console.log('func after gen');
});
//1.thunk函数自动执行generator - 参考js14-thunk.js
//2.promise对象的自动执行generator

var readfile=function(filename){
    return new Promise(function(resolve,reject){
        fs.readFile(filename,function(err,data){
            if(err) reject(err);
            resolve(data);
        });
    });
}

var g=gen();
g.next().value(function(data){
    g.next(data).value(function(data){
        g.next(data);
    });
})
