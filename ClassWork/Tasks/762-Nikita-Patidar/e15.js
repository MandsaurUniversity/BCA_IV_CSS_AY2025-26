function reverseString(str){
let reversed="";
for(let i=str.length-1;i>-1;i--){
    reversed+=str[i];
}
return reversed;
}
console.log("reversed string is :" + reverseString("Hello"));