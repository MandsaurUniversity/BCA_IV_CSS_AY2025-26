/*
 * Experiment 2: Add Two Numbers (User input approach)
 * Get numbers from user and add them
 */

// Get input from user
const input1 = prompt("Enter first number:");
const input2 = prompt("Enter second number:");

// Convert strings to numbers
const num1 = parseFloat(input1);
const num2 = parseFloat(input2);

// Add them
const sum = num1 + num2;

// Display result
console.log(num1 + " + " + num2 + " = " + sum);
alert("Sum: " + sum);

// Alternatively using Number():
const number1 = Number(prompt("Enter first number:"));
const number2 = Number(prompt("Enter second number:"));
const total = number1 + number2;
console.log("Total: " + total);

// TEST CASES (simulated)
console.log("--- Test Case 1: 15 + 25 ---");
const test1a = 15;
const test1b = 25;
console.log("Result: " + (test1a + test1b));

console.log("\n--- Test Case 2: 100 + 200 ---");
const test2a = 100;
const test2b = 200;
console.log("Result: " + (test2a + test2b));