// javaScript Program to Remove Specific Item from an Array

//Method 1: Using splice() with manual Index search
function removeByValue(arr, value) {
    //finf=ding the index of the value
    const idx =arr.indexOf(value);
    //if index is found, remove it using splice()function....
     if(idx >-1){
        arr.splice(idx ,1);
        console.log(`Removed "${value}" at index'${idx}'`);
     } else{
        console.log(`"${value}" not found in array`);
     }
    return false;
}
function removeByIndex(arr,idx){
if (idx >=0 && idx <arr.length){
    const removed =arr.splice(idx, 1);
    console.log(`Removed element at index: ${idx} : ${removed[0]}`);
    console.log("Array after removed: " ,arr);
    return true;
}else{
    console.log("Invalid Index! : " + idx);
    return false;
}
}

const fruits = ["apple", "banana", "cherry", "banana"];
removeByValue(fruits,"cherry");
removeByIndex(fruits,3);
console.log(removeByValue(fruits, "banana"));