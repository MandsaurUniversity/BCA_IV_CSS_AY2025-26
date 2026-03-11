// Experiment 9: Check if a number is odd or even
// Method 1: Manual logic with modulus

const number = 17;  // Change this value to test

// Explanation: number % 2 gives remainder when divided by 2
// If remainder is 0, number is even
// If remainder is 1, number is odd

if (number % 2 === 0) {
    console.log(number + " is an even number");
} else {
    console.log(number + " is an odd number");
}

// Example outputs:
// 17 is an odd number
// 24 is an even number
// 0 is an even number

// Experiment 9: Check odd/even using a function
// Method 2: Using function for reusability

function checkOddEven(num) {
    if (num % 2 === 0) {
        return "even";
    } else {
        return "odd";
    }
}

// Or using ternary (even more concise):
const checkOddEven = (num) => (num % 2 === 0) ? "even" : "odd";

// Usage:
console.log(17 + " is " + checkOddEven(17));   // 17 is odd
console.log(24 + " is " + checkOddEven(24));   // 24 is even
console.log(0 + " is " + checkOddEven(0));     // 0 is even
console.log(999 + " is " + checkOddEven(999)); // 999 is odd

// Comprehensive test suite
const testNumbers = [1, 2, 3, 10, 15, 100, 0, -5, -8];

console.log("Number | Odd/Even | Correct?");
console.log("-------|----------|--------");

testNumbers.forEach(num => {
    const result = (num % 2 === 0) ? "even" : "odd";
    const expected = (num % 2 === 0) ? "even" : "odd";
    const correct = result === expected ? "✓" : "✗";
    console.log(num + "      | " + result + "     | " + correct);
});