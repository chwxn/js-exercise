/* js 封装 encapsulation

*/

//1.
console.log('--------encapsulation 1---------');
var obj={
    name:'obj1',
    m:function(){ console.log('obj1 method...'); }
}

//2.
console.log('--------encapsulation 2---------');
function cat(name,color){
    return {
        name:name,
        color:color
    }
}

//3. 
console.log('--------encapsulation 3---------');
function cat(name,color){
    this.name=name;
    this.color=color;
}

var cat1=new cat('a','blue');
var cat2=new cat('b','red');
console.log(cat1.constructor===cat);
console.log(cat1 instanceof cat);

//4. prototype pattern
console.log('--------encapsulation 4 prototype---------');
function cat(name,color){
    this.name=name;
    this.color=color;
}
//建议将不可变属性绑定到prototype上  可变： object array
cat.prototype.type='cat belongs to animal';
cat.prototype.eat=function(){ console.log('cat eat something...'); }

var cat3=new cat('c','green');
var cat4=new cat('d','gray');
console.log(cat3.type===cat4.type);
console.log(cat3.eat===cat4.eat);

//
console.log('Constructor--------------------')
console.log(cat3.constructor===cat)//true
console.log(cat.constructor===Function);//true
console.log(cat.prototype.constructor===cat);//true
// instance.constructor => function 
// function constructor => Function
// function prototype constructor => function

console.log('Prototype---------------------')
console.log(cat.prototype);//{...}
console.log(typeof cat.prototype);//object
console.log(cat);//function
console.log(typeof cat);//function
console.log(cat.prototype===cat)//false
// function prototype => object

//验证 prototype 模式
console.log('Is Prototype Of--------------------');
console.log(cat.prototype.isPrototypeOf(cat3));//true
console.log(cat.prototype.isPrototypeOf(cat4));//true

console.log('Has Own Property--------------------')
console.log(cat.hasOwnProperty('name'));//true
console.log(cat.hasOwnProperty('type'));//false

console.log('In--------------------');
console.log('name' in cat3);
console.log('type' in cat3);

//
console.log('For In--------------------');
for(var prop in cat3){
    console.log(prop+' '+cat3[prop]);
}

