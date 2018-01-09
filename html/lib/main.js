var task1=function(){
    console.log('task1 is loaded');
}
setTimeout(task1,3000);

require.config({
    paths:{
        'jquery-3.2.1':'jquery-3.2.1.min'
    }
})
require(['jquery-3.2.1'],function (mod){
    // console.log(mod);
    console.log($);
    $(document).ready(function($){
        console.log('document is ready');
    });
});
