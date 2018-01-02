/* bubble sort
*/
//1.
console.log('--------bubblesort ----------');
var bubblesort=function(arr){
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

