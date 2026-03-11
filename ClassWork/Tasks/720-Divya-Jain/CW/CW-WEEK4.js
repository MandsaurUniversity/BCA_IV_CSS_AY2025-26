const n =[1,2,3,4,5,6,7,8];
console.log("Number:"+n);
//EVEN NUMBER
const evennumber=n.filter(num=> num%2===0);
console.log("even number:"+evennumber);
//ODD NUMBER
const oddnumber=n.filter(num=> num%2 !==0);
console.log("odd number:" ,oddnumber);
//GRATER THAN 5
const graterthan5=n.filter(num => num >5);
console.log("grather than 5:" +graterthan5);
//NUMBER BETWEEN 3 AND 7
const numberbetween3and7=n.filter(num =>num>=3 && num<=7);
console.log(`number between 3 and 5:${ numberbetween3and7}`);
//DIVISIBLE BY 3
const divisibleBy3=n.filter(num=> num%3 ===0);
console.log("divisible by 3:"+divisibleBy3);
