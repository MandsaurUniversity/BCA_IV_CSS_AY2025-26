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

JavaScript classes are **syntactic sugar** — a nicer way to write something that already existed. Behind every class is a mechanism called **prototypes**. Understanding prototypes helps you understand how JavaScript objects actually work.

#### What is a Prototype?

Every JavaScript object has a hidden link to another object called its **prototype**. When you try to access a property or method on an object and it doesn't exist on that object, JavaScript looks at the object's prototype. If it's not there either, it looks at the prototype's prototype, and so on. This chain of lookups is called the **prototype chain**.

```javascript
// Create a simple object
const rabbit = {
    speak(line) {
        console.log(`The rabbit says '${line}'`);
    }
};

// Create another object whose prototype is rabbit
const whiteRabbit = Object.create(rabbit);
whiteRabbit.color = "white";

whiteRabbit.speak("I'm late!");  // The rabbit says 'I'm late!'
// whiteRabbit doesn't have a speak method,
// but its prototype (rabbit) does, so that one is used.

console.log(whiteRabbit.color);  // "white" — own property
```

#### Object.create()

`Object.create(proto)` creates a new object with `proto` as its prototype:

```javascript
const personProto = {
    greet() {
        return "Hello, I'm " + this.name;
    }
};

const alice = Object.create(personProto);
alice.name = "Alice";
console.log(alice.greet());  // "Hello, I'm Alice"

const bob = Object.create(personProto);
bob.name = "Bob";
console.log(bob.greet());    // "Hello, I'm Bob"
```

#### Object.getPrototypeOf()

You can inspect an object's prototype:

```javascript
console.log(Object.getPrototypeOf(alice) === personProto);  // true

// Arrays have Array.prototype as their prototype
const arr = [1, 2, 3];
console.log(Object.getPrototypeOf(arr) === Array.prototype);  // true

// Array.prototype itself inherits from Object.prototype
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype);  // true
```

#### How Classes Use Prototypes

When you write a `class`, JavaScript puts the methods on the prototype automatically:

```javascript
class Dog {
    constructor(name) {
        this.name = name;  // Own property — stored on each instance
    }
    bark() {
        console.log(this.name + " says Woof!");  // On Dog.prototype
    }
}

const rex = new Dog("Rex");
rex.bark();  // "Rex says Woof!"

// The bark method is on the prototype, not on rex:
console.log(rex.hasOwnProperty("name"));  // true  — own property
console.log(rex.hasOwnProperty("bark"));  // false — not own, it's on prototype
console.log(Object.getPrototypeOf(rex) === Dog.prototype);  // true
```

#### The Prototype Chain (Visual)

```
rex (instance)       → Dog.prototype         → Object.prototype → null
  name: "Rex"           bark: function()        toString: function()
                                                 hasOwnProperty: function()
```

When you call `rex.toString()`, JavaScript:
1. Checks `rex` — no `toString` found
2. Checks `Dog.prototype` — no `toString` found
3. Checks `Object.prototype` — found! Uses it.

> **Key takeaway:** Classes are a clean syntax for creating objects that share methods via their prototype. Understanding prototypes helps you debug unexpected behavior (like why a method exists on an object even though you didn't define it there).

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

**Encapsulation** is bundling data and methods, plus controlling access.

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

The `_` prefix convention (like `this._balance`) is just a naming agreement — the property can still be accessed from outside. JavaScript now supports **truly private fields** using the `#` prefix. Private fields **cannot** be accessed from outside the class at all.

```javascript
class BankAccountSecure {
    // Declare private fields
    #balance;
    #pin;

    constructor(accountHolder, initialBalance, pin) {
        this.accountHolder = accountHolder;  // Public
        this.#balance = initialBalance;       // Private
        this.#pin = pin;                      // Private
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

// Cannot access private fields:
// console.log(secure.#balance);  // ❌ SyntaxError: Private field
// console.log(secure.#pin);      // ❌ SyntaxError: Private field
console.log(secure.accountHolder);  // ✅ "Alice" — public field works
```

> **`_` vs `#`:**
> - `this._balance` — "please don't touch" (convention, still accessible)
> - `this.#balance` — "you literally cannot touch" (enforced by the language)

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

**Static methods** belong to the class, not instances.

```javascript
class MathHelper {
    // Static method
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static factorial(n) {
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }
}

// Call on class, not instance
console.log(MathHelper.add(5, 3));           // 8
console.log(MathHelper.multiply(5, 3));      // 15
console.log(MathHelper.factorial(5));        // 120

// Can't call on instance
const helper = new MathHelper();
// helper.add(5, 3);  // Error!
```

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
