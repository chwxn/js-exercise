/* bubble sort
*/
//1.
console.log('--------bubblesort ----------');
var bubblesort=function(arr){
    //todo:check
    for(var i=0;i<arr.length;i++){
        var k=i;
        for(var j=i+1;j<arr.length;j++){
            if(arr[k]>arr[j]){
                k=j;
            }
        }
        if(k!=i){
            var tmp=arr[i];
            arr[i]=arr[k];
            arr[k]=tmp;
        }
    }
}

var a=[101,9,3,5,7,2,91,6];
console.log(a);
bubblesort(a);
console.log(a);

//2.
console.log('--------bubblesort 1----------');
var bubblesort1=function(arr){
    //todo:check
    var len=arr.length;
    var lastSwapIndex=len-2;
    do{
        var index;
        for(var i=0;i<=lastSwapIndex;i++){
            if(arr[i]>arr[i+1]){
                var tmp=arr[i];
                arr[i]=arr[i+1];
                arr[i+1]=tmp;
                index=i;
            }
        }
        lastSwapIndex=index;
    }while(lastSwapIndex>0);
}
var a=[101,9,3,5,7,2,91,6];
bubblesort1(a);
console.log(a);
