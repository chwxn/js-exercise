/* js 
   unicode to char
   char to unicode
*/
//1. u to 
console.log('------unicode to char---------');
var reg=/\\u[0-9a-z]{4}/gim;
var utoc=function(u){
    if(typeof u==='string'){
        if(u.indexOf('\\u')){
            u=u.substr(2);
        }
        var num=parseInt(u,16);
        var s = String.fromCharCode(num);
        return s;
    }
    return '';
}
var stoc=function (str){
    if(typeof str==='string'){
        var s = str.replace(reg,utoc);
        return s;
    }
    return '';
}

//test

var s='a\u4E70';
console.log(s.match(reg));
console.log(stoc(s));

var ch = utoc('4e71');
console.log(ch);

var str='hwhelloworld\u4e71h12 hello s \u6e2dwhat';
console.log(stoc(str));


//2. c to u
console.log('------char to unicode---------');
var ctou=function(c){
    if(typeof c==='string'){
        var num = c.charCodeAt();
        var u=num.toString(16);
        return '\\u'+u;
    }
    return '';
}

console.log(ctou('u'));
