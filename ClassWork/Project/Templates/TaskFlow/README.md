# TaskFlow — Smart Task Manager

## Project Overview

Build a **smart task manager** where you can create tasks, assign them priorities and categories, mark them as complete, and track your productivity — all powered by JavaScript classes, DOM manipulation, and localStorage.

**Time estimate:** 2–3 hours

> **You only write JavaScript.** The HTML and CSS are provided. Open `index.html` in your browser after each phase to test your work.

---

## What You Will Learn

By completing this project you will practise every major concept from Weeks 1–6:

| Week | Concepts You'll Use |
|------|-------------------|
| W1 | `const`/`let`, template literals, `Math.random()`, ternary operator, `??`, `?.` |
| W2 | Arrow functions, `if/else`, `for` loops, scope, closures, default parameters |
| W3 | Array methods (`push`, `splice`, `find`, `filter`), objects, string methods (`toLowerCase`, `includes`, `trim`) |
| W4 | `map()`, `filter()`, `reduce()`, `sort()` with comparators, `Date` object, method chaining |
| W5 | `class`, `constructor`, `#` private fields, getters/setters, `extends`, `super`, method overriding, `instanceof`, `Map` |
| W6 | DOM (`querySelector`, `createElement`, `classList`), events (`addEventListener`, delegation, `preventDefault`), `localStorage` |

---

## Getting Started

1. Open the project folder in your code editor.
2. Open `index.html` in your browser — you'll see the styled UI with no functionality.
3. Open `app.js` — this is the **only file you'll edit**.
4. Follow the phases below, implementing all the TODOs in order.
5. Save and refresh the browser after each phase to test.

---

## Project Phases

### Phase 1 — Data Model (Classes & OOP)

Build the class structure that holds your task data.

**Files to implement:**
- `Task` class — represents a single task with private fields
- `Collection` class — a reusable base class for managing arrays of items
- `TaskManager` class — extends `Collection` with task-specific features

**What to test:** Create instances in the browser console:
```js
const task = new Task('Test', 'Description', 'Work', 'High', '2026-04-01');
console.log(task.title);        // "Test"
console.log(task.isOverdue);    // true or false
console.log(task.toJSON());     // plain object
```

### Phase 2 — App Controller Setup

Set up the `App` class with its constructor and `init()` method.

### Phase 3 — DOM & Events

Cache DOM elements and bind event listeners to the form, filter tabs, search input, sort dropdown, and task list.

**Key pattern — Event Delegation:**
Instead of adding a click listener to every delete button, add ONE listener to the task list container and use `e.target.closest()` to figure out which button was clicked.

### Phase 4 — Event Handlers

Implement the logic that runs when:
- The form is submitted → validate and add a task
- A filter tab is clicked → update the filter
- A task's complete button is clicked → toggle completion
- A task's delete button is clicked → remove the task

### Phase 5 — Rendering & Persistence

Render tasks to the DOM and persist them to localStorage.

**What to test:** Add tasks, refresh the page — they should still be there!

---

## File Structure

```
TaskFlow/
├── index.html    ← DO NOT MODIFY
├── style.css     ← DO NOT MODIFY
├── app.js        ← YOUR CODE GOES HERE
├── README.md     ← You are here
└── HINTS.md      ← Detailed hints if you get stuck
```

---

## Tips

1. **Work in order.** Each phase builds on the previous one.
2. **Test frequently.** Open the browser console (F12) to check for errors.
3. **Read the HINTS file** if you're stuck on any TODO for more than 5 minutes.
4. **Use `console.log()`** to debug — print variables to see their values.
5. **Don't modify HTML/CSS.** The class names and IDs are specifically designed to match your JavaScript.

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| Task class with private fields, getters, setters, validation | 15 |
| Collection base class with reusable methods | 10 |
| TaskManager extending Collection with overridden methods | 15 |
| Filtering, sorting, and searching tasks | 15 |
| Statistics using reduce() and Map | 10 |
| DOM rendering (creating task cards dynamically) | 15 |
| Event handling (form submit, delegation for complete/delete) | 10 |
| localStorage persistence (save and load) | 10 |
| **Total** | **100** |
