console.log("\n=== Calculations ===");

// Calculate sum of 1 to 10 using for loop
let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum = sum + i;
}
console.log("\nSum of 1-10: " + sum);  // 55

// Calculate factorial of 5 (5! = 5×4×3×2×1)
let factorial = 1;
for (let i = 5; i > 0; i--) {
    factorial = factorial * i;
}
console.log("5 factorial: " + factorial);  // 120

// Find sum of squares 1² + 2² + 3² + ... + 10²
let sumOfSquares = 0;
for (let i = 1; i <= 10; i++) {
    sumOfSquares = sumOfSquares + (i * i);
}
console.log("\n.Sum of squares (1-10): " + sumOfSquares + "\n");  // 385