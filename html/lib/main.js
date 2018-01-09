var task1=function(){
    console.log('task1 is loaded');
}
setTimeout(task1,3000);

require.config({
    paths:{
        'jquery-3.2.1':'jquery-3.2.1.min',
        'underscore':'underscore-min',
        'backbone':'backbone-min'
    }
})
require(['jquery-3.2.1','underscore','backbone'],function (j,u,b){
    // console.log(mod);
    console.log(j);//undefined
    console.log(jQuery);
    console.log(u);
    console.log(b);
    $(document).ready(function($){
        console.log('document is ready');
    });
});

require(['math'],function(math){
    var sum = math.add(2,3);
    console.log(sum);
});
