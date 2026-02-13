# Week 2: Program Structure & Control Flow ✅

**Duration:** 5 Days | **Hours:** 15 (90 min theory + 90 min practical per day)  
**Status:** ✅ COMPLETE | **Audit Status:** ✅ Content Consistency Verified  
**Experiments:** 5/5 Complete | **Code Examples:** 60+

---

## 🔍 Audit & Quality Assurance Notes

This Week 2 curriculum has been audited for:
✅ **Content Consistency:** Cross-day references verified, duplicate experiments removed  
✅ **Jargon Clarity:** All technical terms defined at first use (Expression, Statement, Binding, Block, Scope, etc.)  
✅ **Terminology Consolidation:** See [Day 5](./Day5-For-Loops-And-Integration.md#-week-2-terminology-reference) for complete terminology reference table  
✅ **No Orphaned References:** All \"see Day X\" references point to existing content  

---

## 📚 Week Overview

Week 2 teaches you how to control the flow of your programs using conditional statements and loops. You'll learn how to make decisions (if/else), repeat actions (while, do-while, for), and organize code into reusable functions. These are the fundamental building blocks for creating interactive applications.

**Learning Outcomes:**
- Apply program structure and control flow concepts effectively
- Use conditional statements to make decisions
- Understand and implement different loop types
- Define and use functions to organize code
- Understand variable scope and function scope

---

## 📖 Daily Breakdown

### **Day 1: Expressions, Statements & Bindings**
**File:** [`Day1-Expressions-Statements-Bindings.md`](./Day1-Expressions-Statements-Bindings.md)

**Topics Covered:**
- Expressions vs Statements
- Expression Statements (when expressions stand alone as statements)
- Variable declarations (const, let, var - good vs bad)
- Naming conventions (camelCase, meaningful names)
- The environment and bindings
- Updating variables

**Practice Examples:** 10+ working programs  
**Key Concept:** Understanding how variables work and following best practices

---

### **Day 2: Functions & Return Values**
**File:** [`Day2-Functions-And-Return-Values.md`](./Day2-Functions-And-Return-Values.md)

**Topics Covered:**
- What are functions and why they matter
- Defining functions (traditional vs arrow)
- Parameters and arguments
- Return values
- Function scope and closures
- DRY principle (Don't Repeat Yourself)

**Practice Examples:** 12+ working programs  
**Key Concept:** Reusable code blocks that make programs manageable

---

### **Day 3: Conditional Execution (if/else)**
**File:** [`Day3-Conditional-Execution.md`](./Day3-Conditional-Execution.md)

**Topics Covered:**
- Understanding Control Flow (sequential, conditional, repetition)
- if statements for decision making
- if/else patterns
- else if chains
- Boolean conditions
- Nested conditionals
- Switch statements

**Experiments:**
- ✅ **Experiment 8:** JavaScript Program to Check if a Number is Positive, Negative, or Zero
- ✅ **Experiment 9:** JavaScript Program to Check if a Number is Odd or Even
- ✅ **Experiment 10:** JavaScript Program to Find the Largest Among Three Numbers

**Practice Examples:** 15+ working programs  
**Mini-Project:** Number Validator System

---

### **Day 4: Loops (While & Do-While)**
**File:** [`Day4-While-And-Do-Loops.md`](./Day4-While-And-Do-Loops.md)

**Topics Covered:**
- while loops and infinite loops
- do-while loops (execute first, then check)
- Loop control with break and continue
- Counter-controlled vs condition-controlled loops
- Nested loops

**Experiments:**
- ✅ **Experiment 11:** JavaScript Program to Check Leap Year
- ✅ **Experiment 12:** JavaScript Program to Generate a Random Number Between Two Numbers

**Practice Examples:** 12+ working programs  
**Mini-Project:** Number Guessing Game

---

### **Day 5: For Loops & Weekly Integration**
**File:** [`Day5-For-Loops-And-Integration.md`](./Day5-For-Loops-And-Integration.md)

**Topics Covered:**
- Traditional for loops
- Loop anatomy (initialization, condition, increment)
- Breaking out of loops
- For loop patterns and best practices
- Choosing the right loop type

**Practice Examples:** 10+ working programs  
**Integration Project:** ⭐ **Student Grade Management System**
- Calculate student grades based on marks
- Determine letter grades (A, B, C, D, F)
- Generate statistics (average, highest, lowest)
- 200+ lines of production code
- Real-world application combining all Week 2 concepts

---

## 📊 Experiments Checklist

| # | Title | Status | File | Difficulty |
|----|-------|--------|------|-----------|
| 8 | Positive/Negative/Zero | ✅ | Day 3 | ⭐⭐ |
| 9 | Check Odd or Even | ✅ | Day 3 | ⭐⭐ |
| 10 | Largest Among Three | ✅ | Day 3 | ⭐⭐ |
| 11 | Check Leap Year | ✅ | Day 4 | ⭐⭐⭐ |
| 12 | Random Number in Range | ✅ | Day 4 | ⭐⭐⭐ |

**All 5 Experiments:** COMPLETE ✅

---

## 🎯 Key Concepts Summary

### Conditional Statements
```javascript
// if statement
if (age >= 18) {
    console.log("Adult");
}

// if/else
if (score >= 50) {
    console.log("Pass");
} else {
    console.log("Fail");
}

// if/else if/else chain
if (grade === 'A') {
    console.log("Excellent");
} else if (grade === 'B') {
    console.log("Good");
} else {
    console.log("Improve");
}

// Switch statement
switch (day) {
    case 'Monday':
        console.log("Start of week");
        break;
    default:
        console.log("Other day");
}
```

### Loops
```javascript
// while loop
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

// do-while loop (executes at least once)
do {
    console.log("At least once");
} while (false);

// for loop (most common)
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// Loop control
for (let i = 0; i < 10; i++) {
    if (i === 5) break;           // Exit loop
    if (i === 2) continue;        // Skip iteration
}
```

### Functions
```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function (concise)
const multiply = (a, b) => a * b;

// Function with body
const divide = (a, b) => {
    if (b === 0) return "Error";
    return a / b;
};

// Using function
const result = add(5, 3);  // 8
```

---

## 💡 Real-World Projects Completed

1. **Number Validator** - Check positive, negative, or zero
2. **Odd/Even Checker** - Determine number parity
3. **Max Finder** - Find largest among set of numbers
4. **Leap Year Checker** - Validate leap years
5. **Random Number Generator** - Generate numbers in range
6. **Number Guessing Game** - Interactive game with loops
7. **Student Grade Manager** - Full integration project with all concepts

---

## 🔄 Progression from Week 1

**Week 1 Recap:**
- You learned values, types, and operators

**Week 2 New Skills:**
- Now you can make decisions with conditionals
- You can repeat actions with loops
- You can organize code into functions
- You can combine all Week 1 concepts with control flow

**Future Applications:**
- Week 3: Organize data in arrays and objects
- Week 4: Process data with higher-order functions
- Week 5: Build complete applications with OOP

---

## 📚 Learning Resources Used

- Eloquent JavaScript - Chapters 3, 4, 5
- MDN Web Docs - if/else, loops, functions
- JavaScript.info - Control Flow
- FreeCodeCamp - JavaScript Course (Sections 5-7)

---

## 🚀 How to Get Started

1. **Start with Day 1:**
   ```bash
   cd Curriculum/Week-2
   cat Day1-Expressions-Statements-Bindings.md
   ```

2. **Follow the Daily Pattern:**
   - Read the explanation and concepts
   - Type and run the code examples
   - Complete the practice problems
   - Test with different inputs

3. **Complete Experiments:**
   - Exp 8-10: Conditional logic challenges
   - Exp 11-12: Loop and function challenges
   - Make sure they work correctly!

4. **Build the Integration Project:**
   - Student Grade Management System
   - Use functions, loops, and conditionals
   - Test with multiple students

5. **Submit Your Work:**
   - Create `Week2_Submissions/` folder
   - Add your experiment solutions
   - Commit: `git add . && git commit -m "Week 2 Complete"`
   - Push: `git push`

---

## ⚠️ Common Mistakes to Avoid

1. **Using `var` instead of `const`/`let`**
   ```javascript
   ❌ var x = 5;      // Don't use var
   ✅ const x = 5;    // Use const
   ```

2. **Single `=` in conditions (assignment, not comparison)**
   ```javascript
   ❌ if (x = 5) { }   // This assigns 5 to x!
   ✅ if (x === 5) { } // This compares
   ```

3. **Forgetting `break` in switch statements**
   ```javascript
   ❌ case 'A': console.log("A"); case 'B': console.log("B"); // Falls through!
   ✅ case 'A': console.log("A"); break;
   ```

4. **Infinite loops**
   ```javascript
   ❌ while (true) { }  // This runs forever!
   ✅ while (i < 10) { i++; }  // With exit condition
   ```

5. **Variable scope issues**
   ```javascript
   ❌ let x = 5;
      if (x > 0) { let x = 10; }
      console.log(x);  // Still 5 (different scope)
   ```

---

## 📊 Exercise Progression

**Easy (Day 1-2):**
- Write simple functions
- Basic if/else statements
- Understanding loop basics

**Medium (Day 3-4):**
- Complex conditionals
- Nested loops
- Functions with parameters and return values

**Hard (Day 5):**
- Integration of all concepts
- Grade Management System
- Multi-layered logic

---

## 🎓 Chapter Outcomes

After Week 2, you should be able to:

✅ Write conditional statements (if/else, switch)  
✅ Implement different loop types  
✅ Define and call functions  
✅ Use return values effectively  
✅ Understand scope and closures  
✅ Organize code logically  
✅ Handle user input and make decisions  
✅ Build interactive programs with loops and conditionals  

---

## 📈 Progress Tracking

| Week | Status | Experiments | Code Quality |
|------|--------|-------------|--------------|
| Week 1 | ✅ | 7/7 | Excellent |
| **Week 2** | ✅ | **5/5** | **Excellent** |
| Week 3 | ⏳ Pending | - | - |

**Cumulative Progress:** 12/24 experiments complete (50%)

---

## 🚀 Next Steps

After completing Week 2:

✅ **Week 2 is complete!**  
👉 **Move to [Week 3: Data Structures](../Week-3/README.md)**

Week 3 will introduce you to arrays and objects, allowing you to organize and work with collections of data efficiently.

---

## 💬 Quick Reference

### When to use which loop?
- **for loop:** When you know the exact number of iterations
- **while loop:** When checking a condition
- **do-while loop:** When you need to execute at least once

### Operators Quick Reference
```javascript
===     // Strict equality (use this!)
!==     // Strict inequality
&&      // Logical AND
||      // Logical OR
!       // Logical NOT
```

---

**Week 2 Status:** ✅ COMPLETE  
**Ready for Week 3?** Yes! Move to [Week 3](../Week-3/README.md)  
**Experiment Coverage:** 5/5 (100%)

