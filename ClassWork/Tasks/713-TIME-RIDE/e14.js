//Javascript program to convert the first letter of asteinf into Uppercase 
//Methord 1: Manually,using substing operations

//Expected output 
//hello world ->Hello World
//javascript -> Javascript
function capitalizeFirstChar(str){
//Store the first character of the string
const firstChar = str[0];

let equivUpperCaseLetter = "";

//Check if the first character is between 'a' to 'z'
if(firstChar >= 'a' && firstChar <= 'z' ){
//Convert the first character using ASCII
//In JS, cahrCodeAt() to find its ASCII value

const upperCasecharCode = firstChar.charCodeAt(0) - 32;
equivUpperCaseLetter = String.fromCharCode(upperCasecharCode);

}
const remainingString = str.substring(1);

const upperCaseString = equivUpperCaseLetter + remainingString;

return upperCaseString;
}

console.log( "Capitalized String 'javascript': " , capitalizeFirstChar("javascpript"));
console.log(capitalizeFirstChar("a quick brown fox "));