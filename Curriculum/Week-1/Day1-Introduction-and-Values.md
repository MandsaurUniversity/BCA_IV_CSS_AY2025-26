# Week 1: JavaScript Fundamentals & Syntax
## Days 1-5 | Total: 15 Hours

**Learning Outcomes:**
- Understand JavaScript values, data types, and operators
- Write basic JavaScript programs with correct syntax
- Apply automatic type conversion in real-world scenarios
- Master arithmetic and logical operations

---

## 📅 Weekly Overview

| Day | Topic | Duration | Key Activities |
|-----|-------|----------|-----------------|
| **Day 1** | Introduction & Values | 3 hrs | What is JavaScript? Values, Execution Environment |
| **Day 2** | Types & Operators - Part 1 | 3 hrs | Numbers, Strings, Boolean; Arithmetic Operators |
| **Day 3** | Types & Operators - Part 2 | 3 hrs | Logical Operators, Comparison, Type Coercion |
| **Day 4** | Unary & Advanced Operators | 3 hrs | Unary ops, Ternary, typeof, Nullish Coalescing |
| **Day 5** | Mini-Project & Review | 3 hrs | Build a Calculator, Week Review, Assessment |

---

## 🎯 Week Learning Goals

By the end of Week 1, students will be able to:
1. ✅ Understand what JavaScript is and why it's important
2. ✅ Identify and work with different data types
3. ✅ Perform arithmetic, logical, and comparison operations
4. ✅ Understand type coercion and conversion
5. ✅ Build a simple calculator program

---

---

# DAY 1: Introduction to JavaScript & Values

## Session Outline (3 Hours)
- **0:00-0:10:** Icebreaker & Course Overview
- **0:10-1:00:** Theory: JavaScript Intro, Values, Environment Setup
- **1:00-1:30:** Break & Environment Setup
- **1:30-2:45:** Practical: First Programs
- **2:45-3:00:** Q&A & Assignment

---

## 📖 Theory Content

### What is JavaScript?

**Definition:** JavaScript is a **lightweight, interpreted programming language** that runs in web browsers and servers (Node.js). It's used to make web pages interactive and dynamic.

**Historical Context:**
- Created by **Brendan Eich** in 1995 (originally "Mocha," then "LiveScript")
- Standardized as **ECMAScript** (ES) by ECMA International
- **ES6 (2015):** Modern JavaScript revolution with classes, arrows, modules
- **Today:** Runs everywhere – browsers, servers, mobile apps, desktop apps

### Why Learn JavaScript?

| Reason | Impact |
|--------|--------|
| **Browser Native** | The ONLY language that runs natively in all browsers |
| **Full-Stack** | Can build frontend (React, Vue) AND backend (Node.js) |
| **Employer Demand** | #1 most wanted skill in web development |
| **Ecosystem** | 1000s of libraries: React, Vue, Angular, Express |
| **Versatility** | Games, mobile apps, desktop apps, IoT |

**Real-World Jobs:**
- Frontend Developer: $90k-150k (React/Vue)
- Full-Stack Developer: $110k-180k (JavaScript+Node.js)
- Cloud Engineer: $120k-200k (JavaScript in AWS/Azure)

### JavaScript vs. HTML vs. CSS

```
┌─────────────────────────────────┐
│  HTML (Structure)               │
│  "What is on the page?"         │
│  <button>Click Me</button>      │
├─────────────────────────────────┤
│  CSS (Appearance)               │
│  "How does it look?"            │
│  button { color: blue; }        │
├─────────────────────────────────┤
│  JavaScript (Behavior)          │
│  "What happens when you click?" │
│  button.onclick = ...           │
└─────────────────────────────────┘
```

### Environment Setup - [(Detailed Instructions)][env-setup-link]


**Three Ways to Run JavaScript:**

1. **Browser Console** (Easiest for Learning)
   ```
   Press F12 or Right-click > Inspect > Console tab
   Type: console.log("Hello World")
   ```

2. **VS Code + Node.js** (Professional)
   ```bash
   node script.js
   ```

3. **Browser HTML File** (Web Development)
   ```html
   <script src="script.js"></script>
   ```

---

## 🔢 Values in JavaScript

### What is a Value?

A **value** is any piece of data that your program works with. Think of values as the ingredients in a recipe. Each value has a **data type** — a category that determines what kind of information it represents and what operations you can perform on it.

JavaScript has several main data types:
- **Number** – numeric values like 42, 3.14
- **String** – text values like "Hello"
- **Boolean** – true or false
- **Undefined** – absence of value (automatic)
- **Null** – intentional absence of value
- **Object** – complex data structures (coming later!)
- **Symbol** – unique identifiers (advanced concept)

```javascript
// Examples of values:
42                      // Number value
"Hello"                 // String value
true                    // Boolean value
null                    // Special value (intentionally empty)
undefined               // Special value (uninitialized)
```

### Number Values

**JavaScript treats all numbers the same—no distinction between integers and decimals.** When you write a number directly in your code like `42` or `3.14`, we call it a **number literal**. The word "literal" means it's the actual value itself, not calculated or referenced—it's right there in the code.

```javascript
// Examples of number literals:
42          // Integer literal (whole number)
3.14159     // Floating-point literal (decimal number)
-17         // Negative literal
0           // Zero
1e3         // Scientific notation: 1 × 10³ = 1000 (also a number literal)
```

**Important Note on Floating-Point Numbers:**  
A **floating-point number** is any number with a decimal point. Computers store floating-point numbers in **binary** (a base-2 number system using only 0s and 1s). Unfortunately, binary can't represent all decimals exactly, which causes the famous quirk below:

**Operations on Numbers:**
```javascript
console.log(10 + 5);      // 15 (addition)
console.log(10 - 5);      // 5 (subtraction)
console.log(10 * 5);      // 50 (multiplication)
console.log(10 / 5);      // 2 (division)
console.log(10 % 3);      // 1 (modulo/remainder)
console.log(2 ** 3);      // 8 (exponent: 2³)
```

**Special Number Values:**
```javascript
Infinity          // Division by zero
-Infinity
NaN               // "Not a Number" (invalid calculation)
```

⚠️ **Common Pitfall (Floating-Point Precision):**
```javascript
console.log(0.1 + 0.2);   // 0.30000000000000004 (NOT 0.3!)
// WHY? Computers store decimals in binary (base-2), which can't represent 
// all decimals exactly. 0.1 and 0.2 end up being slightly different 
// internally, causing this "rounding error". Don't worry—it rarely matters in practice!
```

### String Values

**Strings are sequences of characters.** Think of them as text. When you write text directly in your code, enclosed in quotes, we call it a **string literal**. A **literal** means it's the actual value itself, right there in the code.

```javascript
// Examples of string literals (all are valid):
"Hello, World!"        // Double quotes
'Single quotes work'    // Single quotes (same as double)
`Backticks`            // Backticks (special features on Day 2)
""                     // Empty string (length = 0)
```

**String Features:**
```javascript
// Property: A named piece of information about a value
// For strings, .length tells you how many characters
console.log("Hello".length);      // 5 (five characters)
console.log("".length);           // 0 (empty string)

// Concatenation: Joining strings together using + operator
console.log("Hello" + " " + "World");  // "Hello World"
console.log("Say: " + "Hi!");         // "Say: Hi!"

// Escape Sequences: Special character combinations using backslash
// These represent characters that are hard to type:
"Line 1\nLine 2"        // \n = newline (move to next line)
"Tab\tseparated"        // \t = tab (indentation)
"Quote\"inside"         // \" = literal quote character
"Path: C:\\\\Users"    // \\\\ = literal backslash
"It's"                   // No escape needed (in double quotes)
'It\'s'                  // \' needed only if using single quotes
```

**Note:** Additional string methods (toLowerCase, toUpperCase, substring, indexOf, etc.) are covered in detail in **Day 2 Theory** section.

**Real-World Example: User Greeting**
```javascript
// When a user signs up
const firstName = "Priya";
const userName = "priya.patel";
const greeting = "Welcome, " + firstName + "! Your username is " + userName;
console.log(greeting);
// Output: "Welcome, Priya! Your username is priya.patel!"
```

### Boolean Values

**Booleans** are simple: `true` or `false`. They answer YES/NO questions.

A **boolean** (named after George Boole, a 19th-century mathematician who invented the algebra of logic) is a data type that has only two possible values: `true` or `false`. Booleans are the foundation of **conditional logic** — every decision your program makes ultimately boils down to a true/false question.

**Note on Truthiness & Falsiness:**  
JavaScript treats some values as "truthy" (basically true) and others as "falsy" (basically false) in boolean contexts. You'll see this more in later days, but here's a preview:
- **Always falsy:** `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`
- **Always truthy:** Everything else, including `true`, `1`, `"hello"`, even `"0"` (non-empty string)

```javascript
true     // Yes
false    // No
```

**When Do We Use Booleans?**
```javascript
const isStudentEnrolled = true;
const isWeekend = false;
const ageAbove18 = true;

// We'll use these with conditionals (if/else) next week!
```

---

### Empty Values: `null` and `undefined`

JavaScript has two special values that represent the **absence of a meaningful value**: `null` and `undefined`. Understanding the distinction between them is important because you will encounter both frequently.

#### `undefined` — "No value has been assigned yet"

**Definition:** `undefined` means a variable has been **declared** (created) but has not been given a value. It is JavaScript's way of saying "this exists, but nothing has been put here yet."

```javascript
// A variable declared without a value is automatically undefined
let userName;
console.log(userName);       // undefined
console.log(typeof userName); // "undefined"

// Function parameters that aren't passed are undefined
function greet(name) {
    console.log(name);        // undefined if called as greet()
}
greet();                      // undefined

// Accessing a non-existent object property returns undefined
const person = { name: "Alice" };
console.log(person.age);     // undefined (no 'age' property exists)

// A function without a return statement returns undefined
function doNothing() {
    // no return
}
console.log(doNothing());    // undefined
```

#### `null` — "Intentionally empty"

**Definition:** `null` means the programmer has **deliberately** set a variable to "no value." It is an intentional assignment, unlike `undefined` which happens automatically.

```javascript
// Explicitly setting "no value"
let selectedProduct = null;   // Nothing selected yet
console.log(selectedProduct); // null

// Clear a previously set variable
let currentUser = "Alice";
console.log(currentUser);     // "Alice"
currentUser = null;           // User has logged out
console.log(currentUser);     // null

// typeof quirk: null is reported as "object" (a historical bug in JavaScript)
console.log(typeof null);     // "object" (this is a well-known JavaScript bug!)
// To properly check for null, use strict equality:
console.log(currentUser === null);  // true (correct way)
```

#### Key Differences Between `null` and `undefined`

```javascript
// undefined = "nothing assigned yet" (automatic)
// null = "deliberately set to nothing" (intentional)

let a;                    // undefined (automatic — no value assigned)
let b = null;             // null (intentional — explicitly set to nothing)

// Comparison
console.log(null == undefined);   // true (loose equality treats them as equal)
console.log(null === undefined);  // false (strict equality — different types!)

// Type checking
console.log(typeof undefined);    // "undefined"
console.log(typeof null);         // "object" (JavaScript bug!)
```

**Real-World Analogy:**
- **undefined** = An empty seat in a classroom — nobody was assigned to sit there.
- **null** = A seat with a "Reserved" sign removed — someone explicitly said "this seat is empty now."

**Why This Matters:**  
Both `null` and `undefined` represent "no value," but for different reasons. `undefined` happens automatically (JavaScript's way of saying "nothing here"), while `null` is what you use when you intentionally want to say "empty." The difference becomes important when checking data, as we'll see in Day 3.

#### When to Use Which?

```javascript
// Use undefined: Let JavaScript handle it (don't manually assign undefined)
let score;                    // JavaScript sets this to undefined for you

// Use null: When you want to explicitly indicate "no value"
let winner = null;            // No winner determined yet
// Later in code:
winner = "Team A";            // Now there's a winner

// Common pattern: checking for both
function processData(data) {
    if (data === null || data === undefined) {
        console.log("No data provided");
        return;
    }
    console.log("Processing: " + data);
}

processData(null);       // "No data provided"
processData(undefined);  // "No data provided"
processData("Hello");    // "Processing: Hello"
```

---

## 🔄 Automatic Type Conversion (Type Coercion)

**Definition:** **Type coercion** is JavaScript's automatic conversion of one data type to another when an operation involves mixed types. This happens implicitly (without you asking for it) and is one of the most common sources of confusion for beginners.

**Why does JavaScript do this?** JavaScript is a **dynamically typed** language (also called "loosely typed"), meaning variables don't have fixed types and can change. When you combine a number with a string using an operator, JavaScript must decide what type to use. It "coerces" (forces/converts) one value into the other's type automatically.

**Type Conversion Strategies:**
- **Explicit conversion** (you do it deliberately): `Number("5")`, `String(42)`, `Boolean(0)` - clear intent
- **Implicit conversion** (JavaScript does it automatically): `"5" + 3` → `"53"` - can cause surprises

**Pro Tip:** We'll learn better ways to handle mixed types starting in Day 2 with the `typeof` operator and in Day 3 with strict equality (`===`). These prevent unwanted type coercion.

```javascript
// Implicit type coercion (JavaScript does this automatically)
console.log("5" + 3);        // "53" (number 3 becomes string "3", then concatenated)
console.log("5" - 3);        // 2 (string "5" becomes number 5, then subtracted)
console.log(true + 1);       // 2 (true is treated as 1)
console.log(false + 1);      // 1 (false is treated as 0)
console.log("10" * "2");     // 20 (both strings become numbers)
```

### Truthy and Falsy Values

**Definition:** In JavaScript, every value has an inherent **boolean meaning** — it's either "truthy" (treated as `true`) or "falsy" (treated as `false`) when used in a boolean context (like an `if` condition).

**The 6 Falsy Values** (memorize these — everything else is truthy!):
```javascript
false       // The boolean false itself
0           // The number zero
""          // An empty string (no characters)
null        // Intentional absence of value  
undefined   // No value assigned
NaN         // "Not a Number" (result of invalid math)
```

**Everything else is Truthy** (treated as true):
```javascript
true         // Obviously
1            // Any non-zero number
-1           // Negative numbers are truthy too!
"0"          // A string containing "0" (it's not empty!)
"false"      // A string containing "false" (it's still a non-empty string)
[]           // An empty array (this surprises many beginners!)
{}           // An empty object
```

**Why does this matter?** When you use any value in a condition, JavaScript automatically converts it to a boolean:
```javascript
const userName = "";
if (userName) {
    console.log("Hello, " + userName);  // Won't run (empty string is falsy)
} else {
    console.log("No name provided");    // This runs
}
```

**Real-World Example: Discount Calculator**
```javascript
const discountString = "20";    // From user input
const price = 500;
const discount = discountString * price / 100;  // String auto-converts!
console.log(discount);  // 100
```

---

## � MANDATORY PRACTICAL EXPERIMENTS

### ✅ **Experiment 1: JavaScript Program to Print Hello World**

**MANDATORY PRACTICAL REQUIREMENT:** Official Experiment #1 (Unit 1)  
Display text output using JavaScript in different execution environments.

<details>
<summary><b>Solution: Method 1 - Browser Console</b></summary>

```javascript
/*
 * Experiment 1: Print Hello World (Browser Console approach)
 * Run JavaScript directly in browser console
 */

// Open browser F12 → Console tab → type or paste this:

console.log("Hello World");
console.log("Welcome to JavaScript!");
console.log(42);
console.log(3.14);

// TEST CASES
console.log("--- Test Cases ---");
console.log("Test 1: " + "Hello World");
console.log("Test 2: String output");
console.log("Test 3: Number output - " + 100);

// Output will appear directly in console
```

</details>

<details>
<summary><b>Solution: Method 2 - HTML File with Script Tag</b></summary>

```javascript
/*
 * Experiment 1: Print Hello World (HTML file approach)
 * Create HTML file with embedded JavaScript
 */

// Save as hello_world.html and open in browser:

/*
<!DOCTYPE html>
<html>
<head>
    <title>Hello World Program</title>
</head>
<body>
    <h1>My First JavaScript Program</h1>
    
    <script>
        console.log("Hello World from HTML file");
        alert("Welcome to JavaScript!");
        document.write("Hello World - Written to page!");
    </script>
</body>
</html>
*/

// This shows output in:
// 1. Browser console (console.log)
// 2. Alert box (alert)
// 3. Page content (document.write)

// TEST CASES
console.log("Hello");
console.log("World");
alert("First Alert Box");
```

</details>

**Key Learning Points:**
- `console.log()` displays output in browser developer console
- `alert()` shows a dialog box
- `document.write()` adds content to the page
- Method 1 is best for testing; Method 2 is for web pages

---

### ✅ **Experiment 2: JavaScript Program to Add Two Numbers**

**MANDATORY PRACTICAL REQUIREMENT:** Official Experiment #2 (Unit 1)  
Perform addition operation on two numbers and display result.

<details>
<summary><b>Solution: Method 1 - Manual Input and Arithmetic</b></summary>

```javascript
/*
 * Experiment 2: Add Two Numbers (Manual variable assignment)
 * Add two numbers and display result
 */

// Assign two numbers to variables
const number1 = 10;
const number2 = 20;

// Add them
const sum = number1 + number2;

// Display result
console.log(number1 + " + " + number2 + " = " + sum);

// TEST CASES
console.log("--- Test Case 1: Positive numbers ---");
const num1 = 100;
const num2 = 50;
const result1 = num1 + num2;
console.log(num1 + " + " + num2 + " = " + result1);

console.log("\n--- Test Case 2: Mixed positive/negative ---");
const a = 75;
const b = -25;
const result2 = a + b;
console.log(a + " + " + b + " = " + result2);

console.log("\n--- Test Case 3: Decimal numbers ---");
const x = 3.5;
const y = 2.7;
const result3 = x + y;
console.log(x + " + " + y + " = " + result3);
```

**Output:**
```
10 + 20 = 30
--- Test Case 1: Positive numbers ---
100 + 50 = 150
--- Test Case 2: Mixed positive/negative ---
75 + -25 = 50
--- Test Case 3: Decimal numbers ---
3.5 + 2.7 = 6.2
```

</details>

<details>
<summary><b>Solution: Method 2 - User Input with prompt()</b></summary>

```javascript
/*
 * Experiment 2: Add Two Numbers (User input approach)
 * Get numbers from user and add them
 */

// Get input from user
const input1 = prompt("Enter first number:");
const input2 = prompt("Enter second number:");

// Convert strings to numbers
const num1 = parseFloat(input1);
const num2 = parseFloat(input2);

// Add them
const sum = num1 + num2;

// Display result
console.log(num1 + " + " + num2 + " = " + sum);
alert("Sum: " + sum);

// Alternatively using Number():
const number1 = Number(prompt("Enter first number:"));
const number2 = Number(prompt("Enter second number:"));
const total = number1 + number2;
console.log("Total: " + total);

// TEST CASES (simulated)
console.log("--- Test Case 1: 15 + 25 ---");
const test1a = 15;
const test1b = 25;
console.log("Result: " + (test1a + test1b));

console.log("\n--- Test Case 2: 100 + 200 ---");
const test2a = 100;
const test2b = 200;
console.log("Result: " + (test2a + test2b));
```

</details>

**Key Learning Points:**
- `parseFloat()` converts string to decimal number
- `Number()` also converts to number
- `parseInt()` converts to integer (removes decimals)
- Method 1 is simpler for testing
- Method 2 gets user input (interactive)


### Exercise 1.3: String Operations

**Goal:** Combine and manipulate strings

```javascript
// Concatenation
console.log("Java" + "Script");              // "JavaScript"
console.log("Price: " + 99.99);              // "Price: 99.99"
console.log("My age is " + 20 + " years");   // "My age is 20 years"

// String properties
const message = "Hello";
console.log(message.length);                 // 5
console.log(message[0]);                     // "H" (first character)
console.log(message[4]);                     // "o" (fifth character)

// Using string index
const word = "JavaScript";
console.log(word[0]);                        // "J" (first character)
console.log(word[word.length - 1]);          // "t" (last character)
```

### Exercise 1.4: Type Conversion in Action

**Goal:** Understand how JavaScript converts types

```javascript
// Number to String
console.log(123 + "");      // "123"
console.log(String(456));   // "456"

// String to Number
console.log("789" * 1);     // 789
console.log(Number("789")); // 789
console.log(Number("abc"));  // NaN (invalid number)

// To Boolean
console.log(Boolean(1));    // true
console.log(Boolean(0));    // false
console.log(Boolean(""));   // false
console.log(Boolean("text"));// true
```

---

## 📋 Practice Checklist

- [x] Experiment 1: Print Hello World (2 methods)
- [x] Experiment 2: Add Two Numbers (2 methods)

### Exercise 1.5: Real-World Scenario - Fruit Stand Billing

**Goal:** Apply concepts to real-world problem

**Scenario:** You own a fruit stand. Create a billing program.

```javascript
// Fruit prices
const applePrice = 50;      // ₹ per kg
const bananasPrice = 40;    // ₹ per kg
const orangesPrice = 60;    // ₹ per kg

// Customer purchase
const applesKg = 2;
const bananasKg = 3;
const orangesKg = 1;

// Calculate total
const appleCost = applePrice * applesKg;
const bananasCost = bananasPrice * bananasKg;
const orangesCost = orangesPrice * orangesKg;
const totalCost = appleCost + bananasCost + orangesCost;

// Display receipt
console.log("=== FRUIT STAND RECEIPT ===");
console.log("Apples: ₹" + appleCost);
console.log("Bananas: ₹" + bananasCost);
console.log("Oranges: ₹" + orangesCost);
console.log("TOTAL: ₹" + totalCost);
console.log("==========================");
```

**Expected Output:**
```
=== FRUIT STAND RECEIPT ===
Apples: ₹100
Bananas: ₹120
Oranges: ₹60
TOTAL: ₹280
==========================
```

---

## 🎓 Summary

| Concept | Key Point | Example |
|---------|-----------|---------|
| **Values** | Basic data units | 42, "Hello", true |
| **Numbers** | All numeric data | 3.14, 100, -5 |
| **Strings** | Text data | "Hello World" |
| **Booleans** | True/False | true, false |
| **Type Coercion** | Auto conversion | "5" + 3 = "53" |
| **Operations** | Math on values | 10 + 5 = 15 |

---

## 📝 Day 1 Assignment

**Task 1:** Create a `day1_values.html` file with:
- Welcome message in console.log
- 5 number calculations
- 3 string concatenations
- Boolean value operations

**Task 2:** Calculate and display:
- Your height in cm
- Your height in meters
- Comparison: "My height is X meters"

**Submission:** Upload to Google Classroom as `Day1_YourName.html`

---

## 🔗 References

- [MDN: JavaScript Values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [MDN: Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)
- [JavaScript.info: Values and Variables](https://javascript.info/variables)

---

## ❓ Common Questions

**Q: What's the difference between `null` and `undefined`?**
A: `undefined` means a variable hasn't been assigned yet. `null` means "intentionally empty." (We'll explore this more in Week 2)

**Q: Why does 0.1 + 0.2 ≠ 0.3?**
A: Computers store decimals in binary. Some decimals can't be represented exactly (like 1/3 in math). This is normal across all programming languages.

**Q: Can I use JavaScript without a browser?**
A: Yes! Node.js lets you run JavaScript on your computer or server, just like Python or Java.

---

**Next:** Day 2 - Types & Operators Part 1

[env-setup-link]: ../Guides/W1-D1-Environment-Setup.md