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
// 传值调用：先计算，后传值 (c语言 js)。较简单，缺点 对于未使用的参数造成性能损失
// 传名调用: 先传值，后计算 (Haskell语言)。执行时求值

//2.Thunk函数：实现编译器'传名调用'，参数放到临时函数中，再将临时函数传入函数体，这个临时函数为Thunk函数
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

//3.thunk函数转换
//多参数 转换成 单参数
var thunk=function(fn){
    return function(){
        var args=Array.prototype.slice.call(arguments);
        return function(callback){
            args.push(callback);
            return fn.apply(this,args);
        }
    }
}

var f=function(name,callback){
    console.log(name);
    callback.apply(this);
}

var t=thunk(f);
t('this is name')(function(){ console.log('this is callback'); });

//4.thunkify模块  npm install thunkify
console.log('-------thunkify---------');
//模拟thunkify 
var thunkify=function(fn){
    return function(){
        var args=new Array(arguments.length);
        var ctx=this;
        for (var i = 0; i < args.length; i++) {
            args[i]=arguments[i];
        }
        return function(done){
            var called;
            args.push(function(){
                if(called) return;
                called=true;
                for(x in arguments)
                    console.log('arguments:'+x+' '+arguments[x]);
                done.apply(this,arguments);
            });
            try{
                fn.apply(ctx,args);
            }catch(err){
                done(err);
            }
        }
    }
}
var f=function(a,b,callback){
    var sum=a+b;
    callback(sum);//thunkify 只允许回调执行一次
    console.log('sum print before or after');
    callback(sum);
}
var t=thunkify(f);
t(2,3)(console.log);

//5.apply
console.log('-------thunkify applicable---------');
var fs=require('fs');
var readfile=thunkify(fs.readFile);
var gen=function* (){
    var r1=yield readfile('tmp/a.txt');
    console.log(r1.toString());
    var r2=yield readfile('tmp/b.txt');
    console.log(r2.toString());
}

var g=gen();
var r1=g.next();
r1.value(function(err,data){
    if(err) throw err;
    var r2=g.next(data);
    r2.value(function(err,data){
        if(err) throw err;
        g.next(data);
    });
});
