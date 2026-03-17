// Program to remove a specific item from an array
// Method 1: Using splice() with manual index search
function removebyvalue(arr,value){
    // Finding the index of the value
    const idx = arr.indexOf(value);
    // if index is found, remove it using splice() function...
    if (idx > -1){
        arr.splice(idx,1);
        console.log(`Removed "${value}" at index'${idx}'`);
    } else{
        console.log(`"${value}" not found in array!`);
        return false;
    }
}

function removebyindex(arr,idx){
if(idx >= 0 && idx < arr.length){
    const removed = arr.splice(idx,1);
    console.log(`Removed element at index: ${idx} : ${removed[0]}`);
    console.log("Array after removal:", arr);
    return true;
} else{
    console.log("Invalid index!:" + idx);
    return false;
}
}
let fruits = ["apple", "orange", "mango", "grape", "banana"];
console.log("Array:",fruits);
removebyvalue(fruits,"mango");

removebyindex(fruits,3);


