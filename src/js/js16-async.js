/*  异步编程系列04
    Async函数就是Generator函数的语法糖
    ref:http://www.ruanyifeng.com/blog/2015/05/async.html
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

