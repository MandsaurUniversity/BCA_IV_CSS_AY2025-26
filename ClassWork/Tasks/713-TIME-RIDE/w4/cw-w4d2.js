//Objective Filter arrays based on certain conditions...



const numbers = [1,2,3,4,5,6,7,8,9,10];
console.log("Nmubers: ",numbers);
//Creating an Array containing only even values...
const evens = numbers.filter(num => num % 2 === 0 );
console.log("Even Numbers : ",evens);

const odds = numbers.filter(num => num % 2 !== 0);
console.log("Odd numbers:",odds);

const greaterThanFive = numbers.filter(num => num > 5 );
console.log("Grater than Five : ", greaterThanFive);

const numBetween = numbers.filter(num => num >= 3 && num <= 7 );
console.log("numbers between 3 to 7:L ",numBetween);

const divisibleBy3 = numbers.filter( num => num % 3 === 0 );
console.log("Divisible by 3 are:", divisibleBy3);
