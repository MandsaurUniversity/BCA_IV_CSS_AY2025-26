# BudgetBuddy — Hints & Guidance

> Use this file when you're stuck on a specific TODO.
> Each section matches a phase and class in `app.js`.

---

## Phase 1 — Transaction Base Class

### Private Fields Declaration

```js
class Transaction {
  #id;
  #description;
  #amount;
  #category;
  #date;
  #createdAt;
  // ...
}
```

### Constructor Setup

```js
constructor(description, amount, category, date) {
  this.#id = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  this.description = description;  // Uses setter for validation
  this.amount = amount;            // Uses setter for validation
  this.#category = category;
  this.#date = new Date(date);
  this.#createdAt = new Date();
}
```

### Setter with Validation — `description`

```js
set description(value) {
  if (!value || value.trim().length === 0) {
    throw new Error('Description cannot be empty');
  }
  this.#description = value.trim();
}
```

### Setter with Validation — `amount`

```js
set amount(value) {
  const num = parseFloat(value);
  if (isNaN(num) || num <= 0) {
    throw new Error('Amount must be a positive number');
  }
  this.#amount = num;
}
```

This is a great example of using `parseFloat()` and `isNaN()` from Week 1!

### Formatted Date Getter

```js
get formattedDate() {
  return this.#date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
```

### Month-Year Getter

```js
get monthYear() {
  return `${this.#date.toLocaleString('en-IN', { month: 'long' })} ${this.#date.getFullYear()}`;
}
// Example output: "March 2026"
```

### Polymorphic Methods — Base Implementation

```js
formatAmount() {
  return `₹${this.#amount.toFixed(2)}`;
}

getType() {
  return 'transaction';
}

getSign() {
  return 1;
}

get signedAmount() {
  return this.#amount * this.getSign();
}
```

These are the methods that `Income` and `Expense` will **override**.

### `toJSON()` Method

```js
toJSON() {
  return {
    id: this.#id,
    type: this.getType(),     // 'income' or 'expense' — polymorphism!
    description: this.#description,
    amount: this.#amount,
    category: this.#category,
    date: this.#date.toISOString(),
    createdAt: this.#createdAt.toISOString()
  };
}
```

Notice how `this.getType()` calls the **overridden** version — if this is called on an `Income` object, it returns `'income'`. That's polymorphism at work!

### `static fromJSON()` Method

```js
static fromJSON(data) {
  let transaction;
  if (data.type === 'income') {
    transaction = new Income(data.description, data.amount, data.category, data.date);
  } else {
    transaction = new Expense(data.description, data.amount, data.category, data.date);
  }
  transaction.#id = data.id;
  transaction.#createdAt = new Date(data.createdAt);
  return transaction;
}
```

**Why can `Transaction.fromJSON` access `#id` on an `Income` instance?** Because `#id` is declared in `Transaction`, and this code is inside `Transaction`'s class body. JavaScript allows any code inside a class to access that class's private fields — even on instances of child classes.

---

## Phase 1 — Income & Expense Classes

### Income Class

```js
class Income extends Transaction {
  constructor(description, amount, category, date) {
    super(description, amount, category, date);
  }

  formatAmount() {
    return `+₹${this.amount.toFixed(2)}`;
  }

  getType() {
    return 'income';
  }

  getSign() {
    return 1;
  }
}
```

### Expense Class

```js
class Expense extends Transaction {
  constructor(description, amount, category, date) {
    super(description, amount, category, date);
  }

  formatAmount() {
    return `-₹${this.amount.toFixed(2)}`;
  }

  getType() {
    return 'expense';
  }

  getSign() {
    return -1;
  }
}
```

**Polymorphism in action:** When the app later calls `transaction.formatAmount()`, JavaScript automatically calls the correct version based on whether the object is an `Income` or `Expense`. You don't need `if` checks!

---

## Phase 1 — Budget Class

### Constructor with Map

```js
class Budget {
  #transactions;
  #storageKey;
  #categories;

  constructor(storageKey = 'budgetbuddy-transactions') {
    this.#transactions = [];
    this.#storageKey = storageKey;
    this.#categories = new Map([
      ['Salary', 'income'],
      ['Freelance', 'income'],
      ['Investment', 'income'],
      ['Gift', 'income'],
      ['Other Income', 'income'],
      ['Food', 'expense'],
      ['Transport', 'expense'],
      ['Shopping', 'expense'],
      ['Entertainment', 'expense'],
      ['Bills', 'expense'],
      ['Health', 'expense'],
      ['Education', 'expense'],
      ['Other Expense', 'expense']
    ]);
  }
}
```

### Getting Categories by Type

```js
getIncomeCategories() {
  return [...this.#categories.entries()]
    .filter(([, type]) => type === 'income')
    .map(([name]) => name);
}

getExpenseCategories() {
  return [...this.#categories.entries()]
    .filter(([, type]) => type === 'expense')
    .map(([name]) => name);
}
```

**Destructuring trick:** `([, type])` skips the first element (name) and captures only the second (type). `([name])` captures only the first.

### Adding a Transaction

```js
addTransaction(type, description, amount, category, date) {
  const transaction = type === 'income'
    ? new Income(description, amount, category, date)
    : new Expense(description, amount, category, date);

  this.#transactions.push(transaction);
  this.save();
  return transaction;
}
```

### Calculations with `reduce()`

```js
getBalance() {
  return this.#transactions.reduce((sum, t) => sum + t.signedAmount, 0);
}

getTotalIncome() {
  return this.#transactions
    .filter(t => t instanceof Income)     // instanceof checks class!
    .reduce((sum, t) => sum + t.amount, 0);
}

getTotalExpenses() {
  return this.#transactions
    .filter(t => t instanceof Expense)
    .reduce((sum, t) => sum + t.amount, 0);
}
```

**`instanceof` explained:** `t instanceof Income` returns `true` if `t` was created with `new Income(...)`. This is how we distinguish transaction types.

### Filtering

```js
getByType(type) {
  if (type === 'all') return [...this.#transactions];
  return this.#transactions.filter(t => t.getType() === type);
}

getByCategory(category) {
  return this.#transactions.filter(t => t.category === category);
}

getByDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return this.#transactions.filter(t => {
    const d = new Date(t.date);
    return d >= start && d <= end;
  });
}
```

### Category Breakdown — Data Processing Pipeline

This is the most complex method. It uses `filter → reduce → map → sort`:

```js
getCategoryBreakdown() {
  // Step 1: Get only expenses
  const expenses = this.#transactions.filter(t => t instanceof Expense);
  const totalExpenses = this.getTotalExpenses();

  // Step 2: Group by category using reduce
  const grouped = expenses.reduce((acc, t) => {
    const existing = acc.find(item => item.category === t.category);
    if (existing) {
      existing.amount += t.amount;
      existing.count += 1;
    } else {
      acc.push({ category: t.category, amount: t.amount, count: 1 });
    }
    return acc;
  }, []);

  // Step 3: Add percentage and sort
  return grouped
    .map(item => ({
      ...item,
      percentage: totalExpenses > 0
        ? Math.round((item.amount / totalExpenses) * 100)
        : 0
    }))
    .sort((a, b) => b.amount - a.amount);
}
```

**How the reduce works step by step:**
1. Start with empty array `[]`
2. For each expense transaction:
   - Look for an existing entry with the same category
   - If found: add to its amount, increment count
   - If not found: push a new entry
3. Result: `[{ category: 'Food', amount: 5000, count: 3 }, ...]`

### Monthly Summary

```js
getMonthlySummary() {
  const summary = this.#transactions.reduce((acc, t) => {
    const key = t.monthYear;  // "March 2026"
    if (!acc[key]) {
      acc[key] = { month: key, income: 0, expenses: 0, transactions: 0 };
    }
    if (t instanceof Income) {
      acc[key].income += t.amount;
    } else {
      acc[key].expenses += t.amount;
    }
    acc[key].transactions += 1;
    return acc;
  }, {});

  return Object.values(summary).map(m => ({
    ...m,
    balance: m.income - m.expenses
  }));
}
```

### Sorting

```js
getSortedTransactions(transactions, sortBy = 'date') {
  return [...transactions].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);  // Newest first
      case 'amount':
        return b.amount - a.amount;
      case 'description':
        return a.description.localeCompare(b.description);
      default:
        return 0;
    }
  });
}
```

### Static Utility

```js
static formatCurrency(amount) {
  const absAmount = Math.abs(amount);
  return `₹${absAmount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
```

### localStorage Persistence

```js
save() {
  try {
    const data = this.#transactions.map(t => t.toJSON());
    localStorage.setItem(this.#storageKey, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving:', error);
  }
}

load() {
  try {
    const data = localStorage.getItem(this.#storageKey);
    if (!data) return;

    const transactions = JSON.parse(data);
    transactions.forEach(tData => {
      const transaction = Transaction.fromJSON(tData);
      this.#transactions.push(transaction);
    });
  } catch (error) {
    console.error('Error loading:', error);
    this.#transactions = [];
  }
}
```

---

## Phase 3 — DOM Caching & Category Population

### Caching Elements

```js
#cacheDOMElements() {
  this.form = document.getElementById('transaction-form');
  this.descInput = document.getElementById('txn-description');
  this.amountInput = document.getElementById('txn-amount');
  this.categorySelect = document.getElementById('txn-category');
  this.dateInput = document.getElementById('txn-date');
  this.formError = document.getElementById('form-error');
  this.transactionList = document.getElementById('transaction-list');
  this.emptyState = document.getElementById('empty-state');
  this.sortSelect = document.getElementById('sort-select');
  this.balanceEl = document.getElementById('balance');
  this.incomeEl = document.getElementById('total-income');
  this.expensesEl = document.getElementById('total-expenses');
  this.categoryBreakdown = document.getElementById('category-breakdown');
  this.monthlySummary = document.getElementById('monthly-summary');
  this.filterTabs = document.querySelectorAll('.filter-tab');
}
```

### Populating Category Dropdown Dynamically

```js
#populateCategories() {
  const type = document.querySelector('input[name="txn-type"]:checked').value;
  const categories = type === 'income'
    ? this.#budget.getIncomeCategories()
    : this.#budget.getExpenseCategories();

  this.categorySelect.innerHTML = '';  // Clear existing options

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    this.categorySelect.appendChild(option);
  });
}
```

This is a great example of dynamically updating the DOM based on data!

---

## Phase 3 — Event Binding

### Type Toggle Updates Categories

```js
document.querySelectorAll('input[name="txn-type"]').forEach(radio => {
  radio.addEventListener('change', () => {
    this.#populateCategories();
  });
});
```

When the user switches between Income and Expense, the category dropdown immediately updates with the correct options.

### Event Delegation for Filters

```js
document.querySelector('.filter-tabs').addEventListener('click', (e) => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;

  this.filterTabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  this.#currentFilter = tab.dataset.type;
  this.render();
});
```

### Event Delegation for Delete

```js
this.transactionList.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.btn-delete');
  if (!deleteBtn) return;

  const card = e.target.closest('.transaction-card');
  if (!card) return;

  this.#handleDeleteTransaction(card.dataset.id);
});
```

---

## Phase 4 — Adding a Transaction

```js
#handleAddTransaction() {
  const type = document.querySelector('input[name="txn-type"]:checked').value;
  const description = this.descInput.value.trim();
  const amount = this.amountInput.value;
  const category = this.categorySelect.value;
  const date = this.dateInput.value;

  // Validation
  if (!description) {
    this.#showError('Please enter a description');
    return;
  }
  if (!amount || parseFloat(amount) <= 0) {
    this.#showError('Please enter a valid amount');
    return;
  }
  if (!date) {
    this.#showError('Please select a date');
    return;
  }

  try {
    this.#budget.addTransaction(type, description, amount, category, date);
    this.form.reset();
    this.#setDefaultDate();
    this.#populateCategories();
    this.#clearError();
    this.render();
  } catch (error) {
    this.#showError(error.message);
  }
}
```

---

## Phase 5 — Rendering

### Summary Cards

```js
#renderSummary() {
  const balance = this.#budget.getBalance();
  const income = this.#budget.getTotalIncome();
  const expenses = this.#budget.getTotalExpenses();

  const prefix = balance >= 0 ? '' : '-';
  this.balanceEl.textContent = `${prefix}${Budget.formatCurrency(balance)}`;
  this.incomeEl.textContent = Budget.formatCurrency(income);
  this.expensesEl.textContent = Budget.formatCurrency(expenses);
}
```

### Transaction Card — Polymorphism in Action

```js
#createTransactionCard(transaction) {
  const card = document.createElement('div');
  const type = transaction.getType();  // 'income' or 'expense' — polymorphism!

  card.className = `transaction-card ${type}-card`;
  card.dataset.id = transaction.id;

  card.innerHTML = `
    <div class="txn-left">
      <div class="txn-icon icon-${type}">
        ${type === 'income' ? '↑' : '↓'}
      </div>
      <div class="txn-info">
        <span class="txn-description">${transaction.description}</span>
        <div class="txn-meta">
          <span class="txn-category-badge">${transaction.category}</span>
          <span class="txn-date">${transaction.formattedDate}</span>
        </div>
      </div>
    </div>
    <div class="txn-right">
      <span class="txn-amount amount-${type}">${transaction.formatAmount()}</span>
      <button class="btn-delete" title="Delete">✕</button>
    </div>
  `;

  return card;
}
```

Notice `transaction.formatAmount()` — this single method call produces `+₹50,000.00` for Income and `-₹2,500.00` for Expense. That's polymorphism making your code cleaner!

### Category Breakdown Bars

```js
#renderCategoryBreakdown() {
  const breakdown = this.#budget.getCategoryBreakdown();

  if (breakdown.length === 0) {
    this.categoryBreakdown.innerHTML =
      '<p class="placeholder-text">Add expense transactions to see category breakdown.</p>';
    return;
  }

  this.categoryBreakdown.innerHTML = breakdown.map(item => `
    <div class="category-bar">
      <div class="category-bar-header">
        <span class="category-bar-name">${item.category}</span>
        <span class="category-bar-amount">${Budget.formatCurrency(item.amount)}</span>
      </div>
      <div class="category-bar-track">
        <div class="category-bar-fill" style="width: ${item.percentage}%"></div>
      </div>
      <span class="category-bar-percentage">${item.percentage}%</span>
    </div>
  `).join('');
}
```

**Data pipeline recap:** `getCategoryBreakdown()` did the heavy lifting (filter → reduce → map → sort). Here we just render the results. Separation of concerns!

### Monthly Summary

```js
#renderMonthlySummary() {
  const summary = this.#budget.getMonthlySummary();

  if (summary.length === 0) {
    this.monthlySummary.innerHTML =
      '<p class="placeholder-text">Add transactions to see monthly summary.</p>';
    return;
  }

  this.monthlySummary.innerHTML = summary.map(m => `
    <div class="monthly-row">
      <span class="monthly-label">${m.month}</span>
      <div class="monthly-values">
        <span class="monthly-income">+₹${m.income.toFixed(2)}</span>
        <span class="monthly-expense">-₹${m.expenses.toFixed(2)}</span>
        <span class="monthly-balance">₹${m.balance.toFixed(2)}</span>
      </div>
    </div>
  `).join('');
}
```

---

## Common Mistakes to Avoid

1. **Forgetting `super()`** in `Income`/`Expense` constructor — you'll get a ReferenceError about `this`.
2. **Using `this.#amount` in child classes** — private fields are NOT inherited. Use `this.amount` (the public getter) instead.
3. **Forgetting `e.preventDefault()`** — the form will submit and the page will reload.
4. **Not handling the type toggle** — if you don't re-populate categories when the user switches type, they'll see income categories when trying to add an expense.
5. **Mutating arrays** — always `[...array]` before `.sort()`.
6. **String vs Number comparison** — `amount` from an input is a string; use `parseFloat()` before comparing.

---

## Testing Checklist

After completing all phases, verify:

- [ ] Add an income transaction → appears in list with green styling and `+₹` prefix
- [ ] Add an expense transaction → appears with red styling and `-₹` prefix
- [ ] Balance updates correctly (income - expenses)
- [ ] Switch type toggle → category dropdown updates
- [ ] Click filter tabs → shows only income/expense/all
- [ ] Sort dropdown → reorders transactions
- [ ] Delete button → removes transaction and updates everything
- [ ] Category breakdown shows bar charts for expense categories
- [ ] Monthly summary groups transactions correctly
- [ ] Refresh the page → all data persists (localStorage)
- [ ] Try adding with empty description → error shows
- [ ] Try adding with 0 or negative amount → error shows
