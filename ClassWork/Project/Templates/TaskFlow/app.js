/* ============================================================
   TASKFLOW — Smart Task Manager
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
// 1a. Task Class
// Concepts: class, constructor, private # fields,
//           getters, setters with validation
// --------------------------------------------------

class Task {
  // TODO: Declare private fields
  //   #id, #title, #description, #category, #priority,
  //   #dueDate, #completed, #createdAt

  constructor(title, description, category, priority, dueDate) {
    // TODO: Generate a unique ID using Date.now() and Math.random()
    //   Hint: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // TODO: Set this.title using the setter (for validation)

    // TODO: Set #description using nullish coalescing (??) for default ''

    // TODO: Set #category, #priority

    // TODO: Set #dueDate as a new Date(dueDate)

    // TODO: Set #completed to false

    // TODO: Set #createdAt to new Date()
  }

  // --- Getters ---
  // TODO: Create getters for all private fields:
  //   id, title, description, category, priority,
  //   dueDate, completed, createdAt

  // --- Setters with Validation ---

  // TODO: Create a setter for 'title' that:
  //   - Throws an Error if value is empty or only whitespace
  //   - Trims the value before storing

  // TODO: Create a setter for 'description' that:
  //   - Uses optional chaining (?.) and nullish coalescing (??)
  //     to safely trim, defaulting to ''

  // --- Computed Properties (Getters) ---

  // TODO: Create a getter 'isOverdue' that returns true if:
  //   - The task is NOT completed AND
  //   - The dueDate is before today
  //   Hint: Compare dates after setting hours to 0 with setHours(0,0,0,0)

  // TODO: Create a getter 'formattedDueDate' that returns
  //   the due date formatted as "17 Mar 2026"
  //   Hint: Use toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

  // TODO: Create a getter 'daysRemaining' that returns
  //   the number of days until the due date (can be negative)
  //   Hint: (dueDate - today) / (1000 * 60 * 60 * 24), then Math.ceil()

  // TODO: Create a getter 'dueDateStatus' that returns a string:
  //   - If completed → "Completed"
  //   - If days < 0  → "X day(s) overdue"
  //   - If days === 0 → "Due today"
  //   - If days === 1 → "Due tomorrow"
  //   - Otherwise    → "X days remaining"

  // --- Methods ---

  // TODO: Create a method toggleComplete() that flips #completed

  // TODO: Create a method toJSON() that returns a plain object
  //   with all the task data (for localStorage)
  //   Hint: Convert dates to ISO strings with .toISOString()

  // TODO: Create a STATIC method fromJSON(data) that:
  //   - Creates a new Task from a plain object
  //   - Restores the original id, completed status, and createdAt
  //   Hint: Static methods can access private fields of same-class instances
}


// --------------------------------------------------
// 1b. Collection Base Class
// Concepts: class, encapsulation, method to be
//           overridden (polymorphism)
// --------------------------------------------------

class Collection {
  // TODO: Declare private field #items

  constructor() {
    // TODO: Initialize #items as an empty array
  }

  // TODO: Create a getter 'items' that returns a COPY of the array
  //   Hint: return [...this.#items]

  // TODO: Create a getter 'count' that returns the array length

  // TODO: Create method addItem(item) — pushes item to #items

  // TODO: Create method removeItem(id) that:
  //   - Uses findIndex() to locate the item
  //   - Uses splice() to remove it
  //   - Returns true if found, false if not

  // TODO: Create method findItem(id) that:
  //   - Uses find() to locate the item
  //   - Uses ?? to return null if not found

  // TODO: Create method clearAll() — resets #items to []

  // TODO: Create method getDisplayInfo() that returns a string
  //   like "Collection: 5 items"
  //   This method will be OVERRIDDEN by TaskManager — polymorphism!
}


// --------------------------------------------------
// 1c. TaskManager Class (extends Collection)
// Concepts: inheritance (extends), super, method
//           overriding, Map data structure
// --------------------------------------------------

class TaskManager extends Collection {
  // TODO: Declare private fields: #storageKey, #categoryMap

  constructor(storageKey = 'taskflow-tasks') {
    // TODO: Call super() to initialize the parent class

    // TODO: Set #storageKey

    // TODO: Initialize #categoryMap as a new Map with entries:
    //   'Work' → '💼', 'Personal' → '👤',
    //   'Study' → '📚', 'Other' → '📌'
  }

  // TODO: Override getDisplayInfo() — polymorphism!
  //   Return something like "Task Manager: 5 tasks (3 done, 1 overdue)"
  //   Hint: Use getStatistics() to get the numbers

  // TODO: Create method getCategoryIcon(category)
  //   Use Map.get() with ?? for fallback

  // --- Task Operations ---

  // TODO: Create method addTask(title, description, category, priority, dueDate)
  //   - Create a new Task instance
  //   - Use this.addItem() (inherited from Collection)
  //   - Call this.save()
  //   - Return the task

  // TODO: Create method deleteTask(id)
  //   - Use this.removeItem(id) (inherited)
  //   - Call this.save() if successful
  //   - Return the result

  // TODO: Create method toggleTaskComplete(id)
  //   - Use this.findItem(id) (inherited)
  //   - Call task.toggleComplete()
  //   - Call this.save()
  //   - Return the task

  // --- Filtering (uses filter()) ---

  // TODO: Create method getFilteredTasks(category = 'All')
  //   - If category is 'All', return all items
  //   - Otherwise, filter items where task.category === category

  // --- Sorting (uses sort() with custom comparators) ---

  // TODO: Create method getSortedTasks(tasks, sortBy = 'date')
  //   - Return a NEW sorted array (don't mutate the input!)
  //   - Use a switch statement for sortBy:
  //     'date'     → compare dueDate values
  //     'priority' → use a priorityOrder object { High: 3, Medium: 2, Low: 1 }
  //     'title'    → use localeCompare()
  //   Hint: spread [...tasks] before sorting

  // --- Search (uses string methods) ---

  // TODO: Create method searchTasks(query)
  //   - Convert query to lowercase and trim
  //   - If empty query, return all items
  //   - Filter tasks where title OR description includes the query
  //   Hint: use .toLowerCase().includes()

  // --- Statistics (uses reduce() and Map) ---

  // TODO: Create method getStatistics()
  //   Return an object with:
  //   - total: total number of tasks
  //   - completed: count of completed tasks (use filter().length)
  //   - overdue: count of overdue tasks (use filter().length)
  //   - categoryCount: a Map of category → count (use reduce())
  //   - completionRate: percentage completed (use Math.round())

  // --- Persistence (localStorage) ---

  // TODO: Create method save()
  //   - Convert all items to JSON using .map(task => task.toJSON())
  //   - Store in localStorage with JSON.stringify()
  //   - Wrap in try/catch for error handling

  // TODO: Create method load()
  //   - Read from localStorage with getItem()
  //   - Parse with JSON.parse()
  //   - Recreate Task objects using Task.fromJSON()
  //   - Add each to collection using addItem()
  //   - Wrap in try/catch for error handling
}


// ============================================================
// PHASE 2 — App Controller (DOM & Events)
// ============================================================

// --------------------------------------------------
// 2a. App Class
// Concepts: DOM manipulation, event handling,
//           event delegation, createElement
// --------------------------------------------------

class App {
  // TODO: Declare private fields:
  //   #taskManager, #currentFilter, #currentSort, #searchQuery

  constructor() {
    // TODO: Create a new TaskManager instance
    // TODO: Set default filter to 'All'
    // TODO: Set default sort to 'date'
    // TODO: Set default search to ''
  }

  // --- Initialization ---

  init() {
    // TODO: Call taskManager.load() to restore saved tasks
    // TODO: Call this.#cacheDOMElements()
    // TODO: Call this.#bindEvents()
    // TODO: Call this.#setDefaultDate()
    // TODO: Call this.render()
  }

  // --- Phase 3: DOM Element Caching ---

  #cacheDOMElements() {
    // TODO: Use document.getElementById() or querySelector() to
    //   cache references to these DOM elements:
    //
    //   this.form            → #task-form
    //   this.titleInput      → #task-title
    //   this.descriptionInput → #task-description
    //   this.categorySelect  → #task-category
    //   this.dueDateInput    → #task-due-date
    //   this.formError       → #form-error
    //   this.taskList        → #task-list
    //   this.emptyState      → #empty-state
    //   this.searchInput     → #search-input
    //   this.sortSelect      → #sort-select
    //   this.totalTasks      → #total-tasks
    //   this.completedTasks  → #completed-tasks
    //   this.overdueTasks    → #overdue-tasks
    //   this.filterTabs      → all .filter-tab elements (querySelectorAll)
  }

  // --- Phase 3: Event Binding ---

  #bindEvents() {
    // TODO 1: Listen for 'submit' on the form
    //   - Call e.preventDefault()
    //   - Call this.#handleAddTask()

    // TODO 2: Listen for 'click' on .filter-tabs container (EVENT DELEGATION)
    //   - Find the clicked .filter-tab using e.target.closest()
    //   - Remove 'active' class from all tabs
    //   - Add 'active' to the clicked tab
    //   - Update #currentFilter from tab's data-category attribute
    //   - Call this.render()

    // TODO 3: Listen for 'change' on the sort dropdown
    //   - Update #currentSort
    //   - Call this.render()

    // TODO 4: Listen for 'input' on the search field
    //   - Update #searchQuery
    //   - Call this.render()

    // TODO 5: Listen for 'click' on the task list (EVENT DELEGATION)
    //   - Find the parent .task-card using e.target.closest()
    //   - Read the task ID from card.dataset.id
    //   - If clicked element is .btn-complete → call #handleToggleComplete(id)
    //   - If clicked element is .btn-delete  → call #handleDeleteTask(id)
  }

  // --- Helper: Set today's date as default and minimum ---

  #setDefaultDate() {
    // TODO: Calculate today's date in YYYY-MM-DD format
    //   Hint: Use padStart(2, '0') for month and day
    // TODO: Set dueDateInput.value and dueDateInput.min to that string
  }

  // --- Phase 4: Event Handlers ---

  #handleAddTask() {
    // TODO: Read values from form inputs
    //   - title: trimmed value from titleInput
    //   - description: trimmed value from descriptionInput
    //   - category: value from categorySelect
    //   - priority: value from checked radio (querySelector('input[name="priority"]:checked'))
    //   - dueDate: value from dueDateInput

    // TODO: Validate — show error if title is empty or dueDate is missing

    // TODO: Call taskManager.addTask(...) inside a try/catch

    // TODO: Reset the form, re-set default date and priority

    // TODO: Call this.render()
  }

  #handleToggleComplete(id) {
    // TODO: Call taskManager.toggleTaskComplete(id)
    // TODO: Call this.render()
  }

  #handleDeleteTask(id) {
    // TODO: Call taskManager.deleteTask(id)
    // TODO: Call this.render()
  }

  // --- Utility ---

  #showError(message) {
    // TODO: Set formError.textContent to message
    // TODO: Set formError.style.display to 'block'
  }

  #clearError() {
    // TODO: Clear formError.textContent
    // TODO: Set formError.style.display to 'none'
  }

  // ============================================================
  // PHASE 5 — Rendering
  // ============================================================

  render() {
    // TODO: Call #renderStats()
    // TODO: Call #renderTasks()
  }

  #renderStats() {
    // TODO: Get statistics from taskManager.getStatistics()
    // TODO: Update the text content of:
    //   totalTasks, completedTasks, overdueTasks
  }

  #renderTasks() {
    // TODO: Determine which tasks to show:
    //   - If #searchQuery is not empty → use taskManager.searchTasks()
    //   - Otherwise → use taskManager.getFilteredTasks(#currentFilter)

    // TODO: Sort the tasks using taskManager.getSortedTasks()

    // TODO: Remove all existing .task-card elements from the DOM
    //   Hint: querySelectorAll('.task-card').forEach(card => card.remove())

    // TODO: If no tasks, show the empty state; otherwise hide it

    // TODO: Loop through tasks and call #createTaskCard() for each,
    //   then appendChild() it to this.taskList
  }

  #createTaskCard(task) {
    // TODO: Create a div element with createElement('div')

    // TODO: Set className to 'task-card' plus:
    //   'completed' if task.completed
    //   'overdue' if task.isOverdue

    // TODO: Set dataset.id to task.id

    // TODO: Set innerHTML with template literal containing:
    //   - A .btn-complete button (checked if completed)
    //   - Task title (h3)
    //   - Description (if exists)
    //   - Category badge with class category-{category.toLowerCase()}
    //   - Priority badge with class priority-{priority.toLowerCase()}
    //   - Formatted due date
    //   - Due date status text
    //   - A .btn-delete button

    // TODO: Return the card element

    // HINT: Below is the HTML structure to generate:
    /*
    <div class="task-left">
      <button class="btn-complete [checked]" title="...">
        [✓ if completed]
      </button>
      <div class="task-info">
        <h3 class="task-title">[title]</h3>
        <p class="task-description">[description if exists]</p>
        <div class="task-meta">
          <span class="category-badge category-work">[category]</span>
          <span class="priority-badge priority-high">[priority]</span>
          <span class="task-date [text-overdue if overdue]">[formatted date]</span>
          <span class="task-status [text-overdue if overdue]">[status text]</span>
        </div>
      </div>
    </div>
    <button class="btn-delete" title="Delete task">✕</button>
    */
  }
}


// ============================================================
// PHASE 5 — Initialize the App
// ============================================================

// TODO: Create a new App instance
// TODO: Call app.init() inside a DOMContentLoaded event listener
//   Hint: document.addEventListener('DOMContentLoaded', () => app.init())
