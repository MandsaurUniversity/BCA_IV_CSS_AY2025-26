//Program to reverse a String
//Method 1
function reverseString(str){

    let rev = "";

    for (let i = str.length-1; i>-1; i--){
        rev += str[i];
    }

    return rev;
}

console.log("Reverse of 'Pavan Suryavanshi' is: ", reverseString("Pavan Suryavanshi"));

//Method 2
function stringReverse(str){
    console.log("String is",str)
    console.log("Converting into Array: ",str.split(""))
    console.log("Reversing the Array: ")
    console.log((str.split("").reverse()))
    console.log("Converting Array back into String: ",str.split("").reverse().join(""))
    console.log("Final Result: ")
    return str.split("").reverse().join("");
}

//Using arrow function
let arrowReverse = str => str.split("").reverse().join("");

console.log("Reverse of 'Uma Bai' is: " , stringReverse("Uma Bai"))
console.log("Reverse of 'Welcome to my program of reverse' is: " , arrowReverse("Welcome to my program of reverse"))