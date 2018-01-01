/* 闭包 
1.变量作用域: 全局 局部
2.函数内函数：
  链式作用域结构：子对象会一级一级找到所有父对象的变量
  所以 父对象的所有变量对子对象都是可见的，反之不成立
  
*/

//1.
console.log('--------closure 1-----------');
function f(){
    var count=0;
    var counter = function(){
        count++;
        console.log(count);
    }
    return counter;
}
var counter = f();
counter();

//2.
console.log('--------closure 2-----------');
var add;
function f2(){
    var n=0;
    add=function(){ n+=1; };
    function counter(){
        console.log(n);
    }
    return counter;
}
var counter=f2();
add();
add();
counter();

//3.
console.log('--------closure 3-----------');
global.name='window';
var obj={
    name:'my obj',
    getName:function(){
        // console.log(this.name);
        return function(){
            console.log(this.name);
            console.log(this===global);
            
        }
    }
}
var getname=obj.getName();
getname();

// 4.
console.log('--------closure 4-----------');
global.name='window';
var obj1={
    name:"obj1",
    getName:function(){
        var self=this;
        return function(){
            console.log(self.name);
            console.log(self===obj1);
        }
    }
}
obj1.getName()();


// console.log(global);

// console.log(__filename);
// console.log(__dirname);
// console.log(process.platform);


