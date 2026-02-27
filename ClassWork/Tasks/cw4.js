console.log("Ankush Porwal....");
const add=function(a,b){
    return a+b;
};
console.log(add(5,6));

const mul=function(a,b){
    return a*b;
};
console.log(mul(5,6));

const sub=function(a,b){
    return a-b;
};
console.log(sub(20,5));

// factorial of a number using recursion
function factorial(n){
    if(n===0 || n===1){
        return 1;
    }
    return n* factorial(n-1);
}
console.log(factorial(5));

// example of different array methods
const arr=[10,50,60,84,23,54];
//printing original array
console.log("original array:"+arr);
// add a new
arr.push(15);
console.log("after adding 15. array:"+arr);
// remove last element
arr.pop();
console.log("after removing 15. array:"+arr);
// remove first element
arr.shift();
console.log("after removing first element. array:"+arr);
// add element at the beginning
arr.unshift(10);
console.log("after adding 10 at the beginning. array:"+arr);
// find index of an element
const index=arr.indexOf(60);
console.log("index of 60:"+index);
// check if an element exists
const exists=arr.includes(84);
console.log("does 84 exist in array?"+exists);
// convert an array to string...(using join)
console.log("converting the array into a string seperated by '|': ");
let str=arr.join("|");
console.log("created string:"+str);

// reverse the array
arr.reverse();
console.log("reversed array:"+arr);

// using sort method to sort the array
console.log("array before sorting:");
console.log(arr);
arr.sort();


let desc=arr.sort((a,b)=>{
    if(a<b)
        return 1;
    else if(a==b)
        return 0;
    else{
        return -1;
    }
});
console.log("array after descending order:"+desc);
let ascending=arr.sort((a,b)=>{
    if(a<b)
        return -1;
    else if(a==b)
        return 0;
    else{
        return 1;
    }
});
console.log("array after ascending sort:"+ascending);

// ascending
arr.sort((a,b)=>(a-b));
console.log(arr);
// descending
arr.sort((a,b)=>(b-a));
console.log(arr);