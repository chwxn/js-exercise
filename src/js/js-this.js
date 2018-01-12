//1. call function
 console.log('-----------function call-----------');
function f(){
    this.x=10;
    console.log(this.x);
}
f();

var y=11;
function f1(){
    y=111;
    console.log(y);
}
f1();

//2. object method
console.log('-----------object method-----------');
var obj={ name:'obj',f3:function(){ console.log('this function is object method;'); } }
obj.f3();

//3. constructor  function
console.log('-----------function constructor-----------');
var z=100;
function f4(){
    this.z=134;
    this.m=function(){
        console.log('hello world');
    }
}
var o=new f4();
var val = o.z;
console.log(val);
o.m();

//4 apply call 
console.log('-----------apply call-----------');

var z=120;
function f5(){
    this.z=200;
    this.m=function(){
        console.log(this.z);
    }
}
var o=new f5;
console.log(o.z);
o.m();
o.m.apply();//不同平台下有差异

