/* js object exist
   判断 对象是否存在 
   只判断对象是否存在推荐 3
   判断对象是否存在,并且判断是否是null 推荐 1
*/
//1.
// js 先解析 后运行
// var命令代码提升

// if(!obj){
//     obj={};//error
// }

if(!obj){
    var obj={};// normal
}

//2.
if(!this.obj1){
    this.obj1={};
    console.log(this);
}
//不推荐使用window 不利于跨平台
// if(!window.obj3){
//     window.obj3={};
// }

//3. 
if(typeof obj2==='undefined'){
    var obj2={};
    console.log(obj2);
}
