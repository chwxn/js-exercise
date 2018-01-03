/* js unicode to char
*/

var utoc=function(u){
    if(typeof u==='string'){
        var num=parseInt(u,16);
        var s = String.fromCharCode(num);
        return s;
    }
    return '';
}

var reg=/\\u[0-9a-z]{4}/gim;
var b = reg.test('\\u4E70');
console.log(b);

var ch = utoc('4e71');
console.log(ch);
