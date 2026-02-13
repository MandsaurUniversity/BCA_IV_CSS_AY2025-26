# DAY 3: Logical & Comparison Operators

## Session Outline (3 Hours)
- **0:00-0:10:** Recap & Quiz on Day 1-2
- **0:10-1:00:** Theory: Comparison & Logical Operators
- **1:00-1:30:** Break
- **1:30-2:45:** Practical: Boolean Logic Puzzles
- **2:45-3:00:** Q&A & Assignment

**Note:** String template literals with backticks are covered in **Day 2** (see "Creating Strings" section). Today we focus on comparison operators (===, <, >, etc.) and logical operators (&&, ||, !).

---

## 📖 Theory Content

### Understanding Expressions and Statements

**Definition:** An **expression** is a piece of code that produces a value. Examples:
- `2 + 3` (produces 5)
- `"Hello" + " World"` (produces "Hello World")
- `age > 18` (produces true or false)

**Definition:** A **statement** is a complete instruction for JavaScript to execute. Statements often contain expressions and end with a semicolon (`;`). Examples:
- `console.log(2 + 3);` (executes the statement; the 2 + 3 expression is evaluated first)
- `let name = "Alice";` (declares and assigns; "Alice" is an expression)

**Key Difference:**
- Expression: Produces a VALUE
- Statement: Executes an INSTRUCTION (may use expressions)

**In This Day's Context:**  
Comparison operators create boolean **expressions** that produce true/false values. You'll use these expressions in **statements** starting in Week 2 (with if/else statements).

---

### Comparison Operators

Comparison operators return **true** or **false**. They answer "yes/no" questions (they are expressions that produce boolean values).

| Operator | Name | Example | Result |
|----------|------|---------|--------|
| `==` | Loose equality | 5 == "5" | true (converts types) |
| `===` | Strict equality | 5 === "5" | false (checks type too) |
| `!=` | Loose inequality | 5 != "5" | false |
| `!==` | Strict inequality | 5 !== "5" | true |
| `<` | Less than | 5 < 10 | true |
| `>` | Greater than | 10 > 5 | true |
| `<=` | Less than or equal | 5 <= 5 | true |
| `>=` | Greater than or equal | 10 >= 5 | true |

#### The Equality Trap: `==` vs `===`

```javascript
// Loose equality (==) converts types—avoid!
5 == "5"           // true (string converts to number)
null == undefined  // true (special rule)
0 == ""            // true (both falsy)
false == 0         // true

// Strict equality (===) checks type—use this!
5 === "5"          // false (different types)
null === undefined // false (different types)
0 === ""           // false
false === 0        // false
```

**Rule of Thumb:** **Always use `===` and `!==`**

```javascript
// ✅ Good practice
if (userAge === 18) { ... }

// ❌ Avoid
if (userAge == 18) { ... }
```

**Real-World Example: Login Validation**
```javascript
const password = "SecurePass123";
const userInput = "SecurePass123";

if (userInput === password) {
    console.log("Login successful!");
} else {
    console.log("Wrong password!");
}
```

### Logical Operators

Logical operators combine boolean values.

| Operator | Name | Example | Returns |
|----------|------|---------|---------|
| `&&` | AND | true && true | true |
| `\|\|` | OR | true \|\| false | true |
| `!` | NOT | !true | false |

#### AND Operator (&&)

Returns true **only if BOTH** sides are true.

```javascript
const age = 20;
const hasLicense = true;

// Both conditions must be true
const canDrive = (age >= 18) && hasLicense;
console.log(canDrive);  // true

const age2 = 16;
const canDrive2 = (age2 >= 18) && hasLicense;
console.log(canDrive2);  // false (age too young)
```

**Truth Table for AND:**
```
true  && true   = true
true  && false  = false
false && true   = false
false && false  = false
```

#### OR Operator (||)

Returns true **if AT LEAST ONE** side is true.

```javascript
const hasStudentId = true;
const hasSeniorCitizen = false;

// At least one condition must be true
const getDiscount = hasStudentId || hasSeniorCitizen;
console.log(getDiscount);  // true (has student ID)

const hasStudentId2 = false;
const hasSeniorCitizen2 = false;
const getDiscount2 = hasStudentId2 || hasSeniorCitizen2;
console.log(getDiscount2);  // false (neither)
```

**Truth Table for OR:**
```
true  || true   = true
true  || false  = true
false || true   = true
false || false  = false
```

#### NOT Operator (!)

Reverses the boolean value (inverts true to false, false to true).

```javascript
const isRaining = true;
const isSunny = !isRaining;
console.log(isSunny);  // false

!true           // false
!false          // true
!(5 > 10)       // true (5 is not > 10)
!(10 > 5)       // false
```

**Advanced Concept: Short-Circuit Evaluation**

**Definition:** **Short-circuit evaluation** means that logical operators (`&&` and `||`) stop evaluating as soon as they determine the result. The second operand might not even be checked!

**How it works:**

- **AND (`&&`):** If the FIRST part is false, the result is automatically false. JavaScript never evaluates the second part:
  ```javascript
  false && console.log("This code NEVER runs");  // console.log is NOT called
  true && console.log("This code RUNS");        // console.log IS called
  
  // Practical example:
  const user = null;
  const isAdmin = user && user.role === "admin";  // Returns user (falsy), doesn't check user.role
  ```

- **OR (`||`):** If the FIRST part is true, the result is automatically true. JavaScript never evaluates the second part:
  ```javascript
  true || console.log("This code NEVER runs");   // console.log is NOT called
  false || console.log("This code RUNS");       // console.log IS called
  
  // Practical example (setting defaults):
  const username = userInput || "Guest";  // If userInput is falsy, use "Guest"
  ```

**Why this matters:**
- **Performance:** Avoids unnecessary calculations
- **Safety:** Can prevent errors (check if something exists BEFORE using it)
- **Programming patterns:** Often used for default values or guards

### Combining Operators

```javascript
// Student eligibility: age >= 18 AND has high school certificate
const age = 19;
const hasGraduated = true;
const isEligible = (age >= 18) && hasGraduated;

// Job requirement: 5+ years experience OR Masters degree
const yearsExp = 3;
const hasMasters = true;
const canApply = (yearsExp >= 5) || hasMasters;

// Complex: Can watch movie?
// R-rated: need parent OR be 18+
// Needs tickets AND available seats
const rating = "R";
const userAge = 16;
const hasParent = true;
const hasTickets = true;
const hasSeats = true;

const canWatch = (hasSeats && hasTickets) && ((userAge >= 18) || hasParent);
```

---

## � MANDATORY PRACTICAL EXPERIMENTS

### ✅ **Experiment 5: JavaScript Program to Swap Two Variables**

**MANDATORY PRACTICAL REQUIREMENT:** Official Experiment #5 (Unit 1)  
Exchange values of two variables using different techniques.

<details>
<summary><b>Solution: Method 1 - Using Temporary Variable</b></summary>

```javascript
/*
 * Experiment 5: Swap Two Variables (Using temp variable)
 * Classic approach with temporary storage
 */

let a = 10;
let b = 20;

console.log("Before swap:");
console.log("a = " + a + ", b = " + b);

// Swapping with temporary variable
let temp = a;
a = b;
b = temp;

console.log("\nAfter swap:");
console.log("a = " + a + ", b = " + b);

// TEST CASES
console.log("\n--- Test Case 1: Swap numbers ---");
let num1 = 100;
let num2 = 200;
console.log("Before: num1 = " + num1 + ", num2 = " + num2);

let tempVar = num1;
num1 = num2;
num2 = tempVar;

console.log("After: num1 = " + num1 + ", num2 = " + num2);

console.log("\n--- Test Case 2: Swap strings ---");
let name1 = "Alice";
let name2 = "Bob";
console.log("Before: name1 = " + name1 + ", name2 = " + name2);

let tempName = name1;
name1 = name2;
name2 = tempName;

console.log("After: name1 = " + name1 + ", name2 = " + name2);

console.log("\n--- Test Case 3: Swap booleans ---");
let flag1 = true;
let flag2 = false;
console.log("Before: flag1 = " + flag1 + ", flag2 = " + flag2);

let tempFlag = flag1;
flag1 = flag2;
flag2 = tempFlag;

console.log("After: flag1 = " + flag1 + ", flag2 = " + flag2);
```

</details>

<details>
<summary><b>Solution: Method 2 - Using Destructuring Assignment</b></summary>

```javascript
/*
 * Experiment 5: Swap Two Variables (Using destructuring - Modern approach)
 * Elegant one-liner using ES6 destructuring
 */

let a = 10;
let b = 20;

console.log("Before swap:");
console.log("a = " + a + ", b = " + b);

// Swapping with destructuring
[a, b] = [b, a];

console.log("\nAfter swap:");
console.log("a = " + a + ", b = " + b);

// TEST CASES
console.log("\n--- Test Case 1: Swap numbers ---");
let num1 = 100;
let num2 = 200;
console.log("Before: num1 = " + num1 + ", num2 = " + num2);

[num1, num2] = [num2, num1];

console.log("After: num1 = " + num1 + ", num2 = " + num2);

console.log("\n--- Test Case 2: Swap strings ---");
let name1 = "Alice";
let name2 = "Bob";
console.log("Before: name1 = " + name1 + ", name2 = " + name2);

[name1, name2] = [name2, name1];

console.log("After: name1 = " + name1 + ", name2 = " + name2);

console.log("\n--- Test Case 3: Multiple swaps ---");
let x = 1;
let y = 2;
let z = 3;
console.log("Before: x = " + x + ", y = " + y + ", z = " + z);

[x, y, z] = [z, x, y];  // Rotate values

console.log("After: x = " + x + ", y = " + y + ", z = " + z);
```

</details>

**Key Learning Points:**
- Temporary variable method (Method 1) works in all scenarios
- Destructuring (Method 2) is cleaner and more modern (ES6+)
- Destructuring can swap multiple variables at once
- Both achieve the same result - exchanging values

---

## �💻 Practical Session (1h 15min)

### Exercise 3.1: Comparison Operators

**Goal:** Understand comparison results

```javascript
// Comparisons
console.log(10 > 5);      // true
console.log(10 < 5);      // false
console.log(10 >= 10);    // true
console.log(5 <= 5);      // true
console.log(10 === "10"); // false (different types)
console.log(10 == "10");  // true (type conversion)

// String comparison (alphabetical)
console.log("Apple" < "Banana");  // true (A comes before B)
console.log("z" > "a");           // true

// Date/Time comparison
const time1 = 9;    // 9 AM
const time2 = 14;   // 2 PM
console.log(time1 < time2);  // true
```

### Exercise 3.2: AND Operator Logic

**Goal:** Practice combining conditions

```javascript
// All conditions must be true
const ageValid = 20 >= 18;        // true
const hasId = true;               // true
const bothTrue = ageValid && hasId;
console.log(bothTrue);            // true

// One condition fails
const hasBalance = 500 > 1000;    // false
const isActive = true;            // true
const canBuy = hasBalance && isActive;
console.log(canBuy);              // false

// Real example: Game entry
const hasTicket = true;
const noWeapons = true;
const fitsAge = 16 >= 13;

const canEnter = hasTicket && noWeapons && fitsAge;
console.log(canEnter);  // true
```

### Exercise 3.3: OR Operator Logic

**Goal:** Learn when at least one condition works

```javascript
// At least one is true
const isWeekend = true;   // Saturday
const isHoliday = false;  // Not a holiday
const offdDay = isWeekend || isHoliday;
console.log(offDay);      // true

// Free delivery condition
const isStudent = false;  // Not student
const orderAbove500 = true; // Order > ₹500
const freeDelivery = isStudent || orderAbove500;
console.log(freeDelivery); // true

// Multiple conditions
const hasAccount = true;
const isGuest = false;
const hasInvite = false;

const canAccess = hasAccount || isGuest || hasInvite;
console.log(canAccess);   // true
```

### Exercise 3.4: NOT Operator

**Goal:** Negate conditions

```javascript
const isDayTime = true;
const isNightTime = !isDayTime;
console.log(isNightTime);  // false

const hasError = false;
const isValid = !hasError;
console.log(isValid);      // true

// Double negation (avoid!)
const value = true;
console.log(!!value);      // true (but confusing)
console.log(value);        // Better: just true
```

### Exercise 3.5: Complex Logic - Movie Theater

**Goal:** Real-world decision logic

**Scenario:** Determine if someone can watch an R-rated movie

```javascript
const userAge = 15;
const parentPresent = true;
const rating = "R";

// R-rated movie requires:
// User age >= 17 OR parent present (if under 17)

const canWatch = (userAge >= 17) || (userAge < 17 && parentPresent);

console.log("=== MOVIE TICKET ELIGIBILITY ===");
console.log("Age: " + userAge);
console.log("Rating: " + rating);
console.log("Parent Present: " + parentPresent);
console.log("Can Watch: " + canWatch);
```

### Exercise 3.6: School Grading System

**Goal:** Use multiple conditions for decisions

```javascript
const marksEng = 75;
const marksMath = 85;
const marksScience = 70;

const avgMarks = (marksEng + marksMath + marksScience) / 3;

console.log("=== GRADE REPORT ===");
console.log("English: " + marksEng);
console.log("Math: " + marksMath);
console.log("Science: " + marksScience);
console.log("Average: " + avgMarks.toFixed(2));

// Determine grade
let grade;
if (avgMarks >= 90) {
    grade = "A+";
} else if (avgMarks >= 80) {
    grade = "A";
} else if (avgMarks >= 70) {
    grade = "B";
} else if (avgMarks >= 60) {
    grade = "C";
} else {
    grade = "F";
}

console.log("Grade: " + grade);

// Passed or failed
const passed = (marksEng >= 40) && (marksMath >= 40) && (marksScience >= 40);
console.log("Status: " + (passed ? "PASSED" : "FAILED"));
```

### Exercise 3.7: E-Commerce Discount Logic

**Goal:** Apply operators to real business logic

```javascript
const cartValue = 2500;     // ₹
const isStudent = false;
const isMember = true;
const cartHasPromoCode = true;

// Discount rules:
// ₹1000-2000: 5%
// ₹2000-5000: 10%
// ₹5000+: 15%
// Students: +5%
// Members: +3%

let discountPercent = 0;

if (cartValue >= 1000 && cartValue < 2000) {
    discountPercent = 5;
} else if (cartValue >= 2000 && cartValue < 5000) {
    discountPercent = 10;
} else if (cartValue >= 5000) {
    discountPercent = 15;
}

// Additional bonuses
if (isStudent) {
    discountPercent += 5;
}
if (isMember) {
    discountPercent += 3;
}

const discountAmount = cartValue * discountPercent / 100;
const finalPrice = cartValue - discountAmount;

console.log("=== CART CALCULATION ===");
console.log("Original: ₹" + cartValue);
console.log("Discount %: " + discountPercent + "%");
console.log("Discount: ₹" + discountAmount.toFixed(2));
console.log("Final Price: ₹" + finalPrice.toFixed(2));
```

### Exercise 3.8: Swap Two Variables (Official Experiment 5)

**Goal:** Learn different techniques to swap variable values

**Real-World Analogy:** Trading seats in a classroom, exchanging gifts, swapping cards

```javascript
console.log("=== VARIABLE SWAPPING TECHNIQUES ===\n");

// Method 1: Using a Temporary Variable (Most Common)
console.log("--- Method 1: Temporary Variable ---");
let a = 5;
let b = 10;
console.log("Before swap: a =", a, "b =", b);

let temp = a;   // Store a in temporary variable
a = b;          // Copy b to a
b = temp;       // Copy temp (original a) to b

console.log("After swap:  a =", a, "b =", b);
console.log();

// Method 2: Arithmetic Operations (No extra variable)
console.log("--- Method 2: Arithmetic Operations ---");
let x = 15;
let y = 25;
console.log("Before swap: x =", x, "y =", y);

x = x + y;      // x = 15 + 25 = 40
y = x - y;      // y = 40 - 25 = 15
x = x - y;      // x = 40 - 15 = 25

console.log("After swap:  x =", x, "y =", y);
console.log();

// Method 3: Destructuring (Modern JavaScript - ES6+)
console.log("--- Method 3: Destructuring (Modern) ---");
let num1 = 100;
let num2 = 200;
console.log("Before swap: num1 =", num1, "num2 =", num2);

[num1, num2] = [num2, num1];   // Swap in one line!

console.log("After swap:  num1 =", num1, "num2 =", num2);
console.log();

// Method 4: XOR Operator (For integers only - Advanced)
console.log("--- Method 4: XOR Operator (Advanced) ---");
let p = 7;
let q = 14;
console.log("Before swap: p =", p, "q =", q);

p = p ^ q;      // XOR operation
q = p ^ q;
p = p ^ q;

console.log("After swap:  p =", p, "q =", q);
console.log();
```

**Real-World Application: Sorting Algorithm Foundation**
```javascript
// Bubble Sort uses swapping to arrange elements
const numbers = [5, 2, 8, 1, 9];
console.log("--- Real-World: Array Sorting ---");
console.log("Original array:", numbers);

// Simple swap to demonstrate sorting
if (numbers[0] > numbers[1]) {
    // Swap first two elements if first is greater
    [numbers[0], numbers[1]] = [numbers[1], numbers[0]];
}

console.log("After swap:", numbers);
```

**Practice Challenges:**
```javascript
// Challenge 1: Swap three variables in circular manner
// a -> b, b -> c, c -> a
let var1 = "Apple";
let var2 = "Banana";
let var3 = "Cherry";
console.log("Before:", var1, var2, var3);

// Your code here: Rotate values
[var1, var2, var3] = [var3, var1, var2];

console.log("After: ", var1, var2, var3);
// Expected: Cherry Apple Banana

// Challenge 2: Swap first and last elements of an array
const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
console.log("Before:", fruits);

[fruits[0], fruits[fruits.length - 1]] = [fruits[fruits.length - 1], fruits[0]];

console.log("After: ", fruits);
// Expected: ["Elderberry", "Banana", "Cherry", "Date", "Apple"]
```

**When to Use Each Method:**
```
Method 1 (Temporary Variable):
✅ Most readable and recommended
✅ Works with all data types
✅ Used in professional code

Method 2 (Arithmetic):
⚠️ Only for numbers
❌ Can cause overflow with large numbers
✅ Good for interviews

Method 3 (Destructuring):
✅ Modern and concise
✅ Preferred in ES6+ code
✅ Works with any data type
⚠️ Requires ES6 support

Method 4 (XOR):
⚠️ Only for integers
❌ Hard to read
✅ Space efficient (no temp variable)
❌ Avoid in production code
```

---

## 🎓 Summary

| Operator | Use Case | Example | Result |
|----------|----------|---------|--------|
| `===` | Check equality | 5 === "5" | false |
| `>`, `<` | Compare numbers | 10 > 5 | true |
| `&&` | All must be true | true && false | false |
| `\|\|` | At least one true | true \|\| false | true |
| `!` | Reverse boolean | !true | false |

---

## ⚠️ Common Mistakes

```javascript
// ❌ Using == instead of ===
if (userAge == "21") { }      // Bad!

// ✅ Always use ===
if (userAge === 21) { }       // Good!

// ❌ Forgetting parentheses in complex logic
canApply = age >= 18 && hasDegree || hasExperience;  // Confusing!

// ✅ Use parentheses for clarity
canApply = (age >= 18 && hasDegree) || hasExperience;  // Clear!
```

---

## 📝 Day 3 Assignment

**Task 1:** Create `day3_logical_ops.js` with:
- 10 comparison examples
- 5 AND operator examples
- 5 OR operator examples
- 3 complex logic problems

**Task 2:** Build an "Eligibility Checker":
```
Input: age, income, credit score
Output: Eligible for loan? (age >= 21 AND income >= 30000 AND score >= 650)
```

**Submission:** GitHub + Google Classroom

---

## 🔗 References

- [MDN: Comparison Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)
- [MDN: Logical Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)
- [JavaScript.info: Comparisons](https://javascript.info/comparison)

---

**Next:** Day 4 - Unary & Special Operators
