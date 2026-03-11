const numbers=[1,2,3,4,5,6,7,8,9,10];

const evens=numbers.filter(n=>n%2==0);
console.log(evens);

const odds=numbers.filter(n=>n%2!=0);
console.log(odds);

const greaterthanfive=numbers.filter(n=>n>5);
console.log(`numbers greater than five are : ${greaterthanfive}`);

const NumberbetweenThreeAndFive=numbers.filter(n=>n>3 && n<7);
console.log("Numbers between Three And Five are : ", NumberbetweenThreeAndFive);

const divisibleBy3=numbers.filter(n=>n%3==0);
console.log("Number divisible by 3 are ", divisibleBy3);