/* 异步编程系列01
   Generator函数：函数交出执行权，也即可以暂停执行.
   函数遇到yield关键字暂停执行
   协程：并行协作完成任务
   ref:
   http://www.ruanyifeng.com/blog/2015/04/generator.html
*/

//1.definition
console.log('---------generator 1------------');
function* gen(n){
    var y=yield n+1;
    console.log(y);//调用next后 undefined
    return y;
}
var p=gen(3);//调用gen返回内部指针(遍历器)，不会返回结果，调用next分阶段执行yield表达式
console.log(p.next());//{value:4,done:false} value是当前yield后表达式的值 done表示是否执行完毕，还有下一个阶段
console.log(p.next());//{value:undefined,done:true}

//2.next
console.log('---------generator 2------------');
var gen=function* (n){
    var y=yield n+n;
    console.log(y);
    return y;
}
var p1=gen(4);
console.log(p1.next());
console.log(p1.next(20));//next接受一个参数时，表示向generator函数内输入数据，作为上个异步任务的返回结果 y打印20

//3.exception async
console.log('---------generator 3------------');
var gen=function* (n){
    var y;
    try{
        y=yield n+n;
    }catch(e){
        console.log(e);
    }
    return y;
}
var p2=gen(6);
console.log(p2.next());
p2.throw('error throws at outer scope of function');//出错代码 处理错误代码 分离

//4. fetch async
console.log('---------generator 4------------');
//需要下载 node-fetch模块 
//npm install node-fetch --save
var fetch=require('node-fetch');
var gen=function* (){
    var url='https://api.github.com/users/github';
    var result=yield fetch(url);
    //console.log('gen:'+result);
    return result.bio;
}

var pointer = gen();
var result=pointer.next();
console.log(result);
result.value.then(function(data){
    //console.log(data);
    var str=data.json();
    return str;
}).then(function(json){
    //console.log(json);
    var result = pointer.next(json);
    console.log(result);
});