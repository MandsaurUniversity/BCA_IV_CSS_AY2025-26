//Program to replace Character of a String
function replaceChar(str, what, to){
    return str.split(what).join(to);
}

console.log("Replacing 'a' with '@' in 'alphabet': ", replaceChar("alphabet", 'a', '@'));


//Replace Vowels with '*' in a string
function replaceVowels(str){
    let result = str;
    result = replaceChar(result, 'a','*');
    result = replaceChar(result, 'e','*');
    result = replaceChar(result, 'i','*');
    result = replaceChar(result, 'o','*');
    result = replaceChar(result, 'u','*');
    return result;

}

const vowelStr = "This is an inkpot"
console.log("Replacing all vowels with '*' in: '" + vowelStr + "");
console.log(replaceVowels(vowelStr));

//Task 3: Censor a word in a string
function wordCensor(str, whichWord){
    const censoredWord = "*".repeat(whichWord.length);
    return replaceChar(str, whichWord, censoredWord);
}

const stringToCensor = "Today is Monday and Tomorrow is Tuesday";
console.log("String to Censor: ", stringToCensor);
console.log("Censored String: ", wordCensor(stringToCensor, "day"));