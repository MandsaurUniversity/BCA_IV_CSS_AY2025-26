function isPalindromeWithSpaces(str) {
    // converting string to uppercase...
    let lowered= str.toLowerCase().replace(/\s/g, ""); // removing spaces from string...
    let WithoutSpaces = "";

  for( i=0; i< lowered.length;i++){
    if( lowered[i] !== " "){
      WithoutSpaces += lowered[i];
    }
  }
   let start=0;
  let end= WithoutSpaces.length - 1;
  // comparing the characters...
  while(start<end){
    if( WithoutSpaces[start] !== WithoutSpaces[end]){
      return false;
    }
        start++;
        end--;
    }
    return true; // is a palindrome
}
console.log(" Is 'RaceCar' a palindrome?: " , isPalindromeWithSpaces("RaceCar")); // should return true or false...
console.log(" Is 'Hello' a palindrome?: " , isPalindromeWithSpaces("Hello")); // should return true or false...
console.log(" A man a plan a canal Panama is a palindrome?: " , isPalindromeWithSpaces("A man a plan a canal Panama")); // should return true or false...   
let check = " A man a plan a canal Panama ";
console.log(" Is '"+check+"' a palindrome?: " , isPalindromeWithSpaces(check)); // should return true or false...

function isPalindromeWithSpaces(str) {
    // converting string to uppercase...
    let lowered= str.toLowerCase().replace(/\s/g, ""); // removing spaces from string...
    let WithoutSpaces = "";

  for( i=0; i< lowered.length;i++){
    if( lowered[i] !== " "){
      WithoutSpaces += lowered[i];
    }
  }
   let start=0;
  let end= WithoutSpaces.length - 1;
  // comparing the characters...
  while(start<end){
    if( WithoutSpaces[start] !== WithoutSpaces[end]){
      return false;
    }
        start++;
        end--;
    }
    return true; // is a palindrome
}
console.log(" Is 'RaceCar' a palindrome?: " , isPalindromeWithSpaces("RaceCar")); // should return true or false...
console.log(" Is 'Hello' a palindrome?: " , isPalindromeWithSpaces("Hello")); // should return true or false...
console.log(" A man a plan a canal Panama is a palindrome?: " , isPalindromeWithSpaces("A man a plan a canal Panama")); // should return true or false...   
let check = " A man a plan a canal Panama ";
console.log(" Is '"+check+"' a palindrome?: " , isPalindromeWithSpaces(check)); // should return true or false...
