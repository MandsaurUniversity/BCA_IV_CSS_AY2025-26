# Week 2, Day 5: For Loops and Week 2 Integration Project

**Duration:** 180 minutes (90 min theory + 90 min practical)  
**Date:** February 14, 2026  
**Learning Outcome:** Master for loops and integrate all Week 2 concepts into a complete project

---

## 📚 THEORY SESSION (90 minutes)

### 1. The for Loop

A **for loop** is the most common loop. It's compact and perfect for counting.

```javascript
// ============================================
// FORMAT:
// for (initialization; condition; increment) {
//     // Code to repeat
// }
// ============================================

for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// Output:
// 1
// 2
// 3
// 4
// 5
```

**Breaking Down the for Loop:**

```javascript
for (let i = 1;    // Initialization: Start at 1
     i <= 5;       // Condition: Continue while i <= 5
     i++)          // Increment: Increase i by 1
{
    console.log(i);
}
```

---

### 2. for Loop Variations

#### Counting Down
```javascript
for (let i = 5; i > 0; i--) {
    console.log(i);
}

// Output: 5 4 3 2 1
```

#### Counting by Steps
```javascript
for (let i = 0; i <= 10; i += 2) {  // Increment by 2
    console.log(i);
}

// Output: 0 2 4 6 8 10


for (let i = 100; i >= 0; i -= 10) {  // Decrement by 10
    console.log(i);
}

// Output: 100 90 80 70 60 50 40 30 20 10 0
```

#### Starting from Different Numbers
```javascript
for (let i = 10; i < 15; i++) {
    console.log("Number: " + i);
}

// Output: Number: 10 through 14
```

---

### 3. for Loop vs while Loop

Both do the same thing, but for loop is more compact:

```javascript
// ============================================
// while loop
// ============================================
let i = 1;
while (i <= 5) {
    console.log(i);
    i++;
}


// ============================================
// for loop (same result, more concise)
// ============================================
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

**When to Use:**
- **for:** When you know the count (1-10, 100 times, etc.)
- **while:** When you check a condition (until user enters correct password)
- **do...while:** When code must run at least once

---

### 4. Nested Loops

A loop inside another loop:

```javascript
// Print multiplication table
for (let i = 1; i <= 3; i++) {
    console.log("Table " + i);
    
    for (let j = 1; j <= 3; j++) {
        console.log("  " + i + " × " + j + " = " + (i * j));
    }
}

// Output:
// Table 1
//   1 × 1 = 1
//   1 × 2 = 2
//   1 × 3 = 3
// Table 2
//   2 × 1 = 2
//   2 × 2 = 4
//   2 × 3 = 6
// Table 3
//   3 × 1 = 3
//   3 × 2 = 6
//   3 × 3 = 9
```

---

### 5. Loop Best Practices

```javascript
// ❌ AVOID: Using var in loops
for (var i = 0; i < 5; i++) {
    // var leaks outside loop scope
}
console.log(i);  // 5 (leaked outside!)

// ✅ CORRECT: Using let (block-scoped)
for (let i = 0; i < 5; i++) {
    // let stays inside loop
}
// console.log(i);  // Error! Not defined outside loop


// ❌ AVOID: Infinite loops
// for (let i = 0; i < 5; ) {  // Never increments!
//     console.log(i);
// }

// ✅ CORRECT: Always update loop variable
for (let i = 0; i < 5; i++) {  // i increments
    console.log(i);
}
```

---

## ✅ PRACTICAL SESSION (90 minutes)

### Exercise 5.1: Simple for Loop Patterns

**Objective:** Master basic for loop syntax

```javascript
console.log("=== Exercise 5.1: Simple Patterns ===");

// Pattern 1: Print numbers 1-10
console.log("\n1. Numbers 1 to 10:");
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

// Pattern 2: Even numbers 1-20
console.log("\n2. Even numbers 1-20:");
for (let i = 2; i <= 20; i += 2) {
    console.log(i);
}

// Pattern 3: Countdown 10-1
console.log("\n3. Countdown 10 to 1:");
for (let i = 10; i > 0; i--) {
    console.log(i);
}

// Pattern 4: Multiply each number
console.log("\n4. Doubling numbers:");
for (let i = 1; i <= 5; i++) {
    console.log(i + " × 2 = " + (i * 2));
}
```

---

### Exercise 5.2: Loops with Calculations

**Objective:** Use loops to process data

```javascript
console.log("=== Exercise 5.2: Calculations ===");

// Calculate sum of 1 to 10 using for loop
let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum = sum + i;
}
console.log("Sum of 1-10: " + sum);  // 55

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
console.log("Sum of squares (1-10): " + sumOfSquares);  // 385
```

---

### Exercise 5.3: Multiplication Table Generator

**Objective:** Use nested loops for complex patterns

```javascript
console.log("=== Exercise 5.3: Multiplication Tables ===");

// Print multiplication table for 5
function printTable(num) {
    console.log("Table of " + num);
    
    for (let i = 1; i <= 10; i++) {
        const result = num * i;
        console.log(num + " × " + i + " = " + result);
    }
}

printTable(7);

// Print multiple tables
console.log("\n=== Tables 1-3 ===");
for (let table = 1; table <= 3; table++) {
    console.log("\nTable of " + table);
    for (let i = 1; i <= 5; i++) {
        console.log(table + " × " + i + " = " + (table * i));
    }
}
```

---

### Exercise 5.4: Loop Control - break and continue

**Objective:** Control loop flow with break and continue

```javascript
console.log("=== Exercise 5.4: Loop Control ===");

// Example 1: Find first number >= 50
console.log("\n1. Find first multiple of 15:");
for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
        console.log("Found: " + i);
        break;  // Exit loop
    }
}

// Example 2: Skip odd numbers
console.log("\n2. Print only even numbers (1-10):");
for (let i = 1; i <= 10; i++) {
    if (i % 2 !== 0) {
        continue;  // Skip odd numbers
    }
    console.log(i);
}

// Example 3: Practical use - input validation
console.log("\n3. Process valid scores:");
const scores = [45, 92, 88, 36, 95, 78];

for (let i = 0; i < scores.length; i++) {
    if (scores[i] < 40) {
        console.log("Skipping invalid score: " + scores[i]);
        continue;
    }
    console.log("Valid score: " + scores[i]);
}
```

---

### Exercise 5.5: Pattern Printing

**Objective:** Create visual patterns using loops

```javascript
console.log("=== Exercise 5.5: Patterns ===");

// Pattern 1: Triangle
console.log("\nPattern 1: Triangle (*)");
for (let i = 1; i <= 5; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row = row + "*";
    }
    console.log(row);
}
// Output:
// *
// **
// ***
// ****
// *****


// Pattern 2: Numbers
console.log("\nPattern 2: Number Triangle");
for (let i = 1; i <= 4; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row = row + j;
    }
    console.log(row);
}
// Output:
// 1
// 12
// 123
// 1234


// Pattern 3: Reverse triangle
console.log("\nPattern 3: Reverse Triangle");
for (let i = 5; i > 0; i--) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row = row + "*";
    }
    console.log(row);
}
```

---

## 🎉 WEEK 2 INTEGRATION PROJECT (90 minutes)

### Project: Student Grade Management System

**Objective:** Combine Week 2 concepts (variables, functions, conditions, loops) into a real-world application

```javascript
/*
 * ================================
 * Student Grade Management System
 * ================================
 * 
 * Features:
 * 1. Calculate average marks
 * 2. Determine grade (A/B/C/D/F)
 * 3. Check if student passed/failed
 * 4. Generate report for multiple students
 */

// ============================================
// FUNCTION 1: Calculate Average
// ============================================
function calculateAverage(marks) {
    let sum = 0;
    
    for (let i = 0; i < marks.length; i++) {
        sum = sum + marks[i];
    }
    
    return sum / marks.length;
}


// ============================================
// FUNCTION 2: Determine Grade
// ============================================
function getGrade(average) {
    if (average >= 90) {
        return "A";
    } else if (average >= 80) {
        return "B";
    } else if (average >= 70) {
        return "C";
    } else if (average >= 60) {
        return "D";
    } else {
        return "F";
    }
}


// ============================================
// FUNCTION 3: Check Pass/Fail
// ============================================
function isPassed(average) {
    return average >= 40 ? "PASSED" : "FAILED";
}


// ============================================
// FUNCTION 4: Generate Student Report
// ============================================
function generateReport(studentName, subjectMarks) {
    const average = calculateAverage(subjectMarks);
    const grade = getGrade(average);
    const status = isPassed(average);
    
    console.log("╔════════════════════════════════════╗");
    console.log("║     STUDENT REPORT CARD             ║");
    console.log("╚════════════════════════════════════╝");
    console.log("Name: " + studentName);
    console.log("Marks: " + subjectMarks.join(", "));
    console.log("Average: " + average.toFixed(2));
    console.log("Grade: " + grade);
    console.log("Status: " + status);
    console.log("────────────────────────────────────");
}


// ============================================
// FUNCTION 5: Process Multiple Students
// ============================================
function processAllStudents(students) {
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        generateReport(student.name, student.marks);
        console.log();
    }
}


// ============================================
// MAIN PROGRAM
// ============================================

const students = [
    {
        name: "Alice",
        marks: [85, 92, 88, 90, 87]
    },
    {
        name: "Bob",
        marks: [72, 68, 75, 70, 73]
    },
    {
        name: "Charlie",
        marks: [95, 98, 92, 96, 94]
    },
    {
        name: "Diana",
        marks: [55, 48, 52, 50, 45]
    }
];

console.log("═══════════════════════════════════════");
console.log("  GRADE MANAGEMENT SYSTEM - WEEK 2 PROJECT");
console.log("═══════════════════════════════════════\n");

// Process all students
processAllStudents(students);

// Summary statistics
console.log("═══════════════════════════════════════");
console.log("SUMMARY STATISTICS");
console.log("═══════════════════════════════════════");

let totalAverage = 0;
let passed = 0;
let failed = 0;

for (let i = 0; i < students.length; i++) {
    const avg = calculateAverage(students[i].marks);
    totalAverage = totalAverage + avg;
    
    if (avg >= 40) {
        passed++;
    } else {
        failed++;
    }
}

console.log("Total Students: " + students.length);
console.log("Passed: " + passed);
console.log("Failed: " + failed);
console.log("Class Average: " + (totalAverage / students.length).toFixed(2));
console.log("Pass Rate: " + ((passed / students.length) * 100).toFixed(1) + "%");
```

**Sample Output:**
```
═══════════════════════════════════════════
  GRADE MANAGEMENT SYSTEM - WEEK 2 PROJECT
═══════════════════════════════════════════

╔════════════════════════════════════╗
║     STUDENT REPORT CARD             ║
╚════════════════════════════════════╝
Name: Alice
Marks: 85, 92, 88, 90, 87
Average: 88.40
Grade: B
Status: PASSED
────────────────────────────────────

╔════════════════════════════════════╗
║     STUDENT REPORT CARD             ║
╚════════════════════════════════════╝
Name: Bob
Marks: 72, 68, 75, 70, 73
Average: 71.60
Grade: C
Status: PASSED
────────────────────────────────────

═══════════════════════════════════════════
SUMMARY STATISTICS
═══════════════════════════════════════════
Total Students: 4
Passed: 4
Failed: 0
Class Average: 78.45
Pass Rate: 100.0%
```

---

## 🎯 Week 2 Achievements

✅ **Concepts Learned:**
- Expressions vs Statements (Day 1)
- Variables: const vs let (Day 1)
- Functions with return values (Day 2)
- console.log for output (Day 2)
- if/else conditional statements (Day 3)
- Logical operators: && || ! (Day 3)
- while and do...while loops (Day 4)
- for loops (Day 5)
- break and continue (Days 4-5)

✅ **Experiments Completed:**
- Experiment 8: Positive/Negative/Zero ✅
- Experiment 9: Odd/Even Check ✅
- Experiment 10: Find Largest Number ✅
- Experiment 11: Leap Year Checker ✅
- Experiment 12: Random Number Generator ✅

✅ **Skills Mastered:**
- Writing control flow logic
- Creating reusable functions
- Processing data with loops
- Making decisions with conditions
- Generating formatted output

---

## 📋 Week 2 Checklist

- [ ] Day 1: Expressions, Statements, Bindings
- [ ] Day 2: Functions and Return Values
- [ ] Day 3: Conditional Execution (if/else)
- [ ] Day 4: While and Do Loops
- [ ] Day 5: For Loops and Integration
- [ ] All Experiments 8-12 completed
- [ ] Integration project working
- [ ] Code follows best practices
- [ ] Submitted to GitHub Classroom

---

## 📚 Week 2 Summary

| Topic | Key Points | Used In |
|-------|-----------|---------|
| Variables | const by default, let when needed | All programs |
| Functions | Reusable code blocks with parameters | Organizing logic |
| Conditions | if/else, logical operators | Making decisions |
| while Loop | Loop while condition true | Until condition met |
| for Loop | Compact counting loop | Known iterations |
| break | Exit loop early | Search operations |
| continue | Skip to next iteration | Filter operations |

---

## 📖 Week 2 Learning Path Summary

- **Day 1:** Foundations - How to store values
- **Day 2:** Functions - How to organize code
- **Day 3:** Decisions - How to make choices
- **Day 4:** Repetition - How to loop (part 1)
- **Day 5:** Repetition - How to loop (part 2) + Integration

---

## 🚀 Next Week Preview: Week 3

When you're ready to move on, Week 3 covers:
- **Theme:** Functions & Data Structures
- **Focus:** Arrays, Objects, String Manipulation
- **Experiments:** 13-16 (String operations)
- **Major Project:** Contact Manager or Todo List

---

## 📚 Week 2 Terminology Reference

For consistency, all key terms introduced in Week 2 are defined at first use across the five days:

| Term | Day Introduced | Definition | Example |
|------|---|---|---|
| **Expression** | Day 1 | Code that produces a value | `10 + 20`, `age > 18` |
| **Statement** | Day 1 | A complete instruction | `let x = 5;`, `if (x > 0) { }` |
| **Binding** | Day 1 | Named variable storage | `const PI = 3.14;` |
| **Block** | Day 1 | Code in curly braces { } | `if { ... }`, `while { ... }` |
| **Scope** | Day 1 | Where variable can be used | Block-scoped with `let`/`const` |
| **Integer** | Day 2 | Whole number (no decimal) | `-5, 0, 42, 1000` |
| **Function** | Day 2 | Reusable code block | `function greet(name) { }` |
| **Parameter** | Day 2 | Variable in function definition | `function add(a, b)` |
| **Argument** | Day 2 | Value passed to function | `add(5, 3)` |
| **Return** | Day 2 | Value sent back from function | `return result;` |
| **Arrow Function** | Day 2 | Modern concise function | `const add = (a, b) => a + b;` |
| **Condition** | Day 3 | Boolean expression tested | `age >= 18`, `score > 50` |
| **Remainder** | Day 3 | Value left after division | `7 % 2 = 1` (modulus operator) |
| **Iteration** | Day 4 | One pass through a loop | Loop runs 5 times = 5 iterations |

---

## 🔗 Week 2 Content Organization Map

**Day 1: Foundations**
- Understanding expressions vs statements
- Storing values with variables (const vs let)
- Learning the environment concept

**Day 2: Functions**
- Creating reusable code blocks with functions
- Understanding parameters and return values
- Learning function syntax (traditional and arrow)

**Day 3: Decisions**
- Making choices with if/else statements
- Using comparison operators (===, !==, >, <, etc.)
- Combining conditions with logical operators (&&, ||, !)

**Day 4: Repetition (part 1)**
- Understanding loops and iterations
- Using while loops (condition-first)
- Using do...while loops (body-first)
- Loop control with break and continue

**Day 5: Repetition (part 2) + Integration**
- Using for loops (compact counting loops)
- Nested loops for complex patterns
- Integrating all Week 2 concepts into a full project

---

**File:** `Curriculum/Week-2/Day5-For-Loops-And-Integration.md`  
**Status:** Complete ✅  
**Last Updated:** February 2026  
**Audit Status:** Consistency fixes applied, terminology consolidated ✅

---

## 📝 Experiment 24: Generate a Random Number Between Two Numbers

**Objective:** Generate random integers within a specified range [min, max]  
**Mandatory Practical Requirement:** Official Experiment #24 (Unit 2)  
**Learning:** Using Math.random() with range calculations

<details>
  <summary><strong>Click to reveal solutions</strong></summary>

### Method 1: Manual Calculation (Without Built-in Functions)

```javascript
// Experiment 24: Generate random number between min and max
// Method 1: Using Math.random() with arithmetic

const min = 1;
const max = 10;

// Step-by-step calculation:
// Math.random() gives 0.0 to 0.999...
// Multiply by (max - min + 1) to get 0 to range
// Add min to shift to desired range
// Use Math.floor() to get integer

const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

console.log("Random number between " + min + " and " + max + ": " + randomNum);

// Example outputs (varies each time):
// Random number between 1 and 10: 7
// Random number between 1 and 10: 3
// Random number between 1 and 10: 9
```

**How It Works:**
```javascript
// For range 1-10:
Math.random()                           // 0.5234... (example)
Math.random() * (10 - 1 + 1)           // 0.5234 * 10 = 5.234
Math.floor(5.234)                       // 5
5 + 1                                   // 6 (final result in range 1-10)

// Another example:
Math.random() * 10 = 0.123...
Math.floor(0.123) = 0
0 + 1 = 1 (minimum value in range)
```

### Method 2: Using a Reusable Function (Smart Way)

```javascript
// Experiment 24: Random number generator function
// Method 2: Encapsulated in a function for reusability

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Or as arrow function:
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Usage:
console.log("Random 1-10: " + generateRandomNumber(1, 10));
console.log("Random 50-100: " + generateRandomNumber(50, 100));
console.log("Random -10 to 10: " + generateRandomNumber(-10, 10));

// Real-world example: Dice roller
const rollDice = () => generateRandomNumber(1, 6);
console.log("Dice roll: " + rollDice());  // 1-6
```

### Test Cases

```javascript
// Generate multiple random numbers to verify distribution
console.log("Generating 10 random numbers between 1 and 10:");
for (let i = 1; i <= 10; i++) {
    const random = Math.floor(Math.random() * 10) + 1;
    console.log("Iteration " + i + ": " + random);
}

console.log("\nGenerating random numbers in different ranges:");

// Range 50-100
console.log("\nRange 50-100:");
for (let i = 0; i < 5; i++) {
    const random = Math.floor(Math.random() * 51) + 50;
    console.log("- " + random);
}

// Range 1-100 (Lottery-like)
console.log("\nRange 1-100 (5 lottery numbers):");
for (let i = 0; i < 5; i++) {
    const random = Math.floor(Math.random() * 100) + 1;
    console.log("Ticket " + (i + 1) + ": " + random);
}

// Using the reusable function
console.log("\nUsing reusable function:");
const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

console.log("Random(1-10): " + getRandomInRange(1, 10));
console.log("Random(100-200): " + getRandomInRange(100, 200));
console.log("Random(-5 to 5): " + getRandomInRange(-5, 5));
```

</details>

---

## 📝 ASSIGNMENT SUBMISSION GUIDE

### File Naming Convention:
```
Week2/
├── Experiment_08_PositiveNegativeZero.js
├── Experiment_09_OddEven.js
├── Experiment_10_LargestNumber.js
├── Experiment_11_LeapYear.js
├── Experiment_12_RandomNumber.js
└── Week2_Integration_GradeSystem.js
```

### Each File Should Include:
```javascript
/*
 * Experiment X: Title
 * Name: [Student Name]
 * Roll No: [Roll Number]
 * Date: [Submission Date]
 * Description: Brief description
 */

// Code here...
```

### Commit Messages:
```bash
git add Week2/
git commit -m "[Week2-Complete] All experiments and integration project completed"
git push origin main
```

---

**Week 2 is now complete! Ready to move to Week 3! 🎉**
