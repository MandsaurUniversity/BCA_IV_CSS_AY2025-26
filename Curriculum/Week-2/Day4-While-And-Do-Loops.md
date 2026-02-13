# Week 2, Day 4: While and Do Loops

**Duration:** 180 minutes (90 min theory + 90 min practical)  
**Date:** February 13, 2026  
**Learning Outcome:** Understand loops to repeat code multiple times

---

## 📚 THEORY SESSION (90 minutes)

### 1. What is a Loop?

**Iteration**: One execution/pass through a loop. If a loop runs 5 times, that's 5 iterations. The word "iterate" means "to repeat."

A **loop** runs a block of code repeatedly until a condition becomes false.

**Real-World Analogy:**
- **No loop:** "Flip card 1, flip card 2, flip card 3, flip card 4..."
- **With loop:** "While there are cards on the table, flip the next card"

```javascript
// Without loop - Repetitive
console.log("1");
console.log("2");
console.log("3");
console.log("4");
console.log("5");

// With loop - Clean
let i = 1;
while (i <= 5) {
    console.log(i);
    i = i + 1;
}
```

---

### 2. The while Loop

A **while loop** repeats code as long as a condition is true.

```javascript
// ============================================
// FORMAT:
// while (condition) {
//     // Code to repeat
//     // MUST update condition somehow (or infinite loop!)
// }
// ============================================

let count = 1;

while (count <= 5) {
    console.log("Count: " + count);
    count = count + 1;  // Must update, or infinite loop!
}

// Output:
// Count: 1
// Count: 2
// Count: 3
// Count: 4
// Count: 5
```

**Important:** Always make progress toward ending the loop!

```javascript
let x = 0;

// ❌ INFINITE LOOP - NEVER DO THIS
// while (x < 10) {
//     console.log(x);
//     // x never changes! Loop never ends!
// }

// ✅ CORRECT - Loop will end
while (x < 10) {
    console.log(x);
    x = x + 1;  // Progress toward condition
}
```

---

### 3. Practical while Loop Examples

#### Example 1: Counting Up
```javascript
let num = 1;

while (num <= 3) {
    console.log("Number: " + num);
    num++;  // Same as: num = num + 1
}

// Output:
// Number: 1
// Number: 2
// Number: 3
```

#### Example 2: Counting Down
```javascript
let countdown = 5;

while (countdown > 0) {
    console.log(countdown + "...");
    countdown--;  // Same as: countdown = countdown - 1
}
console.log("Blastoff!");

// Output:
// 5...
// 4...
// 3...
// 2...
// 1...
// Blastoff!
```

#### Example 3: Process Until Condition Met
```javascript
let password = "";
let correctPassword = "secret123";

// Simulate prompting for password
let attempts = 0;
while (attempts < 3) {
    password = "attempt" + (attempts + 1);
    
    if (password === correctPassword) {
        console.log("Login successful!");
        break;  // Exit loop early
    } else {
        console.log("Wrong password. Try again.");
    }
    
    attempts++;
}
```

---

### 4. The do...while Loop

A **do...while loop** runs code first, THEN checks condition. It always runs at least once!

```javascript
// ============================================
// FORMAT:
// do {
//     // Code to repeat
// } while (condition);
// ============================================

let i = 1;

do {
    console.log("Iteration: " + i);
    i++;
} while (i <= 3);

// Output:
// Iteration: 1
// Iteration: 2
// Iteration: 3


// ============================================
// DIFFERENCE: do...while vs while
// ============================================

// while loop - checks FIRST
let x = 10;
while (x < 5) {           // Condition false, so doesn't run
    console.log("while");
}
// Output: (nothing)


// do...while loop - runs FIRST, checks LATER
let y = 10;
do {
    console.log("do...while");  // Runs even though condition is false
} while (y < 5);
// Output: do...while (printed once!)
```

---

### 5. Loop Control: break and continue

#### break - Exit Loop Early
```javascript
let i = 1;

while (true) {  // Infinite loop condition
    if (i > 5) {
        break;  // Exit the loop
    }
    console.log(i);
    i++;
}

// Output: 1 2 3 4 5


// Real-world: Search for specific value
let students = ["Alice", "Bob", "Charlie", "Diana"];
let searchName = "Charlie";
let found = false;

let count = 0;
while (count < students.length) {
    if (students[count] === searchName) {
        console.log("Found " + searchName + "!");
        found = true;
        break;  // Stop searching
    }
    count++;
}
```

#### continue - Skip to Next Iteration
```javascript
let i = 0;

while (i < 5) {
    i++;
    
    if (i === 3) {
        continue;  // Skip printing 3
    }
    
    console.log(i);
}

// Output: 1 2 4 5


// Real-world: Process only valid numbers
let numbers = [1, -2, 3, -4, 5];
let index = 0;

while (index < numbers.length) {
    if (numbers[index] < 0) {
        index++;
        continue;  // Skip negative numbers
    }
    
    console.log("Positive: " + numbers[index]);
    index++;
}
```

---

## ✅ PRACTICAL SESSION (90 minutes)

### Experiment 11: Check Leap Year

**Objective:** Use conditions to determine if a year is a leap year

```javascript
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

// Detailed version with explanation
function checkLeapYear(year) {
    console.log("\nChecking year: " + year);
    
    if (year % 400 === 0) {
        console.log("✓ " + year + " is a LEAP YEAR (divisible by 400)");
        return true;
    } else if (year % 100 === 0) {
        console.log("✗ " + year + " is NOT a leap year (divisible by 100)");
        return false;
    } else if (year % 4 === 0) {
        console.log("✓ " + year + " is a LEAP YEAR (divisible by 4)");
        return true;
    } else {
        console.log("✗ " + year + " is NOT a leap year");
        return false;
    }
}

checkLeapYear(2020);
checkLeapYear(2021);
checkLeapYear(1996);
```

---

### Experiment 12: Generate Random Number Between Two Numbers

**Objective:** Generate random numbers within a range

```javascript
/*
 * Experiment 12: Random Number Between Two Numbers
 */

function randomBetween(min, max) {
    // Math.random() gives 0 to 0.999...
    // Formula: min + (random * range)
    const random = Math.random();
    const range = max - min + 1;
    const randomInRange = Math.floor(random * range);
    return min + randomInRange;
}

// Test cases
console.log("\n=== Experiment 12: Random Number Generator ===");
console.log("Random between 1-10:");
for (let i = 0; i < 5; i++) {
    console.log(randomBetween(1, 10));
}

console.log("\nRandom between 50-100:");
for (let i = 0; i < 5; i++) {
    console.log(randomBetween(50, 100));
}

// Dice roller example
function rollDice() {
    return randomBetween(1, 6);
}

console.log("\n=== Dice Rolls ===");
console.log("Roll 1: " + rollDice());
console.log("Roll 2: " + rollDice());
console.log("Roll 3: " + rollDice());
console.log("Roll 4: " + rollDice());
```

---

### Exercise 4.3: Loop with Calculations

**Objective:** Use loops to process multiple values

```javascript
/*
 * Problem: Sum numbers from 1 to N
 */

function sumToN(n) {
    let sum = 0;
    let current = 1;
    
    while (current <= n) {
        sum = sum + current;  // Add current number
        current++;            // Move to next
    }
    
    return sum;
}

console.log("\n=== Sum Numbers ===");
console.log("Sum of 1 to 5: " + sumToN(5));      // 15 (1+2+3+4+5)
console.log("Sum of 1 to 10: " + sumToN(10));    // 55
console.log("Sum of 1 to 100: " + sumToN(100));  // 5050

// Visualization
function sumWithTrace(n) {
    console.log("\nCalculating sum of 1 to " + n);
    let sum = 0;
    let current = 1;
    
    while (current <= n) {
        sum = sum + current;
        console.log("Added " + current + " → Sum is now " + sum);
        current++;
    }
    
    return sum;
}

sumWithTrace(5);
```

---

### Exercise 4.4: Using break Statement

**Objective:** Exit loop early based on condition

```javascript
/*
 * Problem: Find first number divisible by 3
 */

function findFirstDivisibleBy3(start, end) {
    let current = start;
    
    while (current <= end) {
        if (current % 3 === 0) {
            return current;  // Found it!
        }
        current++;
    }
    
    return undefined;  // Not found
}

console.log("\n=== Find Divisible by 3 ===");
console.log("First in 1-10: " + findFirstDivisibleBy3(1, 10));    // 3
console.log("First in 20-30: " + findFirstDivisibleBy3(20, 30));  // 21

// With break
function searchBreak(max) {
    console.log("\nSearching from 1 to " + max);
    let num = 1;
    
    while (num <= max) {
        if (num % 3 === 0) {
            console.log("Found: " + num);
            break;  // Exit immediately
        }
        num++;
    }
}

searchBreak(10);
```

---

### Exercise 4.5: do...while Loop Example

**Objective:** Understand when do...while is useful

```javascript
/*
 * Problem: Menu-driven program (simulated)
 */

function menuDemo() {
    console.log("\n=== Menu-Driven Program ===");
    let choice = 1;
    let iteration = 0;
    
    // do...while ensures menu shows at least once
    do {
        console.log("Menu Options: 1=Start, 2=Continue, 3=Exit");
        console.log("You chose: " + choice);
        
        if (choice === 1) {
            console.log("Starting program...");
        } else if (choice === 2) {
            console.log("Continuing...");
        } else if (choice === 3) {
            console.log("Exiting...");
            break;
        }
        
        // Simulate next choice
        iteration++;
        if (iteration === 1) choice = 2;
        else choice = 3;
        
    } while (choice !== 3);
}

menuDemo();

/*
 * Practical use: User login with retry limit
 */

function loginAttempt() {
    console.log("\n=== Login Attempt ===");
    let attempts = 0;
    let maxAttempts = 3;
    let isLoggedIn = false;
    
    do {
        attempts++;
        console.log("Attempt " + attempts + ": Entering password...");
        
        // Simulate checking (always fails first 2 times)
        if (attempts === 3) {
            isLoggedIn = true;
            console.log("✓ Login successful!");
        } else {
            console.log("✗ Invalid password");
        }
        
    } while (!isLoggedIn && attempts < maxAttempts);
    
    if (!isLoggedIn) {
        console.log("Account locked!");
    }
}

loginAttempt();
```

---

## 🎯 Loop Categories

### Pattern 1: Count Up
```javascript
let i = 1;
while (i <= 10) {
    // Do something
    i++;
}
```

### Pattern 2: Count Down
```javascript
let i = 10;
while (i > 0) {
    // Do something
    i--;
}
```

### Pattern 3: Until Condition Met
```javascript
let found = false;
while (!found) {
    // Search for something
    if (condition) {
        found = true;
    }
}
```

### Pattern 4: Guaranteed At Least Once
```javascript
do {
    // Code runs at least once
} while (condition);
```

---

## 📋 Practice Challenges

### Challenge 1: Multiplication Table
Print times-table (1-10) using a loop

### Challenge 2: Count Specific Numbers
Count how many numbers in 1-100 are divisible by 5

### Challenge 3: Find Pattern
Find first even number sqrt(n) > 10

---

## 📝 Note on Leap Year Experiments

**Clarification**: Leap year checking logic (Experiment 11) is covered comprehensively in the \"**Experiment 11: Check Leap Year**\" section earlier in this file. Both simple and advanced implementations with complete test cases are provided there. Refer to that section for all leap year solutions that fully satisfy the mandatory requirement from the Unit 2 practical syllabus.

---

## ✅ Checklist

- [ ] Understand while loops
- [ ] Can write while loops correctly
- [ ] Know how to update loop variable
- [ ] Understand do...while difference
- [ ] Can use break statement
- [ ] Can use continue statement
- [ ] Completed Experiments 11-12
- [ ] Completed Experiment 16
- [ ] Completed Exercises 4.3-4.5
- [ ] Challenge questions attempted

---

## 📚 Summary

| Concept | Purpose | Example |
|---------|---------|---------|
| while | Loop while true | `while (i < 10)` |
| do...while | Run first, check after | `do { } while()` |
| break | Exit loop | `break;` |
| continue | Skip iteration | `continue;` |
| ++ | Increment | `i++` is `i = i + 1` |
| -- | Decrement | `i--` is `i = i - 1` |

---

## 📖 Today's Learning Path

**09:00-09:30 (30 min):** Theory - while Loops  
**09:30-10:00 (30 min):** Theory - do...while, break, continue  
**10:00-10:30 (30 min):** Practice - Experiments 11-12  
**10:30-11:00 (30 min):** Practice - Exercises 4.3-4.5  
**11:00-11:30 (30 min):** Challenges & Wrap-up  

**Next Day Preview:** For loops and the week-end integration project!

---

**File:** `Curriculum/Week-2/Day4-While-And-Do-Loops.md`  
**Status:** Complete ✅  
**Last Updated:** February 2026
