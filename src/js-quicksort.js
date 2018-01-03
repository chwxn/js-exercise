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
console.log(sorted==a);

//2.
console.log('--------quicksort 2 original array sorted----------');
var partition=function(arr,start,end){
    var pivot=arr[start];
    while(start<end){
        while(start<end&&pivot<=arr[end]){
            end--;
        }
        [arr[start],arr[end]]=[arr[end],arr[start]];
        while(start<end&&pivot>=arr[start]){
            start++;
        }
        [arr[start],arr[end]]=[arr[end],arr[start]];
    }
    return start;
}
var sort=function(arr,start,end){
    if(start>end){
        return;
    }
    var mid=partition(arr,start,end);
    sort(arr,start,mid-1);
    sort(arr,mid+1,end);
}
var a=[101,9,3,5,7,2,91,6];
console.log(a);
sort(a,0,a.length-1);
console.log(a);

