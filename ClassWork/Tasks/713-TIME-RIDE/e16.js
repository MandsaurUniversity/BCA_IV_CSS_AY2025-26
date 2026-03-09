//Replacing characters 

function replaceChar(str, what , to){
return str.split(what).join(to);
}

console.log("Replacing 'a' with '@' in 'alphabet':");
console.log(replaceChar("alphabet",'a','@'));

//Replace vowels with '*' in a String---
//vowels -> [a,e,i,o,u]

function replaceVowal(str){
let result = str;
result = replaceChar(result,'a', '*');
result = replaceChar(result,'e', '*');
result = replaceChar(result,'i', '*');
result = replaceChar(result,'o', '*');
result = replaceChar(result,'u', '*');
return result;
}
const vowelStr = "This is an inkpot";
console.log("Replacing all vowels with '*' in " , vowelStr ,"");
console.log(replaceVowal(vowelStr));

//task -3 : Censor a woed ina string.
function wordCensor(str, whichword){

const censoredWord = "#".repeat(whichword.length);
return replaceChar(str,whichword, censoredWord);

}

const stringToCensor = "Today is Monday and Tomorrow will be Tuesday"
console.log("String to Censor: ",stringToCensor);
console.log("Censored String: ", wordCensor(stringToCensor,"day"));