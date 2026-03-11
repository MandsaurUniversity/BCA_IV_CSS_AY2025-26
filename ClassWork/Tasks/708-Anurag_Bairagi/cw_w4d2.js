const numbers = [1,2,3,4,5,6,7,8,9,10];
console.log("Numbers : " + numbers);

const even = numbers.filter(num=>num%2==0);
console.log("\nEven Numbers : " + even);

const odd = numbers.filter(num=>num%2!=0);
console.log("\nOdd Numbers : " + odd);

const greater5 = numbers.filter(num=>num>5);
console.log("\nNumbers greater than 5 : " + greater5);

const between3_7 = numbers.filter(num=>num>=3&&num<=7);
console.log("\nNumbers between 3&7: " + between3_7);


const divBy3 = numbers.filter(num=>num%3==0);
console.log("\nNumbers Divisible by 3: " + divBy3);