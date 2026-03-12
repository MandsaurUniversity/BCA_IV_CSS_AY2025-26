// Program to Check whether a string is Palindrome or not


// Method 1: By using loop for comparing the characters from start to end...
console.log("Method 1: By using while loop...");
const str = 'RaceCar';

// converting string to lowercase...
const cleaned = str.toLowerCase();
let start = 0;
let end = cleaned.length - 1;

// comparing characters from start and end...
while (start < end) {
    if (cleaned[start] !== cleaned[end]) {
        console.log("is not a palindrome.");
        break;
    }  
      start++;
    end--;
}

if (start >= end) {
    console.log("is a palindrome.");
}

console.log("Method 2: By using functions only for words...");
// Method 2: By using functions only for words...
function isPalindrome(str) {
    // converting string to uppercase...
    let cleaned = str.toUpperCase();
    let start = 0;
    let end = cleaned.length - 1;
    // comparing characters from start and end...
    while (start < end) {
        if (cleaned[start] !== cleaned[end]) {
            return false; // not a palindrome
        }
        start++;
        end--;
    }
    return true; // is a palindrome
}
console.log(" Is 'RaceCar' a palindrome?: " , isPalindrome("RaceCar")); // should return true or false...
let check="Madam";
console.log(" Is 'Madam' a palindrome?: " , isPalindrome(check)); // should return true or false...
console.log(" Is 'Hello' a palindrome?: " , isPalindrome("Hello")); // should return true or false...

console.log("Method 3: By using regax to remove spaces in string before checking palindrome...");
// Method 3: By using regax to remove spaces in string before checking palindrome...
function isPalindromeWithSpaces(str) {
    // converting string to uppercase...
    let cleaned = str.toUpperCase().replace(/\s/g, ""); // removing spaces from string...
    let start = 0;
    let end = cleaned.length - 1;
    // comparing characters from start and end...
    while (start < end) {
        if (cleaned[start] !== cleaned[end]) {
            return false; // not a palindrome
        }
        start++;
        end--;
    }
    return true; // is a palindrome
}
console.log(" Is 'RaceCar' a palindrome?: " , isPalindromeWithSpaces("RaceCar")); // should return true or false...
console.log(" Is 'Hello' a palindrome?: " , isPalindromeWithSpaces("Hello")); // should return true or false...
console.log(" A man a plan a canal Panama is a palindrome?: " , isPalindromeWithSpaces("A man a plan a canal Panama")); // should return true or false...   

// Method 4: using built in array methods...
function isPalindrome(str){
    // converting the string to lowercase and removing the spaces...
    let cleaned = str.toLowerCase().replace(/[ ]/g,"");

    // reverse the string and then check it with the cleaned string...
    // how? split "cleaned" it into an array, reverse and then join back
    let reversed = cleaned.split('').reverse().join('');


    // compare the cleaned string with the reverse string
    return (reversed === cleaned);

}
console.log("Method 4: Palindrome Checker...")
console.log("Race Car: ",isPalindrome("Race Car"));
console.log("Race: ",isPalindrome("Race"));
