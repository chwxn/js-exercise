/* quicksort 快排
*/
var cmp_count=0;
var swap_count=0;
function swap(arr,a,b){
    swap_count++;
    var tmp=arr[a];
    arr[a]=arr[b];
    arr[b]=tmp;
}
function cmp(a,b){
    cmp_count++;
    return a-b;
}
function checkresult(arr){
    var val=arr[0];
    for (let index = 1; index < arr.length; index++) {
        if(val>arr[index]){
            return false;
        }
        val=arr[index];
    }
    return true;
}
var count = 2000;
var arr = [];
for(var i=0; i<count; i++){
    arr.push(Math.floor(Math.random() * count));
}

//1.
//--------quicksort 1 recursive----------
var ruanyf_quicksort=function(arr){
    if(arr.length<=1){
        return arr;
    }
    var index=Math.floor(arr.length/2);
    var value= arr[index];//arr.splice(index,1)[0];
    var left =[];
    var right =[];
 swap_count++;
    for(var i=0;i<arr.length;i++){
        if(index!=i){
            var cur=arr[i];
            if(cmp(cur,value)<0){
                swap_count++;
                left.push(cur);
            }else{
                swap_count++;
                right.push(cur);
            }
        }
    }
 //swap_count++;
    return ruanyf_quicksort(left).concat([value]).concat(ruanyf_quicksort(right));
}

//2.
//--------quicksort 2 original array sorted----------
var partition=function(arr,start,end){
    var pivot=arr[start];//基准
    while(start<end){
        while(start<end&& cmp(pivot,arr[end])<=0 ){
            end--;
        }
        if(start!=end){
            //[arr[start],arr[end]]=[arr[end],arr[start]];
            swap(arr,start,end);
        }
        while(start<end&& cmp(pivot,arr[start])>=0){
            start++;
        }
        if(start!=end){
            //[arr[start],arr[end]]=[arr[end],arr[start]];
            swap(arr,start,end);
        }
    }
    return start;
}
var qsort=function(arr,start,end){
    if(start>=end){
        return;
    }
    var mid=partition(arr,start,end);
    qsort(arr,start,mid-1);
    qsort(arr,mid+1,end);
}

//3. wintercn quicksort
function wintercn_qsort(arr,start,end){
    var midVal=arr[start];
    var l=start+1;
    var r=end;
    while(l<r){
        while(cmp(arr[l],midVal)>0 && l<r){
            swap(arr,l,r--);
        }
        l++;
    }
    var mid=arr[r]>midVal?r-1:r;
    swap(arr,start,mid);
    if(start<mid){
        wintercn_qsort(arr,start,mid-1);
    }
    if(mid<end){
        wintercn_qsort(arr,mid+1,end);
    }
}

function test(fn){
    cmp_count=0;
    swap_count=0;
    var arr1=arr.slice(0,arr.length-1);
    var st=(new Date()).getTime();
    var arr_result = fn(arr1,0,arr1.length-1);
    var et=(new Date()).getTime();
    if(fn===ruanyf_quicksort){
        var pass= checkresult(arr_result);
    }else{
        var pass = checkresult(arr1);
    }
    if(!pass){
        console.log(''+fn.name+' quicksort fail!');
        return;
    }
    console.log(fn.name);
    console.log('    swap_count:'+swap_count+' cmp_count:'+cmp_count+' time:'+ (et-st));
}

test(ruanyf_quicksort);
test(qsort);
test(wintercn_qsort);