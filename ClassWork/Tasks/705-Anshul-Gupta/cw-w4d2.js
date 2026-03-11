// objective filter arrays based on certain conditions.. 
const numbers = [1,2,3,4,5,6,7,8,9,10];

//creating an array containing only even values..
const evens = numbers.filter(num => num % 2 === 0);
console.log("Even numbers:"+ evens); 

const odds = numbers.filter(num => num % 2 !== 0);
console.log("odd numbers:"+ odds); 

const greaterthanfive = numbers.filter(num => num >5);
console.log(`numbers greater than 5 are : ${greaterthanfive}`);

//filter number between 3 & 7 
const numbetween = numbers.filter(num => num >=3 && num<=7);
console.log("numbers between 3 & 7 are:", numbetween);

//filter numbers divisible by 3
const divisibleby3 = numbers.filter(num => num % 3 == 0);
console.log("numbers divisible by 3 are:" + divisibleby3);

