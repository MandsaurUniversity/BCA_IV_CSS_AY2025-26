/*
 * Experiment 3: Find Square Root (Using exponentiation)
 * Calculate square root with manual power calculation
 */

// Method: x^(1/2) = √x
const number = 16;
const squareRoot = number ** 0.5;

console.log("Number: " + number);
console.log("Square Root: " + squareRoot);

// TEST CASES
console.log("\n--- Test Case 1: Perfect squares ---");
console.log("√4 = " + (4 ** 0.5));      // 2
console.log("√9 = " + (9 ** 0.5));      // 3
console.log("√25 = " + (25 ** 0.5));    // 5
console.log("√100 = " + (100 ** 0.5));  // 10

console.log("\n--- Test Case 2: Non-perfect squares ---");
console.log("√2 = " + (2 ** 0.5).toFixed(4));       // 1.4142
console.log("√10 = " + (10 ** 0.5).toFixed(4));     // 3.1623
console.log("√50 = " + (50 ** 0.5).toFixed(4));     // 7.0711

console.log("\n--- Test Case 3: Edge cases ---");
console.log("√0 = " + (0 ** 0.5));      // 0
console.log("√1 = " + (1 ** 0.5));      //1
console.log("√0.25 = " + (0.25 ** 0.5)); // 0.5


/*
 * Experiment 3: Find Square Root (Using Math object - Smart approach)
 * Leverage JavaScript's built-in Math library
 */

const number1 = 16;
const squareRoot1 = Math.sqrt(number1);

console.log("Number: " + number1);
console.log("Square Root: " + squareRoot);

// TEST CASES
console.log("\n--- Test Case 1: Perfect squares ---");
console.log("√4 = " + Math.sqrt(4));       // 2
console.log("√9 = " + Math.sqrt(9));       // 3
console.log("√25 = " + Math.sqrt(25));     // 5
console.log("√100 = " + Math.sqrt(100));   // 10
console.log("√144 = " + Math.sqrt(144));   // 12

console.log("\n--- Test Case 2: Non-perfect squares ---");
console.log("√2 = " + Math.sqrt(2).toFixed(4));    // 1.4142
console.log("√10 = " + Math.sqrt(10).toFixed(4));  // 3.1623
console.log("√7 = " + Math.sqrt(7).toFixed(4));    // 2.6458

console.log("\n--- Test Case 3: Real-world application ---");
// Pythagorean theorem: c = √(a² + b²)
const sideA = 3;
const sideB = 4;
const hypotenuse = Math.sqrt(sideA * sideA + sideB * sideB);
console.log("Right triangle with sides " + sideA + " and " + sideB);
console.log("Hypotenuse: " + hypotenuse);  // 5
