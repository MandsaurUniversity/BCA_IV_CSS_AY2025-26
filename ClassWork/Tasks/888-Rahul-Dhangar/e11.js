// Experiment 11: Check Leap Year
/*
Leap year rules:
 - Divisible by 400 -> Leap Year
 - Divisible by 100 -> Not a Leap Year
 - Divisible by 4 -> leap Year
 - Otherwise -> Not a Leap Year
 Student: Rahul Dhangar
*/

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    else if (year % 100 === 0) {
        return false;
    }
    else if (year % 4 === 0) {
        return true;
    }
    else 
        return false;
}

// Test cases:
console.log("Year 2000 a leap year? " + isLeapYear(2000));
console.log("Year 2025 a leap year? " + isLeapYear(2025));