# Self-Study: Modules and Code Organization

**Estimated Time:** 3-4 hours
**Prerequisites:** Weeks 1-5 complete, Functions (Week 3), Objects (Week 5)
**Goal:** Learn to split JavaScript code into reusable, maintainable modules using modern ES6 syntax

---

## Why Modules?

When you first started learning JavaScript, you wrote everything in a single file — variables, functions, classes, all together. For small programs (50-200 lines), this works fine. But as programs grow to thousands of lines, a single file becomes a nightmare:

- You can't find anything — scrolling through 2000+ lines searching for one function
- Variable names clash — accidentally reusing a name overwrites something important
- Testing is impossible — you can't test one part without loading everything
- Collaboration is painful — two people editing the same file causes constant merge conflicts

**Modules** solve all of these problems. A module is simply a JavaScript file that:
- **Exports** specific values (functions, variables, classes) for other files to use
- **Imports** values from other modules when it needs them
- Has its **own scope** — variables declared inside a module don't leak out to the global scope

**Key benefits:**

| Benefit | Explanation |
|---------|-------------|
| **Split** code into separate files | Each file handles one responsibility (users, products, validation, etc.) |
| **Reuse** code without copy-pasting | Write a utility function once, import it wherever you need it |
| **Encapsulate** | Variables inside a module are private by default — only exported values are accessible |
| **Maintain easily** | Small, focused files are easier to find, fix, and update |
| **Collaborate** | Team members work on different modules without stepping on each other's toes |

**Analogy:** A module is like a chapter in a textbook. Each chapter covers one topic (arrays, functions, DOM, etc.) and can reference other chapters. You can read chapters independently, and the book stays organized because each topic has its own space.

---

## 1. Before Modules: The Global Scope Problem

To really appreciate modules, let's understand the problem they solved. Without modules, when you include multiple `<script>` tags in HTML, all of them share the **global scope**:

```html
<script src="file1.js"></script>
<script src="file2.js"></script>
```

```javascript
// file1.js — defines some useful things
let count = 10;
function calculate() { return count * 2; }
```

```javascript
// file2.js — accidentally destroys file1's work!
let count = 0;  // Overwrites file1's count!
function calculate() { return count + 5; }  // Overwrites file1's function!
```

Now `file1.js`'s `calculate()` function is gone — replaced by `file2.js`'s version. In a large project with 20+ script files, this kind of accidental overwriting happens constantly and causes bugs that are extremely hard to track down.

**Additional problems without modules:**
- **Loading order matters:** If file2 uses something from file1, you MUST load file1 first. Managing these dependencies manually is error-prone.
- **No privacy:** Every variable and function is globally accessible. Any file can read or modify anything from any other file.
- **No clear dependencies:** Looking at a file, you can't tell what other files it depends on.

Modules solve ALL of these problems by giving each file its **own isolated scope** and making dependencies **explicit** through import/export statements.

---

## 2. ES6 Modules (The Modern Standard)

ES6 (released in 2015) introduced a built-in module system for JavaScript. This is now the standard way to organize JavaScript code in browsers and modern Node.js.

### Setting Up Modules in HTML

To use ES6 modules in a browser, add `type="module"` to your script tag:

```html
<!-- Regular script — shares global scope, no import/export -->
<script src="old-style.js"></script>

<!-- Module script — has its own scope, supports import/export -->
<script type="module" src="main.js"></script>
```

**Key differences when using `type="module"`:**
1. Each file has its **own scope** — variables don't leak to `window`
2. The file can use `import` and `export` statements
3. The script is automatically loaded with `defer` (runs after the HTML is parsed)
4. **Strict mode** is enabled automatically (no need for `"use strict"`)

> **Important:** Modules require a web server (even a local one). They don't work when opening HTML files directly with `file://` URLs. This is a security restriction called CORS (Cross-Origin Resource Sharing). **Solution:** Use a local server like VS Code's "Live Server" extension (install it, right-click your HTML file, choose "Open with Live Server").

### Named Exports and Imports

A module can **export** specific values — functions, variables, constants, classes — for other modules to use. Anything NOT exported stays private to the module.

```javascript
// ================================
// math.js — a module that exports math utilities
// ================================

// Export individual items by putting 'export' before them
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// This function is NOT exported — it's private to this module
// No other file can access it, even if they import from math.js
function internalHelper() {
    return "I'm a private implementation detail";
}
```

```javascript
// ================================
// main.js — imports values from math.js
// ================================

// Use curly braces {} to import specific named exports
// The path MUST start with ./ or ../ for relative imports
// The .js extension is REQUIRED in browsers
import { PI, add, multiply } from "./math.js";

console.log(PI);              // 3.14159
console.log(add(2, 3));       // 5
console.log(multiply(4, 5));  // 20

// This would cause an error — internalHelper was not exported:
// import { internalHelper } from "./math.js";  // Error!
```

**How imports and exports work under the hood:**
1. When your script says `import { add } from "./math.js"`, the browser fetches `math.js`
2. The browser executes `math.js` and collects all the `export`ed values
3. Only the values you named in the `import {}` are made available in your file
4. Non-exported values remain completely inaccessible — enforced by the JavaScript engine

### Export at the Bottom (Alternative Style)

Instead of putting `export` before every item, you can define everything normally and export at the end:

```javascript
// utils.js — alternative export style
const TAX_RATE = 0.18;

function formatCurrency(amount) {
    return "\u20B9" + amount.toFixed(2);
}

function calculateTax(amount) {
    return amount * TAX_RATE;
}

function formatWithTax(amount) {
    const tax = calculateTax(amount);
    return formatCurrency(amount + tax);
}

// Export everything at once at the bottom
export { TAX_RATE, formatCurrency, calculateTax, formatWithTax };
```

Both styles are valid. Some developers prefer the bottom-export style because you can see all exports in one place. Others prefer the inline `export` keyword because it's immediately clear which items are public.

### Renaming Imports

If two modules export something with the same name, you can rename on import using `as`:

```javascript
// Both modules export a function called 'add'
import { add as mathAdd } from "./math.js";
import { add as stringAdd } from "./stringUtils.js";

console.log(mathAdd(2, 3));              // 5
console.log(stringAdd("Hello", " World")); // "Hello World"
```

You can also rename on export:

```javascript
// math.js
function addNumbers(a, b) { return a + b; }
export { addNumbers as add };

// Other files import it as 'add', not 'addNumbers'
```

---

### Default Exports

Each module can have **one** default export — this is meant to be the "main thing" the module provides. It's typically used when a module's primary purpose is to provide a single class, function, or object:

```javascript
// ================================
// User.js — default export (one per file)
// ================================

// 'export default' marks this as the module's main export
export default class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    greet() {
        return "Hello, I'm " + this.name;
    }
}
```

```javascript
// ================================
// main.js — importing a default export
// ================================

// No curly braces {} needed for default imports!
// You can name it anything you want (doesn't have to match the class name)
import User from "./User.js";
// import MyUser from "./User.js";  // This works too!

const alice = new User("Alice", "alice@example.com");
console.log(alice.greet());  // "Hello, I'm Alice"
```

**Named vs Default exports — when to use which:**

| Scenario | Use | Example |
|----------|-----|---------|
| Module exports a single class or component | **Default** export | `export default class User {}` |
| Module exports multiple utilities | **Named** exports | `export function add()`, `export function multiply()` |
| Module's primary purpose is one thing | **Default** export | A React component file |
| Module is a collection of related tools | **Named** exports | Validation functions, math utilities |

### Mixing Default and Named Exports

A module can have both a default export and named exports:

```javascript
// api.js — default + named exports
export default function fetchData(url) {
    return fetch(url).then(function(r) { return r.json(); });
}

export const API_BASE = "https://api.example.com";
export const TIMEOUT = 5000;
```

```javascript
// main.js — importing both
import fetchData, { API_BASE, TIMEOUT } from "./api.js";
// Default import comes first (no braces), then named imports (with braces)
```

### Import Everything (Namespace Import)

If you want ALL exports from a module collected into a single object:

```javascript
// Import all named exports as a namespace object
import * as MathUtils from "./math.js";

console.log(MathUtils.PI);           // 3.14159
console.log(MathUtils.add(2, 3));    // 5
console.log(MathUtils.multiply(4, 5)); // 20
```

This is useful when a module has many exports and you want to keep them organized under one name, or when names might conflict with other imports.

---

## 3. Module Scope and Behavior

### Each Module Runs Only Once

No matter how many files import a module, the module's code executes **only once**. All importers share the same instance:

```javascript
// counter.js
console.log("counter.js loaded");  // This logs ONLY ONCE, ever
let count = 0;
export function increment() { return ++count; }
export function getCount() { return count; }
```

```javascript
// a.js
import { increment } from "./counter.js";
increment();  // count becomes 1
```

```javascript
// b.js
import { getCount } from "./counter.js";
console.log(getCount());  // 1 (not 0! — same counter instance as a.js)
```

**Why this matters:** It means modules can hold **shared state**. If module A increments a counter in `counter.js`, module B sees the updated value. This is intentional and useful for things like configuration, shared caches, or singleton patterns.

### Strict Mode by Default

Modules automatically run in **strict mode**. You don't need to add `"use strict"` — it's always on. This means:

```javascript
// In a module:
x = 10;  // ReferenceError! Variable must be declared with let/const/var

// This is good — strict mode catches common mistakes:
// - Accidental globals (forgetting let/const)
// - Deleting undeclable properties
// - Duplicate parameter names
// - Using reserved words as variable names
```

### Top-Level `this` is `undefined`

In regular scripts, `this` at the top level refers to the `window` object. In modules, it's `undefined`:

```javascript
// In a regular <script>:
console.log(this);  // Window object

// In a <script type="module">:
console.log(this);  // undefined
```

This is rarely an issue in practice, but it's good to know if you ever see unexpected `undefined` errors in module code.

### Modules are Always Deferred

Module scripts are automatically deferred — they don't block HTML parsing and they execute after the DOM is fully built. This means you don't need `DOMContentLoaded` in modules:

```html
<!-- Regular script: may run before HTML is fully parsed -->
<script src="regular.js"></script>

<!-- Module script: automatically waits for HTML parsing to finish -->
<script type="module" src="main.js"></script>
```

---

## 4. Project Structure Best Practices

How you organize your files matters as much as the code inside them. Here are common structures for different project sizes.

### Flat Structure (Small Projects — up to ~10 files)

For small projects with a handful of files, keep everything in the root:

```
my-project/
├── index.html
├── main.js           ← Entry point (this is what index.html loads)
├── utils.js          ← Helper functions
├── User.js           ← User class
└── styles.css
```

### Feature-Based Structure (Medium Projects — 10-50 files)

Group files by **what they do** (feature/responsibility):

```
my-project/
├── index.html
├── main.js                 ← Entry point, wires everything together
├── components/             ← UI components
│   ├── TodoItem.js
│   ├── TodoList.js
│   └── Header.js
├── services/               ← Data access (API calls, storage)
│   ├── api.js
│   └── storage.js
├── utils/                  ← Pure utility functions
│   ├── validation.js
│   ├── formatting.js
│   └── helpers.js
├── models/                 ← Data models (classes)
│   ├── User.js
│   └── Todo.js
└── styles/
    └── main.css
```

**Why this structure?**
- `components/` — UI building blocks (creating and updating DOM elements)
- `services/` — handles external communication (API calls, localStorage)
- `utils/` — pure helper functions with no side effects (validation, formatting)
- `models/` — data structures/classes (User, Todo, Product)

When you need to fix a bug in "how users are validated," you know to look in `utils/validation.js`. When the API endpoint changes, you go to `services/api.js`. This predictability is the whole point.

### Naming Conventions

| Type | Convention | Example | Reason |
|------|-----------|---------|--------|
| **Files with a default class** | PascalCase | `User.js`, `TodoList.js` | Matches the class name inside |
| **Utility/helper files** | camelCase | `utils.js`, `formatting.js` | Not a class, just functions |
| **Config files** | camelCase | `config.js`, `constants.js` | Configuration, not classes |
| **Index/barrel files** | lowercase | `index.js` | Standard convention |

---

## 5. Common Patterns

### Constants Module

Centralize all your app's configuration and magic values in one file:

```javascript
// constants.js
export const APP_NAME = "My App";
export const VERSION = "1.0.0";
export const MAX_ITEMS = 100;
export const API_URL = "https://api.example.com";

export const COLORS = {
    primary: "#3498db",
    secondary: "#2ecc71",
    danger: "#e74c3c",
    warning: "#f39c12"
};

export const ERROR_MESSAGES = {
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    tooShort: "Must be at least 8 characters",
    networkError: "Unable to connect. Please check your internet."
};
```

```javascript
// main.js
import { APP_NAME, API_URL, ERROR_MESSAGES } from "./constants.js";

document.title = APP_NAME;
console.log("API:", API_URL);

// Now if the API URL changes, you update it in ONE place
```

**Why this is useful:** Constants used in multiple files should be defined once. Otherwise, you end up with the same URL hardcoded in 10 different files, and changing it means finding and updating all 10.

### Utility Module

A collection of pure helper functions — they take input, produce output, and don't modify anything external:

```javascript
// utils/validation.js
export function isEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

export function isEmpty(str) {
    return str === null || str === undefined || str.trim() === "";
}

export function isInRange(num, min, max) {
    return num >= min && num <= max;
}

export function isStrongPassword(password) {
    // At least 8 chars, one uppercase, one number, one special char
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[^A-Za-z0-9]/.test(password)) return false;
    return true;
}
```

```javascript
// In a registration form handler:
import { isEmail, isEmpty, isStrongPassword } from "./utils/validation.js";

function validateForm(email, password) {
    if (isEmpty(email)) return "Email is required";
    if (!isEmail(email)) return "Invalid email format";
    if (isEmpty(password)) return "Password is required";
    if (!isStrongPassword(password)) return "Password is too weak";
    return null;  // null means no error
}
```

### Service Module (API Layer)

Centralizes all communication with a server. If the API changes, you only update this one file:

```javascript
// services/api.js
const BASE_URL = "https://jsonplaceholder.typicode.com";

async function handleResponse(response) {
    if (!response.ok) {
        throw new Error("API error: " + response.status);
    }
    return response.json();
}

export async function getUsers() {
    const response = await fetch(BASE_URL + "/users");
    return handleResponse(response);
}

export async function getUserById(id) {
    const response = await fetch(BASE_URL + "/users/" + id);
    return handleResponse(response);
}

export async function createUser(userData) {
    const response = await fetch(BASE_URL + "/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return handleResponse(response);
}

export async function deleteUser(id) {
    const response = await fetch(BASE_URL + "/users/" + id, {
        method: "DELETE"
    });
    return handleResponse(response);
}
```

```javascript
// main.js — clean and focused
import { getUsers, createUser } from "./services/api.js";

const users = await getUsers();
console.log("Found " + users.length + " users");

const newUser = await createUser({ name: "Bob", email: "bob@test.com" });
console.log("Created user:", newUser.id);
```

**Notice:** `main.js` doesn't need to know the API URL, the headers, or the error handling logic. It just calls `getUsers()` and gets data. This separation makes the code much easier to maintain.

### Barrel Exports (Re-exporting)

When you have many modules in a folder, an `index.js` "barrel file" can re-export them all, making imports cleaner:

```javascript
// models/User.js
export default class User { /* ... */ }

// models/Todo.js
export default class Todo { /* ... */ }

// models/Product.js
export default class Product { /* ... */ }
```

```javascript
// models/index.js — the "barrel" file
export { default as User } from "./User.js";
export { default as Todo } from "./Todo.js";
export { default as Product } from "./Product.js";
```

```javascript
// main.js — one clean import instead of three
import { User, Todo, Product } from "./models/index.js";

// Without the barrel file, you'd need:
// import User from "./models/User.js";
// import Todo from "./models/Todo.js";
// import Product from "./models/Product.js";
```

---

## 6. Practical Example: Modular Todo App

Let's build a complete modular application to see how all the pieces fit together.

### Project Structure

```
todo-app/
├── index.html
├── main.js              ← Entry point: wires UI + data + storage
├── models/
│   └── Todo.js          ← Todo class (data model)
├── services/
│   └── storage.js       ← localStorage operations
├── utils/
│   └── dom.js           ← DOM helper functions
└── styles.css
```

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Modular Todo App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: 40px auto;
            padding: 0 20px;
        }
        .input-row { display: flex; gap: 10px; margin-bottom: 20px; }
        .input-row input {
            flex: 1; padding: 10px; font-size: 16px;
            border: 1px solid #ddd; border-radius: 4px;
        }
        .input-row button {
            padding: 10px 20px; background: #3498db; color: white;
            border: none; border-radius: 4px; cursor: pointer; font-size: 16px;
        }
        #todo-list { list-style: none; padding: 0; }
        .todo-item {
            display: flex; align-items: center; padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .todo-item span { flex: 1; }
        .todo-item.done span { text-decoration: line-through; color: #999; }
        .todo-item button {
            margin-left: 5px; padding: 5px 10px;
            border: none; border-radius: 4px; cursor: pointer;
        }
        .done-btn { background: #2ecc71; color: white; }
        .del-btn { background: #e74c3c; color: white; }
        .stats { color: #666; margin-top: 10px; font-size: 14px; }
    </style>
</head>
<body>
    <h1>Modular Todo App</h1>
    <div class="input-row">
        <input type="text" id="todo-input" placeholder="What needs to be done?">
        <button id="add-btn">Add</button>
    </div>
    <ul id="todo-list"></ul>
    <div class="stats" id="stats"></div>

    <!-- type="module" enables import/export -->
    <script type="module" src="main.js"></script>
</body>
</html>
```

### models/Todo.js

This module's single responsibility is representing a todo item as data:

```javascript
// This variable is private to this module — not exported
let nextId = 1;

export default class Todo {
    constructor(text) {
        this.id = nextId++;         // Auto-incrementing ID
        this.text = text;           // The task description
        this.completed = false;     // Whether the task is done
        this.createdAt = new Date(); // When it was created
    }

    toggle() {
        this.completed = !this.completed;
    }

    toString() {
        const status = this.completed ? "Done" : "Pending";
        return "[" + status + "] " + this.text;
    }
}
```

**Why this is its own module:** The Todo class defines what a todo IS. If you ever need to add new properties (like priority, due date, or category), you change just this one file. No other file needs to know the internal structure.

### services/storage.js

This module handles all localStorage operations. If you switch from localStorage to a database later, only this file changes:

```javascript
// Private constant — not exported
const STORAGE_KEY = "modular_todos";

export function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadTodos() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to load todos:", error);
        return [];
    }
}

export function clearTodos() {
    localStorage.removeItem(STORAGE_KEY);
}
```

### utils/dom.js

Reusable DOM helper functions. These make creating elements less verbose:

```javascript
// Create an element with attributes and text content in one call
export function createElement(tag, attributes, textContent) {
    if (attributes === undefined) attributes = {};
    if (textContent === undefined) textContent = "";

    const element = document.createElement(tag);

    for (const key of Object.keys(attributes)) {
        if (key === "classList") {
            // Special handling for classList: expects an array of class names
            attributes[key].forEach(function(cls) {
                element.classList.add(cls);
            });
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }

    if (textContent) {
        element.textContent = textContent;
    }

    return element;
}

// Shorthand for querySelector
export function $(selector) {
    return document.querySelector(selector);
}
```

### main.js — The Entry Point

This is where everything comes together. It imports from all other modules and wires up the UI:

```javascript
// Import what we need from each module
import Todo from "./models/Todo.js";
import { saveTodos, loadTodos } from "./services/storage.js";
import { createElement, $ } from "./utils/dom.js";

// Load existing todos from storage
let todos = loadTodos();

function updateStats() {
    const total = todos.length;
    const done = todos.filter(function(t) { return t.completed; }).length;
    $("#stats").textContent = done + " of " + total + " tasks completed";
}

function render() {
    const list = $("#todo-list");
    list.innerHTML = "";

    todos.forEach(function(todo) {
        const li = createElement("li",
            { classList: todo.completed ? ["todo-item", "done"] : ["todo-item"] }
        );

        const span = createElement("span", {}, todo.text);

        const doneBtn = createElement("button",
            { classList: ["done-btn"] },
            todo.completed ? "Undo" : "Done"
        );
        doneBtn.addEventListener("click", function() {
            todo.completed = !todo.completed;
            saveTodos(todos);
            render();
        });

        const deleteBtn = createElement("button", { classList: ["del-btn"] }, "Delete");
        deleteBtn.addEventListener("click", function() {
            todos = todos.filter(function(t) { return t.id !== todo.id; });
            saveTodos(todos);
            render();
        });

        li.appendChild(span);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });

    updateStats();
}

// Add new todo
$("#add-btn").addEventListener("click", function() {
    const input = $("#todo-input");
    const text = input.value.trim();

    if (text) {
        const newTodo = new Todo(text);
        todos.push(newTodo);
        saveTodos(todos);
        render();
        input.value = "";
        input.focus();
    }
});

// Add on Enter key
$("#todo-input").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        $("#add-btn").click();
    }
});

// Initial render of saved todos
render();
```

**Notice how each file has ONE job:**
- `Todo.js` — knows what a todo IS (data model)
- `storage.js` — knows how to SAVE and LOAD data
- `dom.js` — knows how to CREATE elements efficiently
- `main.js` — ORCHESTRATES everything: connects UI events to data operations

If you need to change how todos are stored (say, switch to a server API), you modify ONLY `storage.js`. If you need to add a "priority" field, you modify ONLY `Todo.js` and the rendering in `main.js`. Each change is isolated.

---

## 7. Node.js Modules: CommonJS

While ES6 modules (`import`/`export`) are the standard, you'll encounter **CommonJS** modules in Node.js codebases and older projects. It's important to recognize both syntaxes:

```javascript
// ================================
// CommonJS (Node.js traditional style)
// ================================

// Exporting in CommonJS — uses module.exports
module.exports = { add, multiply };
// or export individual items:
module.exports.add = function(a, b) { return a + b; };

// Importing in CommonJS — uses require()
const { add, multiply } = require("./math");
// Note: no .js extension needed with require()
```

```javascript
// ================================
// ES Modules (Modern, preferred)
// ================================

// Exporting — uses export keyword
export function add(a, b) { return a + b; }

// Importing — uses import keyword
import { add } from "./math.js";
// Note: .js extension IS needed with ES module imports in browsers
```

**Side-by-side comparison:**

| Feature | CommonJS (`require`) | ES Modules (`import`) |
|---------|---------------------|----------------------|
| Syntax | `require("./file")` | `import from "./file.js"` |
| Loading | **Synchronous** (blocking) | **Asynchronous** (non-blocking) |
| When evaluated | At runtime (dynamic) | Before execution (static) |
| Default in | Node.js (traditional) | Browsers, modern Node.js |
| Tree shaking | Not possible | Possible (bundlers can remove unused exports) |

> **Modern Node.js** (v14+) supports ES modules too. To use them, either use the `.mjs` file extension or add `"type": "module"` to your `package.json`. Going forward, ES modules are the recommended approach.

---

## 8. Common Mistakes

### Mistake 1: Forgetting the File Extension

```javascript
// In browsers, the .js extension is REQUIRED
import { add } from "./math";     // Error in browsers!
import { add } from "./math.js";  // Correct

// In Node.js with CommonJS, the extension is optional:
const { add } = require("./math");  // Works fine
```

### Mistake 2: Circular Dependencies

Two modules importing from each other can cause issues:

```javascript
// a.js imports from b.js
import { bFunction } from "./b.js";
export function aFunction() { return bFunction(); }

// b.js imports from a.js — circular!
import { aFunction } from "./a.js";
export function bFunction() { return aFunction(); }
// This can cause one of them to be undefined at import time
```

**Fix:** Refactor shared code into a third module that both can import from:

```javascript
// shared.js — contains the shared logic
export function sharedFunction() { /* ... */ }

// a.js
import { sharedFunction } from "./shared.js";

// b.js
import { sharedFunction } from "./shared.js";
```

### Mistake 3: Importing Without Using type="module"

```html
<!-- This will error if main.js uses import/export -->
<script src="main.js"></script>

<!-- This is correct -->
<script type="module" src="main.js"></script>
```

---

## Quick Reference

| Syntax | Purpose | Example |
|--------|---------|---------|
| `export` | Make available to other modules | `export const PI = 3.14;` |
| `export default` | The main export (one per module) | `export default class User {}` |
| `import { x }` | Import named exports | `import { add } from "./math.js";` |
| `import X` | Import default export | `import User from "./User.js";` |
| `import * as M` | Import all as namespace | `import * as M from "./math.js";` |
| `import { x as y }` | Rename an import | `import { add as sum } from "./math.js";` |
| `export { x } from` | Re-export from another module | `export { User } from "./User.js";` |

---

## Practice Challenges

1. **Calculator Module:** Create a `calculator.js` module with add, subtract, multiply, divide functions. Import and use them in `main.js`. Handle division by zero.
2. **Student Manager:** Create separate modules for a `Student` class, a `storage` service (save/load students to localStorage), and `validation` utilities (check name, email, grade). Wire them together in `main.js` to build a student registration form.
3. **Recipe Book:** Build a modular app with:
   - `models/Recipe.js` — Recipe class with name, ingredients, instructions
   - `services/storage.js` — localStorage operations
   - `utils/search.js` — search/filter functions
   - `main.js` — UI that lets you add recipes, search, and display them
4. **Refactor Existing Code:** Take any of the larger single-file projects from earlier weeks and split it into modules. This is excellent practice for understanding code organization.

---

## Further Reading

- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JavaScript.info: Modules](https://javascript.info/modules)
- [Eloquent JavaScript: Chapter 10 — Modules](https://eloquentjavascript.net/10_modules.html)
- [Node.js: ECMAScript Modules](https://nodejs.org/api/esm.html)

---

*Self-Study Document 5 of 5 — BCA IV Semester Client Side Scripting*
