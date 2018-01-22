/* 异步编程系列02
   Thunk函数
   ref:
   http://www.ruanyifeng.com/blog/2015/05/thunk.html
*/

//1.prerequisite

var x=1;
var f=function(m){
    return m*2;
}
f(x+1);

//求值策略：传值调用 or 传名调用
// 传值调用：先计算，后传值 (c语言)。较简单，缺点 对于未使用的参数造成性能损失
// 传名调用: 先传值，后计算 (Haskell语言)。执行时求值

//2.Thunk函数：编译器'传名调用'实现，参数放到临时函数中，再将临时函数传入函数体，这个临时函数为Thunk函数
var x=10;
var f=function(m){
    return m*2;
}
f(x+2);
//等同于
var thunk=function(){
    return x+2;
}
var f=function(thunk){
    return thunk()*2;
}


