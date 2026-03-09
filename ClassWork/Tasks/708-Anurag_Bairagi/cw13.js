function isPalindrome(str){
    let cleaned = str.toLowerCase().replace(/[ ]/g,"");
    let reversed = cleaned.split('').reverse().join('');
    return reversed==cleaned;
}

let str = "Race Car";
console.log(`${str}, is palindrome ? : ${isPalindrome(str)}`);