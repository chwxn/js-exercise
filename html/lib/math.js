define(function(){
    var add=function(x,y){
        return x+y;
    }
    return {
        add:add
    };
});
/* 
//依赖其他模块
define(['module'],function(){});
*/