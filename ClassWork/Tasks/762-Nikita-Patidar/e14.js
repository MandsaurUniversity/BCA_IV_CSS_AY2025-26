let string= "helloworld";
let str=string.split("");
if(str[0] >='a' && str[0]<= 'z'){
   str[0]=String.fromCharCode(str[0].charCodeAt(0)-32);
}
console.log(str.join(""));