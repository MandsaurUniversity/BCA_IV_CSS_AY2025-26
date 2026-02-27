//experiment 11: check leap year
/*
Leap yera rules:
-Division by 400 ->leap year
-Division by 100 -> not a leap year
-Division by 4 -> leap year
-Otherwise -> not a leap year
-Student : Divya Jain
*/

function isLeapYear(year){
    if (year %400 ===0){
        return true;
    }
    else if (year %100 ===0){
        return false;
    }
    else if (year %4 ===0){
        return true;
    }
    else{
        return false;
    }
    
}
console.log("2000 is leap? " + isLeapYear(2000));  // true (div by 400)
console.log("1900 is leap? " + isLeapYear(1900));  // false (div by 100, not 400)
console.log("2024 is leap? " + isLeapYear(2024));  // true (div by 4)
console.log("2025 is leap? " + isLeapYear(2025));  // false (not div by 4)
