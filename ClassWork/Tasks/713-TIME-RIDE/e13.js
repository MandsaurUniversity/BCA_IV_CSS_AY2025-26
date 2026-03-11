//Method-1 
console.log("Method-1");
const str = 'RaceCar';

//converting string to lowercase...
const cleaned = str.toLowerCase();
let start = 0;
let end = cleaned.length - 1;

//compare the character from both ends...

while (start < end) {
    if(cleaned[start] !== cleaned[end]){
        console.log("Not a Palindrome!")
        break;
    }
    start++;
    end--;
}

if(start >= end) {
    console.log("It is a Palindrome.")

}

//method-2(usind function)....
console.log("Method-2: (use function to check more than one word)");

function isPalindrome(str){
    //Converting the word to uppercase(or lowercase, if you want)
    let cleaned = str.toUpperCase();
    let start = 0;
    let end = cleaned.length - 1;

    //comparing the charcater..
    while(start < end){
        if (cleaned [start] !== cleaned[end]){
            return false;
        }
        start++;
        end--;
    }
    //It means it is a Palindrome
    return true;

}
console.log("It is a Palindrome? :", isPalindrome("RaceCar"));  //should return true or False

let check = "Madam";
console.log(`Is ${check} a palindrome? : ${ isPalindrome(check)}`);

console.log(`'Hello ? :' ${isPalindrome("Hello")}`)

//method-3(usind function and regex to remove spaces in sting before checking palondrome)....
console.log("Method-3: (usind function and regex to remove spaces in sting before checking palondrome)");

function isPalindromeWithSpaces(str){
    //Converting the word to uppercase(or lowercase, if you want)
    let cleaned = str.toUpperCase().replace(/[]/g, " ");
    console.log(cleaned);
    let start = 0;
    let end = cleaned.length - 1;

    
    //comparing the charcater..
    while(start < end){
        if (cleaned [start] !== cleaned[end]){
            return false;
        }
        start++;
        end--;
    }
    //It means it is a Palindrome
    return true;

}


console.log(`'A man a plan a canal Panama ? :' ${isPalindromeWithSpaces("A man a plan a canal Panama")}`)
//Methord-5 using bilt in array methord..
function ispalindrome(str){
    let cleaned = str.toLowerCase().replace(/[ ]/g," ");

    let reversed = cleaned.split(' ').reverse().join('');

        return (reversed === cleaned);
    
}
console.log("Methord 5: palindrome checker");
console.log("Madam ", ispalindrome("Madam"));
