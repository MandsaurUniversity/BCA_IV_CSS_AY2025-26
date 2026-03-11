//Methord 2 : using string mrthods to do substring operations (capitalize first letter of a string )
//method 2.1 using a function

function capitalizeFirstLetter(str){
    if (str.length === 0)
        return str;

        return str[0].toUpperCase() // rest  of the string ...

    }

    const someString = "this is a string ";
console.log(`capitalizing 'javascript'): ${capitalizeFirstLetter('javascript')}`)
console.log(`capitalizing '${someString}': ${capitalizeFirstLetter('someString')}`)




let capitlized = str => str[0].toUpperCase() +str.slice(1);

console.log("method 2.2 : Using Arrow function") ;
console.log(capitlized("this is a string"));

// Method 2.3.1 : capitalized all the words (also knows as title case ) 

function capitalizeAllWords(str){

const newStr = str.split(" ").map(word => word[0].toUpperCase()+ word.slice(1)).join(" ");

}
console.log("Method 2.3 : capitalized all the words (also knows as title case ) ");
console.log("String : 'this is a String '");
console.log(capitalizeAllWords('this is a String'));

//Method 2.3.3 : Same using arrow function...
console.log("Method 2.3 : capitalized all the words (also knows as title case ) ");
const capAllWords