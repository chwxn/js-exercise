/* inheritance 继承
   继承 - 非构造函数继承
   浅拷贝
   深拷贝
*/

//1.
console.log('object 方法');
function obj(o){
    function f(){};
    f.prototype=o;
    return new f();
}
var chinese={
    nation:'china'
}
var doctor=obj(chinese);
console.log(doctor.nation);//china
console.log(typeof doctor);//object
doctor.career='career: doctor';
console.log(doctor);//{...}
console.log(doctor.career);//

//2.
console.log('浅拷贝 参考 js-inheritance.js');

//3.
console.log('深拷贝');

//此方法只拷贝构造器属性方法,不拷贝原型的属性方法
function deepcopy(p,c){
    var child=c||{};
    var parent=p;
    for(var i in parent){
        //console.log(i);
        if(typeof parent[i] === 'object'){
            // console.log(typeof parent[i]);
            // if(parent[i].constructor===Array){
            //     child[i]=[];
            // }else{
            //     child[i]={};
            // }
            child[i]=(parent[i].constructor===Array)?[]:{};
            deepcopy(parent[i],child[i]);
        }else{
            child[i]=parent[i];
        }
    }
    return child;
}

var animal={
    type:'name',
    obj:{name:'animal',f:function(){console.log('this is obj')}},
    arr:[1,2,3],
};
// animal.prototype.type='animal';
// animal.prototype.obj={name:'animal',f:function(){console.log('this is obj')}}
// animal.prototype.arr=[1,2,3];

var cat={
    name:'cat',
    color:'color'
}

var c =deepcopy(animal,cat);

animal.arr.push(4);

console.log(c.name);
console.log(c.color);

console.log(c.type);
console.log(c.obj);
console.log(c.arr);

