# Week 5, Day 2: Inheritance, Polymorphism, and Advanced OOP

**Duration:** 180 minutes (90 min theory + 90 min practical)  
**Date:** March 4, 2026  
**Learning Outcome:** Master inheritance and polymorphism for extensible OOP design

---

## 📚 THEORY SESSION (90 minutes)

### 1. Inheritance Basics

**Inheritance** allows a class to inherit properties and methods from another class.

```javascript
// Parent class
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(this.name + " makes a sound");
    }
    
    move() {
        console.log(this.name + " is moving");
    }
}

// Child class inherits from parent
class Dog extends Animal {
    constructor(name, breed) {
        super(name);  // Call parent constructor
        this.breed = breed;
    }
    
    // Override parent method
    speak() {
        console.log(this.name + " barks: Woof!");
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.speak();  // Buddy barks: Woof!
dog.move();   // Buddy is moving (from parent)
```

#### Overriding Derived Properties

When a child class defines a method with the same name as the parent class, the child's version **overrides** (replaces) the parent's version. This is called **overriding derived properties**. The term "derived" means the child class is "derived from" (based on) the parent.

**How property lookup works with inheritance:**

```
dog (Dog instance)  →  Dog.prototype  →  Animal.prototype  →  Object.prototype
  name: "Buddy"        speak()            speak()              toString()
  breed: "Golden..."                       move()
```

When you call `dog.speak()`, JavaScript:
1. Checks `dog` — no `speak` method on the instance itself
2. Checks `Dog.prototype` — found `speak()`! Uses this one.
3. `Animal.prototype.speak()` is **never reached** because the lookup stopped at step 2.

This is why `Dog.speak()` **overrides** `Animal.speak()` — it appears earlier in the prototype chain.

```javascript
class Animal {
    toString() {
        return "an animal";
    }
}

class Rabbit extends Animal {
    toString() {
        return "a rabbit";  // Overrides Animal's toString
    }
}

const r = new Rabbit();
console.log(r.toString());  // "a rabbit" — Rabbit's version, not Animal's

// You can still call the parent version using super:
class Dog extends Animal {
    toString() {
        return super.toString() + " (specifically a dog)";
    }
}

const d = new Dog();
console.log(d.toString());  // "an animal (specifically a dog)"
```

> **Key point:** Overriding is not destructive — the parent class method still exists, and other instances of the parent class continue to use it. Only instances of the child class see the overridden version.

---

### 2. super Keyword

**super** calls methods or constructor from parent class.

```javascript
class Vehicle {
    constructor(brand) {
        this.brand = brand;
    }
    
    start() {
        console.log(this.brand + " is starting...");
    }
}

class Car extends Vehicle {
    constructor(brand, model) {
        super(brand);  // Call parent constructor
        this.model = model;
    }
    
    start() {
        super.start();  // Call parent method
        console.log("Car engine roaring...");
    }
}

const myCar = new Car("Toyota", "Camry");
myCar.start();
// Output:
// Toyota is starting...
// Car engine roaring...
```

---

### 3. Polymorphism

**Polymorphism** allows objects of different types to be treated the same way.

```javascript
class Shape {
    getArea() {
        return 0;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}

// Polymorphism in action
const shapes = [
    new Rectangle(5, 10),
    new Circle(5)
];

for (let shape of shapes) {
    console.log("Area: " + shape.getArea().toFixed(2));
}
// Area: 50.00
// Area: 78.54
```

---

### 4. The instanceof Operator

The **`instanceof`** operator tests whether an object was created by a particular class (or any class in its inheritance chain). It returns `true` or `false`.

```javascript
class Employee {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
}

class Manager extends Employee {
    constructor(name, salary, department) {
        super(name, salary);
        this.department = department;
    }
}

const emp = new Employee("Alice", 50000);
const mgr = new Manager("Bob", 80000, "IT");

console.log(emp instanceof Employee);  // true
console.log(emp instanceof Manager);   // false

console.log(mgr instanceof Employee);  // true  ← managers ARE employees (through inheritance)
console.log(mgr instanceof Manager);   // true
```

#### How instanceof Works

`instanceof` checks the **prototype chain**. It asks: "Does the class's `.prototype` property appear anywhere in the object's prototype chain?"

```javascript
// These are equivalent:
console.log(mgr instanceof Employee);
// Same as asking: does Employee.prototype appear in mgr's prototype chain?

// Built-in types work too:
console.log([1, 2, 3] instanceof Array);    // true
console.log([1, 2, 3] instanceof Object);   // true (arrays inherit from Object)
console.log("hello" instanceof String);     // false (string primitives are not objects)
console.log(new String("hello") instanceof String); // true (String object wrapper)
```

#### Practical Use: Type Checking in Functions

```javascript
function processInput(input) {
    if (input instanceof Array) {
        return "Array with " + input.length + " elements";
    } else if (input instanceof Date) {
        return "Date: " + input.toDateString();
    } else if (input instanceof Error) {
        return "Error: " + input.message;
    } else {
        return "Unknown type: " + typeof input;
    }
}

console.log(processInput([1, 2, 3]));          // "Array with 3 elements"
console.log(processInput(new Date()));          // "Date: ..."
console.log(processInput(new Error("oops")));  // "Error: oops"
console.log(processInput(42));                  // "Unknown type: number"
```

> **`instanceof` vs `typeof`:**
> - `typeof` tells you the primitive type: `"string"`, `"number"`, `"boolean"`, `"object"`, `"function"`, `"undefined"`
> - `instanceof` tells you if an object belongs to a specific class hierarchy
> - For arrays, `typeof` returns `"object"` (unhelpful), while `instanceof Array` returns `true`

---

### 5. Abstract Classes Pattern

JavaScript doesn't have true abstract classes, but we can simulate them:

```javascript
class DataProcessor {
    process() {
        throw new Error("process() must be implemented by subclass");
    }
    
    validate() {
        throw new Error("validate() must be implemented by subclass");
    }
}

class CSVProcessor extends DataProcessor {
    process() {
        console.log("Processing CSV file...");
    }
    
    validate() {
        console.log("Validating CSV structure...");
    }
}

class JSONProcessor extends DataProcessor {
    process() {
        console.log("Processing JSON file...");
    }
    
    validate() {
        console.log("Validating JSON structure...");
    }
}

const processors = [new CSVProcessor(), new JSONProcessor()];

for (let processor of processors) {
    processor.validate();
    processor.process();
}
```

---

### 6. Symbols

A **Symbol** is a primitive data type (like number, string, or boolean) that is guaranteed to be **unique**. Every Symbol you create is different from every other Symbol, even if they have the same description.

Symbols are primarily used as **property keys** — when you need a property name that will never accidentally conflict with any other property name.

```javascript
// Creating Symbols
const sym1 = Symbol("description");
const sym2 = Symbol("description");

console.log(sym1 === sym2);   // false — every Symbol is unique!
console.log(typeof sym1);     // "symbol"
```

#### Using Symbols as Property Keys

```javascript
const SECRET_ID = Symbol("id");

const user = {
    name: "Alice",
    [SECRET_ID]: 12345   // Symbol as property key (use bracket notation)
};

console.log(user.name);         // "Alice"
console.log(user[SECRET_ID]);   // 12345

// Symbol properties don't show up in normal iteration:
console.log(Object.keys(user));  // ["name"]  — no Symbol!

// But you can find them with:
console.log(Object.getOwnPropertySymbols(user));  // [Symbol(id)]
```

#### Symbol.for() — Global Symbols

`Symbol.for(key)` looks up an existing Symbol with the given key in a global registry. If it doesn't exist, it creates one. This lets you share Symbols across different parts of your code:

```javascript
const id1 = Symbol.for("app.id");
const id2 = Symbol.for("app.id");

console.log(id1 === id2);  // true — same Symbol from the global registry!

// Regular Symbol() always creates new:
const id3 = Symbol("app.id");
console.log(id1 === id3);  // false — different Symbol
```

#### Well-Known Symbols

JavaScript has built-in Symbols (called **well-known Symbols**) that let you customize how objects behave with built-in operations. The most important one for this course is `Symbol.iterator` (covered next).

```javascript
// Symbol.toPrimitive — customize type conversion
class Money {
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }

    [Symbol.toPrimitive](hint) {
        if (hint === "number") return this.amount;
        if (hint === "string") return `${this.amount} ${this.currency}`;
        return this.amount;
    }
}

const price = new Money(100, "INR");
console.log(+price);        // 100       (number hint)
console.log(`${price}`);    // "100 INR" (string hint)
console.log(price + 50);    // 150       (default hint → number)
```

---

### 7. The Iterator Interface

An **iterator** is an object that provides a way to access elements one at a time, in sequence. The **iterator interface** is the protocol (set of rules) that JavaScript uses to make objects work with `for...of` loops and the spread operator `[...obj]`.

#### How Iteration Works

When you write `for (let x of arr)`, JavaScript does this behind the scenes:

1. Calls `arr[Symbol.iterator]()` to get an **iterator object**
2. Repeatedly calls `iterator.next()` on that object
3. Each call to `next()` returns an object with two properties:
   - `value` — the current element
   - `done` — `true` if there are no more elements, `false` otherwise
4. The loop stops when `done` is `true`

```javascript
// Manually using the iterator interface on an array:
const arr = ["a", "b", "c"];

const iterator = arr[Symbol.iterator]();  // Step 1: get iterator

console.log(iterator.next());  // { value: "a", done: false }
console.log(iterator.next());  // { value: "b", done: false }
console.log(iterator.next());  // { value: "c", done: false }
console.log(iterator.next());  // { value: undefined, done: true }

// This is exactly what for...of does automatically:
for (let item of arr) {
    console.log(item);  // "a", "b", "c"
}
```

#### Creating a Custom Iterable

You can make **any** object iterable by defining a `[Symbol.iterator]()` method on it. This method must return an object with a `next()` method:

```javascript
class Range {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    // Make Range iterable
    [Symbol.iterator]() {
        let current = this.from;
        const last = this.to;

        return {
            next() {
                if (current <= last) {
                    return { value: current++, done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
}

// Now Range works with for...of:
const range = new Range(1, 5);

for (let num of range) {
    console.log(num);  // 1, 2, 3, 4, 5
}

// And with spread operator:
console.log([...new Range(3, 7)]);  // [3, 4, 5, 6, 7]

// And with destructuring:
const [first, second, third] = new Range(10, 20);
console.log(first, second, third);  // 10 11 12
```

#### Practical Example: Linked List Iterator

```javascript
class LinkedList {
    constructor(value, rest = null) {
        this.value = value;
        this.rest = rest;
    }

    [Symbol.iterator]() {
        let current = this;
        return {
            next() {
                if (current === null) {
                    return { done: true };
                }
                const value = current.value;
                current = current.rest;
                return { value, done: false };
            }
        };
    }
}

// Build a linked list: 1 → 2 → 3
const list = new LinkedList(1, new LinkedList(2, new LinkedList(3)));

for (let value of list) {
    console.log(value);  // 1, 2, 3
}

console.log([...list]);  // [1, 2, 3]
```

> **Why iterators matter:** The iterator interface is what makes JavaScript's `for...of` loop work with arrays, strings, Maps, Sets, and any custom object. By implementing `[Symbol.iterator]()`, your classes can integrate seamlessly with the language's built-in features — this is a real-world example of **polymorphism**: different objects, same interface.

---

## ✅ PRACTICAL SESSION (90 minutes)

### Exercise 2.1: Animal Hierarchy

**Objective:** Implement inheritance with animal classes

```javascript
console.log("=== Exercise 2.1: Animal Hierarchy ===");

class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
        this.energy = 100;
    }
    
    eat(amount = 20) {
        this.energy = Math.min(100, this.energy + amount);
        console.log(this.name + " ate and gained " + amount + " energy. Energy: " + this.energy);
    }
    
    rest(hours = 8) {
        this.energy = Math.min(100, this.energy + (hours * 5));
        console.log(this.name + " rested for " + hours + " hours. Energy: " + this.energy);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, "Canine");
        this.breed = breed;
    }
    
    bark() {
        if (this.energy > 10) {
            console.log(this.name + ": Woof! Woof!");
            this.energy -= 10;
        } else {
            console.log(this.name + " is too tired to bark");
        }
    }
    
    fetchBall() {
        if (this.energy > 30) {
            console.log(this.name + " fetched the ball!");
            this.energy -= 30;
        } else {
            console.log(this.name + " is too tired to play");
        }
    }
}

class Cat extends Animal {
    constructor(name, color) {
        super(name, "Feline");
        this.color = color;
    }
    
    meow() {
        console.log(this.name + ": Meow!");
    }
    
    scratch() {
        if (this.energy > 15) {
            console.log(this.name + " scratched the furniture");
            this.energy -= 15;
        } else {
            console.log(this.name + " is sleeping");
        }
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Orange");

console.log("\n🐕 Dog:");
dog.bark();
dog.fetchBall();
dog.eat();

console.log("\n🐱 Cat:");
cat.meow();
cat.scratch();
cat.rest(2);
```

---

### Exercise 2.2: Vehicle Inheritance

**Objective:** Multi-level inheritance

```javascript
console.log("\n=== Exercise 2.2: Vehicle Hierarchy ===");

class Vehicle {
    constructor(brand, model, speed) {
        this.brand = brand;
        this.model = model;
        this.currentSpeed = 0;
        this.maxSpeed = speed;
    }
    
    accelerate() {
        this.currentSpeed = Math.min(this.maxSpeed, this.currentSpeed + 10);
        console.log(this.brand + " is going " + this.currentSpeed + " km/h");
    }
    
    brake() {
        this.currentSpeed = Math.max(0, this.currentSpeed - 10);
    }
    
    getInfo() {
        return this.brand + " " + this.model + " (max: " + this.maxSpeed + " km/h)";
    }
}

class Car extends Vehicle {
    constructor(brand, model, doors) {
        super(brand, model, 200);
        this.doors = doors;
    }
}

class Truck extends Vehicle {
    constructor(brand, model, capacity) {
        super(brand, model, 120);
        this.capacity = capacity;
        this.load = 0;
    }
    
    loadCargo(weight) {
        if (this.load + weight <= this.capacity) {
            this.load += weight;
            console.log("Loaded " + weight + " tons. Total: " + this.load + " tons");
        } else {
            console.log("Truck is full!");
        }
    }
}

const car = new Car("Toyota", "Camry", 4);
const truck = new Truck("Volvo", "FH", 10);

console.log(car.getInfo());
car.accelerate();
car.accelerate();

console.log(truck.getInfo());
truck.loadCargo(5);
truck.loadCargo(7);  // Would exceed capacity
truck.accelerate();
truck.accelerate();
```

---

### Exercise 2.3: Employee Polymorphism

**Objective:** Different employee types with same interface

```javascript
console.log("\n=== Exercise 2.3: Employee System ===");

class Employee {
    constructor(name, baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }
    
    getSalary() {
        return this.baseSalary;
    }
    
    getRole() {
        return "Employee";
    }
    
    displayInfo() {
        console.log(
            this.name + " (" + this.getRole() + ") - ₹" + 
            this.getSalary().toFixed(0)
        );
    }
}

class Manager extends Employee {
    constructor(name, baseSalary, teamSize) {
        super(name, baseSalary);
        this.teamSize = teamSize;
    }
    
    getSalary() {
        return this.baseSalary + (this.teamSize * 5000);  // Bonus per team member
    }
    
    getRole() {
        return "Manager";
    }
}

class Developer extends Employee {
    constructor(name, baseSalary, languages) {
        super(name, baseSalary);
        this.languages = languages;
    }
    
    getSalary() {
        const skillBonus = this.languages.length * 5000;
        return this.baseSalary + skillBonus;
    }
    
    getRole() {
        return "Developer";
    }
}

class Sales extends Employee {
    constructor(name, baseSalary, commission) {
        super(name, baseSalary);
        this.commission = commission;
    }
    
    getSalary() {
        return this.baseSalary + (this.baseSalary * this.commission / 100);
    }
    
    getRole() {
        return "Sales";
    }
}

// Polymorphism
const employees = [
    new Employee("Alice", 40000),
    new Manager("Bob", 50000, 5),
    new Developer("Charlie", 55000, ["JavaScript", "Python", "Java"]),
    new Sales("Diana", 45000, 10)
];

console.log("📊 Employee Salaries:");
let totalSalary = 0;

for (let emp of employees) {
    emp.displayInfo();
    totalSalary += emp.getSalary();
}

console.log("─────────────────────────");
console.log("Total Payroll: ₹" + totalSalary.toFixed(0));
```

---

### Exercise 2.4: Shape Area Calculator

**Objective:** Polymorphic shape calculations

```javascript
console.log("\n=== Exercise 2.4: Shape Calculator ===");

class Shape {
    getArea() {
        throw new Error("getArea() must be implemented");
    }
    
    getPerimeter() {
        throw new Error("getPerimeter() must be implemented");
    }
    
    displayInfo() {
        console.log("Area: " + this.getArea().toFixed(2));
        console.log("Perimeter: " + this.getPerimeter().toFixed(2));
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
    
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
    
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
}

class Triangle extends Shape {
    constructor(a, b, c) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
    }
    
    getArea() {
        const s = (this.a + this.b + this.c) / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }
    
    getPerimeter() {
        return this.a + this.b + this.c;
    }
}

const shapes = [
    new Rectangle(5, 10),
    new Circle(7),
    new Triangle(3, 4, 5)
];

for (let shape of shapes) {
    console.log(shape.constructor.name + ":");
    shape.displayInfo();
    console.log();
}
```

---

### Exercise 2.5: Game Characters

**Objective:** RPG-style character system with inheritance

```javascript
console.log("\n=== Exercise 2.5: Game Characters ===");

class Character {
    constructor(name, health, mana) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.mana = mana;
        this.maxMana = mana;
    }
    
    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        console.log(this.name + " took " + amount + " damage. Health: " + this.health);
    }
    
    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
        console.log(this.name + " healed " + amount + " HP");
    }
    
    isAlive() {
        return this.health > 0;
    }
}

class Warrior extends Character {
    constructor(name) {
        super(name, 150, 20);
        this.armor = 10;
    }
    
    slash(opponent) {
        const damage = Math.floor(Math.random() * 20) + 15;
        console.log(this.name + " slashes " + opponent.name + " for " + damage + " damage!");
        opponent.takeDamage(damage);
    }
}

class Mage extends Character {
    constructor(name) {
        super(name, 80, 100);
    }
    
    fireball(opponent) {
        const manaCost = 30;
        if (this.mana >= manaCost) {
            this.mana -= manaCost;
            const damage = Math.floor(Math.random() * 25) + 20;
            console.log(this.name + " casts fireball for " + damage + " damage!");
            opponent.takeDamage(damage);
        } else {
            console.log(this.name + " doesn't have enough mana!");
        }
    }
}

const warrior = new Warrior("Conan");
const mage = new Mage("Merlin");

console.log("⚔️ Battle Starts!\n");

warrior.slash(mage);
console.log();
mage.fireball(warrior);
console.log();
warrior.slash(mage);
console.log();
mage.heal(20);
```

---

## 🎯 Key Takeaways

✅ **extends keyword for inheritance**
✅ **super() calls parent constructor**
✅ **super.method() calls parent method**
✅ **Overriding replaces parent methods in child classes**
✅ **Polymorphism allows different behavior through same interface**
✅ **instanceof checks object type through the prototype chain**
✅ **Symbols are unique, collision-free property keys**
✅ **The iterator interface (`Symbol.iterator` + `next()`) enables `for...of`**
✅ **Custom iterables integrate with spread, destructuring, and loops**

---

**File:** `Curriculum/Week-5/Day2-Inheritance-Polymorphism.md`  
**Status:** Complete ✅  
**Last Updated:** March 2026

---

## 📋 Week 5 Progress

- [x] Day 1: OOP Fundamentals ✅
- [x] Day 2: Inheritance and Polymorphism ✅
- [ ] Day 3: File Operations (Experiment 23)
- [ ] Day 4: Type Checking (Experiment 24)
- [ ] Day 5: OOP Integration Project
