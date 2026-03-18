/* ============================================================
   BUDGETBUDDY — Personal Finance Tracker
   Student Boilerplate — Implement the TODOs below
   ============================================================

   INSTRUCTIONS:
   1. Work through each section in order (Phase 1 → Phase 5).
   2. Every TODO comment tells you WHAT to build and WHICH
      concepts you'll practise.
   3. Do NOT modify index.html or style.css — all your code
      goes in this file.
   4. Test after completing each phase by opening index.html
      in your browser.
   ============================================================ */


// ============================================================
// PHASE 1 — Data Model (Classes & OOP)
// ============================================================

// --------------------------------------------------
// 1a. Transaction Base Class
// Concepts: class, constructor, private # fields,
//           getters, setters with validation
// --------------------------------------------------

class Transaction {
  // TODO: Declare private fields:
  //   #id, #description, #amount, #category, #date, #createdAt

  constructor(description, amount, category, date) {
    // TODO: Generate a unique ID
    //   Hint: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // TODO: Set description through the setter (for validation)

    // TODO: Set amount through the setter (for validation)

    // TODO: Set #category

    // TODO: Set #date as new Date(date)

    // TODO: Set #createdAt as new Date()
  }

  // --- Getters ---
  // TODO: Create getters for: id, description, amount, category, date, createdAt

  // --- Setters with Validation ---

  // TODO: Create a setter for 'description' that:
  //   - Throws an Error if empty or only whitespace
  //   - Trims the value

  // TODO: Create a setter for 'amount' that:
  //   - Converts value using parseFloat()
  //   - Throws an Error if result isNaN() or <= 0

  // --- Formatted Properties ---

  // TODO: Create getter 'formattedDate' that returns date as
  //   "17 Mar 2026" using toLocaleDateString('en-IN', ...)

  // TODO: Create getter 'monthYear' that returns
  //   "March 2026" using toLocaleString for month + getFullYear()

  // --- Methods to be OVERRIDDEN by child classes (Polymorphism) ---

  // TODO: Create method formatAmount()
  //   Default: return `₹${this.#amount.toFixed(2)}`
  //   Income will override to show "+₹..."
  //   Expense will override to show "-₹..."

  // TODO: Create method getType()
  //   Default: return 'transaction'
  //   Overridden by Income → 'income', Expense → 'expense'

  // TODO: Create method getSign()
  //   Default: return 1
  //   Overridden by Expense → -1

  // TODO: Create getter 'signedAmount'
  //   Returns this.amount * this.getSign()

  // --- Serialization ---

  // TODO: Create method toJSON() returning a plain object with:
  //   id, type (from getType()), description, amount, category,
  //   date (as ISO string), createdAt (as ISO string)

  // TODO: Create STATIC method fromJSON(data) that:
  //   - Checks data.type to create either an Income or Expense
  //   - Restores the original id and createdAt
  //   Hint: if (data.type === 'income') → new Income(...) else → new Expense(...)
}


// --------------------------------------------------
// 1b. Income Class (extends Transaction)
// Concepts: inheritance, extends, super, method overriding
// --------------------------------------------------

class Income extends Transaction {
  constructor(description, amount, category, date) {
    // TODO: Call super(...) with all parameters
  }

  // TODO: Override formatAmount() → return `+₹${this.amount.toFixed(2)}`

  // TODO: Override getType() → return 'income'

  // TODO: Override getSign() → return 1
}


// --------------------------------------------------
// 1c. Expense Class (extends Transaction)
// Concepts: inheritance, extends, super, method overriding
// --------------------------------------------------

class Expense extends Transaction {
  constructor(description, amount, category, date) {
    // TODO: Call super(...) with all parameters
  }

  // TODO: Override formatAmount() → return `-₹${this.amount.toFixed(2)}`

  // TODO: Override getType() → return 'expense'

  // TODO: Override getSign() → return -1
}


// --------------------------------------------------
// 1d. Budget Class
// Concepts: encapsulation, Map, instanceof,
//           filter, reduce, sort
// --------------------------------------------------

class Budget {
  // TODO: Declare private fields:
  //   #transactions, #storageKey, #categories

  constructor(storageKey = 'budgetbuddy-transactions') {
    // TODO: Initialize #transactions as empty array

    // TODO: Set #storageKey

    // TODO: Initialize #categories as a new Map with entries:
    //   Income categories: 'Salary', 'Freelance', 'Investment',
    //                      'Gift', 'Other Income'
    //   Expense categories: 'Food', 'Transport', 'Shopping',
    //                       'Entertainment', 'Bills', 'Health',
    //                       'Education', 'Other Expense'
    //   Each entry maps category name → type ('income' or 'expense')
    //   Example: new Map([['Salary', 'income'], ['Food', 'expense'], ...])
  }

  // --- Getters ---

  // TODO: Create getter 'transactions' → return copy [...this.#transactions]
  // TODO: Create getter 'count' → return length
  // TODO: Create getter 'categories' → return this.#categories

  // --- Category Helpers ---

  // TODO: Create method getIncomeCategories()
  //   Filter #categories Map entries where type is 'income'
  //   Return array of category names
  //   Hint: [...this.#categories.entries()]
  //         .filter(([, type]) => type === 'income')
  //         .map(([name]) => name)

  // TODO: Create method getExpenseCategories()
  //   Same as above but for 'expense'

  // --- Transaction Operations ---

  // TODO: Create method addTransaction(type, description, amount, category, date)
  //   - If type is 'income' → create new Income(...)
  //   - Otherwise → create new Expense(...)
  //   - Push to #transactions
  //   - Call this.save()
  //   - Return the transaction

  // TODO: Create method removeTransaction(id)
  //   - Use findIndex() to locate
  //   - Use splice() to remove
  //   - Call this.save() if found
  //   - Return true/false

  // --- Calculations using reduce() ---

  // TODO: Create method getBalance()
  //   Use reduce() to sum all signedAmount values
  //   Income adds, Expense subtracts (because of getSign())

  // TODO: Create method getTotalIncome()
  //   - Filter transactions that are instanceof Income
  //   - Use reduce() to sum their amounts

  // TODO: Create method getTotalExpenses()
  //   - Filter transactions that are instanceof Expense
  //   - Use reduce() to sum their amounts

  // --- Filtering ---

  // TODO: Create method getByType(type)
  //   If type is 'all' → return copy of all transactions
  //   Otherwise → filter where getType() matches

  // TODO: Create method getByCategory(category)
  //   Filter where transaction.category === category

  // TODO: Create method getByDateRange(startDate, endDate)
  //   Filter where transaction date is between start and end

  // --- Data Processing (reduce, map, sort) ---

  // TODO: Create method getCategoryBreakdown()
  //   - Get only Expense transactions (use filter + instanceof)
  //   - Use reduce() to group by category:
  //     Build array of { category, amount, count }
  //   - Calculate percentage of total expenses for each
  //   - Sort by amount descending
  //   - Return the array
  //
  //   This is a data processing pipeline!
  //   filter → reduce → map → sort

  // TODO: Create method getMonthlySummary()
  //   - Use reduce() to group transactions by monthYear
  //     Each entry: { month, income, expenses, transactions count }
  //   - Use Object.values() then map() to add 'balance' field
  //   - Return the array

  // --- Sorting ---

  // TODO: Create method getSortedTransactions(transactions, sortBy = 'date')
  //   - Return NEW sorted array (don't mutate!)
  //   - 'date' → newest first (b.date - a.date)
  //   - 'amount' → highest first (b.amount - a.amount)
  //   - 'description' → alphabetical (localeCompare)

  // --- Static Utility ---

  // TODO: Create static method formatCurrency(amount)
  //   Format as "₹1,234.56" using Math.abs() and toLocaleString('en-IN', ...)
  //   or manual toFixed(2)

  // --- Persistence (localStorage) ---

  // TODO: Create method save()
  //   - Map transactions to JSON using .map(t => t.toJSON())
  //   - Store with localStorage.setItem() and JSON.stringify()
  //   - Wrap in try/catch

  // TODO: Create method load()
  //   - Read from localStorage
  //   - Parse with JSON.parse()
  //   - Recreate objects using Transaction.fromJSON()
  //   - Push each to #transactions
  //   - Wrap in try/catch
}


// ============================================================
// PHASE 2 — App Controller (DOM & Events)
// ============================================================

class App {
  // TODO: Declare private fields:
  //   #budget, #currentFilter, #currentSort

  constructor() {
    // TODO: Create a new Budget instance
    // TODO: Set default filter to 'all'
    // TODO: Set default sort to 'date'
  }

  init() {
    // TODO: Call budget.load()
    // TODO: Call this.#cacheDOMElements()
    // TODO: Call this.#bindEvents()
    // TODO: Call this.#setDefaultDate()
    // TODO: Call this.#populateCategories()
    // TODO: Call this.render()
  }

  // --- Phase 3: DOM Element Caching ---

  #cacheDOMElements() {
    // TODO: Cache references to these elements:
    //   this.form          → #transaction-form
    //   this.descInput     → #txn-description
    //   this.amountInput   → #txn-amount
    //   this.categorySelect → #txn-category
    //   this.dateInput     → #txn-date
    //   this.formError     → #form-error
    //   this.transactionList → #transaction-list
    //   this.emptyState    → #empty-state
    //   this.sortSelect    → #sort-select
    //   this.balanceEl     → #balance
    //   this.incomeEl      → #total-income
    //   this.expensesEl    → #total-expenses
    //   this.categoryBreakdown → #category-breakdown
    //   this.monthlySummary   → #monthly-summary
    //   this.filterTabs    → all .filter-tab elements
  }

  // --- Phase 3: Populate Category Dropdown ---

  #populateCategories() {
    // TODO: Read the currently selected transaction type
    //   (income or expense) from the radio button

    // TODO: Get the appropriate categories from budget
    //   (getIncomeCategories or getExpenseCategories)

    // TODO: Clear the category select dropdown

    // TODO: Loop through categories and create <option> elements
    //   Hint: const option = document.createElement('option')
    //         option.value = category
    //         option.textContent = category
  }

  // --- Phase 3: Event Binding ---

  #bindEvents() {
    // TODO 1: Listen for 'submit' on the form
    //   - preventDefault()
    //   - Call #handleAddTransaction()

    // TODO 2: Listen for 'change' on type radio buttons
    //   - Call #populateCategories() to update category options
    //   Hint: Listen on each radio with name="txn-type"

    // TODO 3: Listen for 'click' on .filter-tabs (EVENT DELEGATION)
    //   - Update active tab styling
    //   - Set #currentFilter from data-type attribute
    //   - Call this.render()

    // TODO 4: Listen for 'change' on sort dropdown
    //   - Update #currentSort
    //   - Call this.render()

    // TODO 5: Listen for 'click' on transaction list (EVENT DELEGATION)
    //   - If .btn-delete is clicked, get transaction ID and delete
    //   Hint: e.target.closest('.btn-delete') and
    //         e.target.closest('.transaction-card').dataset.id
  }

  // --- Helper: Set today's date ---

  #setDefaultDate() {
    // TODO: Format today as YYYY-MM-DD and set as dateInput.value
  }

  // --- Phase 4: Event Handlers ---

  #handleAddTransaction() {
    // TODO: Read form values:
    //   type → from checked radio button
    //   description → trimmed text
    //   amount → from amount input
    //   category → from category select
    //   date → from date input

    // TODO: Validate:
    //   - description must not be empty
    //   - amount must be a positive number
    //   - date must be provided

    // TODO: Call budget.addTransaction(...) inside try/catch

    // TODO: Reset form, re-set default date, re-populate categories

    // TODO: Call this.render()
  }

  #handleDeleteTransaction(id) {
    // TODO: Call budget.removeTransaction(id)
    // TODO: Call this.render()
  }

  // --- Utility ---

  #showError(message) {
    // TODO: Display error message on formError element
  }

  #clearError() {
    // TODO: Clear and hide formError element
  }

  // ============================================================
  // PHASE 5 — Rendering
  // ============================================================

  render() {
    // TODO: Call #renderSummary()
    // TODO: Call #renderTransactions()
    // TODO: Call #renderDashboard()
  }

  #renderSummary() {
    // TODO: Get balance, total income, total expenses from budget

    // TODO: Update balanceEl, incomeEl, expensesEl text content
    //   Use Budget.formatCurrency() for formatting

    // TODO: For balance, show + or - prefix and apply color
    //   Positive → green, Negative → red, Zero → default
  }

  #renderTransactions() {
    // TODO: Get transactions filtered by #currentFilter
    //   using budget.getByType()

    // TODO: Sort them using budget.getSortedTransactions()

    // TODO: Clear existing transaction cards from DOM

    // TODO: Show/hide empty state

    // TODO: For each transaction, create a card and append to list
  }

  #createTransactionCard(transaction) {
    // TODO: Create a div with createElement('div')

    // TODO: Set className: 'transaction-card income-card' or 'expense-card'
    //   Hint: Use instanceof to check type, or use getType()

    // TODO: Set dataset.id to transaction.id

    // TODO: Build innerHTML using template literal:
    //   - An icon div (.txn-icon)
    //   - Description (.txn-description)
    //   - Category badge (.txn-category-badge)
    //   - Formatted date (.txn-date)
    //   - Amount (.txn-amount) — use formatAmount() for polymorphic display
    //   - Delete button (.btn-delete)

    // HINT: HTML structure to generate:
    /*
    <div class="txn-left">
      <div class="txn-icon [icon-income or icon-expense]">
        [↑ or ↓]
      </div>
      <div class="txn-info">
        <span class="txn-description">[description]</span>
        <div class="txn-meta">
          <span class="txn-category-badge">[category]</span>
          <span class="txn-date">[formatted date]</span>
        </div>
      </div>
    </div>
    <div class="txn-right">
      <span class="txn-amount [amount-income or amount-expense]">[formatted amount]</span>
      <button class="btn-delete" title="Delete">✕</button>
    </div>
    */

    // TODO: Return the card
  }

  #renderDashboard() {
    // TODO: Call #renderCategoryBreakdown()
    // TODO: Call #renderMonthlySummary()
  }

  #renderCategoryBreakdown() {
    // TODO: Get category breakdown from budget.getCategoryBreakdown()

    // TODO: If no data, show placeholder text

    // TODO: For each category, create HTML for a bar chart:
    //   - Category name and amount
    //   - A bar whose width = percentage + '%'
    //   - Percentage text

    // HINT: Use map() to generate HTML strings, then join('')
    //  and set innerHTML on the categoryBreakdown element

    // HINT: HTML structure per category:
    /*
    <div class="category-bar">
      <div class="category-bar-header">
        <span class="category-bar-name">[category]</span>
        <span class="category-bar-amount">[formatted amount]</span>
      </div>
      <div class="category-bar-track">
        <div class="category-bar-fill" style="width: [percentage]%"></div>
      </div>
      <span class="category-bar-percentage">[percentage]%</span>
    </div>
    */
  }

  #renderMonthlySummary() {
    // TODO: Get monthly summary from budget.getMonthlySummary()

    // TODO: If no data, show placeholder text

    // TODO: For each month, create a row showing:
    //   - Month name
    //   - Income total (green)
    //   - Expense total (red)
    //   - Balance (blue)

    // HINT: Use map() and join('') for the HTML
    //   Set innerHTML on monthlySummary element

    // HINT: HTML structure per month:
    /*
    <div class="monthly-row">
      <span class="monthly-label">[month year]</span>
      <div class="monthly-values">
        <span class="monthly-income">+₹[income]</span>
        <span class="monthly-expense">-₹[expenses]</span>
        <span class="monthly-balance">₹[balance]</span>
      </div>
    </div>
    */
  }
}


// ============================================================
// PHASE 5 — Initialize the App
// ============================================================

// TODO: Create a new App instance
// TODO: Call app.init() inside a DOMContentLoaded event listener
