// JS Program to replace characters of a string...
// Objective: Substitute characters in a given string...
// Task 1:
// Simple Replacement

function replacechar(str,what,to){
    return str.split(what).join(to);
}
console.log("Replacing 'a'with '@' in 'alphabet':");
console.log(replacechar('alphabet','a','@'));
// alphabet - a -> @ = @lph@bet
// alphabet -a -> x = xlphxbet
// Task 2:

// replace vowels with '*' in a string...
// vowels:[a,e,i,o,u]
function replacevowels(str){
    let result = str;
    result = replacechar(result,'a','*');
    result = replacechar(result,'e','*');
    result = replacechar(result,'i','*');
    result = replacechar(result,'o','*');
    result = replacechar(result,'u','*');
    return result;
}
const vowelstr ="This is an inkpot"
console.log("Replacing all vowels with '*' in:'" + vowelstr + "'");
console.log(replacevowels(vowelstr));

// Task 3: censor a word in a string...
function wordcensor(str,whichword){
    const censoreword = "*".repeat(whichword.length);
    return replacechar(str,whichword,censoreword);

}
const stringtocensor = "Today is  monday and tomorrow is tuesday";
console.log("string to censor:" , stringtocensor);
console.log("censored string:", wordcensor(stringtocensor,"day"));