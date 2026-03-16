// Write a Program to reverse a string 
// Method 1: Manual backward loop(without using built in functions)...
function reverseString(str){
    let reversed = "";
    for(let i = str.length - 1; i > -1; i--){
        reversed += str[i];
    }
    return reversed;
}
// Output:
console.log("Reverse of 'Divya Jain' is :" ,reverseString('Divya Jain'));

// Method 2: Using built in functions to reverse a string...
// convert the string to array, then reverse and then convert back to string...
function reverseStringUsingBuiltIn(str){
    return str.split("").reverse().join("");
}
// using arrow function...
let arrowRev = str => str.split("").reverse().join("");

// Output:
console.log("Reverse of 'Divya Jain' is :" ,reverseStringUsingBuiltIn('Divya Jain'));
console.log("Using Arrow Function: Reverse of 'Divya Jain' is :" ,arrowRev('Divya Jain'));
