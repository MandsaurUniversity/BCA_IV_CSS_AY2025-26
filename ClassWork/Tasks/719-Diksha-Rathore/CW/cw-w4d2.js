//Objectve filer arrays based on certain condition...
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Numbers: " + numbers);

//Creating an arry containing only Even values...
const evens = numbers.filter(num =>  num % 2 === 0 );
console.log("Even numbers: ", evens); 

//Creating an array containing only Odd numbers...
const odds = numbers.filter(num => num % 2 !== 0);
console.log("Odd numbers: ", odds);

//Filter numbers greater than 5...
const greaterThanFive = numbers.filter(num => num > 5);
console.log(`Numbers greater than 5 are: ${greaterThanFive}`);

//Filter numbers between 3 & 7 (both values inclusive)
const numBetween = numbers.filter(num => num >= 3 && num <=7);
console.log("Numbers between 3 & 7 are: ", numBetween);

//Filter numbers divisible by 3 
const divisibleBy3 = numbers.filter(num => num % 3 ===0 );
console.log("Numbers Divible by 3 are: ", divisibleBy3);
