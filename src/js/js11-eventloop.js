//1.XMLHttpRequest
console.log('-------XMLRequest---------');
var xhr=new XMLHttpRequest();
xhr.open('get','http://code.jquery.com/jquery-3.2.1.min.js');
xhr.send();
//主线程模拟等待，Ajax异步任务，主线程（执行栈）执行完代码再去 查询事件队列。
//因此，onload onerror事件可以放在send()后绑定
var i=100;
while(true){
    i=i+100;
    if(i>10E9){//10E10
        break;
    }
}
xhr.onload=function(){ console.log(xhr.statusText); };
xhr.onerror=function(e){ console.log('error'); };

//2.timer 定时器  定时器：setTimeout setInterval 内部机制相同，前者执行一次，后者反复执行
console.log('-------Timer---------');
console.log('1');
setTimeout(function(){ console.log('2'); },0);
console.log('3');