function isPalindrome(str){
    let cleaned=str.toUpperCase();
    let start=0;
    let end = cleaned.length-1;

    while(start<end){
        if(cleaned[start]!==cleaned[end]){
            return false;
        }
        start++;
        end--;
    }
    return true;
}
console.log("IS 'RaceCar' a palindrome ? :", isPalindrome("RaceCar"));
let check="Madam";
console.log(`Is ${check} a palindrome? : ${isPalindrome(check)}`);