/* js datatype 

*/

//1. 基础类型 包装类型

//Number
console.log('-------Number--------')
var n1=10;
var n2=new Number(10);
console.log(n1==n2);
console.log(n1===n2);
console.log(typeof n1 +' '+ typeof n2);

//String
console.log('-------String--------')
var s1='hello world';
var s2=new String('hello world');
var s3='hello world';
console.log(s1==s2);
console.log(s1===s2);
console.log(s1===s3);
console.log(typeof s1 +' '+ typeof s2);

//Boolean
console.log('-------Boolean--------')
var b1=true;
var b2=new Boolean(true);
console.log(b1==b2);
console.log(b1===b2);
console.log(typeof b1 +' '+typeof b2);

//Array
console.log('-------Array--------')
var arr1=[1,2];
var arr2=new Array(2);
arr2[0]=1;
arr2[1]=2;
console.log(arr1==arr2);
console.log(arr1===arr2);
console.log(typeof arr1+' '+typeof arr2);

//Object
console.log('-------Object--------')
var obj1={name:'obj1',f:function(){ return '123'; }}
var obj2=new Object();
obj2.name='obj1';
obj2.f=function(){ return '123'; }
console.log(obj1==obj2);
console.log(obj1===obj2);
console.log(typeof obj1+' '+typeof obj2);

