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
console.log('---------co func custom-----------');
g.next().value.then(function(data){
    g.next(data).value.then(function(data){
        g.next(data);
        console.log('hand gen end');
    });
})

//自动执行
console.log('---------co func automate-----------');
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

//co func src
console.log('---------co func src code-----------');
var co=function(gen){
    var ctx=this;
    return new Promise(function(resolve,reject){
        if(typeof gen==='function') gen=gen.call(ctx);
        if(!gen||typeof gen.next!=='function')return resolve(gen);

        var onFulfilled = function (res){
            var ret;
            try{
                ret=gen.next(res);
            }catch(e){
                return reject(e);
            }
            next(ret);
        }
        var onRejected=function(handle){
            throw new Error(handle);
        }
        
        var next=function(ret){
            if(ret.done)return resolve(ret.value);
            //var value=toPromise.call(ctx,ret.value);
            var value=ret.value;
            if(value){//&&isPromise(value)
                return value.then(onFulfilled,onRejected);
            }
            return onRejected(
                new TypeError('You may only yield a function, promise, generator, array, or object, '
            + 'but the following object was passed: "' + String(ret.value) + '"'));
        };
        
        onFulfilled();
    });
}
var gen=function*(){
    var f1=yield readfile('tmp/b.txt');
    var f2=yield readfile('tmp/b.txt');
    console.log(f1.toString());
    console.log(f2.toString());
}
co(gen).then(function(){
    console.log('this call after custom co func ');
})


//并发异步执行 异步执行放在数组或对象
var co=require('co');
co(function*(){
    console.log('async exec by array');
    var res=yield [
        Promise.resolve(1),
        Promise.resolve(2)
    ];
    console.log(res);
}).catch(onerror);;

co(function*(){
    console.log('async exec by object');
    var res=yield {
        1:Promise.resolve(1),
        2:Promise.resolve(2)
    };
    console.log(res);
}).catch(onerror);

var onerror=function(e){
    console.log(e);
}