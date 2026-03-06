// Check Whether a String is Palindrome or Not
// Method 1: By using  loop for comparing the characters from start to end...
console.log(" Method 1: By using while loop");
const str = 'RaceCar';
// coverting string into lowercase...
const cleaned = str.toLowerCase();
let start=0;
let end = cleaned.length -1;
// compare the characters from both ends...
while(start<end){
    if(cleaned[start]!==cleaned[end]){
        console.log("Not a Palindrome.")
    }
    start++;
    end--;
}
if(start>=end){
    console.log("It is a Palindrome")
}

//Method 2: by using function( only for word) 
console.log(" Method 2:  use function to check more than one words ");
function isPalindrome(str){
    // converting the word in lowercase or uppercase
    let cleaned = str.toUpperCase();
   let start = 0;
   let end = cleaned.length -1;
   while(start<end){
    if(cleaned[start]!==cleaned[end]){
        return false;// not palindrome
    }
    start++;
    end--;
}
return true;// it is palindrome
}
console.log(" Is 'RaceCar' is Palindrome ? :" , isPalindrome("RaceCar"));
let check = "Madam";
let check2= " A man a paln a canal Pamana";
console.log(`Is ${check} is Palindrome ? : ${isPalindrome(check)}`);
console.log(`'hello ?:' ${isPalindrome("hello")}`);
console.log(`'nayan ?:' ${isPalindrome("nayan")}`);
console.log(`${check2}' ? : '${isPalindrome(check2)}`);


//Method 3: by using function and regex to remove spaces in string before checking palindrome  
console.log(" Method 3: use function and regex to remove spaces in string before checking palindrome ");
function isPalindromeWithSpace(str){
    // converting the word in lowercase or uppercase
    let cleaned = str.toUpperCase().replace (/[ ]/g,"");
    console.log(cleaned);
   let start = 0;
   let end = cleaned.length -1;
   while(start<end){
    if(cleaned[start]!==cleaned[end]){

        return false;// not palindrome
    }
    start++;
    end--;
}
return true;// it is palindrome
}


let Check2= " A man a paln a canal Pamana";

console.log(`'${Check2}'? :'${isPalindromeWithSpace(Check2)}`);