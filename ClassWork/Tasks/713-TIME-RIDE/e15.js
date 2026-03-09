//Write a program to Reverse a string
//

function reverseString(str){
    let reversed ="";
    for(let i = str.length-1 ; i> -1 ; i--){
        reversed += str[i]; 
    }
    return reversed;
}
console.log("Reverse of 'Time Ride' is : ", reverseString("Time Ride"));

//
function stringReverse(str){
    console.log("String is ",str);
    console.log("reversing the array:",str.split(""));
    console.log("reverse the array: ", str.split("").reverse());
    console.log("converting array back into String:",str.split("").reverse().join(""));
     return str.split("").reverse().join("");
}
console.log(stringReverse("radhe"));


//Using arrow fucntion 

let arrowRev = str => str.split("").reverse().join("");
console.log(arrowRev("radhe"));
console.log(arrowRev("time ride"));