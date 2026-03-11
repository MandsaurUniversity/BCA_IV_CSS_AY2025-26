//js program to convert the first letter of a string into uppercase 
// Method 1 : Manually , using substring operations
 const str ="javascript";
 // store the first character of the string...
 const firstChar =str[0];
 // variable to store  the equivalent uppercase letter
 let equivUpperCaseletter ="";
 // check if the first character is between 'a' to 'z'
 if (firstChar >= 'a' && firstChar <= 'z'){
    // convert the first character using ASCII...
    // In JS , charCodeAt() to find its ASCII value
    const charCode = firstChar. charCodeAt(0)-32;
    equivUpperCaseletter = String.fromCharCode(charCode);
 }

 const  remainingString = str.substring(1);
 // combining the first uppercase letter with rest of string 
 // expected output
 // "hello world" -> " Hello World"
 //"javascript" -> " Javascript"
 //"xyz" -> "Xyz"