# DAY 2: Types & Operators - Part 1

## Session Outline (3 Hours)
- **0:00-0:10:** Recap of Day 1 & Quick Quiz
- **0:10-1:00:** Theory: Data Types, Arithmetic Operators
- **1:00-1:30:** Break
- **1:30-2:45:** Practical: Number & String Operations
- **2:45-3:00:** Q&A & Assignment

---

## 📖 Theory Content

### The Seven Data Types (typeof operator)

JavaScript has 7 primitive data types:

```javascript
typeof 42              // "number"
typeof "hello"         // "string"
typeof true            // "boolean"
typeof undefined       // "undefined"
typeof null            // "object" (quirk—technically null, but typeof says "object")
typeof Symbol()        // "symbol" (unique identifiers, Week 5)
typeof 123n            // "bigint" (large integers, advanced)

// Plus Objects (arrays, objects, functions)
typeof {}              // "object"
typeof []              // "object"
typeof function(){}    // "function"
```

### Numbers in Detail

#### Integer vs Float
```javascript
const integer = 42;       // Whole number
const float = 3.14;       // Decimal number
const scientific = 1e3;   // Scientific: 1000
const negative = -42;
```

#### Number Methods

**Definition:** A **method** is a function (an action/task) that belongs to a value. Methods are called by writing: `value.methodName()`. Think of methods as abilities or actions that values can perform.

Numbers have several useful methods:

```javascript
const num = 3.14159;

// Convert to string (useful for display/formatting)
num.toString();           // "3.14159"

// Round to decimal places
num.toFixed(2);           // "3.14" (returns a STRING, rounded to 2 decimals)
num.toFixed(0);           // "3" (no decimal places)
(3.6).toFixed(0);         // "4" (rounds up)

// Check special values
isNaN(NaN);               // true (is NaN?)
isNaN(100);               // false (is 100 "not a number"? No, it is a number)
isFinite(100);            // true (is it finite/normal?)
isFinite(Infinity);       // false
```

**Why methods return strings:** When you use `.toFixed()`, JavaScript returns a STRING like `"3.14"` (not the number 3.14). This is for display purposes, where you want exact formatting. If you need to do math with the result, convert it back to a number: `Number((3.14159).toFixed(2))`.

**Real-World: Product Pricing**
```javascript
const price = 1299.567;
console.log(price.toFixed(2));  // "1299.57" (for display)
console.log(price * 1.18);      // With 18% tax
```

### Strings in Detail

#### Creating Strings

There are THREE ways to create strings in JavaScript:

```javascript
// Method 1: Single quotes
const single = 'Hello';

// Method 2: Double quotes
const double = "World";

// Method 3: Backticks (creates template literals)
const backtick = `JavaScript`;

// Empty string (length = 0)
const empty = "";
```

All three produce strings. The difference is what special features they support.

#### Template Literals (Backticks) - IMPORTANT FEATURE ⭐

**Definition:** A **template literal** is a string created using backticks (`` ` ``) instead of quotes. Template literals allow you to:
1. **Embed expressions** inside strings using `${}` syntax (string interpolation)
2. **Write multi-line strings** without special escape characters
3. **Make code more readable** when combining values and text

**Basic Template Literal (no interpolation):**
```javascript
const greeting = `Hello, World!`;  // Just a regular string, but with backticks
console.log(greeting);             // "Hello, World!"
```

**String Interpolation with `${}`:**
When you use `${}` inside a template literal, JavaScript evaluates the expression inside the braces and inserts the result into the string:

```javascript
const name = "Alice";
const age = 25;

// WITHOUT template literals (concatenation - messy)
const message1 = "My name is " + name + " and I am " + age + " years old";

// WITH template literals (interpolation - clean!)
const message2 = `My name is ${name} and I am ${age} years old`;

console.log(message1);  // "My name is Alice and I am 25 years old"
console.log(message2);  // "My name is Alice and I am 25 years old" (same result, cleaner code!)
```

**The `${}` syntax is an EXPRESSION:**
Anything inside `${}` is evaluated as a JavaScript expression:

```javascript
const x = 10;
const y = 20;

console.log(`${x} + ${y} = ${x + y}`);     // "10 + 20 = 30"
console.log(`Double of ${x} is ${x * 2}`); // "Double of 10 is 20"
console.log(`Name is ${name.toUpperCase()}`); // "Name is ALICE"
```

**Multi-line Strings:**
Template literals preserve newlines, making multi-line text much easier:

```javascript
// WITHOUT template literals - need escape characters
const poem1 = "Line 1\nLine 2\nLine 3";

// WITH template literals - just press Enter
const poem2 = `Line 1
Line 2
Line 3`;

console.log(poem1);
// Line 1
// Line 2
// Line 3

console.log(poem2);
// Line 1
// Line 2
// Line 3
```

**Real-World Example - User Profile Display:**
```javascript
const firstName = "Priya";
const lastName = "Patel";
const email = "priya@university.edu";
const joinDate = "2024-01-15";

// Template literal makes this MUCH clearer
const profile = `
========== PROFILE ==========
Name: ${firstName} ${lastName}
Email: ${email}
Joined: ${joinDate}
=============================
`;

console.log(profile);
// Output:
// ========== PROFILE ==========
// Name: Priya Patel
// Email: priya@university.edu
// Joined: 2024-01-15
// =============================
```

**When to Use Each Type:**

| Type | Use When | Example |
|------|----------|---------|
| Single quotes `'...'` | Simple text, no special features | `'Hello'` |
| Double quotes `"..."` | Simple text, no special features | `"World"` |
| Backticks `` `...` `` | Need to embed variables/expressions | `` `Hello ${name}` `` |
| Backticks `` `...` `` | Need multi-line text | `` `Line 1\nLine 2` `` |

**Pro Tip:** Modern JavaScript developers prefer template literals because they're more readable and flexible. Use them by default unless you have a specific reason not to.

#### Escape Sequences (for single/double quotes)

When using single or double quotes, you can't just press Enter to go to a new line. Instead, use **escape sequences** — special character combinations that represent characters:

```javascript
// Escape sequences start with backslash \
"Line 1\nLine 2"                   // \n = newline (move to next line)
"Tab\tseparated"                   // \t = tab (indentation)
"Quote\"inside"                    // \" = literal double quote character
"Path: C:\\\\Users"                // \\\\ = literal backslash
"It's"                             // No escape needed (in double quotes)
'It\'s'                            // \' needed only with single quotes
```

**Note:** With template literals, you DON'T need escape sequences for newlines—just press Enter!

---

#### String Methods & Properties

**Definition (Review):** A **property** is a named piece of information about a value (like `.length`). A **method** is a function that belongs to a value (like `.toUpperCase()`). You call methods with parentheses: `value.method()`. You access properties without parentheses: `value.property`.

```javascript
const text = "JavaScript";

// PROPERTIES (no parentheses)
text.length;               // 10 ("JavaScript" has 10 characters)

// METHODS (with parentheses)
// Case conversion (methods)
text.toUpperCase();        // "JAVASCRIPT"
text.toLowerCase();        // "javascript"

// Accessing characters (property-like access)
text[0];                   // "J" (first character, index 0)
text[4];                   // "S" (fifth character, index 4)

// Finding substrings (methods)
text.indexOf("Script");    // 4 ("Script" starts at index 4)
text.includes("Java");     // true (contains "Java"?)
text.startsWith("Java");   // true (starts with "Java"?)

// Extracting parts (methods)
text.substring(0, 4);      // "Java" (from index 0 to 3)
text.slice(4);             // "Script" (from index 4 to end)

// Whitespace handling (methods)
"  hello  ".trim();        // "hello" (removes spaces from start/end)

// Replacement (methods)
text.replace("Java", "Type"); // "TypeScript"
```

**Real-World: Email Validation (Simple)**
```javascript
const email = "priya@university.edu";

console.log(email.includes("@"));        // true
console.log(email.indexOf("@") > 0);     // true (@ not at start)
```

### Arithmetic Operators

**Definition:** An **operator** is a symbol that tells JavaScript to perform an operation on one or more values. **Operands** are the values that an operator works on. For example, in `5 + 3`, the `+` is the operator, and `5` and `3` are operands.

**The + operator with two operands (addition):**  
When both operands are numbers, `+` adds them together.

When at least one operand is a string, `+` performs **concatenation** (joining/combining strings together) instead:
```javascript
"Hello" + " World"   // "Hello World" (string concatenation)
5 + 3                 // 8 (numeric addition)
"5" + 3              // "53" (concatenation: 3 becomes "3", then joins)
```

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `+` | Addition (or concatenation) | `5 + 3` | `8` |
| `-` | Subtraction | `5 - 3` | `2` |
| `*` | Multiplication | `5 * 3` | `15` |
| `/` | Division | `15 / 3` | `5` |
| `%` | Modulo (Remainder) | `17 % 5` | `2` |
| `**` | Exponentiation (to the power of) | `2 ** 3` | `8` (2 cubed = 2 × 2 × 2) |

#### Modulo Operator (%)
The modulo operator returns the **remainder** after division.

```javascript
// Finding remainder
console.log(17 % 5);       // 2 (17 = 5*3 + 2, remainder is 2)
console.log(10 % 3);       // 1 (10 = 3*3 + 1, remainder is 1)
console.log(20 % 2);       // 0 (20 is divisible by 2, no remainder)

// Practical: Check if number is even or odd
10 % 2 === 0;             // true (ten is even—divisible by 2)
11 % 2 === 1;             // true (eleven is odd—remainder 1)

// Practical: Cycling through values
// If you have 3 options (indices 0, 1, 2):
// and you cycle through values 0-8:
for (let i = 0; i < 9; i++) {
    console.log(i % 3);   // Outputs: 0,1,2,0,1,2,0,1,2
    // Always stays in range 0-2!
}
```

**Real-World Example: Shift Scheduling**
```javascript
// Assign 3 shifts: Morning (0), Afternoon (1), Night (2)
const employeeId = 5;
const shift = employeeId % 3;

console.log(shift);  // 2 (employee 5 gets Night shift)
// Employee 6 → 6 % 3 = 0 → Morning
// Employee 7 → 7 % 3 = 1 → Afternoon
// Employee 8 → 8 % 3 = 2 → Night
// Pattern repeats!
```

#### Order of Operations (Operator Precedence)

**Definition:** **Operator precedence** is the order in which JavaScript evaluates multiple operators in an expression. Some operators are computed before others, just like in math class (you learned PEMDAS: Parentheses, Exponents, Multiply/Divide, Add/Subtract).

```javascript
// Parentheses have HIGHEST precedence
2 + 3 * 4           // 14 (multiply first: 3*4=12, then 12+2)
(2 + 3) * 4         // 20 (parentheses first: 2+3=5, then 5*4)

// Exponents (**) are next
2 ** 3 * 2          // 16 (2^3 = 8, then 8*2)

// Multiplication & Division LEFT to RIGHT (same precedence)
100 / 10 * 2        // 20 (100/10 = 10, then 10*2)
100 * 2 / 10        // 20 (same result, different order)

// Addition & Subtraction LEFT to RIGHT (lowest precedence)
10 - 5 + 3          // 8 (10-5 = 5, then 5+3)
```

**Precedence Order (from highest to lowest):**
1. Parentheses `( )`
2. Exponentiation `**`
3. Multiplication `*`, Division `/`, Modulo `%` (left to right)
4. Addition `+`, Subtraction `-` (left to right)

### Type Coercion with Operators

```javascript
// Number + Number = Number
5 + 3                   // 8

// String + Anything = String
"5" + 3                 // "53"
3 + "5"                 // "35"
"Hello" + " " + "World" // "Hello World"

// Number - String = Number (tries to convert string)
"10" - 3                // 7
"20" - "5"              // 15
"abc" - 3               // NaN

// Multiplication/Division also convert
"6" * "2"               // 12
"10" / "2"              // 5
"abc" * 2               // NaN
```

---

## � MANDATORY PRACTICAL EXPERIMENTS

### ✅ **Experiment 3: JavaScript Program to Find the Square Root**

**MANDATORY PRACTICAL REQUIREMENT:** Official Experiment #3 (Unit 1)  
Calculate the square root of a given number using mathematical operations.

<details>
<summary><b>Solution: Method 1 - Using Exponent Operator</b></summary>

```javascript
/*
 * Experiment 3: Find Square Root (Using exponentiation)
 * Calculate square root with manual power calculation
 */

// Method: x^(1/2) = √x
const number = 16;
const squareRoot = number ** 0.5;

console.log("Number: " + number);
console.log("Square Root: " + squareRoot);

// TEST CASES
console.log("\n--- Test Case 1: Perfect squares ---");
console.log("√4 = " + (4 ** 0.5));      // 2
console.log("√9 = " + (9 ** 0.5));      // 3
console.log("√25 = " + (25 ** 0.5));    // 5
console.log("√100 = " + (100 ** 0.5));  // 10

console.log("\n--- Test Case 2: Non-perfect squares ---");
console.log("√2 = " + (2 ** 0.5).toFixed(4));       // 1.4142
console.log("√10 = " + (10 ** 0.5).toFixed(4));     // 3.1623
console.log("√50 = " + (50 ** 0.5).toFixed(4));     // 7.0711

console.log("\n--- Test Case 3: Edge cases ---");
console.log("√0 = " + (0 ** 0.5));      // 0
console.log("√1 = " + (1 ** 0.5));      //1
console.log("√0.25 = " + (0.25 ** 0.5)); // 0.5
```

</details>

<details>
<summary><b>Solution: Method 2 - Using Math.sqrt()</b></summary>

```javascript
/*
 * Experiment 3: Find Square Root (Using Math object - Smart approach)
 * Leverage JavaScript's built-in Math library
 */

const number = 16;
const squareRoot = Math.sqrt(number);

console.log("Number: " + number);
console.log("Square Root: " + squareRoot);

// TEST CASES
console.log("\n--- Test Case 1: Perfect squares ---");
console.log("√4 = " + Math.sqrt(4));       // 2
console.log("√9 = " + Math.sqrt(9));       // 3
console.log("√25 = " + Math.sqrt(25));     // 5
console.log("√100 = " + Math.sqrt(100));   // 10
console.log("√144 = " + Math.sqrt(144));   // 12

console.log("\n--- Test Case 2: Non-perfect squares ---");
console.log("√2 = " + Math.sqrt(2).toFixed(4));    // 1.4142
console.log("√10 = " + Math.sqrt(10).toFixed(4));  // 3.1623
console.log("√7 = " + Math.sqrt(7).toFixed(4));    // 2.6458

console.log("\n--- Test Case 3: Real-world application ---");
// Pythagorean theorem: c = √(a² + b²)
const sideA = 3;
const sideB = 4;
const hypotenuse = Math.sqrt(sideA * sideA + sideB * sideB);
console.log("Right triangle with sides " + sideA + " and " + sideB);
console.log("Hypotenuse: " + hypotenuse);  // 5
```

</details>

**Key Learning Points:**
- Exponent `** 0.5` equals square root (Mathematical approach)
- `Math.sqrt()` is cleaner and more efficient
- `toFixed(n)` rounds to n decimal places
- Method 2 is preferred for accuracy and readability

---

### ✅ **Experiment 4: JavaScript Program to Calculate the Area of a Triangle**

**MANDATORY PRACTICAL REQUIREMENT:** Official Experiment #4 (Unit 1)  
Calculate triangle area using the formula: Area = (base × height) / 2

<details>
<summary><b>Solution: Method 1 - Base × Height Formula</b></summary>

```javascript
/*
 * Experiment 4: Calculate Triangle Area (Standard formula)
 * Using Area = (base × height) / 2
 */

const base = 10;
const height = 5;

const area = (base * height) / 2;

console.log("Base: " + base);
console.log("Height: " + height);
console.log("Area: " + area);

// TEST CASES
console.log("\n--- Test Case 1: Common triangles ---");
console.log("Triangle 1 - Base: 8, Height: 6 → Area: " + ((8 * 6) / 2));
console.log("Triangle 2 - Base: 12, Height: 8 → Area: " + ((12 * 8) / 2));
console.log("Triangle 3 - Base: 15, Height: 10 → Area: " + ((15 * 10) / 2));

console.log("\n--- Test Case 2: Decimal measurements ---");
const b1 = 7.5;
const h1 = 4.8;
console.log("Base: " + b1 + ", Height: " + h1 + " → Area: " + ((b1 * h1) / 2).toFixed(2));

console.log("\n--- Test Case 3: Real-world scenario ---");
// Triangular garden
const gardenBase = 20;    // meters
const gardenHeight = 15;  // meters
const gardenArea = (gardenBase * gardenHeight) / 2;
console.log("Garden area: " + gardenArea + " square meters");
```

</details>

<details>
<summary><b>Solution: Method 2 - Heron's Formula (Advanced)</b></summary>

```javascript
/*
 * Experiment 4: Calculate Triangle Area (Heron's formula)
 * Using sides: Area = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2
 */

// Triangle with sides
const a = 5;
const b = 6;
const c = 7;

// Calculate semi-perimeter
const s = (a + b + c) / 2;

// Apply Heron's formula
const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

console.log("Triangle sides: " + a + ", " + b + ", " + c);
console.log("Semi-perimeter: " + s);
console.log("Area: " + area.toFixed(2));

// TEST CASES
console.log("\n--- Test Case 1: 3-4-5 right triangle ---");
const side1 = 3;
const side2 = 4;
const side3 = 5;
const s1 = (side1 + side2 + side3) / 2;
const area1 = Math.sqrt(s1 * (s1 - side1) * (s1 - side2) * (s1 - side3));
console.log("Sides: " + side1 + ", " + side2 + ", " + side3);
console.log("Area: " + area1.toFixed(2));  // 6

console.log("\n--- Test Case 2: Equilateral triangle ---");
const side = 10;
const sEq = (side + side + side) / 2;
const areaEq = Math.sqrt(sEq * (sEq - side) * (sEq - side) * (sEq - side));
console.log("Equilateral triangle with side " + side);
console.log("Area: " + areaEq.toFixed(2));

console.log("\n--- Test Case 3: Scalene triangle ---");
const side4 = 8, side5 = 9, side6 = 10;
const s3 = (side4 + side5 + side6) / 2;
const area3 = Math.sqrt(s3 * (s3 - side4) * (s3 - side5) * (s3 - side6));
console.log("Area: " + area3.toFixed(2));
```

</details>

**Key Learning Points:**
- Simple formula: (base × height) / 2 for any triangle (Method 1)
- Heron's formula: Works when you only know the three sides (Method 2)
- Both methods give the same result for valid triangles
- Method 1 is simpler when you have base and height
- Method 2 is useful for complex geometry problems

---

## 💻 Practical Exercises

### Exercise 2.2: Modulo Operator Deep Dive

**Goal:** Understand practical uses of modulo

```javascript
// Check even/odd
const num1 = 42;
console.log(num1 % 2 === 0 ? "Even" : "Odd");

// Cycle through options
const day = 7;
const weeks = Math.floor(day / 7);
const dayOfWeek = day % 7;
console.log("Day " + day + " is week " + weeks + ", day " + dayOfWeek);

// Find last digit
const number = 12345;
const lastDigit = number % 10;
console.log("Last digit: " + lastDigit);  // 5

// Convert seconds to minutes and seconds
const totalSeconds = 125;
const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;
console.log(minutes + ":" + seconds);  // "2:5"
```

### Exercise 2.3: String Operations

**Goal:** Manipulate and analyze strings

```javascript
const firstName = "Priya";
const lastName = "Patel";
const email = "priya.patel@university.edu";

// Concatenation
const fullName = firstName + " " + lastName;
console.log(fullName);

// Length operations
console.log("Name length: " + firstName.length);

// Case conversion
console.log(firstName.toUpperCase());
console.log(email.toLowerCase());

// Finding substrings
console.log(email.indexOf("@"));      // Position of @
console.log(email.includes("university")); // true

// Extracting parts
const domain = email.slice(email.indexOf("@") + 1);
console.log("Domain: " + domain);  // "university.edu"
```

### Exercise 2.4: Type Conversion Puzzle

**Goal:** Predict and understand type conversions

```javascript
// Predict output BEFORE running!

// String concatenation
console.log("Price: $" + 99.99);
console.log(5 + 5 + " items");
console.log("Items: " + 5 + 5);  // Different from above!

// Type coercion in calculations
console.log("10" - 3);           // 7
console.log("10" * "2");         // 20
console.log("10" / "2");         // 5
console.log("10" + "2");         // "102" (not 12!)

// Boolean arithmetic
console.log(true + true);        // 2 (true = 1)
console.log(false + 5);          // 5
console.log(true + "message");   // "truemessage"
```

### Exercise 2.5: Real-World Application - Currency Converter

**Goal:** Apply arithmetic to real problem

**Scenario:** Convert between currencies

```javascript
// Exchange rates (hardcoded for now)
const inrToUsd = 0.012;           // 1 INR = 0.012 USD
const inrToEuro = 0.011;          // 1 INR = 0.011 EUR

// User amount in INR
const amountInr = 5000;

// Convert
const amountUsd = amountInr * inrToUsd;
const amountEuro = amountInr * inrToEuro;

// Display with formatting
console.log("=== CURRENCY CONVERSION ===");
console.log("Input: ₹" + amountInr);
console.log("USD: $" + amountUsd.toFixed(2));
console.log("EUR: €" + amountEuro.toFixed(2));
console.log("==========================");
```

### Exercise 2.6: BMI Calculator

**Goal:** Combine arithmetic operations for health calculation

**Formula:** BMI = weight (kg) / (height (m))²

```javascript
const weight = 70;        // kg
const height = 1.75;      // meters

const bmi = weight / (height ** 2);

console.log("=== BMI CALCULATOR ===");
console.log("Weight: " + weight + " kg");
console.log("Height: " + height + " m");
console.log("BMI: " + bmi.toFixed(2));

// Interpretation
if (bmi < 18.5) {
    console.log("Category: Underweight");
} else if (bmi < 25) {
    console.log("Category: Normal weight");
} else if (bmi < 30) {
    console.log("Category: Overweight");
} else {
    console.log("Category: Obese");
}
// (if/else next week!)
```

---

## 🎓 Summary

| Topic | Key Concept | Example |
|-------|------------|---------|
| **Numbers** | 42, 3.14, Infinity, NaN | toFixed(), toString() |
| **Strings** | "text", backticks | length, toUpperCase(), slice() |
| **Addition** | + operator | "a" + "b" = "ab" |
| **Arithmetic** | +, -, *, /, %, ** | 17 % 5 = 2 |
| **Modulo** | Remainder operation | Check even/odd |
| **Order** | PEMDAS rules | (2+3)*4 = 20 |
| **Coercion** | Auto type conversion | "10" - 3 = 7 |

---

## 📝 Day 2 Assignment

**Task 1:** Create `day2_operators.js` with:
- 10 arithmetic calculations
- 5 string operations
- 3 modulo examples

**Task 2:** Build a "Pizza Delivery Calculator":
- Pizza price: ₹250
- Delivery charge: ₹50
- Tax: 18%
- Calculate total for 3 pizzas

**Submission:** Push to GitHub + Upload to Google Classroom

---

## 🔗 References

- [MDN: Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)
- [JavaScript.info: Operators](https://javascript.info/operators)
- [String Methods Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

**Next:** Day 3 - Logical & Comparison Operators
