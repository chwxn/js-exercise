/* quicksort 快排
*/
//1.
console.log('--------quicksort 1 recursive----------');
var quicksort=function(arr){
    if(arr.length<=1){
        return arr;
    }
    var index=Math.floor(arr.length/2);
    var value= arr[index];//arr.splice(index,1)[0];
    var left =[];
    var right =[];
    for(var i=0;i<arr.length;i++){
        if(index!=i){
            var cur=arr[i];
            if(cur<=value){
                left.push(cur);
            }else{
                right.push(cur);
            }
        }
    }
    return quicksort(left).concat([value]).concat(quicksort(right));
}

var a=[101,9,3,5,7,2,91,6];
//var a=[2,4,3,4,6,3,2,5,6,2,3,6,5,4];
console.log(a);
var sorted=quicksort(a);
console.log(sorted);

//2.
console.log('--------quicksort 2 recursive original array----------');
var quick=function(start,end){
}
var sort=function(arr,start,end){
}
var a=[101,9,3,5,7,2,91,6];
console.log(a);
sort(a,0,a.length);
console.log(a);