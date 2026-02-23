/*
 * Experiment 11: Check Leap Year
 * Leap year rules:
 * - Divisible by 400 → Leap year
 * - Divisible by 100 → NOT leap year
 * - Divisible by 4 → Leap year
 * - Otherwise → NOT leap year
 */

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;    // Divisible by 400
    } else if (year % 100 === 0) {
        return false;   // Divisible by 100 (but not 400)
    } else if (year % 4 === 0) {
        return true;    // Divisible by 4 (but not 100)
    } else {
        return false;   // Not divisible by 4
    }
}

// Test cases
console.log("=== Experiment 11: Leap Year Checker ===");
console.log("2000 is leap? " + isLeapYear(2000));  // true (div by 400)
console.log("1900 is leap? " + isLeapYear(1900));  // false (div by 100, not 400)
console.log("2024 is leap? " + isLeapYear(2024));  // true (div by 4)
console.log("2025 is leap? " + isLeapYear(2025));  // false (not div by 4)