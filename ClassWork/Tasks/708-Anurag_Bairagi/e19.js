let fruites = ["apple","banana","orange","mango","grapes","guava"];

console.log(fruites);
// removeByValue(fruites,"orange");
removeByIndex(fruites,3);
console.log(fruites);

function removeByValue(arr,value){
    let idx = arr.indexOf(value);
    if(idx>-1){
        removeByIndex(arr,idx);
        return "Removed";
    }
    else{
        return "Not Found";
    }
}

function removeByIndex(arr,idx){
    arr.splice(idx,1);
}