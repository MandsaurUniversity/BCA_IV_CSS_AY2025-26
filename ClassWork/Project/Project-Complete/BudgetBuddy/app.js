/* ============================================================
   BUDGETBUDDY — Personal Finance Tracker
   COMPLETE SOLUTION (For instructor reference only)
   ============================================================ */


// ============================================================
// PHASE 1 — Data Model
// ============================================================

// ----- Transaction Base Class -----

class Transaction {
  #id;
  #description;
  #amount;
  #category;
  #date;
  #createdAt;

  constructor(description, amount, category, date) {
    this.#id = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.description = description;
    this.amount = amount;
    this.#category = category;
    this.#date = new Date(date);
    this.#createdAt = new Date();
  }

  // --- Getters ---

  get id() { return this.#id; }
  get description() { return this.#description; }
  get amount() { return this.#amount; }
  get category() { return this.#category; }
  get date() { return this.#date; }
  get createdAt() { return this.#createdAt; }

  // --- Setters with Validation ---

  set description(value) {
    if (!value || value.trim().length === 0) {
      throw new Error('Description cannot be empty');
    }
    this.#description = value.trim();
  }

  set amount(value) {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) {
      throw new Error('Amount must be a positive number');
    }
    this.#amount = num;
  }

  // --- Formatted Properties ---

  get formattedDate() {
    return this.#date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  get monthYear() {
    return `${this.#date.toLocaleString('en-IN', { month: 'long' })} ${this.#date.getFullYear()}`;
  }

  // --- Polymorphic Methods (overridden by child classes) ---

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

  // --- Serialization ---

  toJSON() {
    return {
      id: this.#id,
      type: this.getType(),
      description: this.#description,
      amount: this.#amount,
      category: this.#category,
      date: this.#date.toISOString(),
      createdAt: this.#createdAt.toISOString()
    };
  }

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
}


// ----- Income Class -----

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


// ----- Expense Class -----

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


// ----- Budget Class -----

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

  // --- Getters ---

  get transactions() { return [...this.#transactions]; }
  get count() { return this.#transactions.length; }
  get categories() { return this.#categories; }

  // --- Category Helpers ---

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

  // --- Transaction Operations ---

  addTransaction(type, description, amount, category, date) {
    const transaction = type === 'income'
      ? new Income(description, amount, category, date)
      : new Expense(description, amount, category, date);

    this.#transactions.push(transaction);
    this.save();
    return transaction;
  }

  removeTransaction(id) {
    const index = this.#transactions.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.#transactions.splice(index, 1);
    this.save();
    return true;
  }

  // --- Calculations ---

  getBalance() {
    return this.#transactions.reduce((sum, t) => sum + t.signedAmount, 0);
  }

  getTotalIncome() {
    return this.#transactions
      .filter(t => t instanceof Income)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpenses() {
    return this.#transactions
      .filter(t => t instanceof Expense)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // --- Filtering ---

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

  // --- Data Processing ---

  getCategoryBreakdown() {
    const expenses = this.#transactions.filter(t => t instanceof Expense);
    const totalExpenses = this.getTotalExpenses();

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

    return grouped
      .map(item => ({
        ...item,
        percentage: totalExpenses > 0
          ? Math.round((item.amount / totalExpenses) * 100)
          : 0
      }))
      .sort((a, b) => b.amount - a.amount);
  }

  getMonthlySummary() {
    const summary = this.#transactions.reduce((acc, t) => {
      const key = t.monthYear;
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

  // --- Sorting ---

  getSortedTransactions(transactions, sortBy = 'date') {
    return [...transactions].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'amount':
          return b.amount - a.amount;
        case 'description':
          return a.description.localeCompare(b.description);
        default:
          return 0;
      }
    });
  }

  // --- Static Utility ---

  static formatCurrency(amount) {
    const absAmount = Math.abs(amount);
    return `₹${absAmount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  // --- Persistence ---

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
}


// ============================================================
// PHASE 2–5 — App Controller
// ============================================================

class App {
  #budget;
  #currentFilter;
  #currentSort;

  constructor() {
    this.#budget = new Budget();
    this.#currentFilter = 'all';
    this.#currentSort = 'date';
  }

  init() {
    this.#budget.load();
    this.#cacheDOMElements();
    this.#bindEvents();
    this.#setDefaultDate();
    this.#populateCategories();
    this.render();
  }

  // --- DOM Caching ---

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

  // --- Populate Categories ---

  #populateCategories() {
    const type = document.querySelector('input[name="txn-type"]:checked').value;
    const categories = type === 'income'
      ? this.#budget.getIncomeCategories()
      : this.#budget.getExpenseCategories();

    this.categorySelect.innerHTML = '';

    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      this.categorySelect.appendChild(option);
    });
  }

  // --- Event Binding ---

  #bindEvents() {
    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#handleAddTransaction();
    });

    // Type toggle updates categories
    document.querySelectorAll('input[name="txn-type"]').forEach(radio => {
      radio.addEventListener('change', () => {
        this.#populateCategories();
      });
    });

    // Filter tabs — event delegation
    document.querySelector('.filter-tabs').addEventListener('click', (e) => {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;

      this.filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      this.#currentFilter = tab.dataset.type;
      this.render();
    });

    // Sort change
    this.sortSelect.addEventListener('change', (e) => {
      this.#currentSort = e.target.value;
      this.render();
    });

    // Transaction list — event delegation for delete
    this.transactionList.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.btn-delete');
      if (!deleteBtn) return;

      const card = e.target.closest('.transaction-card');
      if (!card) return;

      this.#handleDeleteTransaction(card.dataset.id);
    });
  }

  // --- Helpers ---

  #setDefaultDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // --- Event Handlers ---

  #handleAddTransaction() {
    const type = document.querySelector('input[name="txn-type"]:checked').value;
    const description = this.descInput.value.trim();
    const amount = this.amountInput.value;
    const category = this.categorySelect.value;
    const date = this.dateInput.value;

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

  #handleDeleteTransaction(id) {
    this.#budget.removeTransaction(id);
    this.render();
  }

  #showError(message) {
    this.formError.textContent = message;
    this.formError.style.display = 'block';
  }

  #clearError() {
    this.formError.textContent = '';
    this.formError.style.display = 'none';
  }

  // --- Rendering ---

  render() {
    this.#renderSummary();
    this.#renderTransactions();
    this.#renderDashboard();
  }

  #renderSummary() {
    const balance = this.#budget.getBalance();
    const income = this.#budget.getTotalIncome();
    const expenses = this.#budget.getTotalExpenses();

    const prefix = balance < 0 ? '-' : '';
    this.balanceEl.textContent = `${prefix}${Budget.formatCurrency(balance)}`;
    this.incomeEl.textContent = Budget.formatCurrency(income);
    this.expensesEl.textContent = Budget.formatCurrency(expenses);
  }

  #renderTransactions() {
    let transactions = this.#budget.getByType(this.#currentFilter);
    transactions = this.#budget.getSortedTransactions(transactions, this.#currentSort);

    // Clear existing cards
    this.transactionList.querySelectorAll('.transaction-card').forEach(card => card.remove());

    // Show/hide empty state
    if (transactions.length === 0) {
      this.emptyState.style.display = 'block';
      return;
    }
    this.emptyState.style.display = 'none';

    // Render each transaction
    transactions.forEach(transaction => {
      const card = this.#createTransactionCard(transaction);
      this.transactionList.appendChild(card);
    });
  }

  #createTransactionCard(transaction) {
    const card = document.createElement('div');
    const type = transaction.getType();

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

  #renderDashboard() {
    this.#renderCategoryBreakdown();
    this.#renderMonthlySummary();
  }

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
}


// ============================================================
// Initialize
// ============================================================

const app = new App();
document.addEventListener('DOMContentLoaded', () => app.init());
