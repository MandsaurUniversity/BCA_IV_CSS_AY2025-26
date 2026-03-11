// Objective Filter arrays based on certain conditions...

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Numbers: " + numbers)

//Creating an array containing only even values...

const evens = numbers.filter( num => num % 2 == 0 );
console.log("Even Numbers: " + evens);

const odds = numbers.filter( num => num % 2 != 0);
console.log("Odd Numbers: " , odds);

//Filter numbers greater than 5
const greaterThanFive = numbers.filter( num => num > 5 );
console.log(`Numbers Greater Than Five are: ${greaterThanFive}`);

//filter Numbers between  3 & 7 (both values inclusive)
const numBetween = numbers.filter( num => num >= 3 && num <= 7);
console.log("Numbers between: " , numBetween);

//filter numbers divisible by 3
const divisibleByThree = numbers.filter( num => num % 3 == 0);
console.log("Numbers divisible by three: ", divisibleByThree);