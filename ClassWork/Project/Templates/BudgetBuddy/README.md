# BudgetBuddy — Personal Finance Tracker

## Project Overview

Build a **personal finance tracker** where you can log income and expenses, see your balance update in real time, view category breakdowns and monthly summaries — all powered by JavaScript classes with inheritance and polymorphism.

**Time estimate:** 2–3 hours

> **You only write JavaScript.** The HTML and CSS are provided. Open `index.html` in your browser after each phase to test your work.

---

## What You Will Learn

By completing this project you will practise every major concept from Weeks 1–6:

| Week | Concepts You'll Use |
|------|-------------------|
| W1 | `const`/`let`, `parseFloat()`, `isNaN()`, `toFixed()`, template literals, arithmetic, ternary, `Math.abs()` |
| W2 | Arrow functions, `if/else`, `for` loops, scope, default parameters, validation logic |
| W3 | Arrays (`push`, `splice`, `filter`, `find`), objects (nested), strings (`trim`, `toLowerCase`), `Object.keys/values/entries` |
| W4 | `map()`, `filter()`, `reduce()`, `sort()`, Date object, `toLocaleDateString()`, method chaining, data pipelines |
| W5 | `class`, `constructor`, `#` private fields, getters/setters, `extends`, `super`, method overriding, polymorphism, `instanceof`, `static`, `Map` |
| W6 | DOM (`querySelector`, `createElement`, `classList`, `innerHTML`), events (`addEventListener`, delegation, `preventDefault`), `localStorage` |

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

Build the class hierarchy for financial transactions.

**Files to implement:**
- `Transaction` base class — shared fields and methods
- `Income` class — extends Transaction, overrides `formatAmount()` to show `+₹...`
- `Expense` class — extends Transaction, overrides `formatAmount()` to show `-₹...`
- `Budget` class — manages the transactions array

**Key OOP concepts in this phase:**
- **Inheritance:** `Income` and `Expense` extend `Transaction`
- **Polymorphism:** Both override `formatAmount()`, `getType()`, and `getSign()` — same method name, different behavior
- **Encapsulation:** Private `#` fields protect internal data

**What to test in console:**
```js
const inc = new Income('Salary', 50000, 'Salary', '2026-03-01');
const exp = new Expense('Groceries', 2500, 'Food', '2026-03-15');
console.log(inc.formatAmount());  // "+₹50000.00"
console.log(exp.formatAmount());  // "-₹2500.00"
console.log(inc instanceof Transaction);  // true
```

### Phase 2 — App Controller Setup

Set up the `App` class that connects everything together.

### Phase 3 — DOM & Events

Cache elements, populate the category dropdown dynamically, and bind events.

**Special feature:** The category dropdown changes when the user switches between Income and Expense types — showing appropriate categories for each.

### Phase 4 — Event Handlers

Implement form submission with validation, transaction deletion, and filter/sort changes.

### Phase 5 — Rendering & Dashboard

Render the transaction list, summary cards, category breakdown bars, and monthly summary.

**What to test:** Add a few income and expense transactions, then check:
- Balance updates correctly
- Category breakdown shows spending percentages as bars
- Monthly summary groups transactions by month

---

## File Structure

```
BudgetBuddy/
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
5. **Don't modify HTML/CSS.** The class names and IDs match your JavaScript.
6. **Pay attention to polymorphism.** The beauty of this project is that `formatAmount()` works differently for Income vs Expense, but the app code calls the same method on both.

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| Transaction base class with private fields, getters, setters, validation | 10 |
| Income and Expense classes with proper inheritance and method overriding | 15 |
| Polymorphism: formatAmount(), getType(), getSign() work correctly | 10 |
| Budget class: calculations using reduce() (balance, income, expenses) | 15 |
| Filtering by type, category; sorting with comparators | 10 |
| Category breakdown using reduce() + map() data pipeline | 10 |
| Monthly summary grouped by month | 5 |
| DOM rendering (transaction cards, summary, dashboard) | 10 |
| Event handling (form submit, delegation, type toggle) | 10 |
| localStorage persistence (save and load) | 5 |
| **Total** | **100** |
