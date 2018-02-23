/* js datatype 

*/

//1. 基础类型 包装类型

//判断 null undefined
//null 已声明 已定义 值为空
//undefined 已声明或未声明 未定义 值为空
//undefined: 1.声明未赋值 2.调用函数参数未提供 3.对象未赋值的属性 4.函数没有返回值
console.log(null==undefined);//true
console.log(null===undefined);//false
var obj={};
console.log(obj.name);//undefined
obj.name=null;
console.log(obj.name);//null
console.log(Object.getPrototypeOf(Object.prototype));//null
//Object.getPrototypeOf()
var f=function(){}
console.log(f());//undefined

//Number
console.log('-------Number--------')
var n1=10;
var n2=new Number(10);
console.log(n1==n2);//true
console.log(n1===n2);//false
console.log(typeof n1 +' '+ typeof n2);//number object
var n3=new Number(null);//0
console.log('number(null):'+n3);
var n4=new Number(undefined);//NaN
console.log('number(undefined):'+n4);

Number.prototype.add=function(y){
    return this+y;
}
Number.prototype.subtract=function(y){
    return this-y;
}
var x=10;
console.log(x.add(2));
console.log(8..add(4));
console.log(x.add(2).subtract(3));
console.log(9['add'](10));
Number.prototype.iterate=function(){
    var result=[];
    for(var i=0;i<=this;i++){
        result.push(i);
    }
    return result;
}
console.log(9..iterate());
//去掉括号
Number.prototype=Object.defineProperty(Number.prototype,'double',{get:function(){ return this+this; }});
Number.prototype=Object.defineProperty(Number.prototype,'square',{get:function(){ return this*this; }});
console.log(x.double.square);
console.log(x.iterate());//定义属性不会冲掉原型上已有的属性

//String
console.log('-------String--------')
var s1='hello world';
var s2=new String('hello world');
var s3='hello world';
console.log(s1==s2);//true
console.log(s1===s2);//false
console.log(s1===s3);//true
console.log(typeof s1 +' '+ typeof s2);//string object
console.log(s2);
//Boolean
console.log('-------Boolean--------')
var b1=true;
var b2=new Boolean(true);
console.log(b1==b2);//true
console.log(b1===b2);//false
console.log(typeof b1 +' '+typeof b2);//boolean object
console.log(b2);
//Array
console.log('-------Array--------')
var arr1=[1,2];
var arr2=new Array(2);
arr2[0]=1;
arr2[1]=2;
console.log(arr1==arr2);//false
console.log(arr1===arr2);//false
console.log(typeof arr1+' '+typeof arr2);//object object
console.log(arr2);
//Object
console.log('-------Object--------')
var f=function(){ return '123'; };
var name='obj1';
var obj1={name:name,f:f}
var obj2=new Object();
obj2.name=name;
obj2.f=f;
console.log(obj1==obj2);//false
console.log(obj1===obj2);//false
console.log(typeof obj1+' '+typeof obj2);//object object
console.log(obj2);

//
console.log('-------other--------');
console.log(0==null);//false

var a1=[undefined,undefined,undefined];
var a2=[,,,];
console.log(a1[0]===a2[0]);//true
console.log(0 in a1);//true
console.log(0 in a2);//true
console.log(a1.hasOwnProperty(0));//false
console.log(a2.hasOwnProperty(0));//true
console.log(Object.keys(a1));
console.log(Object.keys(a2));
console.log('--------map---------');
console.log(a1.map(a=>{ console.log(a);return 1; }));//执行log
console.log(a2.map(a=>{ console.log(a);return 1; }));//console.log 不执行
