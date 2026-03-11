// Javascript Program to convert the First Letter of a string into Uppercase
// Method 1: Manually, using substring operations
const str = "ankush porwal";
// Store the First Char of String...
const firstchar = str[0];
// variable to store the equivalent uppercase letter...
let equiuppercaseletter = "";
// Check if the First Character is Between 'a' to 'z'
if(firstchar >= 'a' && firstchar  <= 'z'){
    // convert the firstchar using ASCII...
    // In javascript, charcodeat() to find its ASCII value
    const charcode = firstchar.charCodeAt(0) - 32;
    equiuppercaseletter = String.fromCharCode(charcode);

}
const remainingstring = str.substring(1);

// combining the first uppercase letter with rest of string...
const uppercasestring = equiuppercaseletter + remainingstring;
console.log(uppercasestring);



// Expected Output:
// "ankush" -> "Ankush"
// "porwal" -> "Porwal"