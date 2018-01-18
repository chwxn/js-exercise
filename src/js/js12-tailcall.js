/* tail call
   ref:
   http://www.ruanyifeng.com/blog/2015/04/tail-call.html
   http://www.zcfy.cc/article/all-about-recursion-ptc-tco-and-stc-in-javascript-2813.html
   http://2ality.com/2014/04/call-stack-size.html
*/
//'use strict'
//1.定义：函数在最后一步操作调用另一函数、并且没有其他运算
//函数调用会形成调用栈(call stack)
//f1调用f2，f2压栈f1栈，f2执行完出栈，f1执行完出栈
console.log('------1.definition-------');
function f1(){
    //some code
    return f2();
}
function f2(){
    //some code
}
//非 尾调用
function f3(){
    //some code
    return f2()+1;
}

//2.tail recursive
//recursive
//普通递归，当调用层数太多时，栈上保存太多函数调用，会发生 栈溢出 错误
console.log('------2.recursive-------');
function factorial(n){
    if(n<=1)return n;
    return n*factorial(n-1);
}
//console.log(factorial(50000));//RangeError: Maximum call stack size exceeded
console.log(factorial(5));

//tail recursive
var factorial=function(n,total){
    if(n<=1)return total;
    return factorial(n-1,n*total);
}
console.log(factorial(5,1));

//3. tail recursive optimization
console.log('------3.tail recursive opti-------');
//opt 1
var tailfactorial=function(n,total){
    //console.trace();
    if(n<=1)return total;
    return tailfactorial(n-1,n*total);
}
var factorial=function(n){
    return tailfactorial(n,1);
}
console.log(factorial(5));

//opt 2：柯里化(currying)
function currying(fn,n){
    return function(m){
        return fn.call(this,m,n);
    }
}
var tailfactorial=function(n,total){
    //console.trace();
    if(n<=1)return total;
    return tailfactorial(n-1,n*total);
}
var factorial=currying(tailfactorial,1);
console.log(factorial(5));

//opt 3:
var factorial=function(n,total=1){
    //console.trace();
    if(n<=1)return total;
    return factorial(n-1,n*total);
}
//console.log(factorial(50000));//RangeError: Maximum call stack size exceeded
console.log(factorial(6));

//opt 4:
var factorial=function(n,total=1){
    while(n>=0){
    //console.trace();
    if(n<=1)
        return total;
    total=n*total;
    n=n-1;
    }
}
console.log(factorial(5));

//4.how many recursive calls
var computeMaxCallStackSize=function(){
    try{
        return 1+computeMaxCallStackSize();
    }   catch(e){
        return 1;
    } 
}
console.log(computeMaxCallStackSize());//node v8.9.1 win10x64 8952 

//5. ????   it would run forever under ECMAScript 6 (in strict mode)
'use strict';
var computeMaxCallStackSize=function(n){
    var n=n||1;
    return computeMaxCallStackSize(n+1);
}
computeMaxCallStackSize();

