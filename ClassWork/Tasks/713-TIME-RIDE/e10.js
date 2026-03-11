// Experiment 10: Find the largest among three numbers
// Method 1: Using nested if-else statements

const num1 = 45;
const num2 = 78;
const num3 = 23;

let largest;

// Compare num1 with num2
if (num1 > num2) {
    // If num1 is larger, compare num1 with num3
    if (num1 > num3) {
        largest = num1;
    } else {
        largest = num3;
    }
} else {
    // If num2 is larger, compare num2 with num3
    if (num2 > num3) {
        largest = num2;
    } else {
        largest = num3;
    }
}

console.log("The largest number is: " + largest);

// Example outputs:
// The largest number is: 78
// (when num1=45, num2=78, num3=23)

// Experiment 10: Find largest number using built-in function
// Method 2: Using Math.max() for cleaner code

const num1 = 45;
const num2 = 78;
const num3 = 23;

const largest = Math.max(num1, num2, num3);

console.log("The largest number is: " + largest);  // 78

// Can also work with arrays:
const numbers = [45, 78, 23, 56, 12];
const max = Math.max(...numbers);  // Spread operator
console.log("Maximum: " + max);    // 56