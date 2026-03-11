//JavaScript program to convert the first letter of a string into UpperCase...
//Method-1 Manually, using substring opreations

function capitalizeFirstChar(str){
//Store the first charcter of the string...
const firstChar = str[0];
//variable to stroe the equivalent uppercase letter
let equivUpperCaseLetter = "";
//Check if the first charcter is between 'a' to 'z'
if(firstChar >= 'a' && firstChar <= 'z'){
    //convert the first charcter using ASCII...
    //in JS, charCodeAt() to find its ASCII value
    //and fromCharCode() bto convert char code back to charcter
    const upperCasecharCode = firstChar.charCodeAt(0) - 32;
    equivUpperCaseLetter = String.fromCharCode(upperCasecharCode);
}

const remainingString = str.substring(1);

//Combing the first uppercase lettre with rest of string...
const upperCaseString = equivUpperCaseLetter + remainingString;


//Expected output:
//"hello diksha!" -> "Hello diksha!"
//"diksha rathore" -> "Diksha rathore"
    return upperCaseString;
}

console.log("Capitalize string 'diksha' :", capitalizeFirstChar("diksha"));
console.log(capitalizeFirstChar("a quick brown fox"));