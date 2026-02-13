# Week 2, Day 3: Conditional Execution (if/else)

**Duration:** 180 minutes (90 min theory + 90 min practical)  
**Date:** February 12, 2026  
**Learning Outcome:** Control program flow using conditional statements to make decisions

---

## 📚 THEORY SESSION (90 minutes)

### 1. Understanding Control Flow

**Definition:** **Control flow** is the order in which the computer executes statements in a program. By default, JavaScript executes code from top to bottom, one line at a time. This is called **sequential execution** (or linear flow).

There are three fundamental types of control flow:

```
┌─────────────────────────────────────────────────────┐
│  1. SEQUENTIAL FLOW (Default)                       │
│     Code runs top → bottom, line by line             │
│     Example: const x = 5; const y = 10;             │
│                                                     │
│  2. CONDITIONAL FLOW (Decision Making)              │
│     Code chooses which path to take based on a       │
│     condition (true or false)                        │
│     Example: if (x > 5) { ... } else { ... }        │
│                                                     │
│  3. ITERATIVE FLOW (Repetition / Loops)             │
│     Code repeats a block multiple times              │
│     Example: for (let i = 0; i < 10; i++) { ... }   │
└─────────────────────────────────────────────────────┘
```

```javascript
// Sequential flow — runs line by line, top to bottom
const price = 100;              // Line 1: executed first
const tax = price * 0.18;       // Line 2: executed second
const total = price + tax;      // Line 3: executed third
console.log(total);             // Line 4: executed fourth → 118
```

Today we learn **conditional flow** — how to make your program choose different paths. In Day 4-5, we'll learn **iterative flow** (loops).

---

### 2. What is Conditional Execution?

**Conditional execution** means running specific code only if a condition is true.

**Real-World Analogy:**
- **No condition:** "Always bring umbrella"
- **With condition:** "If it's raining, bring umbrella; otherwise, bring sunscreen"

```javascript
// Without conditions - Always same
console.log("Have you eaten?");

// With conditions - Different based on situation
const hasEaten = true;

if (hasEaten) {
    console.log("Great! You're healthy.");
} else {
    console.log("Go eat something!");
}
```

---

### 2. The if Statement

An **if statement** runs code only if a condition is true.

```javascript
// ============================================
// FORMAT:
// if (condition) {
//     // Code runs if condition is true
// }
// ============================================

const age = 25;

if (age > 18) {
    console.log("You are an adult!");
}

// Output: You are an adult!


const score = 45;

if (score >= 50) {
    console.log("You passed!");
}

// No output (condition is false)
```

---

### 3. The if/else Statement

**if/else** runs one block if condition is true, another if false.

```javascript
// ============================================
// FORMAT:
// if (condition) {
//     // Runs if condition is true
// } else {
//     // Runs if condition is false
// }
// ============================================

const temperature = 25;

if (temperature < 15) {
    console.log("It's cold! Wear a jacket.");
} else {
    console.log("It's pleasant! No jacket needed.");
}

// Output: It's pleasant! No jacket needed.


const age = 15;

if (age >= 18) {
    console.log("You can vote.");
} else {
    console.log("Too young to vote.");
}

// Output: Too young to vote.
```

---

### 4. if/else if/else Chain

For checking multiple conditions:

```javascript
// ============================================
// Multi-condition checking
// ============================================

const score = 75;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else if (score >= 60) {
    console.log("Grade: D");
} else {
    console.log("Grade: F");
}

// Output: Grade: C


const hour = 14;

if (hour < 12) {
    console.log("Good morning!");
} else if (hour < 18) {
    console.log("Good afternoon!");
} else if (hour < 21) {
    console.log("Good evening!");
} else {
    console.log("Good night!");
}

// Output: Good afternoon!
```

---

### 5. Comparison Operators (Conditions)

**Remainder**: The value left over after division. For example, when you divide 7 by 2, the result is 3 with a remainder of 1. In JavaScript, the `%` operator (called "modulus") gives you just the remainder part: `7 % 2` equals `1`.

Conditions use comparison operators to return true/false:

```javascript
const x = 10;
const y = 5;

// Equality
x == y;          // false (10 is not equal to 5)
x === y;         // false (10 is not identical to 5)

// Inequality
x != y;          // true (10 is not equal to 5)
x !== y;         // true (10 is not identical to 5)

// Greater/Less
x > y;           // true (10 is greater than 5)
x < y;           // false (10 is not less than 5)
x >= 10;         // true (10 is greater than or equal to 10)
x <= 5;          // false (10 is not less than or equal to 5)
```

**Important:** Always use `===` and `!==` (strict equality) in JavaScript!

```javascript
// Avoid these (loose equality causes bugs)
"5" == 5;        // true (wrong! String equals number)
"5" === 5;       // false (correct! Types must match)

0 == false;      // true (unexpected!)
0 === false;     // false (safe comparison)
```

---

### 6. Logical Operators

Combine multiple conditions:

```javascript
// AND (&&) - Both conditions must be true
const age = 25;
const hasLicense = true;

if (age >= 18 && hasLicense) {
    console.log("You can drive!");
}


// OR (||) - At least one condition must be true
const isWeekend = false;
const isHoliday = true;

if (isWeekend || isHoliday) {
    console.log("No work today!");
}


// NOT (!) - Reverses true/false
const isRaining = false;

if (!isRaining) {
    console.log("Go for a walk!");
}
```

---

### 7. The Ternary Operator (Shorthand if/else)

A compact way to write simple if/else:

```javascript
// ============================================
// FORMAT:
// condition ? valueIfTrue : valueIfFalse
// ============================================

const age = 25;
const status = age >= 18 ? "Adult" : "Child";
console.log(status);             // Output: Adult


const score = 45;
const result = score >= 50 ? "Pass" : "Fail";
console.log(result);             // Output: Fail


// Nested ternary (more complex)
const temperature = 25;
const weather = temperature < 10 ? "Cold" : 
                temperature < 20 ? "Cool" : 
                temperature < 30 ? "Warm" : 
                "Hot";
console.log(weather);            // Output: Warm
```

---

## ✅ PRACTICAL SESSION (90 minutes)

### Experiment 8: Check if Number is Positive, Negative, or Zero

**Objective:** Use if/else if/else to categorize numbers

```javascript
/*
 * Experiment 8: Check Positive, Negative, or Zero
 * Determine the sign of a number
 */

function checkNumberSign(num) {
    if (num > 0) {
        return "Positive";
    } else if (num < 0) {
        return "Negative";
    } else {
        return "Zero";
    }
}

// Test cases
console.log("=== Experiment 8: Number Sign Checker ===");
console.log(checkNumberSign(15) + " (Expected: Positive)");
console.log(checkNumberSign(-8) + " (Expected: Negative)");
console.log(checkNumberSign(0) + " (Expected: Zero)");
console.log(checkNumberSign(42) + " (Expected: Positive)");
console.log(checkNumberSign(-100) + " (Expected: Negative)");

// More detailed version with messages
function analyzeNumber(num) {
    console.log("\nAnalyzing number: " + num);
    
    if (num > 0) {
        console.log("✓ This is a POSITIVE number");
    } else if (num < 0) {
        console.log("✗ This is a NEGATIVE number");
    } else {
        console.log("= This is ZERO");
    }
}

analyzeNumber(10);
analyzeNumber(-25);
analyzeNumber(0);
```

---

### Experiment 9: Check if Number is Odd or Even

**Objective:** Use modulus operator (%) and if/else

```javascript
/*
 * Experiment 9: Check Odd or Even
 * Determine if a number is divisible by 2
 */

function checkOddEven(num) {
    if (num % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}

// Test cases
console.log("\n=== Experiment 9: Odd/Even Checker ===");
console.log("12 is " + checkOddEven(12) + " (Expected: Even)");
console.log("7 is " + checkOddEven(7) + " (Expected: Odd)");
console.log("0 is " + checkOddEven(0) + " (Expected: Even)");
console.log("99 is " + checkOddEven(99) + " (Expected: Odd)");
console.log("-4 is " + checkOddEven(-4) + " (Expected: Even)");

// Using ternary operator (shorthand)
const num = 15;
const type = num % 2 === 0 ? "Even" : "Odd";
console.log("\n" + num + " is " + type);

// Function with detailed output
function analyzeNumber(num) {
    const remainder = num % 2;
    
    console.log("\nAnalyzing: " + num);
    console.log("Remainder when divided by 2: " + remainder);
    
    if (remainder === 0) {
        console.log("✓ EVEN number (divisible by 2)");
    } else {
        console.log("✗ ODD number (not divisible by 2)");
    }
}

analyzeNumber(10);
analyzeNumber(17);
```

---

### Experiment 10: Find Largest Among Three Numbers

**Objective:** Use if/else if/else to compare values

```javascript
/*
 * Experiment 10: Find Largest Among Three Numbers
 * Compare three numbers and find the maximum
 */

function findLargest(a, b, c) {
    if (a > b && a > c) {
        return a;
    } else if (b > a && b > c) {
        return b;
    } else {
        return c;
    }
}

// Test cases
console.log("\n=== Experiment 10: Find Largest Number ===");
console.log("Among 10, 20, 15: " + findLargest(10, 20, 15));  // 20
console.log("Among 5, 3, 9: " + findLargest(5, 3, 9));        // 9
console.log("Among 7, 7, 7: " + findLargest(7, 7, 7));        // 7
console.log("Among -5, -2, -10: " + findLargest(-5, -2, -10)); // -2

// Detailed version
function compareLargest(a, b, c) {
    console.log("\nComparing: " + a + ", " + b + ", " + c);
    
    let largest;
    
    if (a > b && a > c) {
        largest = a;
        console.log(a + " is the largest");
    } else if (b > a && b > c) {
        largest = b;
        console.log(b + " is the largest");
    } else if (c > a && c > b) {
        largest = c;
        console.log(c + " is the largest");
    } else {
        largest = a;
        console.log("All numbers are equal (or tied)");
    }
    
    return largest;
}

compareLargest(15, 25, 10);
compareLargest(8, 8, 8);
```

---

### Exercise 3.4: Combined Conditions with &&  and ||

**Objective:** Use logical operators for complex conditions

```javascript
/*
 * Movie eligibility: R-rated movie requires age >= 18 OR parent permission
 */

function canWatchMovie(age, hasParentPermission) {
    if (age >= 18 || hasParentPermission) {
        return "You can watch the R-rated movie!";
    } else {
        return "You cannot watch this movie.";
    }
}

console.log("\n=== Movie Eligibility ===");
console.log(canWatchMovie(20, false));   // Can watch (age >= 18)
console.log(canWatchMovie(15, true));    // Can watch (parent permission)
console.log(canWatchMovie(15, false));   // Cannot watch (both false)

/*
 * Discount eligibility: Senior (age >= 60) AND student with ID
 */

function getDiscount(age, hasStudentID) {
    if (age >= 60 || hasStudentID) {
        return "50% discount!";
    } else {
        return "No discount available.";
    }
}

console.log("\n=== Senior/Student Discount ===");
console.log(getDiscount(65, false));     // Discount (senior)
console.log(getDiscount(20, true));      // Discount (student)
console.log(getDiscount(30, false));     // No discount
```

---

### Exercise 3.5: Real-World Application - Eligibility Checker

**Objective:** Combine all conditional concepts

```javascript
/*
 * Loan Eligibility Checker
 * Requirements:
 * - Age >= 21
 * - Annual income >= 300000
 * - Credit score >= 650
 */

function checkLoanEligibility(age, income, creditScore) {
    console.log("=== Loan Eligibility Check ===");
    console.log("Age: " + age);
    console.log("Annual Income: ₹" + income);
    console.log("Credit Score: " + creditScore);
    
    if (age >= 21 && income >= 300000 && creditScore >= 650) {
        console.log("✓ APPROVED - You're eligible for the loan!");
        return true;
    } else {
        console.log("✗ REJECTED - You don't meet all requirements.");
        
        // Detailed feedback
        if (age < 21) {
            console.log("  ✗ Age must be at least 21");
        }
        if (income < 300000) {
            console.log("  ✗ Annual income must be at least ₹300000");
        }
        if (creditScore < 650) {
            console.log("  ✗ Credit score must be at least 650");
        }
        
        return false;
    }
}

// Test cases
checkLoanEligibility(25, 500000, 720);      // APPROVED
checkLoanEligibility(20, 500000, 720);      // REJECTED (age)
checkLoanEligibility(25, 250000, 720);      // REJECTED (income)
checkLoanEligibility(25, 500000, 600);      // REJECTED (credit)
```

---

## 🎯 Key Patterns

### Pattern 1: Simple Decision
```javascript
if (condition) {
    // Do something
}
```

### Pattern 2: Choose Between Two Options
```javascript
if (condition) {
    // Option A
} else {
    // Option B
}
```

### Pattern 3: Multiple Choices
```javascript
if (condition1) {
    // Choice 1
} else if (condition2) {
    // Choice 2
} else if (condition3) {
    // Choice 3
} else {
    // Default choice
}
```

---

## 📋 Practice Challenges

### Challenge 1: Grade Calculator
Take marks (0-100) and give grade (A/B/C/D/F)

### Challenge 2: Swimming Pool Rules
Check if person can swim based on:
- Age >= 5
- Can swim OR has parent with them

### Challenge 3: Restaurant Seating
Check if customer can be seated:
- Party size <= table capacity
- Has reservation OR wait time < 30 min

---

## ✅ Checklist

- [ ] Understand if statements
- [ ] Can write if/else chains
- [ ] Know comparison operators (===, !==, >, <, etc.)
- [ ] Understand && (AND) and || (OR)
- [ ] Can use ternary operator
- [ ] Completed Experiments 8-10
- [ ] Completed Exercises 3.4-3.5
- [ ] Challenge questions attempted

---

## 📚 Summary

| Operator | Meaning | Example |
|----------|---------|---------|
| === | Strictly equal | `5 === 5` → true |
| !== | Strictly not equal | `5 !== "5"` → true |
| > | Greater than | `10 > 5` → true |
| < | Less than | `10 < 5` → false |
| >= | Greater or equal | `5 >= 5` → true |
| <= | Less or equal | `5 <= 5` → true |
| && | AND (both true) | `true && true` → true |
| \|\| | OR (one true) | `true \|\| false` → true |
| ! | NOT (opposite) | `!true` → false |

---

## � Experiment 10: Find the Largest Among Three Numbers

**Objective:** Use nested if-else statements to compare multiple values and find maximum  
**Mandatory Practical Requirement:** Official Experiment #10 (Unit 2)  
**Learning:** Complex conditional logic with multiple comparisons

<details>
  <summary><strong>Click to reveal solutions</strong></summary>

### Method 1: Nested if-else Logic (Manual Comparison)

```javascript
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
```

### Method 2: Using Math.max() (Smart Way)

```javascript
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
```

### Test Cases with Both Methods

```javascript
// Test Case 1: First number is largest
console.log("Test 1: num1=100, num2=50, num3=75");
const a1 = 100, b1 = 50, c1 = 75;
let largest1;
if (a1 > b1 && a1 > c1) largest1 = a1;
else if (b1 > a1 && b1 > c1) largest1 = b1;
else largest1 = c1;
console.log("Result: " + largest1 + " (Expected: 100) ✓\n");

// Test Case 2: Second number is largest
console.log("Test 2: num1=30, num2=95, num3=60");
const a2 = 30, b2 = 95, c2 = 60;
let largest2;
if (a2 > b2 && a2 > c2) largest2 = a2;
else if (b2 > a2 && b2 > c2) largest2 = b2;
else largest2 = c2;
console.log("Result: " + largest2 + " (Expected: 95) ✓\n");

// Test Case 3: Third number is largest
console.log("Test 3: num1=40, num2=50, num3=99");
const a3 = 40, b3 = 50, c3 = 99;
let largest3;
if (a3 > b3 && a3 > c3) largest3 = a3;
else if (b3 > a3 && b3 > c3) largest3 = b3;
else largest3 = c3;
console.log("Result: " + largest3 + " (Expected: 99) ✓\n");

// Using Math.max:
console.log("Using Math.max():");
console.log("Test 1: Math.max(100, 50, 75) = " + Math.max(100, 50, 75));
console.log("Test 2: Math.max(30, 95, 60) = " + Math.max(30, 95, 60));
console.log("Test 3: Math.max(40, 50, 99) = " + Math.max(40, 50, 99));
```

</details>

---

## �📖 Today's Learning Path

**09:00-09:30 (30 min):** Theory - if/else Basics  
**09:30-10:00 (30 min):** Theory - Comparison & Logical Operators  
**10:00-10:30 (30 min):** Practice - Experiments 8-10  
**10:30-11:00 (30 min):** Practice - Exercises 3.4-3.5  
**11:00-11:30 (30 min):** Challenges & Wrap-up  

**Next Day Preview:** Loops - Repeating code multiple times with while and do loops!

---

**File:** `Curriculum/Week-2/Day3-Conditional-Execution.md`  
**Status:** Complete ✅  
**Last Updated:** February 2026
