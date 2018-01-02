function qSort(arr, low, high) {
    let pivot;
    if (low < high) {
    pivot = partition(arr, low, high);
    qSort(arr, low, pivot - 1);
    qSort(arr, pivot + 1, high);
    }
};
function partition(arr, low, high) {
    let pivotKey = arr[low];
    while(low < high) {
        while(low < high && arr[high] >= pivotKey)
            high--;
            [arr[low], arr[high]] = [arr[high], arr[low]];
        while(low < high && arr[low] <= pivotKey)
            low++;
            [arr[low], arr[high]] = [arr[high], arr[low]];
    }
    return low;
};
let a = [8,3,4,1,9,7,6,10,2]
qSort(a, 0, 8);
console.log(a);
