# BCA IV Semester — JavaScript Mini-Project Ideas

> **Goal:** Students pick ONE project and build it in **2–4 hours**.
> HTML & CSS templates are provided; students write **only the JavaScript**.
> Each project exercises concepts from **all 6 weeks** of the curriculum.

---

## How to Read This Document

For every project idea below you will find:

| Section | What it tells you |
|---------|-------------------|
| **Elevator Pitch** | One-line description a student can immediately picture |
| **What the Student Sees** | The pre-built UI (HTML/CSS) they receive |
| **What the Student Codes** | The JavaScript functionality they must implement |
| **Curriculum Coverage** | Exactly which weekly topics are exercised |
| **Stretch Goals** | Optional enhancements for faster students |

---

## Project 1 — TaskFlow: Smart Task Manager

### Elevator Pitch

A full-featured task manager where students create, categorize, filter, sort, and persist tasks — experiencing OOP, DOM manipulation, and `localStorage` in one cohesive app.

### What the Student Sees (Provided Template)

- A clean dashboard with an **input form** (task title, description, category dropdown, priority radio buttons, due-date picker).
- A **task list area** with filter tabs (All / Work / Personal / Study) and a sort dropdown (by date, priority, title).
- A **statistics bar** showing total tasks, completed count, and overdue count.
- Fully styled with CSS (cards, badges, responsive layout). All HTML IDs/classes and CSS are ready.

### What the Student Codes (JavaScript Only)

| Feature | Concepts Used |
|---------|---------------|
| `Task` class with `#id`, title, description, category, priority, dueDate, completed status | **Classes, constructor, private fields (`#`), getters/setters, encapsulation** (W5) |
| `TaskManager` class that holds a `tasks` array, with methods: `addTask()`, `deleteTask()`, `toggleComplete()`, `getFilteredTasks()`, `getSortedTasks()`, `getStatistics()` | **Inheritance (extends a base `Collection` class), method overriding, polymorphism** (W5) |
| Read form values on submit, create `Task` instances, render to DOM | **DOM manipulation, event handling, `preventDefault()`** (W6 self-study) |
| Filter tasks by category using `filter()` | **Higher-order functions, `filter()`** (W4) |
| Sort tasks by date/priority/title using `sort()` with custom comparators | **`sort()` with comparators** (W4) |
| Compute statistics (total, completed %, overdue) using `reduce()` | **`reduce()`, data pipelines** (W4) |
| Format due dates, detect overdue with `Date` comparisons | **Date object, `getFullYear()`, date arithmetic** (W4) |
| Save/load tasks to `localStorage` with `JSON.stringify/parse` | **Web APIs — localStorage** (W6 self-study) |
| Validate inputs (empty title, past due-date) with descriptive error messages | **Conditionals, string methods, type checking** (W1–W2) |
| Generate unique IDs using `Date.now()` + `Math.random()` | **Math methods, template literals** (W1) |
| Search tasks by title (case-insensitive substring match) | **String methods: `toLowerCase()`, `includes()`** (W3) |
| Delete task with confirmation | **Event delegation, DOM removal** (W6 self-study) |

### Curriculum Coverage Map

| Week | Topics Exercised |
|------|-----------------|
| **W1** | Variables (const/let), data types, arithmetic operators, type coercion, template literals, `Math.random()`, `Math.floor()`, ternary operator, `??`, `?.` |
| **W2** | Functions (declarations, arrow), `if/else`, loops (`for`, `for...of`), scope, default parameters |
| **W3** | Arrays (`push`, `splice`, `indexOf`, `includes`), objects (dot/bracket notation, iteration), string methods (`toLowerCase`, `includes`, `trim`, `slice`) |
| **W4** | `map()`, `filter()`, `reduce()`, `sort()` with comparators, `Date` object, `setInterval`, method chaining |
| **W5** | `class`, `constructor`, private `#` fields, `static` methods, getters/setters, `extends`, `super`, method overriding, polymorphism, `instanceof`, `Symbol.iterator` (iterate tasks), Map (category→task count) |
| **W6** | DOM (`querySelector`, `createElement`, `classList`, `textContent`), events (`addEventListener`, `submit`, `click`, delegation, `preventDefault`), `localStorage` (`setItem`, `getItem`, `JSON.stringify/parse`) |

### Stretch Goals

- Add a **countdown timer** per task showing time remaining (uses `setInterval`).
- Make the task list **sortable by drag-and-drop** (advanced DOM events).
- Add **subtask support** (nested objects/arrays inside `Task`).

---

## Project 2 — QuizCraft: Interactive Quiz Engine

### Elevator Pitch

An interactive, timed quiz application where students build a question engine with scoring, timers, progress tracking, and a results dashboard — using class hierarchies to model different question types.

### What the Student Sees (Provided Template)

- A **start screen** with quiz title, number of questions, difficulty, and a "Start Quiz" button.
- A **question screen** with question text, answer area (changes based on question type), a countdown timer, progress bar, and Next/Previous buttons.
- A **results screen** with score, time taken, per-question breakdown, and a "Retry" button.
- All styled with CSS animations for transitions, timer urgency colors, progress bar fill.

### What the Student Codes (JavaScript Only)

| Feature | Concepts Used |
|---------|---------------|
| Base `Question` class with `#text`, `#points`, `#timeLimit`; derived classes: `MultipleChoiceQuestion`, `TrueFalseQuestion`, `FillInBlankQuestion` | **Classes, private fields, inheritance (`extends`/`super`), polymorphism** (W5) |
| Each question type overrides `checkAnswer()` and `render()` — same interface, different behavior | **Method overriding, polymorphism, abstract-class pattern** (W5) |
| `Quiz` class managing an array of mixed question objects, tracking current index, score, answers | **Arrays, `forEach`, `map`, object references** (W3–W4) |
| Timer per question using `setInterval` / `clearInterval`; auto-advance on timeout | **`setInterval`, `clearInterval`, `Date.now()`** (W4) |
| Overall quiz timer showing elapsed time | **Date arithmetic, `padStart()` formatting** (W1, W4) |
| Render questions dynamically to the DOM based on type | **DOM manipulation, `createElement`, `innerHTML`, `classList`** (W6 self-study) |
| Handle answer selection via click/input events | **Event handling, `addEventListener`, event delegation** (W6 self-study) |
| Calculate results: total score, percentage, per-category breakdown using `reduce()` and `filter()` | **`reduce()`, `filter()`, `map()`, method chaining** (W4) |
| Validate fill-in-blank answers with `trim()`, case-insensitive comparison | **String methods: `trim()`, `toLowerCase()`, strict equality** (W3) |
| Shuffle questions and answer options using Fisher-Yates (involving `Math.random`, `Math.floor`, array destructuring for swap) | **Math methods, arrays, destructuring** (W1, W3) |
| Save high scores to `localStorage`; display leaderboard sorted by score | **`localStorage`, `JSON.stringify/parse`, `sort()` with comparators** (W4, W6 self-study) |
| Display a results chart using DOM-generated bar widths | **Template literals, style manipulation, `map()`** (W1, W6) |
| Use `instanceof` to determine question type for rendering | **`instanceof` operator** (W5) |

### Curriculum Coverage Map

| Week | Topics Exercised |
|------|-----------------|
| **W1** | Variables, data types, arithmetic (`%` for score), template literals, `Math.random()`, `Math.floor()`, ternary operator, `??` for missing answers |
| **W2** | Functions (arrow, declarations), `if/else/else if` chains, `for` loops, `while` loop (timer), `break`/`continue`, scope, closures (timer callback) |
| **W3** | Arrays (`push`, `splice`, `length`), objects, string methods (`trim`, `toLowerCase`, `includes`, `split`), `forEach`, nested objects (question data) |
| **W4** | `map()`, `filter()`, `reduce()`, `sort()`, `find()`, Date object, `setInterval`/`clearInterval`, method chaining, data pipelines |
| **W5** | `class`, `constructor`, `#` private fields, `extends`, `super`, method overriding, polymorphism, abstract-class pattern, `instanceof`, getters/setters, `static` methods, `Map` (category→score tracking) |
| **W6** | DOM (`querySelector`, `createElement`, `classList.toggle`, `textContent`, `style`), events (`click`, `input`, `submit`, `keydown`), `localStorage`, `preventDefault()` |

### Stretch Goals

- Add **keyboard navigation** (press 1/2/3/4 to select answers, Enter to submit).
- Load questions from a **JSON file using `fetch()`** (async/await).
- Add **difficulty levels** that adjust timer duration and point values.

---

## Project 3 — BudgetBuddy: Personal Finance Tracker

### Elevator Pitch

A personal finance tracker where students log income and expenses, categorize transactions, visualize spending with CSS-driven charts, and get monthly summaries — all powered by OOP and functional array processing.

### What the Student Sees (Provided Template)

- A **header** showing current balance, total income (green), and total expenses (red).
- An **"Add Transaction" form** with fields: description, amount, type (income/expense), category dropdown, date picker.
- A **transaction history list** with each entry showing description, amount, category badge, date, and a delete button.
- A **dashboard section** with a category-wise spending breakdown (horizontal CSS bars) and a monthly summary area.
- Fully responsive CSS with color-coded income (green) and expense (red) styling.

### What the Student Codes (JavaScript Only)

| Feature | Concepts Used |
|---------|---------------|
| Base `Transaction` class with `#id`, `#description`, `#amount`, `#date`, `#category`; derived `Income` and `Expense` classes that add tax/deduction logic | **Classes, private `#` fields, `extends`, `super`, method overriding** (W5) |
| `Budget` class with a `transactions` array; methods: `addTransaction()`, `removeTransaction()`, `getBalance()`, `getIncome()`, `getExpenses()`, `getByCategory()`, `getByDateRange()`, `getMonthlySummary()` | **Encapsulation, static methods, getters** (W5) |
| Polymorphic `formatDisplay()` — income shows "+₹500" in green, expense shows "−₹300" in red | **Polymorphism, template literals** (W5, W1) |
| Compute balance, income total, expense total using `reduce()` | **`reduce()`, `filter()`, method chaining** (W4) |
| Group expenses by category using `reduce()` to build `{ Food: 2500, Transport: 1200, … }` | **`reduce()` to build objects, `Object.entries()`** (W4, W3) |
| Sort transactions by date or amount | **`sort()` with custom comparators, Date comparison** (W4) |
| Filter transactions by category, date range, income/expense type | **`filter()` with multiple conditions, logical operators** (W2, W4) |
| Render transactions to DOM, update summary bar dynamically | **DOM manipulation, `createElement`, `textContent`, `classList`** (W6 self-study) |
| Handle form submission, delete button clicks | **Event handling, `addEventListener`, `preventDefault()`, event delegation** (W6 self-study) |
| Persist all transactions to `localStorage`; load on page refresh | **`localStorage`, `JSON.stringify/parse`, error handling** (W6 self-study) |
| Format currency amounts (₹1,234.56) using `toLocaleString()` or manual string formatting | **Number methods, `toFixed()`, string methods** (W1, W3) |
| Format dates for display using `toLocaleDateString()` | **Date methods, locale formatting** (W4) |
| Validate inputs: no empty description, amount must be positive number, etc. | **Conditionals, `isNaN()`, type coercion checks, `parseFloat()`** (W1–W2) |
| Generate spending percentage bars (width via inline style = category% of total) | **`map()`, arithmetic, DOM style manipulation** (W4, W6) |
| Monthly summary — group by `getMonth()` + `getFullYear()` | **Date methods, `reduce()`, nested data structures** (W3–W4) |

### Curriculum Coverage Map

| Week | Topics Exercised |
|------|-----------------|
| **W1** | `const`/`let`, numbers, `toFixed()`, `parseFloat()`, `isNaN()`, arithmetic, template literals, ternary operator, `Math.abs()` |
| **W2** | Arrow functions, `if/else`, validation logic, `for` loops, scope, default parameters, `break` |
| **W3** | Arrays (`push`, `splice`, `filter`, `find`), objects (nested), strings (`trim`, `toLowerCase`, `includes`, `split`), `Object.keys/values/entries` |
| **W4** | `map()`, `filter()`, `reduce()`, `sort()`, Date object (create, compare, format, `getMonth`), method chaining, data pipelines |
| **W5** | `class`, `constructor`, `#` fields, `extends`, `super`, inheritance, method overriding, polymorphism, `instanceof`, getters/setters, `static` utility methods, `Map` (category→total) |
| **W6** | DOM (`querySelector`, `createElement`, `insertAdjacentHTML`, `remove`, `classList`), events (`submit`, `click`, delegation), `localStorage` |

### Stretch Goals

- Add a **recurring transaction** feature (uses `setInterval` to auto-add monthly entries).
- Add **export to CSV** (string building with `map()` and `join()`).
- Implement **undo/redo** using an action history stack (array as stack with `push`/`pop`).

---

## Project 4 — BookVault: Digital Library Manager

### Elevator Pitch

A digital library system where students manage a collection of books — adding, searching, categorizing, tracking reading progress, and rating books — using a rich class hierarchy that makes inheritance and polymorphism feel natural and useful.

### What the Student Sees (Provided Template)

- A **library header** with total books count, books read, and a search bar.
- An **"Add Book" form** with fields: title, author, genre dropdown, pages, type (Physical Book / E-Book / Audiobook), and a cover-color picker.
- A **book shelf** displaying books as cards with cover color, title, author, genre badge, page count, reading progress bar, and action buttons (Mark as Read, Favorite, Delete).
- A **statistics panel** with: books by genre (bar chart), reading progress overview, favorite books list, and average rating.
- Filter/sort controls: filter by genre, read/unread, and sort by title/author/pages/rating.

### What the Student Codes (JavaScript Only)

| Feature | Concepts Used |
|---------|---------------|
| Base `Book` class with `#title`, `#author`, `#genre`, `#pages`, `#rating`, `#isFavorite`, `#dateAdded` | **Classes, `constructor`, private `#` fields, getters/setters with validation** (W5) |
| `PhysicalBook` (adds `#shelfLocation`, `#condition`), `EBook` (adds `#fileSize`, `#format`), `AudioBook` (adds `#duration`, `#narrator`) — all extend `Book` | **Inheritance hierarchy, `extends`, `super()`, method overriding** (W5) |
| Each type overrides `getDetails()` and `getProgress()` — polymorphic rendering | **Polymorphism — same interface, different behavior** (W5) |
| `Library` class with books array; methods: `addBook()`, `removeBook()`, `searchBooks()`, `getBooksByGenre()`, `getStatistics()`, `sortBooks()` | **Encapsulation, `static` methods, `Map` for genre counts** (W5) |
| Make `Library` iterable with `Symbol.iterator` so `for...of` works over books | **`Symbol.iterator`, iterator protocol (`next()`, `{value, done}`)** (W5) |
| Search by title or author — case-insensitive, partial matching | **String methods: `toLowerCase()`, `includes()`, `trim()`** (W3) |
| Filter books by genre, read/unread, favorites using `filter()` with chained conditions | **`filter()`, `&&`/`\|\|` logical operators** (W2, W4) |
| Sort by title (`localeCompare`), pages (numeric), rating, date added | **`sort()` with custom comparators, `localeCompare()`** (W3–W4) |
| Statistics: total books, average rating, genre distribution, most popular genre | **`reduce()`, `map()`, `Math.max()`, `Object.entries()`** (W4) |
| Reading progress — track pages read, compute percentage | **Arithmetic, `Math.round()`, `toFixed()`** (W1) |
| Render book cards to DOM with dynamic cover colors and progress bars | **DOM manipulation, `createElement`, `style`, `classList`, `dataset`** (W6 self-study) |
| Event listeners for Add, Delete, Favorite toggle, Mark Read, Search input, Filter/Sort changes | **Event handling, delegation, `preventDefault()`, `input` event** (W6 self-study) |
| Save library state to `localStorage`; restore on load, handle type reconstruction | **`localStorage`, `JSON.stringify/parse`, `instanceof` for reconstruction** (W5–W6) |
| Use `Date` to track when a book was added, sort by "Recently Added" | **Date object, `Date.now()`, date comparisons** (W4) |
| File type detection for EBooks (`.pdf`, `.epub`, `.mobi`) using extension extraction | **File extension extraction, `split()`, `lastIndexOf()`** (W5) |

### Curriculum Coverage Map

| Week | Topics Exercised |
|------|-----------------|
| **W1** | `const`/`let`, data types, arithmetic, `Math.round()`, `toFixed()`, template literals, ternary, `??`, `?.` |
| **W2** | Functions (arrow, declarations), `if/else`, `for` loops, `for...of`, scope, closures (event callbacks), default parameters |
| **W3** | Arrays (all methods), objects (nested, iteration), strings (`toLowerCase`, `includes`, `trim`, `slice`, `split`, `localeCompare`), `Object.keys/values/entries` |
| **W4** | `map()`, `filter()`, `reduce()`, `sort()`, `find()`, `some()`, `every()`, Date object, method chaining, data pipelines |
| **W5** | `class`, `#` private fields, getters/setters, `static`, `extends`, `super`, method overriding, polymorphism, `instanceof`, `Symbol.iterator`, `Map`, file extension operations |
| **W6** | DOM (full CRUD), events (click, input, submit, delegation), `localStorage`, `JSON.stringify/parse` |

### Stretch Goals

- Add a **star rating widget** (clickable stars using DOM events).
- Implement **book recommendations** based on favorite genres (uses `filter` + `sort` on unread books).
- Add **reading goals** with a `setInterval` countdown and progress tracking.

---

## Project 5 — WeatherLog: Weather Journal & Dashboard

### Elevator Pitch

A weather journal app where students log daily weather observations, compute trends and averages over time, and visualize weather patterns — blending data processing pipelines with OOP to make `map/filter/reduce` feel purposeful, not academic.

### What the Student Sees (Provided Template)

- A **"Log Weather" form** with fields: date picker, temperature (°C), humidity (%), condition dropdown (Sunny/Cloudy/Rainy/Snowy/Windy), wind speed, and notes textarea.
- A **journal list** showing logged entries as cards with weather icons (emoji-based via CSS), temperature, humidity, condition, and date.
- A **dashboard panel** with: average temperature this week/month, hottest/coldest days, humidity trend, condition frequency (how many Sunny vs Rainy days), and a temperature range bar chart.
- Filter controls: filter by date range, condition type, temperature range.
- Responsive design with weather-themed styling (gradients based on temperature).

### What the Student Codes (JavaScript Only)

| Feature | Concepts Used |
|---------|---------------|
| `WeatherEntry` class with `#date`, `#temperature`, `#humidity`, `#condition`, `#windSpeed`, `#notes`; getters with validation (temp between -50 and 60, humidity 0–100) | **Classes, `#` private fields, getters/setters with validation** (W5) |
| `TemperatureEntry` and `PrecipitationEntry` extend `WeatherEntry` with extra logic (wind chill calculation, precipitation type detection) | **Inheritance, `extends`, `super`, method overriding** (W5) |
| Polymorphic `getSeverity()` — same method name returns different severity levels based on entry type | **Polymorphism** (W5) |
| `WeatherJournal` class managing entries array with `addEntry()`, `deleteEntry()`, `getEntriesByDateRange()`, `getEntriesByCondition()`, `getStatistics()` | **Encapsulation, `static` methods** (W5) |
| Calculate averages (temp, humidity) using `reduce()` | **`reduce()`, arithmetic, `toFixed()`** (W1, W4) |
| Find hottest/coldest days using `reduce()` or `sort()` | **`reduce()` with comparison, `sort()`, `Math.max/min`** (W4) |
| Count condition frequencies: `{ Sunny: 12, Rainy: 5, … }` using `reduce()` | **`reduce()` to build objects** (W4) |
| Filter entries by date range using Date comparisons | **Date object, date arithmetic, `filter()`** (W4) |
| Filter by temperature range (slider) using `filter()` with numeric comparisons | **`filter()`, comparison operators** (W2, W4) |
| Compute week/month groupings using `getMonth()`, `getFullYear()`, `getDate()` | **Date methods, `reduce()` for grouping, nested data** (W3–W4) |
| Map condition names to weather emoji icons and CSS classes | **`Map` data structure, string methods** (W5, W3) |
| Temperature conversion utility (°C ↔ °F) — the `Experiment 6` formula in action | **Arithmetic, functions, ternary operator** (W1–W2) |
| Render entries and dashboard to DOM | **DOM manipulation, `createElement`, `classList`, `textContent`, `style`** (W6 self-study) |
| Handle form submit, delete clicks, filter changes | **Event handling, `addEventListener`, `preventDefault()`, `input`/`change` events, delegation** (W6 self-study) |
| Persist journal to `localStorage` | **`localStorage`, `JSON.stringify/parse`** (W6 self-study) |
| Generate a 7-day trend line using DOM elements (bars/points with dynamic heights) | **`map()`, template literals, DOM style manipulation** (W1, W4, W6) |
| Validate: no future dates, required fields, numeric ranges | **`if/else`, `isNaN()`, Date comparisons, `parseFloat()`** (W1–W2) |
| Format dates nicely: "Mon, 17 Mar 2026" | **`toLocaleDateString()` with options, `padStart()`** (W4) |

### Curriculum Coverage Map

| Week | Topics Exercised |
|------|-----------------|
| **W1** | `const`/`let`, data types, `parseFloat()`, `isNaN()`, `toFixed()`, arithmetic (averages, conversions), `Math.max/min/round`, template literals, ternary, `??` |
| **W2** | Functions (arrow, declarations), `if/else/else if`, `for` loops, `while` (searching), scope, closures, default parameters, `break` |
| **W3** | Arrays (all mutation and access methods), objects (nested — grouped data), string methods (`toLowerCase`, `includes`, `trim`, `padStart`), `Object.keys/values/entries`, spread operator |
| **W4** | `map()`, `filter()`, `reduce()`, `sort()`, `find()`, `some()`, Date object (full usage), `toLocaleDateString()`, method chaining, data processing pipelines |
| **W5** | `class`, `#` fields, getters/setters, `static`, `extends`, `super`, method overriding, polymorphism, `instanceof`, `Map` (condition → icon mapping), encapsulation |
| **W6** | DOM (selecting, creating, modifying, removing, traversal), events (submit, click, change, input, delegation), `localStorage` |

### Stretch Goals

- **Fetch real weather data** from a free API to auto-fill entries (Fetch API, async/await).
- Add a **weather alert system** that warns when temperature is extreme (uses `setInterval` polling).
- Implement **data export** — generate a formatted text report using `map()` and `join()`.

---

## Quick Comparison Table

| # | Project | Primary OOP Depth | Data Processing | Real-World Appeal | Difficulty |
|---|---------|------------------|-----------------|-------------------|------------|
| 1 | **TaskFlow** (Task Manager) | Moderate (2-level hierarchy) | Heavy (filter, sort, reduce) | Very High — everyone uses task apps | ★★★☆☆ |
| 2 | **QuizCraft** (Quiz Engine) | Deep (3+ question types, abstract pattern) | Moderate (scoring, stats) | High — students relate to quizzes | ★★★★☆ |
| 3 | **BudgetBuddy** (Finance Tracker) | Moderate (Income/Expense classes) | Very Heavy (grouping, totals, monthly) | Very High — personal finance is universal | ★★★☆☆ |
| 4 | **BookVault** (Library Manager) | Deep (3 book types, iterator, symbols) | Heavy (searching, sorting, stats) | High — book lovers relate easily | ★★★★☆ |
| 5 | **WeatherLog** (Weather Journal) | Moderate (entry types, polymorphism) | Very Heavy (trends, averages, grouping) | High — visual and data-rich | ★★★☆☆ |

---

## Concept Coverage Matrix

This matrix shows which project covers which concept, ensuring completeness:

| Concept | TaskFlow | QuizCraft | BudgetBuddy | BookVault | WeatherLog |
|---------|:--------:|:---------:|:-----------:|:---------:|:----------:|
| **W1: Variables & Types** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W1: Operators (arithmetic, comparison, logical)** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W1: Template Literals** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W1: Math Methods** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W1: Ternary, ??, ?.** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W2: Functions (arrow, declarations)** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W2: Conditionals (if/else)** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W2: Loops (for, while)** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W2: Scope & Closures** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W3: Arrays (methods)** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W3: Objects (nested, iteration)** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W3: String Methods** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W4: map()** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W4: filter()** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W4: reduce()** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W4: sort() with comparators** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W4: Date Object** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W4: setInterval/setTimeout** | ✅ | ✅ | ○ | ○ | ○ |
| **W5: class & constructor** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W5: Private # Fields** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W5: Getters/Setters** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W5: Static Methods** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W5: Inheritance (extends/super)** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W5: Method Overriding** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W5: Polymorphism** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W5: instanceof** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W5: Map Data Structure** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W5: Symbol.iterator** | ○ | ○ | ○ | ✅ | ○ |
| **W5: File Extension Ops** | ○ | ○ | ○ | ✅ | ○ |
| **W6: DOM Manipulation** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W6: Event Handling** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **W6: localStorage** | ✅ | ✅ | ✅ | ✅ | ✅ |

> ✅ = Core part of the project &nbsp;&nbsp; ○ = Covered in stretch goals or optional

---

## Deliverables for Each Project

When the chosen project is built out, the student will receive:

1. **`index.html`** — Complete HTML template with all UI elements, semantic structure, and element IDs/classes for JavaScript to hook into.
2. **`style.css`** — Fully designed stylesheet. Students do NOT need to write any CSS.
3. **`app.js`** — A starter file with:
   - Clearly marked `// TODO:` comments explaining each function/class the student must implement.
   - Class skeletons (class name, constructor signature, method names with parameter hints).
   - Helper comments explaining what each section should do.
4. **`instructions.md`** — Step-by-step implementation guide:
   - **Phase 1:** Build the data model (classes, inheritance).
   - **Phase 2:** Implement core logic (CRUD, calculations).
   - **Phase 3:** Connect to DOM (rendering, event listeners).
   - **Phase 4:** Add persistence (localStorage).
   - **Phase 5:** Polish (validation, edge cases).

---

## Recommendation

**Project 1 (TaskFlow)** or **Project 3 (BudgetBuddy)** offer the best balance:

- The **OOP hierarchy is only 2 levels deep** (not overwhelming).
- The **real-world domain** (tasks / money) is immediately relatable — students understand *why* classes help.
- The **data processing** (filter, sort, reduce) feels natural — "show me only Work tasks" or "what's my total spending on Food?" — not forced.
- They can be completed in **2–3 hours** by an average student, with stretch goals for fast finishers.

**Project 2 (QuizCraft)** and **Project 4 (BookVault)** are better if students enjoy a challenge — the deeper inheritance hierarchies and the iterator/symbol usage make polymorphism click, but take closer to **3–4 hours**.

**Project 5 (WeatherLog)** is the most data-heavy and visual, ideal if students are motivated by seeing patterns and charts.
