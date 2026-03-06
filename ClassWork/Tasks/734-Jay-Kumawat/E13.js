//check weather a String is Palindrome or not


const str = "Level"
let clean = str.toLowerCase();

let start =0; 
let end = clean.length-1;

while(start<end){
    if(clean[start] == clean[end]){
        start++;
        end--;
    }else{
        break;
    }
}

if(start >= end)
console.log("String "+ str +" is Palindrome.");
else
console.log("String "+ str +" is not Palindrome.");

