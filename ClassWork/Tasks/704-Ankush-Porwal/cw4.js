// console.log("Ankush Porwal....");
// const add=function(a,b){
//     return a+b;
// };
// console.log(add(5,6));

// const mul=function(a,b){
//     return a*b;
// };
// console.log(mul(5,6));

// const sub=function(a,b){
//     return a-b;
// };
// console.log(sub(20,5));

// // factorial of a number using recursion
// function factorial(n){
//     if(n===0 || n===1){
//         return 1;
//     }
//     return n* factorial(n-1);
// }
// console.log(factorial(5));

// // example of different array methods
// const arr=[10,50,60,84,23,54];
// //printing original array
// console.log("original array:"+arr);
// // add a new
// arr.push(15);
// console.log("after adding 15. array:"+arr);
// // remove last element
// arr.pop();
// console.log("after removing 15. array:"+arr);
// // remove first element
// arr.shift();
// console.log("after removing first element. array:"+arr);
// // add element at the beginning
// arr.unshift(10);
// console.log("after adding 10 at the beginning. array:"+arr);
// // find index of an element
// const index=arr.indexOf(60);
// console.log("index of 60:"+index);
// // check if an element exists
// const exists=arr.includes(84);
// console.log("does 84 exist in array?"+exists);
// // convert an array to string...(using join)
// console.log("converting the array into a string seperated by '|': ");
// let str=arr.join("|");
// console.log("created string:"+str);

// // reverse the array
// arr.reverse();
// console.log("reversed array:"+arr);

// // using sort method to sort the array
// console.log("array before sorting:");
// console.log(arr);
// arr.sort();


// let desc=arr.sort((a,b)=>{
//     if(a<b)
//         return 1;
//     else if(a==b)
//         return 0;
//     else{
//         return -1;
//     }
// });
// console.log("array after descending order:"+desc);
// let ascending=arr.sort((a,b)=>{
//     if(a<b)
//         return -1;
//     else if(a==b)
//         return 0;
//     else{
//         return 1;
//     }
// });
// console.log("array after ascending sort:"+ascending);

// // ascending
// arr.sort((a,b)=>(a-b));
// console.log(arr);
// // descending
// arr.sort((a,b)=>(b-a));
// console.log(arr); 


// calculator using objects
const calculator = {
    value: 0,
    
    add: function(num) {
        this.value = this.value + num;
        return this.value;
    },
    
    subtract: function(num) {
        this.value = this.value - num;
        return this.value;
    },
    
    reset: function() {
        this.value = 0;
    }
};

// Call methods
console.log(calculator.add(5));           // Returns 5
console.log(calculator.add(3));           // Returns 8
console.log(calculator.subtract(2));      // Returns 6
console.log(calculator.reset());          // value is now 0
 
const correctPasscode = "1234";
let attempts = 0;
let enteredPasscode;
let isUnlocked = false;
const simulatedInputs = ["1111", "2222", "1234"];
while (attempts < 3) {
    enteredPasscode = simulatedInputs[attempts]; // simulate input
    attempts++;
 if (enteredPasscode === correctPasscode) {
        console.log("Welcome Home.");
        isUnlocked = true;
        break; // Exit loop if correct
    } else {
        console.log("Incorrect passcode.");
    }
}
if (!isUnlocked) {
    console.log("Too many failed attempts. System locked.");

    let countdown = 30;

    do {
        console.log("Cooldown:", countdown, "seconds remaining");
        countdown--;
    } while (countdown >= 0);
}



console.log("null == undefined:", null == undefined); 
console.log("null === undefined:", null === undefined); 
let isTrue = true;
let myNumber = 100;
let boolToNum = Number(isTrue); 
let numToString = String(myNumber); 
console.log("\n--- Forced Conversions ---");
console.log("Boolean to Number:", boolToNum, "| Type:", typeof boolToNum);
console.log("Number to String:", numToString, "| Type:", typeof numToString);
const valuesToCheck = [0, "", NaN, 1, "Hello"];
console.log("\n--- Truthy or Falsy? ---");
valuesToCheck.forEach(val => {
    console.log(`Value: [${val}] is ${Boolean(val) ? "Truthy ✅" : "Falsy ❌"}`);
});

