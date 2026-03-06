function palindrome(value){
    value.toLowerCase();
    let sr= value.split(" ");
    let wSpace="";
    for(let i=0;i<sr.length;i++){
        wSpace +=sr[i];
    }
    let rev="";
    for(let i=wSpace.length-1;i>=0;i--){
        rev+=wSpace[i];
    }
    return rev==wSpace;ṇ
}
let str = "a man a plan a canal panama";
console.log(str + " is palindorome : " + palindrome(str));



//Method : Using built-in array method....

function isPalindrome(str){
    let cleaned =str.toLowerCase().replace(/[ ]/g,"");

    let reversed =cleaned.split('').reverse().join('');

    return (reversed==cleaned);

}
console.log("Is Race Car Palindrome ? :", isPalindrome("Race Car"));
