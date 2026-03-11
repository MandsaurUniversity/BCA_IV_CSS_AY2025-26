// JavaScript Program tp convert the First Letter og aString into Uppercase
//Method 1: Manually, using substring operations

function capitalizeFirstChar(str){
const firstChar=str[0];
//store the first character of string...
//const firstChar = str[0];
//variable to store the equivalent uppercase letter
let equivalentCaseLetter ="";
//check if the first character is between 'a' to 'z'
if (firstChar >= 'a' && firstChar <='z'){
    //convert thr first character using ASCII...
    const charCode = firstChar.charCodeAt(0)-32;
    equivalentCaseLetter = String.fromCharCode(charCode);
} 
const remainingString =str.substring(1);

//combining thr first uppercase letter with rest of string...
const upperCaseString = equivalentCaseLetter + remainingString;


//Expected output:
//"hello world!" -> "Hello world"
return upperCaseString;
}
console.log("Capitalized string 'javascript' : ",   capitalizeFirstChar("divya"));
console.log(capitalizeFirstChar("a quicl brown fox"));
