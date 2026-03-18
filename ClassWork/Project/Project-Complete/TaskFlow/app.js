/* ============================================================
   TASKFLOW — Smart Task Manager
   COMPLETE SOLUTION (For instructor reference only)
   ============================================================ */


// ============================================================
// PHASE 1 — Data Model
// ============================================================

// ----- Task Class -----

class Task {
  #id;
  #title;
  #description;
  #category;
  #priority;
  #dueDate;
  #completed;
  #createdAt;

  constructor(title, description, category, priority, dueDate) {
    this.#id = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.title = title;
    this.#description = description ?? '';
    this.#category = category;
    this.#priority = priority;
    this.#dueDate = new Date(dueDate);
    this.#completed = false;
    this.#createdAt = new Date();
  }

  // --- Getters ---

  get id() { return this.#id; }
  get title() { return this.#title; }
  get description() { return this.#description; }
  get category() { return this.#category; }
  get priority() { return this.#priority; }
  get dueDate() { return this.#dueDate; }
  get completed() { return this.#completed; }
  get createdAt() { return this.#createdAt; }

  // --- Setters with Validation ---

  set title(value) {
    if (!value || value.trim().length === 0) {
      throw new Error('Title cannot be empty');
    }
    this.#title = value.trim();
  }

  set description(value) {
    this.#description = value?.trim() ?? '';
  }

  // --- Computed Properties ---

  get isOverdue() {
    if (this.#completed) return false;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = new Date(this.#dueDate);
    due.setHours(0, 0, 0, 0);
    return due < now;
  }

  get formattedDueDate() {
    return this.#dueDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  get daysRemaining() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = new Date(this.#dueDate);
    due.setHours(0, 0, 0, 0);
    const diffMs = due - now;
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  get dueDateStatus() {
    const days = this.daysRemaining;
    if (this.#completed) return 'Completed';
    if (days < 0) return `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} overdue`;
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `${days} days remaining`;
  }

  // --- Methods ---

  toggleComplete() {
    this.#completed = !this.#completed;
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      category: this.#category,
      priority: this.#priority,
      dueDate: this.#dueDate.toISOString(),
      completed: this.#completed,
      createdAt: this.#createdAt.toISOString()
    };
  }

  static fromJSON(data) {
    const task = new Task(
      data.title,
      data.description,
      data.category,
      data.priority,
      data.dueDate
    );
    task.#id = data.id;
    task.#completed = data.completed;
    task.#createdAt = new Date(data.createdAt);
    return task;
  }
}


// ----- Collection Base Class -----

class Collection {
  #items;

  constructor() {
    this.#items = [];
  }

  get items() {
    return [...this.#items];
  }

  get count() {
    return this.#items.length;
  }

  addItem(item) {
    this.#items.push(item);
  }

  removeItem(id) {
    const index = this.#items.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.#items.splice(index, 1);
    return true;
  }

  findItem(id) {
    return this.#items.find(item => item.id === id) ?? null;
  }

  clearAll() {
    this.#items = [];
  }

  getDisplayInfo() {
    return `Collection: ${this.count} items`;
  }
}


// ----- TaskManager Class (extends Collection) -----

class TaskManager extends Collection {
  #storageKey;
  #categoryMap;

  constructor(storageKey = 'taskflow-tasks') {
    super();
    this.#storageKey = storageKey;
    this.#categoryMap = new Map([
      ['Work', '💼'],
      ['Personal', '👤'],
      ['Study', '📚'],
      ['Other', '📌']
    ]);
  }

  // Override — polymorphism
  getDisplayInfo() {
    const stats = this.getStatistics();
    return `Task Manager: ${stats.total} tasks (${stats.completed} done, ${stats.overdue} overdue)`;
  }

  getCategoryIcon(category) {
    return this.#categoryMap.get(category) ?? '📌';
  }

  // --- Task Operations ---

  addTask(title, description, category, priority, dueDate) {
    const task = new Task(title, description, category, priority, dueDate);
    this.addItem(task);
    this.save();
    return task;
  }

  deleteTask(id) {
    const result = this.removeItem(id);
    if (result) this.save();
    return result;
  }

  toggleTaskComplete(id) {
    const task = this.findItem(id);
    if (task) {
      task.toggleComplete();
      this.save();
    }
    return task;
  }

  // --- Filtering ---

  getFilteredTasks(category = 'All') {
    const tasks = this.items;
    if (category === 'All') return tasks;
    return tasks.filter(task => task.category === category);
  }

  // --- Sorting ---

  getSortedTasks(tasks, sortBy = 'date') {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };

    return [...tasks].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }

  // --- Search ---

  searchTasks(query) {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return this.items;

    return this.items.filter(task =>
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm)
    );
  }

  // --- Statistics ---

  getStatistics() {
    const tasks = this.items;
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const overdue = tasks.filter(task => task.isOverdue).length;

    const categoryCount = tasks.reduce((map, task) => {
      const current = map.get(task.category) || 0;
      map.set(task.category, current + 1);
      return map;
    }, new Map());

    const completionRate = total > 0
      ? Math.round((completed / total) * 100)
      : 0;

    return { total, completed, overdue, categoryCount, completionRate };
  }

  // --- Persistence ---

  save() {
    try {
      const data = this.items.map(task => task.toJSON());
      localStorage.setItem(this.#storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  load() {
    try {
      const data = localStorage.getItem(this.#storageKey);
      if (!data) return;

      const tasks = JSON.parse(data);
      tasks.forEach(taskData => {
        const task = Task.fromJSON(taskData);
        this.addItem(task);
      });
    } catch (error) {
      console.error('Error loading tasks:', error);
      this.clearAll();
    }
  }
}


// ============================================================
// PHASE 2–5 — App Controller
// ============================================================

class App {
  #taskManager;
  #currentFilter;
  #currentSort;
  #searchQuery;

  constructor() {
    this.#taskManager = new TaskManager();
    this.#currentFilter = 'All';
    this.#currentSort = 'date';
    this.#searchQuery = '';
  }

  init() {
    this.#taskManager.load();
    this.#cacheDOMElements();
    this.#bindEvents();
    this.#setDefaultDate();
    this.render();
  }

  // --- DOM Caching ---

  #cacheDOMElements() {
    this.form = document.getElementById('task-form');
    this.titleInput = document.getElementById('task-title');
    this.descriptionInput = document.getElementById('task-description');
    this.categorySelect = document.getElementById('task-category');
    this.dueDateInput = document.getElementById('task-due-date');
    this.formError = document.getElementById('form-error');
    this.taskList = document.getElementById('task-list');
    this.emptyState = document.getElementById('empty-state');
    this.searchInput = document.getElementById('search-input');
    this.sortSelect = document.getElementById('sort-select');
    this.totalTasks = document.getElementById('total-tasks');
    this.completedTasks = document.getElementById('completed-tasks');
    this.overdueTasks = document.getElementById('overdue-tasks');
    this.filterTabs = document.querySelectorAll('.filter-tab');
  }

  // --- Event Binding ---

  #bindEvents() {
    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#handleAddTask();
    });

    // Filter tabs — event delegation
    document.querySelector('.filter-tabs').addEventListener('click', (e) => {
      const tab = e.target.closest('.filter-tab');
      if (!tab) return;

      this.filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      this.#currentFilter = tab.dataset.category;
      this.render();
    });

    // Sort change
    this.sortSelect.addEventListener('change', (e) => {
      this.#currentSort = e.target.value;
      this.render();
    });

    // Search input
    this.searchInput.addEventListener('input', (e) => {
      this.#searchQuery = e.target.value;
      this.render();
    });

    // Task list — event delegation for complete/delete
    this.taskList.addEventListener('click', (e) => {
      const taskCard = e.target.closest('.task-card');
      if (!taskCard) return;

      const taskId = taskCard.dataset.id;

      if (e.target.closest('.btn-complete')) {
        this.#handleToggleComplete(taskId);
      } else if (e.target.closest('.btn-delete')) {
        this.#handleDeleteTask(taskId);
      }
    });
  }

  // --- Helpers ---

  #setDefaultDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    this.dueDateInput.value = dateStr;
    this.dueDateInput.min = dateStr;
  }

  // --- Event Handlers ---

  #handleAddTask() {
    const title = this.titleInput.value.trim();
    const description = this.descriptionInput.value.trim();
    const category = this.categorySelect.value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const dueDate = this.dueDateInput.value;

    if (!title) {
      this.#showError('Please enter a task title');
      return;
    }

    if (!dueDate) {
      this.#showError('Please select a due date');
      return;
    }

    try {
      this.#taskManager.addTask(title, description, category, priority, dueDate);
      this.form.reset();
      this.#setDefaultDate();
      document.querySelector('input[name="priority"][value="Low"]').checked = true;
      this.#clearError();
      this.render();
    } catch (error) {
      this.#showError(error.message);
    }
  }

  #handleToggleComplete(id) {
    this.#taskManager.toggleTaskComplete(id);
    this.render();
  }

  #handleDeleteTask(id) {
    this.#taskManager.deleteTask(id);
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
    this.#renderStats();
    this.#renderTasks();
  }

  #renderStats() {
    const stats = this.#taskManager.getStatistics();
    this.totalTasks.textContent = stats.total;
    this.completedTasks.textContent = stats.completed;
    this.overdueTasks.textContent = stats.overdue;
  }

  #renderTasks() {
    let tasks;
    if (this.#searchQuery) {
      tasks = this.#taskManager.searchTasks(this.#searchQuery);
    } else {
      tasks = this.#taskManager.getFilteredTasks(this.#currentFilter);
    }

    tasks = this.#taskManager.getSortedTasks(tasks, this.#currentSort);

    // Clear existing task cards
    this.taskList.querySelectorAll('.task-card').forEach(card => card.remove());

    // Show/hide empty state
    if (tasks.length === 0) {
      this.emptyState.style.display = 'block';
      return;
    }
    this.emptyState.style.display = 'none';

    // Render each task
    tasks.forEach(task => {
      const card = this.#createTaskCard(task);
      this.taskList.appendChild(card);
    });
  }

  #createTaskCard(task) {
    const card = document.createElement('div');
    card.className = `task-card${task.completed ? ' completed' : ''}${task.isOverdue ? ' overdue' : ''}`;
    card.dataset.id = task.id;

    card.innerHTML = `
      <div class="task-left">
        <button class="btn-complete${task.completed ? ' checked' : ''}"
                title="${task.completed ? 'Mark as incomplete' : 'Mark as complete'}">
          ${task.completed ? '✓' : ''}
        </button>
        <div class="task-info">
          <h3 class="task-title">${task.title}</h3>
          ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
          <div class="task-meta">
            <span class="category-badge category-${task.category.toLowerCase()}">${task.category}</span>
            <span class="priority-badge priority-${task.priority.toLowerCase()}">${task.priority}</span>
            <span class="task-date${task.isOverdue ? ' text-overdue' : ''}">${task.formattedDueDate}</span>
            <span class="task-status${task.isOverdue ? ' text-overdue' : ''}">${task.dueDateStatus}</span>
          </div>
        </div>
      </div>
      <button class="btn-delete" title="Delete task">✕</button>
    `;

    return card;
  }
}


// ============================================================
// Initialize
// ============================================================

const app = new App();
document.addEventListener('DOMContentLoaded', () => app.init());
