//Program to reverse a String
//Method-1 Manual backward loop(without using built in function)...
function reverseString(str){

    let reversed = "";

    for (let i = str.length - 1; i > -1; i--){
        reversed += str[i];
    }

    return reversed;
}
//Output
console.log("Reverse of 'Diksha Rathore' is: ", reverseString("Diksha Rathore"));

//Method-2 using built in function to reverse a string...
//convert the string to arry, then reverse and then covert back to string...
function reverseStringUsingBuiltIn(str){
    return str.split("").reverse().join("");
}

//Using arrow function...
let arrowReverse = str => str.split("").reverse().join("");
//Ouput:
console.log("Reverse of 'Dikshuu' is: " , reverseStringUsingBuiltIn("Dikshuu"))
console.log("Reverse of 'Welcome to my program of reverse' is: " , arrowReverse("Welcome to my program of reverse"))