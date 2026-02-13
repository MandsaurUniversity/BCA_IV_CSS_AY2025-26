# DAY 4: Unary & Special Operators

## Session Outline (3 Hours)
- **0:00-0:10:** Recap & Quiz on Comparison & Logical Ops
- **0:10-1:00:** Theory: Unary Operators, Ternary, typeof, Nullish Coalescing
- **1:00-1:30:** Break
- **1:30-2:45:** Practical: Advanced Operator Puzzles
- **2:45-3:00:** Q&A & Assignment Intro

---

## 📖 Theory Content

### Unary Operators

**Definition:** A **unary operator** works on only ONE operand (one value). The word "unary" literally means "one." You've actually seen some unary operators already!

Compare with:
- **Binary operator:** Works on TWO operands. Example: `5 + 3` (the `+` operator works on 5 and 3)
- **Ternary operator:** Works on THREE parts. Examples coming next!

**Common unary operators we'll study today:**

#### Unary Plus & Minus
```javascript
const num = 5;
+num            // 5 (positive)
-num            // -5 (negative)

// Useful for type conversion
const str = "42";
+str            // 42 (converts to number)
-str            // -42

const price = "99.99";
+price          // 99.99 (forces number)
```

#### Increment & Decrement (++, --)

```javascript
let count = 5;

// Pre-increment (increment, then use)
++count;        // count = 6, then returns 6
const result1 = ++count;  // count = 7, result1 = 7

// Post-increment (use, then increment)
count++;        // count increases, but returns old value
const result2 = count++;  // result2 = 7, then count = 8

// Same for decrement
--count;        // Pre-decrement
count--;        // Post-decrement
```

**Rule of Thumb:** Avoid ++ and -- in complex expressions. They confuse beginners.

```javascript
// ❌ Confusing
let x = 5;
console.log(++x * 2);  // 12 (x becomes 6, then 6*2)

// ✅ Clear
let x = 5;
x = x + 1;
console.log(x * 2);    // 12
```

#### typeof Operator

Returns the type of a value as a string.

```javascript
typeof 42               // "number"
typeof "hello"          // "string"
typeof true             // "boolean"
typeof undefined        // "undefined"
typeof null             // "object" (quirk!)
typeof Symbol()         // "symbol"
typeof {}               // "object"
typeof []               // "object"
typeof function(){}     // "function"

// Check if variable exists
typeof undefinedVar     // "undefined" (doesn't throw error)
```

**Real-World: Type Checking**
```javascript
function processInput(value) {
    if (typeof value === "string") {
        console.log("Processing text: " + value);
    } else if (typeof value === "number") {
        console.log("Processing number: " + value);
    } else {
        console.log("Unknown type");
    }
}
```

### The Ternary (Conditional) Operator

**Definition:** The **ternary operator** is the only operator with THREE parts (that's why it's called "ternary" — "ternary" means "three"). It's also called the **conditional operator** because all three parts involve a condition.

**Syntax:**  
```javascript
condition ? valueIfTrue : valueIfFalse
```

**The three parts:**
1. **Condition** (before the `?`): A boolean expression (true or false)
2. **Value if true** (between `?` and `:`): Returned if condition is true
3. **Value if false** (after `:`): Returned if condition is false

**Basic Examples:**

// Format: condition ? trueValue : falseValue
const score = 45;
const result = (score >= 50) ? "PASS" : "FAIL";
console.log(result);  // "FAIL"

// Nested ternary (avoid if possible—hard to read!)
const temp = 25;
const weather = (temp > 30) ? "Hot" : (temp > 20) ? "Warm" : "Cold";
console.log(weather);  // "Warm"
```

**vs if/else (we'll learn next week):**
```javascript
// Using ternary (one-liner)
const message = isValid ? "Success" : "Error";

// Using if/else (multi-line)
let message;
if (isValid) {
    message = "Success";
} else {
    message = "Error";
}
```

**Real-World: User Display**
```javascript
const isLoggedIn = true;
const displayText = isLoggedIn ? "Logout" : "Login";
console.log(displayText);  // "Logout"

// Message based on email verification
const emailVerified = false;
const message = emailVerified ? "Account active" : "Verify email first";
```

### The typeof Operator in Detail

**Definition:** The `typeof` operator returns the **type** of a value as a text string. It helps you check what kind of value (number, string, boolean, etc.) you're working with. It's a unary operator because it works on one value.

```javascript
// Primitives
typeof 123        // "number"
typeof "str"      // "string"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof Symbol()   // "symbol"
typeof 123n       // "bigint"

// Objects
typeof null       // "object" (⚠️ QUIRK/BUG in JavaScript!)
typeof {}         // "object"
typeof []         // "object" (arrays are objects)
typeof function(){} // "function"

// Check for null properly
const value = null;
console.log(value === null);        // true (correct way)
console.log(typeof value === "object");  // true (but misleading since null is "object")
```

**⚠️ Important Quirk:**  
`typeof null` returns `"object"` instead of `"null"`. This is a **historical bug** in JavaScript that can't be fixed without breaking old code. Always use **strict equality** (`value === null`) to check for null, not `typeof`.

### Nullish Coalescing Operator (??)

Returns the **right value if left is null/undefined**. (ES2020)

```javascript
// Practical use: default values
const name = null;
const displayName = name ?? "Guest";
console.log(displayName);  // "Guest"

const age = 0;
const displayAge = age ?? "Unknown";
console.log(displayAge);   // 0 (because 0 is not null/undefined)

// Compare with OR operator (||)
const value = 0;
const result1 = value || 10;   // 10 (0 is falsy)
const result2 = value ?? 10;   // 0 (0 is not null)
```

**Real-World: API Response Handling**
```javascript
// Server returns null if data unavailable
const userData = null;
const userName = userData ?? "Not provided";
console.log(userName);  // "Not provided"

// Default configuration
const timeout = null;
const finalTimeout = timeout ?? 3000;  // 3000 ms if not specified
```

### Optional Chaining Operator (?.)

Access nested properties safely. (ES2020)

```javascript
// Without optional chaining (crashes if obj is null)
const obj = null;
const value = obj.property;  // Error: Cannot read property of null

// With optional chaining (returns undefined safely)
const value = obj?.property;  // undefined (no error)

// With arrays
const arr = null;
const first = arr?.[0];  // undefined (safe)

// With functions
const obj = { method: function() { return 42; } };
const result = obj.method?.();  // 42
```

---

## 💻 Practical Session (1h 15min)

### Exercise 4.1: typeof Operator

**Goal:** Identify data types

```javascript
// Test different values
console.log(typeof 123);       // "number"
console.log(typeof "hello");   // "string"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (quirk!)
console.log(typeof {});        // "object"
console.log(typeof []);        // "object"

// Practical: Validate input type
function doubleNumber(value) {
    if (typeof value === "number") {
        return value * 2;
    } else {
        return "Error: Please provide a number";
    }
}

console.log(doubleNumber(5));     // 10
console.log(doubleNumber("5"));   // Error message
```

### Exercise 4.2: Ternary Operator

**Goal:** Use ternary for concise conditionals

```javascript
// Simple cases
const age = 25;
console.log(age >= 18 ? "Adult" : "Minor");

const score = 73;
const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log(grade);  // "C"

// Real use: Toggle states
let isDarkMode = false;
const buttonText = isDarkMode ? "Light Mode" : "Dark Mode";
console.log("Button: " + buttonText);

// CSS class selection
const isActive = true;
const className = isActive ? "btn-active" : "btn-inactive";
console.log(className);
```

### Exercise 4.3: Increment/Decrement Operators

**Goal:** Use ++ and -- correctly

```javascript
let counter = 0;

// Post-increment (use first, then increment)
console.log(counter++);  // 0, then counter = 1
console.log(counter);    // 1

// Pre-increment (increment first, then use)
console.log(++counter);  // 2
console.log(counter);    // 2

// Decrement
console.log(counter--);  // 2, then counter = 1
console.log(--counter);  // 0

// In loops (next week!)
let i = 0;
while (i < 3) {
    console.log(i);
    i++;  // Increment by 1
}
```

### Exercise 4.4: Nullish Coalescing

**Goal:** Handle null/undefined gracefully

```javascript
// User profile with missing data
const user = {
    name: "Priya",
    bio: null,
    website: undefined,
    age: 0
};

console.log(user.name ?? "Unknown");     // "Priya"
console.log(user.bio ?? "No bio");       // "No bio"
console.log(user.website ?? "Not set");  // "Not set"
console.log(user.age ?? 18);             // 0 (not null/undefined!)

// Compare with ||
console.log(user.age || 18);  // 18 (0 is falsy)
console.log(user.age ?? 18);  // 0 (0 is not null)
```

### Exercise 4.5: Operator Precedence Puzzle

**Goal:** Understand operation order

```javascript
// Predict output BEFORE running!

// 1. Arithmetic first
console.log(2 + 3 * 4);           // 14

// 2. Comparison next
console.log(5 > 3 && 2 < 4);      // true

// 3. Logical operators
console.log(true || false && false);  // true (AND first)

// 4. Ternary last
console.log(true ? 1 : 2 + 3);    // 1 (ternary happens first!)
console.log((true ? 1 : 2) + 3);  // 4

// Complex
const x = 5;
const result = x > 3 ? x * 2 : x + 10;
console.log(result);  // 10
```

### Exercise 4.6: Real-World - Parking Fee Calculator

**Goal:** Apply operators to calculate fees

```javascript
const hours = 5;
const isHandicapped = true;

// Rules:
// First hour: ₹50
// Each additional hour: ₹20
// Handicapped: Free parking

let fee;

if (isHandicapped) {
    fee = 0;
} else if (hours <= 1) {
    fee = 50;
} else {
    fee = 50 + (hours - 1) * 20;
}

// OR using ternary
fee = isHandicapped ? 0 : (hours <= 1 ? 50 : 50 + (hours - 1) * 20);

console.log("=== PARKING FEE ===");
console.log("Hours: " + hours);
console.log("Handicapped: " + isHandicapped);
console.log("Fee: ₹" + fee);
```

### ✅ **Experiment 6: JavaScript Program to Convert Celsius to Fahrenheit**

**MANDATORY PRACTICAL REQUIREMENT:** Official Experiment #6 (Unit 1)

**Real-World Context:** Weather apps, scientific instruments, cooking recipes, health monitoring  
**Difficulty Level:** Beginner | **Time:** 15-20 minutes

---

<details>
<summary><b>Solution: Method 1 - Manual Formula Conversion</b></summary>

**Approach:** Direct implementation using mathematical formulas without built-in wrappers

```javascript
console.log("=== TEMPERATURE CONVERTER - METHOD 1: MANUAL FORMULA ===\n");

// Basic Celsius to Fahrenheit conversion
const celsius1 = 25;
const fahrenheit1 = (celsius1 * 9/5) + 32;
console.log("Conversion 1: " + celsius1 + "°C = " + fahrenheit1 + "°F");

// Fahrenheit to Celsius conversion
const fahrenheit2 = 77;
const celsius2 = (fahrenheit2 - 32) * 5/9;
console.log("Conversion 2: " + fahrenheit2 + "°F = " + celsius2.toFixed(2) + "°C");

// Test with various important temperature points
console.log("\n--- Reference Temperature Points ---");

// Water freezing point
const c_freeze = 0;
const f_freeze = (c_freeze * 9/5) + 32;
console.log("Water Freezes: " + c_freeze + "°C = " + f_freeze + "°F");

// Room temperature
const c_room = 20;
const f_room = (c_room * 9/5) + 32;
console.log("Room Temp: " + c_room + "°C = " + f_room + "°F");

// Normal body temperature
const c_body = 37;
const f_body = (c_body * 9/5) + 32;
console.log("Body Temp: " + c_body + "°C = " + f_body.toFixed(1) + "°F");

// Water boiling point
const c_boil = 100;
const f_boil = (c_boil * 9/5) + 32;
console.log("Water Boils: " + c_boil + "°C = " + f_boil + "°F");

// Very hot day
const c_hot = 40;
const f_hot = (c_hot * 9/5) + 32;
console.log("Very Hot Day: " + c_hot + "°C = " + f_hot + "°F");

// Extreme cold
const c_cold = -20;
const f_cold = (c_cold * 9/5) + 32;
console.log("Extreme Cold: " + c_cold + "°C = " + f_cold + "°F");

// TEST CASES
console.log("\n--- Edge Case Testing ---");
console.log("Test 1 - Zero Celsius: " + ((0 * 9/5) + 32) + "°F (expect 32°F)");
console.log("Test 2 - Negative: " + ((-40 * 9/5) + 32) + "°F (expect -40°F - same in both scales!)");
console.log("Test 3 - Decimal Input: " + ((36.5 * 9/5) + 32) + "°F (expect ~97.7°F)");

// Formula memorization aid
console.log("\n--- Formula Breakdown ---");
console.log("Formula: F = (C × 9/5) + 32");
console.log("Step 1: Multiply Celsius by 9/5 (or 1.8)");
console.log("Step 2: Add 32 to get Fahrenheit");
```

**Output:**
```
=== TEMPERATURE CONVERTER - METHOD 1: MANUAL FORMULA ===

Conversion 1: 25°C = 77°F
Conversion 2: 77°F = 25.00°C

--- Reference Temperature Points ---
Water Freezes: 0°C = 32°F
Room Temp: 20°C = 68°F
Body Temp: 37°C = 98.60°F
Water Boils: 100°C = 212°F
Very Hot Day: 40°C = 104°F
Extreme Cold: -20°C = -4°F

--- Edge Case Testing ---
Test 1 - Zero Celsius: 32°F (expect 32°F)
Test 2 - Negative: -40°F (expect -40°F - same in both scales!)
Test 3 - Decimal Input: 97.7°F (expect ~97.7°F)

--- Formula Breakdown ---
Formula: F = (C × 9/5) + 32
Step 1: Multiply Celsius by 9/5 (or 1.8)
Step 2: Add 32 to get Fahrenheit
```

**Key Points:**
- Uses direct mathematical operations
- Works with any numeric value
- Clear, readable formula structure
- Easy to understand the conversion logic step-by-step

</details>

<details>
<summary><b>Solution: Method 2 - Reusable Converter Functions with Validation</b></summary>

**Approach:** Create reusable functions with error handling and validation for production use

```javascript
console.log("=== TEMPERATURE CONVERTER - METHOD 2: SMART CONVERTER FUNCTIONS ===\n");

// Celsius to Fahrenheit converter with validation
function celsiusToFahrenheit(celsius) {
    // Validate input
    if (typeof celsius !== 'number') {
        return "Error: Input must be a number";
    }
    
    // Check against absolute zero (-273.15°C)
    if (celsius < -273.15) {
        return "Error: Temperature below absolute zero (-273.15°C)!";
    }
    
    // Perform conversion
    const fahrenheit = (celsius * 9/5) + 32;
    return parseFloat(fahrenheit.toFixed(2));
}

// Fahrenheit to Celsius converter with validation
function fahrenheitToCelsius(fahrenheit) {
    // Validate input
    if (typeof fahrenheit !== 'number') {
        return "Error: Input must be a number";
    }
    
    // Check against absolute zero (-459.67°F)
    if (fahrenheit < -459.67) {
        return "Error: Temperature below absolute zero (-459.67°F)!";
    }
    
    // Perform conversion
    const celsius = (fahrenheit - 32) * 5/9;
    return parseFloat(celsius.toFixed(2));
}

// Bidirectional converter that returns object with both scales
function convertTemperature(value, fromUnit) {
    if (typeof value !== 'number') {
        return { error: "Temperature must be a number" };
    }
    
    if (fromUnit.toUpperCase() === "C") {
        if (value < -273.15) {
            return { error: "Temperature below absolute zero!" };
        }
        const f = (value * 9/5) + 32;
        return {
            celsius: value,
            fahrenheit: parseFloat(f.toFixed(2)),
            kelvin: parseFloat((value + 273.15).toFixed(2))
        };
    } else if (fromUnit.toUpperCase() === "F") {
        if (value < -459.67) {
            return { error: "Temperature below absolute zero!" };
        }
        const c = (value - 32) * 5/9;
        return {
            celsius: parseFloat(c.toFixed(2)),
            fahrenheit: value,
            kelvin: parseFloat((c + 273.15).toFixed(2))
        };
    } else {
        return { error: "Unknown unit. Use 'C' or 'F'" };
    }
}

// TEST CASES - Valid conversions
console.log("--- Valid Temperature Conversions ---");
console.log("25°C to F: " + celsiusToFahrenheit(25) + "°F");
console.log("77°F to C: " + fahrenheitToCelsius(77) + "°C");
console.log("0°C to F: " + celsiusToFahrenheit(0) + "°F");
console.log("100°C to F: " + celsiusToFahrenheit(100) + "°F");
console.log("37°C (body): " + celsiusToFahrenheit(37) + "°F");
console.log();

// TEST CASES - Error handling
console.log("--- Error Handling Tests ---");
console.log("Invalid input (string): " + celsiusToFahrenheit("25"));
console.log("Below absolute zero: " + celsiusToFahrenheit(-300));
console.log("Below absolute zero (F): " + fahrenheitToCelsius(-500));
console.log();

// TEST CASES - Bidirectional conversion
console.log("--- Bidirectional Conversion (All Scales) ---");
const temp1 = convertTemperature(25, "C");
console.log("25°C -> All scales:");
console.log("  Celsius: " + temp1.celsius + "°");
console.log("  Fahrenheit: " + temp1.fahrenheit + "°");
console.log("  Kelvin: " + temp1.kelvin + "K");
console.log();

const temp2 = convertTemperature(77, "F");
console.log("77°F -> All scales:");
console.log("  Celsius: " + temp2.celsius + "°");
console.log("  Fahrenheit: " + temp2.fahrenheit + "°");
console.log("  Kelvin: " + temp2.kelvin + "K");
console.log();

// Real-world application: Weather dashboard
console.log("--- Weather Dashboard Simulation ---");
const cities = [
    { name: "Mumbai", tempC: 32 },
    { name: "Delhi", tempC: 40 },
    { name: "Shimla", tempC: 8 },
    { name: "Srinagar", tempC: 2 }
];

cities.forEach(city => {
    const tempF = celsiusToFahrenheit(city.tempC);
    const advisory = city.tempC < 5 ? "❄️ Freezing" :
                     city.tempC < 15 ? "🧥 Cold" :
                     city.tempC < 25 ? "😊 Comfortable" :
                     city.tempC < 35 ? "☀️ Warm" : "🔥 Very Hot";
    console.log(city.name + ": " + city.tempC + "°C (" + tempF + "°F) " + advisory);
});

// Challenge: Temperature range validator
function isTemperatureValid(celsius) {
    const isValid = celsiusToFahrenheit(celsius) !== "Error: Temperature below absolute zero (-273.15°C)!";
    return isValid;
}

console.log("\n--- Validity Check ---");
console.log("-273.15°C is valid: " + isTemperatureValid(-273.15));
console.log("-300°C is valid: " + isTemperatureValid(-300));
```

**Output:**
```
--- Valid Temperature Conversions ---
25°C to F: 77°F
77°F to C: 25°C
0°C to F: 32°F
100°C to F: 212°F
37°C (body): 98.6°F

--- Error Handling Tests ---
Invalid input (string): Error: Input must be a number
Below absolute zero: Error: Temperature below absolute zero...
Below absolute zero (F): Error: Temperature below absolute zero...

--- Bidirectional Conversion (All Scales) ---
25°C -> All scales:
  Celsius: 25°
  Fahrenheit: 77°
  Kelvin: 298.15K

77°F -> All scales:
  Celsius: 25°
  Fahrenheit: 77°
  Kelvin: 298.15K

--- Weather Dashboard Simulation ---
Mumbai: 32°C (89.6°F) ☀️ Warm
Delhi: 40°C (104°F) 🔥 Very Hot
Shimla: 8°C (46.4°F) 🧥 Cold
Srinagar: 2°C (35.6°F) ❄️ Freezing
```

**Key Advantages:**
- Input validation prevents errors
- Handles edge cases (negative temps, absolute zero)
- Returns consistent data structures
- Reusable across multiple contexts
- Production-ready code with error handling
- Supports multiple temperature scales

</details>

---

## 🎯 Key Learning Points

✅ **Temperature Conversion Formula:**
- Celsius to Fahrenheit: `F = (C × 9/5) + 32`
- Fahrenheit to Celsius: `C = (F - 32) × 5/9`
- Kelvin (absolute scale): `K = C + 273.15`

✅ **Important Reference Temperatures:**
- **-273.15°C (-459.67°F):** Absolute Zero (lowest possible temperature)
- **0°C (32°F):** Water freezes
- **20°C (68°F):** Room temperature
- **37°C (98.6°F):** Normal human body temperature
- **100°C (212°F):** Water boils at sea level

✅ **Error Handling Principles:**
- Always validate input types
- Check against physical limits (absolute zero)
- Return meaningful error messages
- Use consistent return types

✅ **When to Use Each Method:**
- **Method 1:** Quick calculations, understanding the math
- **Method 2:** Real applications, data validation, reusable code

✅ **Real-World Applications:**
- Weather applications and forecasts
- Temperature sensors and IoT devices
- Recipe conversions in international cooking
- Medical temperature monitoring
- Climate control systems

---

---

### Exercise 4.8: Student Status Checker

**Goal:** Combine multiple operators

```javascript
const name = "Rohan";
const gpa = 3.5;
const attendance = 0.95;
const feePaid = true;

// Status rules:
// GPA >= 3.0 AND attendance >= 90% AND fee paid = Active
// Otherwise = Inactive

const isActive = (gpa >= 3.0) && (attendance >= 0.90) && feePaid;
const status = isActive ? "✓ Active" : "✗ Inactive";

console.log("=== STUDENT STATUS ===");
console.log("Name: " + name);
console.log("GPA: " + gpa);
console.log("Attendance: " + (attendance * 100) + "%");
console.log("Fee Paid: " + feePaid);
console.log("Status: " + status);
```

---

## 🎓 Summary

| Operator | Purpose | Example | Result |
|----------|---------|---------|--------|
| `typeof` | Get type | typeof "5" | "string" |
| `?:` | Conditional value | true ? "A" : "B" | "A" |
| `++` | Increment | x++ | x+1 |
| `??` | Nullish default | null ?? "default" | "default" |
| `?.` | Safe property access | obj?.prop | undefined if null |

---

## 📝 Day 4 Assignment

**Task 1:** Create `day4_unary_special.js` with:
- 10 typeof examples
- 5 ternary operator examples
- 3 nullish coalescing examples
- 2 optional chaining examples

**Task 2:** Build a "Temperature Advisory System":
```javascript
- Input: temperature in Celsius
- Output: "Too Cold" (< 10), "Comfortable" (10-25), "Too Hot" (> 25)
Use ternary operators
```

**Submission:** GitHub + Google Classroom

---

**Next:** Day 5 - Mini Project & Week Review
