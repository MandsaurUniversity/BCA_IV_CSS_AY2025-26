const arr = [10, 50, 20, 6, 4, 15,  60, "Pavan" ];

console.log("Array before sorting: ");
console.log(arr);
arr.sort((a,b) => {
    if (a > b){
        return 1;
    } else if (a == b){
        return 0;
    } else {
        return -1;
    }
});
console.log("Array after sorting: ");
console.log(arr);