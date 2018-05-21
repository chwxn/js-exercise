/* quicksort 快排
*/
var cmp_count = 0;
var swap_count = 0;
function swap(arr, a, b) {
    swap_count++;
    var tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}
function cmp(a, b) {
    cmp_count++;
    return a - b;
}
function checkresult(arr) {
    var val = arr[0];
    for (let index = 1; index < arr.length; index++) {
        if (val > arr[index]) {
            return false;
        }
        val = arr[index];
    }
    return true;
}
var count = 2000;
var arr = [];
for (var i = 0; i < count; i++) {
    arr.push(Math.floor(Math.random() * count));
}

//1.
//--------quicksort 1 recursive----------
var ruanyf_quicksort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var index = Math.floor(arr.length / 2);
    var value = arr[index];//arr.splice(index,1)[0];
    var left = [];
    var right = [];
    //swap_count++;
    for (var i = 0; i < arr.length; i++) {
        if (index != i) {
            var cur = arr[i];
            if (cmp(cur, value) < 0) {
                swap_count++;
                left.push(cur);
            } else {
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
var partition = function (arr, start, end) {
    var pivot = arr[start];//基准
    while (start < end) {
        while (start < end && cmp(pivot, arr[end]) <= 0) {
            end--;
        }
        if (start != end) {
            //[arr[start],arr[end]]=[arr[end],arr[start]];
            swap(arr, start, end);
        }
        while (start < end && cmp(pivot, arr[start]) >= 0) {
            start++;
        }
        if (start != end) {
            //[arr[start],arr[end]]=[arr[end],arr[start]];
            swap(arr, start, end);
        }
    }
    return start;
}
var qsort = function (arr, start, end) {
    if (start >= end) {
        return;
    }
    var mid = partition(arr, start, end);
    qsort(arr, start, mid - 1);
    qsort(arr, mid + 1, end);
}

//3. qsort_hoare 
function partition_hoare(arr, start, end) {
    var pivot = arr[start];
    var l = start; var r = end;
    while (1) {
        while (cmp(arr[l], pivot) < 0) {
            l++;
        }
        while (cmp(pivot, arr[r]) < 0) {
            r--;
        }
        if (l == r) {
            return l;
        } else if (l > r) {
            return l - 1;
        }
        swap(arr, l, r);
        l++; r--;
    }
}
function qsort_hoare(arr, start, end) {
    if (start >= end) {
        return;
    }
    var p = partition_hoare(arr, start, end);
    qsort_hoare(arr, start, p);
    qsort_hoare(arr, p + 1, end);
}
//
function qsort_hoare_improve(arr, start, end) {
    var pivot = arr[start];
    var l = start + 1; var r = end;
    while (l <= r) {
        while (l <= r && cmp(arr[l], pivot) <= 0) {
            l++;
        }
        if (l > r) {
            break;
        }
        while (l <= r && cmp(pivot, arr[r]) <= 0) {
            r--;
        }
        if (l > r) {
            break;
        }
        swap(arr, l, r);
        l++; r--;
    }
    swap(arr, start, r);
    if (start < r - 1) {
        qsort_hoare_improve(arr, start, r - 1);
    }
    if (l < end) {
        qsort_hoare_improve(arr, l, end);
    }
}
//
function qsort_hoare_improve_not_recursive(arr,start,end){
    var _start=start;
    var _end=end;
    var stack=[];
    while (1) {
        var pivot = arr[_start];
        var l = _start + 1; var r = _end;
        while (l <= r) {
            while (l <= r && cmp(arr[l], pivot) <= 0) {
                l++;
            }
            if (l > r) {
                break;
            }
            while (l <= r && cmp(pivot, arr[r]) <= 0) {
                r--;
            }
            if (l > r) {
                break;
            }
            swap(arr, l, r);
            l++; r--;
        }
        swap(arr, _start, r);
        if(l<_end){
            stack.push(l);
            stack.push(_end);
        }
        if(_start<r-1){
            _end=r-1;
        }else if(stack.length>0){
            _end=stack.pop();
            _start=stack.pop();
        }else{
            break;
        }
    }
}

//4. qsort_lomuto
function partition_lomuto(arr, start, end) {
    var pivot = arr[end];
    var s = start;
    for (var p = start; p < end; p++) {
        if (cmp(arr[p], pivot) < 0) {
            if (s != p) {
                swap(arr, s, p);
            }
            s++;
        }
    }
    if (s == end) {
        return s - 1;
    } else {
        swap(arr, s, end);
        return s;
    }
}
function qsort_lomuto(arr, start, end) {
    if (start >= end) {
        return;
    }
    var p = partition_lomuto(arr, start, end);
    qsort_lomuto(arr, start, p);
    qsort_lomuto(arr, p + 1, end);
}
// qsort base
function qsort_base(arr,start,end){
    if(start>=end){
        return;
    }
    var p=start;
    for (var i=start+1;i<=end;i++){
        if(cmp(arr[i],arr[start])<0){
            p++;
            if(p!=i){
                swap(arr,p,i);
            }
        }
    }
    swap(arr,start,p);
    qsort(arr,start,p-1);
    qsort(arr,p+1,end);
}
//. wintercn quicksort
function wintercn_qsort(arr, start, end) {
    if(start>=end) return;
    var midVal = arr[start];
    var l = start + 1;
    var r = end;
    while (l < r) {
        while (cmp(arr[l], midVal) > 0 && l < r) {
            swap(arr, l, r--);
        }
        l++;
    }
    var mid = arr[r] > midVal ? r - 1 : r;
    swap(arr, start, mid);
    if (start < mid) {
        wintercn_qsort(arr, start, mid-1);
    }
    if (mid < end) {
        wintercn_qsort(arr, mid + 1, end);
    }
}

function test(fn) {
    cmp_count = 0;
    swap_count = 0;
    var arr1 = arr.slice(0, arr.length - 1);
    var st = (new Date()).getTime();
    var arr_result = fn(arr1, 0, arr1.length - 1);
    var et = (new Date()).getTime();
    if (fn === ruanyf_quicksort) {
        var pass = checkresult(arr_result);
    } else {
        var pass = checkresult(arr1);
    }
    if (!pass) {
        console.log('' + fn.name + ' quicksort fail!');
        return;
    }
    console.log(fn.name+':');
    console.log('        swap_count:' + swap_count + ' cmp_count:' + cmp_count + ' time:' + (et - st));
}

test(ruanyf_quicksort);
test(qsort);
test(qsort_hoare);
test(qsort_hoare_improve);
test(qsort_hoare_improve_not_recursive);
test(qsort_lomuto);
test(qsort_base);
test(wintercn_qsort);
