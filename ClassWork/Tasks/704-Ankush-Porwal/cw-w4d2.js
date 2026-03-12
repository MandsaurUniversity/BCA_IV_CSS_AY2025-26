// Objective Filter Arrays based on Certain Condition...
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Even numbers:" + numbers);
// Creating an array containing only even values...
const evens = numbers.filter(num => num % 2===0);
console.log("Even numbers:" + evens);

const odds = numbers.filter(num => num % 2 !== 0);
console.log("Odd numbers:" + odds);

// Filter numbers greater than 5...
const greaterThan5 = numbers.filter(num => num > 5);
console.log("Numbers greater than 5:" + greaterThan5);

// filter numbers between 3 and 7...
const numbetween3and7 = numbers.filter(num => num >= 3 && num <= 7);
console.log("Numbers between 3 and 7 are:" + numbetween3and7);

// Filter numbers divisible by 3...
const divisibleBy3 = numbers.filter(num => num % 3 === 0);
console.log("Numbers divisible by 3 are:" + divisibleBy3);