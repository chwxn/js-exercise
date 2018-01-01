/* inheritance 继承
 function constructor
 构造函数继承
第一种：构造函数绑定，即用call(apply)把父对象的this指向改为子对象
    --继承构造器的属性方法
第二种：prototype模式，即把子对象的prototype对象指向父对象的一个实例;
    缺点：如果子对象的prototype对象上有属性或方法时，将被清除;
      注意：当改了prototype对象的constructor时，记得改回来，否则将造成继承链紊乱;
    --继承构造器的属性方法,同时继承原型上的属性方法
第三种：直接继承prototype，即child.prototype = parent.prototype;
    优点：相比第二种效率更高，比较省内存;
    缺点：如果子对象的prototype对象上有属性或方法时，将被清除;
         且子对象的prototype对象修改后父对象的prototype会被修改;
    --继承原型的属性方法
第四种：利用空对象作为中介，第三种的升级版;
    缺点：如果子对象的prototype对象上有属性或方法时，将被清除;
    --继承原型的属性方法
第五种：拷贝继承
    缺点：只能继承原型上的属性和方法;
    优点：如果子对象的prototype对象上有属性或方法时，不会被清除,
         且子对象的prototype对象修改后父对象的prototype不会被修改;
    --继承原型的属性方法
总结：继承加在原型上的属性和方法时用第五种，
而继承写在构造函数里的属性和方法则用第一种，两则结合用
*/

function animal(){
    this.type='animal';
}
function cat(name,color){
    this.name=name;
    this.color=color;
}
//1.
console.log('1.构造函数绑定 call apply')

function cat(name,color){
    this.name=name;
    this.color=color;
    animal.apply(this,arguments);
}
var c=new cat('a','yellow');
console.log(c);
console.log(c.type);

//2.
console.log('2.prototype 模式');
// 用var cat= function 防止解释器造成函数提升
var cat = function (name,color){
    this.name=name;
    this.color=color;
}
cat.prototype=new animal;
console.log(cat.prototype===animal);//false
console.log(typeof cat.prototype);
console.log(cat.prototype);
console.log(cat.prototype.constructor===animal);//true
cat.prototype.constructor=cat;
console.log(cat.prototype.constructor===animal);//false
console.log(cat.prototype.constructor===cat);//true
var c=new cat('b','red');
console.log(c.constructor===animal);//false
console.log(c.constructor===cat);//true
console.log(c);
console.log(c.type);

//3.
console.log('3.直接继承prototype');
var animal=function(){}
animal.prototype.type='animal';

cat.prototype=animal.prototype;
cat.prototype.constructor=cat;
var c1=new cat('c','green');
console.log(c);
console.log(c.type);
console.log(cat.prototype);
//缺陷
console.log('修改cat.prototepe造成animal.prototype修改');
cat.prototype.test='cat.prototype add test';
console.log('animal.prototype: '+animal.prototype.test);

//4.
console.log('4.利用空对象做中介');
function extend(child,parent){
    var f=function(){};
    f.prototype=parent.prototype;
    child.prototype=new f();
    child.prototype.constructor=child;
    child.uber=parent.prototype;
}
var animal=function(){};
animal.prototype.type='animal';
var cat=function (name,color){
    this.name=name;
    this.color=color;
}
extend(cat,animal);
var c =new cat('d','blue');
console.log(c.type);
console.log(cat.prototype);
console.log(cat.prototype.type===c.type);
cat.prototype.test='cat.prototype add test'
console.log(animal.prototype.test);
// console.log(animal.prototype.constructor);

//5.
console.log('5.拷贝继承');
//浅拷贝
function extend1(child,parent){
    var p=parent.prototype;
    var c=child.prototype;
    for(var i in p){
        c[i]=p[i];
    }
    c.uber=p;
}
var cat=function (name,color){
    this.name=name;
    this.color=color;
}
extend1(cat,animal);
console.log(cat.prototype);


