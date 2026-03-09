//write a program to reverse a String
//Method 1: manual backwards Loop (without using built in methode )
function rev_str(str){
let rev = ""
for(let i = str.length-1 ; i>=0;i--)
rev += str[i]
return rev
}
console.log(" --- Method 1 ---")
let str =  "AHSRAH"
console.log(`Reverse of ${str}  using rev_str : ${rev_str(str)}  `); 


// Method 2:  with using inbuilt functions 
console.log(" --- Method 2 ---")
function Reverse_str(str){

return    str.split("").reverse().join("")
}
console.log(`Reverse of ${str} using Reverse Function : ${Reverse_str(str)}  `)