# TaskFlow — Hints & Guidance

> Use this file when you're stuck on a specific TODO.
> Each section matches a phase and class in `app.js`.

---

## Phase 1 — Task Class

### Private Fields Declaration

```js
class Task {
  #id;
  #title;
  #description;
  #category;
  #priority;
  #dueDate;
  #completed;
  #createdAt;
  // ...
}
```

Private fields MUST be declared at the top of the class body before the constructor.

### Generating a Unique ID

```js
this.#id = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
```

- `Date.now()` gives milliseconds since 1970 (a large unique number).
- `Math.random().toString(36).substr(2, 9)` gives a random alphanumeric string.

### Using Setters in the Constructor

When you write `this.title = title;` inside the constructor, JavaScript automatically calls the `set title(value)` setter — which does the validation for you. This way you don't duplicate validation logic.

### Setter with Validation

```js
set title(value) {
  if (!value || value.trim().length === 0) {
    throw new Error('Title cannot be empty');
  }
  this.#title = value.trim();
}
```

### Using `??` (Nullish Coalescing)

```js
this.#description = description ?? '';
// If description is null or undefined, use '' instead
```

### The `isOverdue` Getter

```js
get isOverdue() {
  if (this.#completed) return false;
  const now = new Date();
  now.setHours(0, 0, 0, 0);  // Start of today
  const due = new Date(this.#dueDate);
  due.setHours(0, 0, 0, 0);
  return due < now;
}
```

Why `setHours(0,0,0,0)`? Because we want to compare **dates**, not exact times. A task due "today" shouldn't be marked overdue just because it's afternoon.

### The `daysRemaining` Getter

```js
get daysRemaining() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(this.#dueDate);
  due.setHours(0, 0, 0, 0);
  const diffMs = due - now;  // Difference in milliseconds
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
```

The formula: `milliseconds / (1000 ms × 60 sec × 60 min × 24 hr)` converts ms to days.

### The `dueDateStatus` Getter

```js
get dueDateStatus() {
  const days = this.daysRemaining;
  if (this.#completed) return 'Completed';
  if (days < 0) return `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} overdue`;
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  return `${days} days remaining`;
}
```

Notice the ternary `days !== 1 ? 's' : ''` for plural handling!

### The `toJSON()` Method

```js
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
```

We convert Date objects to ISO strings because `JSON.stringify()` can't serialize Date objects directly.

### The `static fromJSON()` Method

```js
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
```

**Why can a static method access `#id`?** Because static methods are defined inside the same class body. JavaScript allows any code inside a class to access that class's private fields.

---

## Phase 1 — Collection Class

### Returning a Copy

```js
get items() {
  return [...this.#items]; // Spread into a new array
}
```

Why a copy? So that external code can't accidentally modify the internal array. This is **encapsulation** in action.

### `removeItem` with `findIndex` and `splice`

```js
removeItem(id) {
  const index = this.#items.findIndex(item => item.id === id);
  if (index === -1) return false;
  this.#items.splice(index, 1); // Remove 1 element at index
  return true;
}
```

### `findItem` with `??`

```js
findItem(id) {
  return this.#items.find(item => item.id === id) ?? null;
}
```

If `find()` returns `undefined` (not found), `??` converts it to `null`.

---

## Phase 1 — TaskManager Class

### Calling `super()` and Overriding

```js
class TaskManager extends Collection {
  #storageKey;
  #categoryMap;

  constructor(storageKey = 'taskflow-tasks') {
    super();  // MUST be first line — initializes parent's #items
    this.#storageKey = storageKey;
    this.#categoryMap = new Map([
      ['Work', '💼'],
      ['Personal', '👤'],
      ['Study', '📚'],
      ['Other', '📌']
    ]);
  }

  // This OVERRIDES the parent's method:
  getDisplayInfo() {
    const stats = this.getStatistics();
    return `Task Manager: ${stats.total} tasks (${stats.completed} done, ${stats.overdue} overdue)`;
  }
}
```

### Filtering with `filter()`

```js
getFilteredTasks(category = 'All') {
  const tasks = this.items;  // Uses inherited getter
  if (category === 'All') return tasks;
  return tasks.filter(task => task.category === category);
}
```

### Sorting with Custom Comparators

```js
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
```

**Key insight:** `[...tasks]` creates a copy so we don't mutate the original array. `sort()` mutates in place, so we must copy first.

### Statistics with `reduce()` and `Map`

```js
getStatistics() {
  const tasks = this.items;
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const overdue = tasks.filter(t => t.isOverdue).length;

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
```

**How reduce builds a Map:**
- Start with an empty `new Map()`
- For each task, get the current count for its category (or 0)
- Set the new count = current + 1
- Return the map for the next iteration

### localStorage Save/Load

```js
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
```

---

## Phase 3 — DOM Element Caching

```js
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
```

**Why cache?** Calling `getElementById()` every time we render is wasteful. Cache references once, reuse everywhere.

---

## Phase 3 — Event Binding

### Form Submit

```js
this.form.addEventListener('submit', (e) => {
  e.preventDefault();  // Stop the page from reloading!
  this.#handleAddTask();
});
```

### Event Delegation on Filter Tabs

```js
document.querySelector('.filter-tabs').addEventListener('click', (e) => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;  // Clicked between tabs

  this.filterTabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  this.#currentFilter = tab.dataset.category;
  this.render();
});
```

**Event delegation explained:** Instead of 4 listeners (one per tab), we have ONE listener on the parent. When any child is clicked, the event "bubbles up" to the parent. We use `e.target.closest('.filter-tab')` to find which tab was clicked.

### Event Delegation on Task List (Complete & Delete)

```js
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
```

---

## Phase 4 — Setting Default Date

```js
#setDefaultDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;
  this.dueDateInput.value = dateStr;
  this.dueDateInput.min = dateStr;  // Can't pick past dates
}
```

Remember: `getMonth()` is **0-indexed** (January = 0), so we add 1.

---

## Phase 4 — Adding a Task

```js
#handleAddTask() {
  const title = this.titleInput.value.trim();
  const description = this.descriptionInput.value.trim();
  const category = this.categorySelect.value;
  const priority = document.querySelector('input[name="priority"]:checked').value;
  const dueDate = this.dueDateInput.value;

  // Validation
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
```

---

## Phase 5 — Rendering Tasks

### Getting the Right Tasks

```js
#renderTasks() {
  let tasks;
  if (this.#searchQuery) {
    tasks = this.#taskManager.searchTasks(this.#searchQuery);
  } else {
    tasks = this.#taskManager.getFilteredTasks(this.#currentFilter);
  }

  tasks = this.#taskManager.getSortedTasks(tasks, this.#currentSort);

  // Clear old cards
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
```

### Creating a Task Card

```js
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
```

**Template literal trick:** Notice `${task.description ? \`<p>...</p>\` : ''}` — this conditionally includes the description paragraph only if one exists.

---

## Common Mistakes to Avoid

1. **Forgetting `e.preventDefault()`** on form submit — the page will reload and you'll lose everything.
2. **Mutating arrays in place** — always spread `[...array]` before `.sort()`.
3. **Comparing dates** — use `new Date(a.dueDate) - new Date(b.dueDate)`, not string comparison.
4. **Forgetting `super()`** — the constructor of a child class MUST call `super()` before using `this`.
5. **Accessing private fields from child class** — you can't access `#items` inside `TaskManager`. Use the public getter `this.items` instead.

---

## Testing Checklist

After completing all phases, verify these work:

- [ ] Add a task with all fields filled → task appears in the list
- [ ] Add a task with empty title → error message appears
- [ ] Click the circle button → task toggles between completed/incomplete
- [ ] Click the ✕ button → task is removed
- [ ] Click filter tabs → only matching tasks are shown
- [ ] Type in search box → tasks filter by title/description in real time
- [ ] Change sort dropdown → tasks reorder immediately
- [ ] Refresh the page → all tasks are still there (localStorage)
- [ ] Statistics bar updates correctly after every action
- [ ] Overdue tasks have a red left border
