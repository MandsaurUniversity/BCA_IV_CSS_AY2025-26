function isPal(str){
    let cleaned = str.toLowerCase().replace(/[ ]/g,"");
 let rev = cleaned.split("").reverse().join("");


console.log(rev)

 if(rev === cleaned)return true;
 else return false;

}
console.log("A palindrome joke : ")
console.log("Dr Awkward")
console.log(isPal("Dr Awkward"))