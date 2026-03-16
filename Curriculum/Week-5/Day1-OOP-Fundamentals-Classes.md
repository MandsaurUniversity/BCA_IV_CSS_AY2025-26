# Week 5, Day 1: Object-Oriented Programming Fundamentals and ES6 Classes

**Duration:** 180 minutes (90 min theory + 90 min practical)  
**Date:** March 3, 2026  
**Learning Outcome:** Understand OOP principles and implement ES6 classes

---

## 📚 THEORY SESSION (90 minutes)

### 1. What is Object-Oriented Programming (OOP)?

**OOP** is a programming paradigm based on objects that contain data (properties) and behavior (methods).

**Core Principles:**
1. **Encapsulation** - Bundle data and methods together
2. **Inheritance** - Classes inherit from other classes
3. **Polymorphism** - Same method, different behavior
4. **Abstraction** - Hide implementation details

```javascript
// Before OOP: Scattered functions and data
function createPerson(name, age) {
    return {name: name, age: age};
}

function getGreeting(person) {
    return "Hello, I'm " + person.name;
}

// After OOP: Bundled together in a class
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    getGreeting() {
        return "Hello, I'm " + this.name;
    }
}
```

---

### 2. Understanding ES6 Classes

**A Quick Note on What You're About to Learn:**
In this section, you'll learn the modern way to write OOP code in JavaScript using `class` syntax (introduced in ES6 / 2015). In the next section (2B), you'll learn about **prototypes**, which is how JavaScript *actually* implements classes behind the scenes. These are not two competing systems — classes are just a friendlier way to write prototypes. Think of it like this:
- **Class syntax** = What you write (high-level, clean)
- **Prototype system** = How JavaScript executes it (low-level, the mechanism)

Understanding both will make you a better JavaScript programmer. Let's start with the cleaner class syntax.

---

Before diving into classes, let's define the key terms:

**Class**: A blueprint or template for creating objects. A class defines what properties (data) and methods (behaviors) objects created from it will have. Think of a class as a cookie cutter — it defines the shape, but you use it to create many actual cookies (objects). In JavaScript, classes are created using the `class` keyword.

**Constructor**: A special method that runs automatically when you create a new instance of a class. The constructor initializes the object's properties with starting values. In JavaScript, it's defined using the `constructor()` method inside a class.

**Instance**: An individual object created from a class. If the class is the blueprint, the instance is the actual building. You create an instance using the `new` keyword: `const myCar = new Car()`. Each instance has its own values for properties but shares the methods defined in the class.

**Method** (in OOP context): A function that belongs to a class and defines a behavior that objects of that class can perform. Methods operate on the object's data (properties). For example, a `Car` class might have an `accelerate()` method.

**Property** (in OOP context): A variable that belongs to a class and holds data about an object. Properties define the state or characteristics of an object. For example, a `Car` class might have properties like `brand`, `model`, and `speed`.

**Syntax:**
```javascript
class ClassName {
    constructor(parameters) {
        // Initialize properties
    }
    
    method() {
        // Method body
    }
}
```

**Example:**
```javascript
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.speed = 0;
    }
    
    accelerate() {
        this.speed = this.speed + 10;
        console.log(this.brand + " is now going " + this.speed + " km/h");
    }
    
    brake() {
        this.speed = Math.max(0, this.speed - 10);
        console.log(this.brand + " is now going " + this.speed + " km/h");
    }
    
    getDescription() {
        return this.brand + " " + this.model + " (" + this.year + ")";
    }
}

// Create instances
const myCar = new Car("Toyota", "Camry", 2023);
myCar.accelerate();      // Toyota is now going 10 km/h
myCar.accelerate();      // Toyota is now going 20 km/h
myCar.brake();           // Toyota is now going 10 km/h
console.log(myCar.getDescription());  // Toyota Camry (2023)
```

---

### 2B. Prototypes: What's Under the Hood

Before ES6 (released in 2015), JavaScript didn't have the `class` keyword. Instead, developers used **prototypes** to build objects and implement inheritance. Today, ES6 classes are **syntactic sugar** — a nicer, more familiar way to write what was always a prototype-based system underneath.

**This is crucial:** Classes and prototypes are **not two different things**. Classes ARE just a cleaner way to write prototypes. When you use a class, JavaScript converts it into prototype code behind the scenes. To truly understand OOP in JavaScript, you need to understand how prototypes work.

#### The Core Idea: Prototype Chain and Inheritance

Every JavaScript object has a hidden internal link called **`[[Prototype]]`** that points to another object (its **prototype**). When you try to access a property or method on an object:

1. JavaScript first looks for it **on the object itself** (own properties)
2. If not found, it looks **on the object's prototype**
3.  If not found there, it looks **on the prototype's prototype**
4. This continues up the chain until it reaches `null`
5. If found anywhere in this chain, that value is used; otherwise, `undefined` is returned

**This chain of lookups is the prototype chain — and this is how JavaScript implements inheritance.**

#### Why This Looks Like Inheritance

Look at this pattern:
- A Blueprint (like a class) defines shared methods
- Multiple instances share those methods
- Instances can override methods or add their own properties
- Methods in the blueprint can access data from each instance using `this`

This is **exactly** what inheritance looks like in languages like Java or Python. JavaScript does it through prototypes instead of traditional class hierarchies, but the concept is identical.

#### Visual Diagram: Prototypes = Inheritance

```
When you write:
class Dog {
    bark() { console.log("Woof!"); }
}
const rex = new Dog();

JavaScript creates:
┌─────────────┐         ┌──────────────┐
│     rex     │────────▶│ Dog.prototype│
│ (instance)  │ points  │   bark()     │
│ name:"Rex"  │  to     │              │
└─────────────┘         └──────────────┘
                              │
                              │ points to
                              ▼
                       ┌──────────────┐
                       │Object.proto  │
                       │toString()    │
                       └──────────────┘

So when you call: rex.bark()
JS searches: rex.bark → not found → Dog.prototype.bark → FOUND!
When you call: rex.toString()
JS searches: rex.toString → not found → Dog.prototype.toString → not found
             → Object.prototype.toString → FOUND!
```

#### Creating Objects with Prototypes (without class syntax)

Before ES6, developers created objects like this:

```javascript
// Old way: Constructor function
function Dog(name) {
    this.name = name;  // Set own properties in constructor
}

// Add shared methods on the prototype
Dog.prototype.bark = function() {
    console.log(this.name + " says Woof!");
};

// Create instances with 'new'
const rex = new Dog("Rex");
rex.bark();  // "Rex says Woof!"
```

This does exactly the same thing as the class version! But let's see how they compare side-by-side:

#### Side-by-Side: Class vs Prototype (Same Thing, Different Syntax)

**Using ES6 Class (Modern, Cleaner):**
```javascript
class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        console.log(this.name + " says Woof!");
    }
}

const rex = new Dog("Rex");
rex.bark();  // "Rex says Woof!"
```

**Using Prototypes (Old Way, but Functionally Identical):**
```javascript
function Dog(name) {
    this.name = name;  // Constructor code goes here
}

Dog.prototype.bark = function() {
    console.log(this.name + " says Woof!");
};

const rex = new Dog("Rex");
rex.bark();  // "Rex says Woof!"
```

Both create exactly the same object structure internally. The class is just syntactic sugar around the prototype pattern.

#### Understanding the Real Structure

When you use `new Dog()`, JavaScript **actually does this:**

```javascript
// 1. Create a new empty object
const newInstance = {};

// 2. Set its [[Prototype]] to Dog.prototype
Object.setPrototypeOf(newInstance, Dog.prototype);

// 3. Call the constructor function with 'this' bound to newInstance
Dog.call(newInstance, "Rex");  // Sets newInstance.name = "Rex"

// 4. Return the new instance
// newInstance is now the rex object
```

This is why:
- `rex.bark` looks up the chain and finds `Dog.prototype.bark`
- `this.name` inside `bark()` refers to `rex.name` (because `this` is bound to `rex`)
- Properties go on the instance, methods go on the prototype

#### Methods on Instance vs Prototype

This is an important distinction:

```javascript
class Dog {
    constructor(name) {
        this.name = name;
        // If we put a method here:
        this.bark = function() {
            console.log(this.name + " says Woof!");
        };
    }
}

const dog1 = new Dog("Rex");
const dog2 = new Dog("Max");

// PROBLEM: Each instance has its own copy of bark()
console.log(dog1.bark === dog2.bark);  // false — different functions!
console.log(dog1.hasOwnProperty("bark"));  // true — it's on the instance

// This wastes memory if you have 1000 dogs. Each has its own copy!
```

**Better way — put methods on the prototype:**

```javascript
class Dog {
    constructor(name) {
        this.name = name;  // Own property — each instance has its own
    }

    bark() {
        console.log(this.name + " says Woof!");  // On Dog.prototype
    }
}

const dog1 = new Dog("Rex");
const dog2 = new Dog("Max");

// GOOD: Both instances share the same bark method
console.log(dog1.bark === dog2.bark);  // true — same function!
console.log(dog1.hasOwnProperty("bark"));  // false — it's inherited from prototype

// Memory efficient: One copy of bark() is shared by all instances
```

#### Object.create() — Creating Inheritance Without Constructor Functions

`Object.create(proto)` explicitly creates a new object with a specific prototype:

```javascript
// Define the shared behavior
const animalProto = {
    speak() {
        console.log(this.name + " makes a sound");
    }
};

// Create instances that inherit from animalProto
const dog = Object.create(animalProto);
dog.name = "Rex";
dog.type = "dog";

const cat = Object.create(animalProto);
cat.name = "Whiskers";
cat.type = "cat";

dog.speak();  // "Rex makes a sound"
cat.speak();  // "Whiskers makes a sound"

// Both dog and cat inherited the speak method from animalProto
console.log(Object.getPrototypeOf(dog) === animalProto);  // true
```

#### The Full Prototype Chain

```javascript
class Dog {
    constructor(name) {
        this.name = name;
    }
    bark() {
        console.log(this.name + " says Woof!");
    }
}

const rex = new Dog("Rex");

// The chain:
// rex → Dog.prototype → Object.prototype → null
//
// rex.         hasOwnProperty("name")   → YES, it's on rex
// rex.         hasOwnProperty("bark")   → NO, it's on Dog.prototype
// rex.         hasOwnProperty("toString")  → NO, it's on Object.prototype
// rex.         toString()               → FOUND on Object.prototype, used!

console.log(rex.hasOwnProperty("name"));  // true
console.log(rex.hasOwnProperty("bark"));  // false
console.log(rex.hasOwnProperty("toString"));  // false
console.log(Object.getPrototypeOf(rex) === Dog.prototype);  // true
console.log(Object.getPrototypeOf(Dog.prototype) === Object.prototype);  // true
```

#### Inspecting the Prototype Chain

```javascript
// How to check what's on the prototype
const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr) === Array.prototype);  // true
console.log(Array.prototype.includes);  // function — inherited from Array.prototype
console.log(arr.hasOwnProperty("includes"));  // false — not own property
console.log(arr.includes(2));  // true — found via prototype chain

// The full chain for an array:
// arr → Array.prototype → Object.prototype → null
```

#### Why This Matters for Teaching OOP

Prototypes implement the three key OOP concepts we discussed:

1. **Encapsulation**: Data (properties) is bundled with behavior (methods), just using prototypes instead of private fields
2. **Inheritance**: The prototype chain IS inheritance. Child instances inherit methods from parent prototypes
3. **Polymorphism**: Multiple object types can have the same method name that behaves differently based on the instance

So when students ask "Why do prototypes look like classes with inheritance?" — the answer is: **They're not "like" classes; classes ARE just a friendlier syntax for prototypes. Prototypes ARE how JavaScript implements OOP principles.**

> **The Key Insight for Your Students:**
> - **Class syntax** = the clean, modern way to write OOP (introduced in ES6 2015)
> - **Prototype system** = the underlying mechanism that makes it all work
> - They are the **same thing**, just two different ways to write it
> - Classes were added because developers from Java/Python/etc. found prototype syntax confusing
> - But underneath, it's all about the prototype chain

---

### 3. Constructor and this Keyword

The **constructor** is called when creating a new instance.  
**this** refers to the current object.

```javascript
class Student {
    constructor(name, rollNumber, grade) {
        this.name = name;           // Property
        this.rollNumber = rollNumber;
        this.grade = grade;
        this.marks = [];            // Initialize empty array
    }
    
    addMarks(mark) {
        this.marks.push(mark);
    }
    
    getAverage() {
        if (this.marks.length === 0) return 0;
        const total = this.marks.reduce((sum, m) => sum + m, 0);
        return total / this.marks.length;
    }
    
    getStatus() {
        const avg = this.getAverage();
        return this.name + " average: " + avg.toFixed(2);
    }
}

const student = new Student("Alice", 101, "A");
student.addMarks(85);
student.addMarks(90);
student.addMarks(88);
console.log(student.getStatus());  // Alice average: 87.67
```

---

### 4. Encapsulation

**What is Encapsulation?**

**Encapsulation** means bundling data (properties) and functions (methods) together into a single unit (class), and more importantly, **controlling how that data can be accessed and modified**. It's about hiding internal details and exposing only what's necessary.

**Why Encapsulation Matters:**

Imagine you have a bank account. You don't want external code to directly manipulate the balance like this:
```javascript
account._balance = -99999;  // Oops! Negative balance, cheating the bank!
```

Encapsulation prevents this. Instead, you force all access through controlled methods:
```javascript
account.withdraw(100);  // Method checks if sufficient funds exist first
```

**The Contract:**
- **Data (properties)** is kept internal and not directly accessible
- **Methods** provide the only way to interact with that data
- Methods can validate, enforce rules, and maintain consistency

This way, the object protects its own integrity.

```javascript
class BankAccount {
    constructor(accountHolder, initialBalance) {
        this.accountHolder = accountHolder;
        this._balance = initialBalance;  // Convention: _ means private
    }
    
    // Controlled access to balance
    getBalance() {
        return this._balance;
    }
    
    deposit(amount) {
        if (amount <= 0) {
            console.log("Deposit amount must be positive");
            return false;
        }
        this._balance += amount;
        console.log("Deposited ₹" + amount);
        return true;
    }
    
    withdraw(amount) {
        if (amount > this._balance) {
            console.log("Insufficient funds");
            return false;
        }
        this._balance -= amount;
        console.log("Withdrew ₹" + amount);
        return true;
    }
}

const account = new BankAccount("Alice", 10000);
account.deposit(5000);      // Deposited ₹5000
account.withdraw(3000);     // Withdrew ₹3000
console.log(account.getBalance());  // 12000

// Even though _balance looks private, it can still be accessed
// The convention is a contract: don't access it directly
```

---

### 4B. Getters and Setters

**Getters** and **setters** are special methods that allow you to define how a property is accessed (read) and modified (written). They look like properties from the outside but run code when used.

- A **getter** runs when you **read** a property's value
- A **setter** runs when you **assign** a value to a property

```javascript
class Temperature {
    constructor(celsius) {
        this._celsius = celsius;  // Store in a backing property
    }

    // Getter — called when you read temperature.fahrenheit
    get fahrenheit() {
        return this._celsius * 9 / 5 + 32;
    }

    // Setter — called when you assign temperature.fahrenheit = value
    set fahrenheit(value) {
        this._celsius = (value - 32) * 5 / 9;
    }

    // Getter for celsius
    get celsius() {
        return this._celsius;
    }

    set celsius(value) {
        if (value < -273.15) {
            console.log("Temperature cannot be below absolute zero!");
            return;
        }
        this._celsius = value;
    }
}

const temp = new Temperature(25);
console.log(temp.celsius);      // 25     — calls the getter
console.log(temp.fahrenheit);   // 77     — calls the getter, computes on the fly

temp.fahrenheit = 100;          // Calls the setter — converts and stores in celsius
console.log(temp.celsius);      // 37.78  — the converted value

temp.celsius = -300;            // "Temperature cannot be below absolute zero!"
console.log(temp.celsius);      // 37.78  — unchanged because setter rejected it
```

#### Getters in Plain Objects

You can also use getters and setters in regular object literals:

```javascript
const person = {
    firstName: "Alice",
    lastName: "Johnson",

    get fullName() {
        return this.firstName + " " + this.lastName;
    },

    set fullName(value) {
        const parts = value.split(" ");
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
};

console.log(person.fullName);         // "Alice Johnson"
person.fullName = "Bob Smith";
console.log(person.firstName);        // "Bob"
console.log(person.lastName);         // "Smith"
```

> **When to use getters/setters:**
> - To compute a value on the fly (like `fahrenheit` from `celsius`)
> - To validate data before setting it (like preventing negative temperatures)
> - To log or track when a property is read or changed
> - To provide a clean interface where computed properties look like simple values

---

### 4C. True Private Fields with `#`

**The Problem with Underscore (`_`):**

The `_` prefix convention (like `this._balance`) is just a naming agreement — it's a **promise to other developers**: "Please don't use this directly." But JavaScript doesn't enforce it. The property can still be accessed:

```javascript
class BankAccount {
    constructor(initialBalance) {
        this._balance = initialBalance;  // Convention: _ means "don't touch"
    }
}

const account = new BankAccount(1000);
console.log(account._balance);      // 1000 — anyone can read it
account._balance = -999999;         // Anyone can change it! No protection.
```

The underscore is just a gentlemen's agreement, not real security.

**The Solution: `#` Private Fields**

JavaScript now supports **truly private fields** using the `#` prefix. These are **enforced by the language** — you literally cannot access them from outside the class, not even from console or debugger.

```javascript
class BankAccountSecure {
    // Private fields — declared with #
    #balance;
    #pin;

    constructor(accountHolder, initialBalance, pin) {
        this.accountHolder = accountHolder;  // Public — anyone can access
        this.#balance = initialBalance;       // Private — only this class can access
        this.#pin = pin;                      // Private — only this class can access
    }

    // Public method — controlled access
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return true;
        }
        return false;
    }

    withdraw(amount, pin) {
        if (pin !== this.#pin) {
            console.log("Incorrect PIN!");
            return false;
        }
        if (amount > this.#balance) {
            console.log("Insufficient funds!");
            return false;
        }
        this.#balance -= amount;
        return true;
    }

    getBalance(pin) {
        if (pin !== this.#pin) return "Access denied";
        return this.#balance;
    }
}

const secure = new BankAccountSecure("Alice", 10000, 1234);
secure.deposit(5000);
console.log(secure.getBalance(1234));   // 15000
console.log(secure.getBalance(0000));   // "Access denied"

// Cannot access private fields — the language prevents it:
console.log(secure.accountHolder);      // ✅ "Alice" — public field works
// console.log(secure.#balance);         // ❌ SyntaxError: Private field '#balance' must be declared
// secure.#balance = -999999;            // ❌ SyntaxError: cannot write to private field
```

**Why `#` is Better Than `_`:**

| Feature | `_` (Convention) | `#` (True Private) |
|---------|------------------|-------------------|
| **Enforcement** | Language doesn't prevent access | Language prevents access at syntax level |
| **Security** | Can be accessed if you ignore convention | Cannot be accessed at all |
| **Intent** | "Please don't use this" | "You cannot use this" |
| **Valid Use Case** | Internal implementation details you might refactor | Sensitive data that must be protected |

**When to Use Which:**

- Use `_` for internal properties that are implementation details but might be useful for subclasses
- Use `#` for sensitive data (passwords, tokens, PINs) that must never be accessed directly

---

### 4D. Maps (Data Structure)

In Week 3, we learned that plain objects can be used as collections of key-value pairs. However, plain objects have limitations as data structures:
- Keys can only be strings (or Symbols)
- They inherit properties from `Object.prototype` (like `toString`), which can interfere
- No easy way to know how many entries they have

The **Map** data structure solves these problems. A **Map** is a collection of key-value pairs where keys can be **any type** — numbers, objects, functions, even other Maps.

```javascript
// Creating a Map
const ages = new Map();

// set() — add a key-value pair
ages.set("Alice", 25);
ages.set("Bob", 30);
ages.set("Charlie", 35);

// get() — retrieve a value by key
console.log(ages.get("Alice"));    // 25
console.log(ages.get("Unknown"));  // undefined

// has() — check if a key exists
console.log(ages.has("Bob"));      // true
console.log(ages.has("Dave"));     // false

// size — number of entries (not .length!)
console.log(ages.size);            // 3

// delete() — remove a key-value pair
ages.delete("Charlie");
console.log(ages.size);            // 2
```

#### Map vs Plain Object

```javascript
// ❌ Problem with plain objects as maps:
const obj = {};
obj["toString"] = "hello";
// This shadows Object.prototype.toString — dangerous!

// ✅ Map avoids this problem:
const map = new Map();
map.set("toString", "hello");
// No conflict — "toString" is just data, not inherited behavior
```

#### Maps with Non-String Keys

```javascript
const data = new Map();

// Numbers as keys
data.set(1, "one");
data.set(2, "two");

// Objects as keys
const user = { name: "Alice" };
data.set(user, { role: "admin" });

console.log(data.get(1));      // "one"
console.log(data.get(user));   // { role: "admin" }
```

#### Iterating Over a Map

```javascript
const scores = new Map([
    ["Alice", 95],
    ["Bob", 87],
    ["Charlie", 92]
]);

// Iterate entries
for (let [name, score] of scores) {
    console.log(name + ": " + score);
}

// Get keys and values separately
console.log([...scores.keys()]);    // ["Alice", "Bob", "Charlie"]
console.log([...scores.values()]);  // [95, 87, 92]
```

> **When to use Map vs Object:**
> - Use **Object** when keys are known strings and match a fixed structure (like person.name, person.age)
> - Use **Map** when keys are dynamic, unknown at write time, or are non-string types
> - Use **Map** when you need to frequently add/remove key-value pairs or need `.size`

---

### 5. Static Methods

**What are Static Methods?**

**Static methods** are methods that belong to the **class itself**, not to instances created from the class. They are called using the class name, not on individual objects.

```javascript
ClassName.staticMethod()   // Called on the class
const obj = new ClassName();
// obj.staticMethod()      // ❌ Error! Can't call this way
```

**Instance Methods vs Static Methods — The Difference:**

```javascript
class Person {
    // Instance method — belongs to each instance, accesses instance data
    greet() {
        console.log("Hello, I'm " + this.name);
    }

    // Static method — belongs to the class, doesn't have access to instance data
    static getInfo() {
        console.log("This is the Person class");
    }
}

const alice = new Person();
alice.greet();           // ✅ Works — instance method
Person.getInfo();        // ✅ Works — static method
alice.getInfo();         // ❌ Error — static methods only on the class
```

**Why Use Static Methods?**

Static methods are perfect for:
1. **Utility functions** - Operations that don't depend on instance data
2. **Factory methods** - Creating instances in special ways
3. **Data validation** - Checking if data is valid before creating an object
4. **Constants and shared logic** - Code used by all instances equally

**Real-World Examples:**

```javascript
// Example 1: Utility class for math operations
class MathUtils {
    static add(a, b) {
        return a + b;
    }

    static multiply(a, b) {
        return a * b;
    }

    static formatNumber(num) {
        return num.toLocaleString();
    }
}

console.log(MathUtils.add(5, 3));              // 8
console.log(MathUtils.formatNumber(1000));    // "1,000"
```

```javascript
// Example 2: Validation before creating instance
class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    // Static method — validates WITHOUT creating an instance
    static isValidEmail(email) {
        return email.includes("@") && email.includes(".");
    }

    static isStrongPassword(password) {
        return password.length >= 8;
    }
}

// Use static methods to validate BEFORE creating a User
if (User.isValidEmail("alice@mail.com") && User.isStrongPassword("MyPassword123")) {
    const user = new User("alice@mail.com", "MyPassword123");
    console.log("User created!");
} else {
    console.log("Invalid email or password!");
}
```

```javascript
// Example 3: Factory method (creating instances in different ways)
class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    getArea() {
        return Math.PI * this.radius * this.radius;
    }

    // Static factory method — creates a circle from diameter, not radius
    static fromDiameter(diameter) {
        return new Circle(diameter / 2);
    }

    // Static factory method — creates a circle from area
    static fromArea(area) {
        return new Circle(Math.sqrt(area / Math.PI));
    }
}

const circle1 = new Circle(5);                    // Direct: radius = 5
const circle2 = Circle.fromDiameter(10);         // Via diameter
const circle3 = Circle.fromArea(78.54);          // Via area

console.log(circle1.radius);   // 5
console.log(circle2.radius);   // 5
console.log(circle3.radius);   // ~5
```

**Key Points About Static Methods:**

- Static methods **cannot access instance properties** (no `this.name` etc.)
- Static methods **can access other static properties** and methods
- Static methods are useful for **shared operations** that don't depend on specific instance data
- You **cannot override static methods** in the same way as instance methods (static methods are inherited differently)

---

## ✅ PRACTICAL SESSION (90 minutes)

### Exercise 1.1: Basic Class

**Objective:** Create and use a simple class

```javascript
console.log("=== Exercise 1.1: Basic Class ===");

class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.currentPage = 0;
    }
    
    read(pageCount) {
        this.currentPage = Math.min(this.currentPage + pageCount, this.pages);
        console.log("Read to page " + this.currentPage);
    }
    
    getProgress() {
        const percentage = ((this.currentPage / this.pages) * 100).toFixed(1);
        return percentage + "%";
    }
    
    getInfo() {
        return this.title + " by " + this.author + " (" + this.pages + " pages)";
    }
}

const book = new Book("JavaScript Guide", "John Doe", 500);
console.log(book.getInfo());  // JavaScript Guide by John Doe (500 pages)
book.read(100);              // Read to page 100
book.read(50);               // Read to page 150
console.log(book.getProgress());  // 30.0%
```

---

### Exercise 1.2: Student Grade Tracker

**Objective:** Create a class with calculations

```javascript
console.log("\n=== Exercise 1.2: Student Grade Tracker ===");

class GradeTracker {
    constructor(studentName) {
        this.studentName = studentName;
        this.grades = [];
    }
    
    addGrade(subject, marks) {
        this.grades.push({subject: subject, marks: marks});
    }
    
    getAverage() {
        if (this.grades.length === 0) return 0;
        const total = this.grades.reduce((sum, g) => sum + g.marks, 0);
        return (total / this.grades.length).toFixed(2);
    }
    
    getGradeLetters() {
        return this.grades.map(g => {
            let letter;
            if (g.marks >= 90) letter = 'A';
            else if (g.marks >= 80) letter = 'B';
            else if (g.marks >= 70) letter = 'C';
            else if (g.marks >= 60) letter = 'D';
            else letter = 'F';
            
            return g.subject + ": " + g.marks + " (" + letter + ")";
        });
    }
    
    displayReport() {
        console.log("\n📊 " + this.studentName + " - Grade Report");
        console.log("─────────────────────────────");
        
        for (let gradeStr of this.getGradeLetters()) {
            console.log("  " + gradeStr);
        }
        
        console.log("─────────────────────────────");
        console.log("  Average: " + this.getAverage());
    }
}

const student = new GradeTracker("Alice");
student.addGrade("Math", 95);
student.addGrade("English", 87);
student.addGrade("Science", 92);
student.displayReport();
```

---

### Exercise 1.3: E-Commerce Product Class

**Objective:** Practical business application

```javascript
console.log("\n=== Exercise 1.3: E-Commerce Product ===");

class Product {
    constructor(id, name, price, stock) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    
    applyDiscount(discountPercent) {
        return this.price * (1 - discountPercent / 100);
    }
    
    canBuy(quantity) {
        return quantity <= this.stock;
    }
    
    buy(quantity) {
        if (!this.canBuy(quantity)) {
            return false;
        }
        this.stock -= quantity;
        return true;
    }
    
    addStock(quantity) {
        this.stock += quantity;
    }
    
    getInfo() {
        let status = this.stock > 0 ? "In Stock" : "Out of Stock";
        return this.name + ": ₹" + this.price + " (" + this.stock + " available) - " + status;
    }
}

const laptop = new Product(1, "Laptop", 50000, 5);
console.log(laptop.getInfo());  // Laptop: ₹50000 (5 available) - In Stock

console.log("Price with 10% discount: ₹" + laptop.applyDiscount(10));  // ₹45000

if (laptop.buy(2)) {
    console.log("Purchased 2 laptops");
    console.log(laptop.getInfo());  // Stock now 3
} else {
    console.log("Cannot purchase");
}
```

---

### Exercise 1.4: Banking System

**Objective:** Demonstrate encapsulation and method interactions

```javascript
console.log("\n=== Exercise 1.4: Banking System ===");

class BankAccount {
    constructor(accountNumber, accountHolder, initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this._balance = initialBalance;
        this.transactions = [];
        this.transactions.push({
            type: "initial",
            amount: initialBalance,
            date: new Date()
        });
    }
    
    deposit(amount) {
        if (amount <= 0) {
            console.log("❌ Deposit must be positive");
            return false;
        }
        
        this._balance += amount;
        this.transactions.push({
            type: "deposit",
            amount: amount,
            date: new Date()
        });
        
        console.log("✓ Deposited ₹" + amount);
        return true;
    }
    
    withdraw(amount) {
        if (amount <= 0) {
            console.log("❌ Withdrawal must be positive");
            return false;
        }
        
        if (amount > this._balance) {
            console.log("❌ Insufficient funds");
            return false;
        }
        
        this._balance -= amount;
        this.transactions.push({
            type: "withdraw",
            amount: amount,
            date: new Date()
        });
        
        console.log("✓ Withdrew ₹" + amount);
        return true;
    }
    
    getBalance() {
        return this._balance;
    }
    
    getStatement() {
        console.log("\n📋 Account Statement for " + this.accountHolder);
        console.log("Account: " + this.accountNumber);
        console.log("─────────────────────────────");
        
        for (let transaction of this.transactions.slice(-5)) {
            console.log(
                transaction.type.toUpperCase() + ": ₹" + 
                transaction.amount + " - " + 
                transaction.date.toLocaleString()
            );
        }
        
        console.log("─────────────────────────────");
        console.log("Current Balance: ₹" + this._balance);
    }
}

const account = new BankAccount("ACC001", "Alice", 10000);
account.deposit(5000);
account.withdraw(2000);
account.deposit(1500);
account.getStatement();
```

---

### Exercise 1.5: Multi-Class System

**Objective:** Multiple classes working together

```javascript
console.log("\n=== Exercise 1.5: Library System ===");

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }
    
    addBook(book) {
        this.books.push(book);
    }
    
    findBook(title) {
        return this.books.find(b => b.title.toLowerCase() === title.toLowerCase());
    }
    
    getBookCount() {
        return this.books.length;
    }
    
    listBooks() {
        console.log("\n📚 " + this.name + " - Book List");
        console.log("─────────────────────────────");
        
        for (let book of this.books) {
            console.log("  " + book.toString());
        }
    }
}

class LibraryBook {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.available = true;
    }
    
    checkout() {
        if (this.available) {
            this.available = false;
            return true;
        }
        return false;
    }
    
    returnBook() {
        this.available = true;
    }
    
    toString() {
        const status = this.available ? "Available" : "Checked Out";
        return this.title + " by " + this.author + " [" + status + "]";
    }
}

const library = new Library("City Library");

const book1 = new LibraryBook("JavaScript Basics", "John Doe", "ISBN-001");
const book2 = new LibraryBook("Web Development", "Jane Smith", "ISBN-002");
const book3 = new LibraryBook("Node.js Guide", "Bob Johnson", "ISBN-003");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

library.listBooks();

console.log("\n📤 Checking out: " + book1.title);
if (book1.checkout()) {
    console.log("✓ Successfully checked out");
} else {
    console.log("❌ Book not available");
}

library.listBooks();

console.log("\n📥 Returning: " + book1.title);
book1.returnBook();

library.listBooks();
```

---

## 🎯 Key Takeaways

✅ **Classes bundle data and methods**
✅ **Constructor initializes objects**
✅ **this refers to the current object**
✅ **Methods are functions in classes**
✅ **Static methods belong to the class**
✅ **Encapsulation hides implementation**

---

## 🔍 Common Pitfalls

```javascript
// ❌ Mistake 1: Forgetting 'new' keyword
class Car {}
const car = Car();  // TypeError: Class constructor requires 'new'

// ✅ Correct
const car = new Car();

// ❌ Mistake 2: Forgetting this
class Person {
    constructor(name) {
        name = name;  // Wrong! Doesn't save to object
    }
}

// ✅ Correct
class Person {
    constructor(name) {
        this.name = name;
    }
}

// ❌ Mistake 3: Method forgetting return
class Calculator {
    add(a, b) {
        a + b;  // Missing return
    }
}

// ✅ Correct
class Calculator {
    add(a, b) {
        return a + b;
    }
}
```

---

**File:** `Curriculum/Week-5/Day1-OOP-Fundamentals-Classes.md`  
**Status:** Complete ✅  
**Last Updated:** March 2026

---

## 📋 Week 5 Progress

- [x] Day 1: OOP Fundamentals and Classes ✅
- [ ] Day 2: Inheritance and Polymorphism
- [ ] Day 3: File Operations (Experiment 23)
- [ ] Day 4: Type Checking (Experiment 24)
- [ ] Day 5: OOP Integration Project
