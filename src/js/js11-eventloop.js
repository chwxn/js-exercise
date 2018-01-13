//1.HttpRequest
var http=require('http');
var postdata=JSON.stringify({name:'test'});
var options={
    host:'code.jquery.com',
    hostname:'',
    path:'/jquery-3.2.1.min.js',
    method:'get',
    port:80,
    protocol:'http:',
    family:4,
    headers:{
        //'Content-Type':'application/*',
        'Content-Length':Buffer.byteLength(postdata),
    },
}
var req=http.request(options,function(res){
    console.log('statusCode:'+res.statusCode);
    res.setEncoding('utf8');
    var text='';
    res.on('data',(chunk)=>{
        //console.log(chunk);
        //text+=chunk;
        text=chunk;
    });
    res.on('end',()=>{
        console.log(text.substr(text.length-50));
    });
});
req.write(postdata);
req.on('error',(e)=>{ console.log('error:'+e); });
req.end();

//2.timer 定时器  定时器：setTimeout setInterval 内部机制相同，前者执行一次，后者反复执行
console.log('-------Timer---------');
console.log('1');
setTimeout(function(){ console.log('2'); },0);
console.log('3');
//nextTick 是在 当前执行栈尾部、下次EventLoop读取事件队列前 执行回调函数
process.nextTick(function(arg){
    console.log(arg);
},'nextTick callback');
//有多个nextTick不管是否嵌套都会在当前执行栈尾部执行
process.nextTick(function(){
    console.log('nextTick callback 1');
    process.nextTick(function(){
        console.log('nextTick callback nest');
    });
});

