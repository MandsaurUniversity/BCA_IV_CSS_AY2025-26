/*
 * Experiment 5: Swap Two Variables (Using destructuring - Modern approach)
 * Elegant one-liner using ES6 destructuring
 */

let a = 10;
let b = 20;

console.log("Before swap:");
console.log("a = " + a + ", b = " + b);

// Swapping with destructuring
[a, b] = [b, a];

console.log("\nAfter swap:");
console.log("a = " + a + ", b = " + b);

// TEST CASES
console.log("\n--- Test Case 1: Swap numbers ---");
let num1 = 100;
let num2 = 200;
console.log("Before: num1 = " + num1 + ", num2 = " + num2);

[num1, num2] = [num2, num1];

console.log("After: num1 = " + num1 + ", num2 = " + num2);

console.log("\n--- Test Case 2: Swap strings ---");
let name1 = "Alice";
let name2 = "Bob";
console.log("Before: name1 = " + name1 + ", name2 = " + name2);

[name1, name2] = [name2, name1];

console.log("After: name1 = " + name1 + ", name2 = " + name2);

console.log("\n--- Test Case 3: Multiple swaps ---");
let x = 1;
let y = 2;
let z = 3;
console.log("Before: x = " + x + ", y = " + y + ", z = " + z);

[x, y, z] = [z, x, y];  // Rotate values

console.log("After: x = " + x + ", y = " + y + ", z = " + z);