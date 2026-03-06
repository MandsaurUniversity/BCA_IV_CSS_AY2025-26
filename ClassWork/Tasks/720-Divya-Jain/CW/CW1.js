// Program to check if a string is a palindrome

function isPalindrome(str) {
    // Remove spaces and convert to lowercase for uniform checking
    let cleanStr = str.replace(/\s+/g, '').toLowerCase();

    // Reverse the string
    let reversedStr = cleanStr.split('').reverse().join('');

    // Compare original and reversed strings
    if (cleanStr === reversedStr) {
        return true;
    } else {
        return false;
    }
}

// Example usage:
let string1 = "madam";
let string2 = "hello";

console.log(`${string1} is palindrome?`, isPalindrome(string1)); // true
console.log(`${string2} is palindrome?`, isPalindrome(string2)); // false