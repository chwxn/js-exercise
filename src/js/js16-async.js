/*  异步编程系列04
    async函数就是generator函数的语法糖
    ref:http://www.ruanyifeng.com/blog/2015/05/async.html

    async优点：
    1.内置执行器 
        async能够自动执行，generator函数需要依靠thunk promise 或者co执行
    2.更好的语义 
    3.更广的适用性 
        co函数规定yield后为thunk或promise
        async await后可以是promise或原始类型-原始类型为同步操作
*/

//1. what is async
var fs=require('fs');
var readfile=function(filename){
    return new Promise(function(resolve,reject){
        fs.readFile(filename,function(err,data){
            if(err) reject(err);
            resolve(data);
        });
    });
}

var asyncreadfile=async function(){
    var f1=await readfile('tmp/a.txt');
    var f2=await readfile('tmp/b.txt');
    console.log(f1.toString());
    console.log(f2.toString());
}

asyncreadfile();

//2.async await实现  将generator函数和自动执行器包装在一个函数里

var spawn=function(gen1){
    return new Promise(function(resolve,reject){
        var gen=gen1();
        var step=function (next){
            try{
                var result=next();
            }catch(e){
                return reject(e);
            }
            if(result.done){
                return resolve(result.value);
            }
            Promise.resolve(result.value).then(function(val){
                step(function(){ return gen.next(val); });
            },function(e){
                step(function(){ return gen.throw(e); });
            });
        }
        step(function(){ return gen.next(undefined); });
    });
}


var gen=function*(){
    var f1=yield readfile('tmp/b.txt');
    var f2=yield readfile('tmp/b.txt');
    console.log(f1.toString());
    console.log(f2.toString());
}

spawn(gen);

//3. async 

var timeout =function(ms){
    return new Promise(function(resolve,reject){
        try{
            setTimeout(resolve,ms);
        }catch(e){
            console.log(e);
        }
    });
}
var asyncprint=async function(msg,ms){
    //异常处理1
    try{
        await timeout(ms);
    }catch(e){
        console.log(e);
    }
    //异常处理2
    await timeout(ms).catch(function(e){
        console.log(e);
    });
    console.log(msg);
}

asyncprint('async print',50);

