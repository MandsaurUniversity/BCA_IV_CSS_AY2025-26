const str = 'RaceCar';

const cleaned = str.toLowerCase();
let start = 0;
let end = cleaned.length - 1;

while (start < end) {
        if (cleaned[start] !== cleaned[end]) {
            return false;
        }
        start++;
        end--;
    }

if (start >= end){
    console.log("It is Palindrome.");
}


//Method 2:  Using built in methods

function isPalindrome (str){

    let cleaned = str.toLowerCase().replace(/[ ]/g,"");

    let reversed = cleaned.split("").reverse().join("");

    return (reversed == cleaned);

}

console.log("Race Car: ", isPalindrome("Race Car"));
console.log("Race: ", isPalindrome("Race"));