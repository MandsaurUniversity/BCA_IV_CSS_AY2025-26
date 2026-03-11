let num=50;
let root=num**2;
let sqrt=num**0.5;
console.log("square of"+num+"is:"+root);
console.log("square root of"+num +"is:"+sqrt);
let number=25;
for(let i =1;i<number;i++){
    if(i*i==number)
        console.log("root is:"+i);
}
console.log(2**3);
let b=3;
let h=5;
let area=(b*h)/2;
console.log("area of triangle is"+area);

let a=12;
let c=13;
let temp;
temp=a;
a=c;
c=temp;
console.log("swap number:"+ a +" "+ c);
// calculating area of triangle using heron's formula
// heron's formula: sqrt(s(s-a)(s-b)(s-c)) where s=(a+b+c)/2
let a1=5;
let b1=6;
let c1=7;
let s=(a1+b1+c1)/2;
let area2=(s*(s-a1)*(s-b1)*(s-c1))**0.5;
console.log("area of triangle using herons's formula is"+area2.toFixed(2));
console.log("Price:"+99.99);
console.log("my age is"+ 20 +"years");
console.log("java"+"script");
const message="hello";
console.log(message.length);
console.log(message[0]);
console.log(message[4]);
console.log(message.toUpperCase());
console.log(message.toLowerCase());
console.log(Boolean(1));
console.log(Boolean(0));
const appleprice=50;
const appleskg=5;
const applecost=appleprice*appleskg;

console.log("price of apple is:"+applecost);
const num2=3.14159;
console.log(num2.toFixed(4));
console.log("he said\"hi\"");
const text="javascript";
console.log(text.toUpperCase());
console.log(text[text.length-1]);
console.log(text.includes("java"));
console.log(text.startsWith("java"));
console.log(text.substring(1,3));
console.log(text.slice(2));
console.log(" hello ".trim());

