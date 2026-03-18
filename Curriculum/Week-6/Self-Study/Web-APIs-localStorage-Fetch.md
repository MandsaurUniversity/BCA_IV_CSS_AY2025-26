# Self-Study: Web APIs — localStorage & Fetch

**Estimated Time:** 4-5 hours
**Prerequisites:** Weeks 1-5 complete, DOM Manipulation and Event Handling self-study
**Goal:** Learn to persist data in the browser and fetch data from external servers

---

## Part A: Browser Storage (localStorage & sessionStorage)

### What is Web Storage?

When you use a web application — say a notes app — you type your notes and see them on the screen. But what happens when you close the tab or refresh the page? Without some form of storage, all your data disappears because JavaScript variables only exist in memory while the page is open.

**Web Storage** solves this by giving your JavaScript code a simple **key-value storage** system built right into the browser. It lets you save data locally on the user's machine — no server, no database, no account needed. The data survives page refreshes, browser restarts, and even computer reboots.

There are two types of web storage, and they differ mainly in how long the data lasts:

| Feature | `localStorage` | `sessionStorage` |
|---------|----------------|-------------------|
| **Persists** | Until manually cleared (by code or user) | Until the browser tab/window is closed |
| **Shared** | Across all tabs on the same origin | Only within the same tab |
| **Capacity** | ~5-10 MB per origin | ~5-10 MB per origin |
| **Use case** | User preferences, saved data, caching | Temporary form data, one-time session state |

> **What is an "origin"?** An origin is the combination of protocol + domain + port. For example, `https://example.com:443` is one origin. A page at `https://example.com` cannot access localStorage data saved by `https://different-site.com` — this is a security feature called the **same-origin policy**.

**Analogy:** Think of `localStorage` like a filing cabinet in your office — documents stay there until you throw them away, and anyone in the office (any tab on the same site) can access them. `sessionStorage` is like a sticky note — it's useful right now but gets thrown away when you leave.

---

### 1. localStorage Basics

The API for both `localStorage` and `sessionStorage` is identical — just replace the word. All values stored are **strings** (this is important and we'll address it soon).

```javascript
// =============================================
// SETTING DATA — storing key-value pairs
// =============================================
localStorage.setItem("username", "Alice");
localStorage.setItem("theme", "dark");
localStorage.setItem("fontSize", "16");
// Each setItem call saves one key-value pair.
// If the key already exists, its value is overwritten.

// =============================================
// GETTING DATA — reading a stored value
// =============================================
const username = localStorage.getItem("username");
console.log(username);  // "Alice"

// Returns null if the key doesn't exist (NOT undefined — null!)
const missing = localStorage.getItem("nonExistent");
console.log(missing);  // null

// =============================================
// REMOVING DATA — deleting a single item
// =============================================
localStorage.removeItem("fontSize");
// Only removes "fontSize"; other items are untouched

// =============================================
// CLEARING ALL DATA — nuclear option
// =============================================
localStorage.clear();
// Removes EVERYTHING stored for this origin. Use carefully!

// =============================================
// CHECKING HOW MANY ITEMS are stored
// =============================================
console.log(localStorage.length);  // Number of stored items

// =============================================
// GETTING A KEY BY ITS INDEX
// =============================================
console.log(localStorage.key(0));  // Name of the first stored key
// Useful for iterating through all stored data
```

**How is this different from JavaScript variables?**

```javascript
// A regular variable — lost on page refresh
let score = 100;

// localStorage — survives page refresh
localStorage.setItem("score", "100");

// After refreshing the page:
// 'score' variable is gone (undefined)
// localStorage.getItem("score") still returns "100"
```

### Seeing Your Stored Data

You can view what's stored in localStorage using your browser's DevTools:
1. Open DevTools (F12 or Ctrl+Shift+I)
2. Go to the **Application** tab (Chrome) or **Storage** tab (Firefox)
3. In the left sidebar, expand **Local Storage** or **Session Storage**
4. You'll see all key-value pairs stored for the current site

---

### 2. Storing Complex Data (JSON)

Here's a critical limitation: **localStorage only stores strings**. If you try to store a number, boolean, array, or object, it gets silently converted to a string — often with unexpected results:

```javascript
// The problem with non-string values:
localStorage.setItem("count", 42);
console.log(localStorage.getItem("count"));        // "42" (a string, not a number!)
console.log(localStorage.getItem("count") + 1);    // "421" (string concatenation, not 43!)

localStorage.setItem("active", true);
console.log(localStorage.getItem("active"));         // "true" (a string, not a boolean!)
console.log(localStorage.getItem("active") === true); // false! ("true" !== true)

// Arrays and objects are even worse:
localStorage.setItem("items", [1, 2, 3]);
console.log(localStorage.getItem("items"));  // "1,2,3" (not a usable array!)

localStorage.setItem("user", { name: "Alice" });
console.log(localStorage.getItem("user"));   // "[object Object]" (completely useless!)
```

**The solution: JSON.stringify() and JSON.parse()**

JSON (JavaScript Object Notation) is a text format that can represent objects, arrays, numbers, booleans, and strings. We convert our data to a JSON string before saving, and convert it back after reading:

```javascript
// =============================================
// SAVING AN OBJECT
// =============================================
const user = {
    name: "Alice",
    age: 22,
    courses: ["JavaScript", "Python", "Java"]
};

// Convert to JSON string, then save
localStorage.setItem("user", JSON.stringify(user));
// Stored as: '{"name":"Alice","age":22,"courses":["JavaScript","Python","Java"]}'

// =============================================
// READING AN OBJECT
// =============================================
const stored = localStorage.getItem("user");   // Gets the JSON string
const parsedUser = JSON.parse(stored);          // Converts back to an object

console.log(parsedUser.name);      // "Alice" (a real string)
console.log(parsedUser.age);       // 22 (a real number!)
console.log(parsedUser.courses);   // ["JavaScript", "Python", "Java"] (a real array!)

// =============================================
// SAVING AN ARRAY
// =============================================
const todos = [
    { id: 1, text: "Learn localStorage", done: true },
    { id: 2, text: "Build a project", done: false }
];

localStorage.setItem("todos", JSON.stringify(todos));

// =============================================
// READING AN ARRAY
// =============================================
const savedTodos = JSON.parse(localStorage.getItem("todos"));
console.log(savedTodos[0].text);   // "Learn localStorage"
console.log(savedTodos[1].done);   // false (a real boolean!)

// =============================================
// SAVING AND READING NUMBERS
// =============================================
localStorage.setItem("highScore", JSON.stringify(9500));
const highScore = JSON.parse(localStorage.getItem("highScore"));
console.log(highScore + 500);  // 10000 (correct math, not string concatenation!)
```

**Rule of thumb:** Always use `JSON.stringify()` when saving and `JSON.parse()` when reading. Even for simple numbers and booleans — it's a safe habit.

### 3. Safe Reading Pattern

In real applications, you can't assume your data is always there and valid. The key might not exist, or the stored JSON might be corrupted. Always handle these cases:

```javascript
function loadData(key, defaultValue) {
    try {
        const stored = localStorage.getItem(key);

        // Key doesn't exist? Return the default
        if (stored === null) {
            return defaultValue;
        }

        // Try to parse the JSON
        return JSON.parse(stored);
    } catch (error) {
        // JSON.parse failed — data might be corrupted
        console.error("Error reading localStorage key '" + key + "':", error);
        return defaultValue;
    }
}

// Usage — always provide a sensible default value
const settings = loadData("settings", { theme: "light", fontSize: 14 });
const scores = loadData("scores", []);
const visitCount = loadData("visits", 0);
```

**Why use try/catch?** If someone manually edits the localStorage data in DevTools and types invalid JSON (or if the data gets corrupted), `JSON.parse()` will throw an error. The `try/catch` ensures your app doesn't crash — it just falls back to the default value.

### Helper Functions for localStorage

Since we always need to stringify/parse, it's helpful to create wrapper functions:

```javascript
// A simple localStorage helper
const storage = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    load(key, defaultValue) {
        try {
            const stored = localStorage.getItem(key);
            return stored === null ? defaultValue : JSON.parse(stored);
        } catch {
            return defaultValue;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    }
};

// Now saving and loading is simple and safe:
storage.save("user", { name: "Alice", age: 22 });
const user = storage.load("user", { name: "Guest", age: 0 });
console.log(user.name);  // "Alice"
```

---

### 4. Practical Example: Persistent Todo List

This complete example shows a todo list where items survive page refreshes:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Persistent Todos</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: 40px auto;
            padding: 0 20px;
        }
        .input-row { display: flex; gap: 10px; margin-bottom: 15px; }
        .input-row input {
            flex: 1; padding: 10px; font-size: 16px;
            border: 1px solid #ddd; border-radius: 4px;
        }
        .input-row button {
            padding: 10px 20px; background: #3498db; color: white;
            border: none; border-radius: 4px; cursor: pointer; font-size: 16px;
        }
        .todo-item {
            display: flex; align-items: center; padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .todo-item span { flex: 1; font-size: 16px; }
        .todo-item.done span { text-decoration: line-through; color: #999; }
        .todo-item button {
            padding: 5px 10px; border: none; border-radius: 4px;
            cursor: pointer; margin-left: 5px;
        }
        .toggle-btn { background: #2ecc71; color: white; }
        .delete-btn { background: #e74c3c; color: white; }
        .clear-btn { background: #95a5a6; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px; }
    </style>
</head>
<body>
    <h1>My Todo List</h1>
    <p style="color: #666;">Your tasks are saved automatically and survive page refreshes.</p>
    <div class="input-row">
        <input id="todoInput" placeholder="Add a task...">
        <button id="addBtn">Add</button>
    </div>
    <div id="todoList"></div>
    <button class="clear-btn" id="clearBtn">Clear All</button>

    <script>
        // Load saved todos from localStorage (or start with empty array)
        let todos = JSON.parse(localStorage.getItem("todos")) || [];

        const input = document.getElementById("todoInput");
        const addBtn = document.getElementById("addBtn");
        const list = document.getElementById("todoList");
        const clearBtn = document.getElementById("clearBtn");

        // Save the current state of todos to localStorage
        function saveTodos() {
            localStorage.setItem("todos", JSON.stringify(todos));
        }

        // Render all todos to the page
        function renderTodos() {
            list.innerHTML = "";  // Clear existing display

            todos.forEach(function(todo, index) {
                const item = document.createElement("div");
                item.classList.add("todo-item");
                if (todo.done) item.classList.add("done");

                const span = document.createElement("span");
                span.textContent = todo.text;

                const toggleBtn = document.createElement("button");
                toggleBtn.textContent = todo.done ? "Undo" : "Done";
                toggleBtn.classList.add("toggle-btn");
                toggleBtn.addEventListener("click", function() {
                    todos[index].done = !todos[index].done;
                    saveTodos();
                    renderTodos();
                });

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.addEventListener("click", function() {
                    todos.splice(index, 1);  // Remove from array
                    saveTodos();
                    renderTodos();
                });

                item.appendChild(span);
                item.appendChild(toggleBtn);
                item.appendChild(deleteBtn);
                list.appendChild(item);
            });
        }

        // Add new todo
        addBtn.addEventListener("click", function() {
            const text = input.value.trim();
            if (text) {
                todos.push({ text: text, done: false });
                saveTodos();
                renderTodos();
                input.value = "";
                input.focus();
            }
        });

        // Add on Enter key
        input.addEventListener("keydown", function(e) {
            if (e.key === "Enter") addBtn.click();
        });

        // Clear all todos
        clearBtn.addEventListener("click", function() {
            if (confirm("Delete all tasks?")) {
                todos = [];
                saveTodos();
                renderTodos();
            }
        });

        // Render saved todos when page loads
        renderTodos();
    </script>
</body>
</html>
```

**Try this:** Add some tasks, then refresh the page. Your tasks are still there! That's `localStorage` in action.

---

### 5. sessionStorage

`sessionStorage` works identically to `localStorage` but data is cleared when the tab closes:

```javascript
// Same API as localStorage
sessionStorage.setItem("currentPage", "checkout");
sessionStorage.getItem("currentPage");   // "checkout"
sessionStorage.removeItem("currentPage");
sessionStorage.clear();
```

**When to use sessionStorage instead of localStorage:**
- Storing temporary state during a multi-step form (steps 1, 2, 3 of checkout)
- Keeping track of where the user was in a session (but not persisting it forever)
- One-time tokens or temporary authentication info
- When you specifically want the data to disappear when the user closes the tab

---

## Part B: The Fetch API

### What is Fetch?

So far in this course, all the data you've worked with has been hardcoded in your JavaScript files — arrays of products, lists of users, etc. In real web applications, data comes from **servers** through **HTTP requests**. The **Fetch API** is JavaScript's built-in tool for making these requests.

The Fetch API lets you:
- **GET** data from a server (load a list of users, fetch weather data, get news articles)
- **POST** data to a server (submit a form, create a new account, send a message)
- **PUT/PATCH** data on a server (update a profile, edit a comment)
- **DELETE** data from a server (remove a post, cancel an order)

> **HTTP** (HyperText Transfer Protocol) is the protocol browsers use to communicate with servers. Every time you visit a URL, your browser makes an HTTP GET request. The Fetch API lets your JavaScript code make these same requests programmatically.

**Key terms:**
- **Request** — the message sent TO the server. Includes the method (GET, POST, etc.), URL, headers, and optionally a body (the data you're sending)
- **Response** — the message returned FROM the server. Includes a status code (200 = OK, 404 = Not Found, 500 = Server Error), headers, and a body (the data the server sends back)
- **JSON** (JavaScript Object Notation) — the most common data format for APIs. It looks like JavaScript objects/arrays as text
- **API** (Application Programming Interface) — a server endpoint designed to return **data** (usually JSON), not web pages (HTML). For example, `https://api.weather.com/current?city=Mumbai` might return `{"temp": 32, "condition": "sunny"}`
- **Promise** — an object representing a value that will be available in the future. `fetch()` returns a Promise because network requests take time

**Analogy:** Using the Fetch API is like ordering food online. You place an order (the request), wait while the kitchen prepares it (the network delay), and eventually the food arrives at your door (the response). Your JavaScript code doesn't freeze while waiting — it continues doing other things and handles the response when it arrives.

---

### 1. Basic GET Request

The simplest use of `fetch()` — getting data from a server:

```javascript
// fetch() returns a Promise, so we use .then() to handle the response
fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(function(response) {
        // Step 1: The server has responded.
        // But we just have the "envelope" — we need to open it.

        // response.ok is true if the status code is 200-299 (success)
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.status);
        }

        // .json() reads the response body and parses it as JSON
        // It ALSO returns a Promise (because reading the body takes time)
        return response.json();
    })
    .then(function(data) {
        // Step 2: The JSON has been parsed.
        // 'data' is now a regular JavaScript object!
        console.log("User name:", data.name);     // "Leanne Graham"
        console.log("Email:", data.email);         // "Sincere@april.biz"
        console.log("City:", data.address.city);   // "Gwenborough"
    })
    .catch(function(error) {
        // This runs if ANYTHING goes wrong:
        // - Network failure (no internet, DNS error)
        // - Our throw statement above (bad status code)
        // - JSON.parse failure (invalid JSON)
        console.error("Fetch failed:", error.message);
    });
```

**Breaking down what happens, step by step:**

1. `fetch(url)` — starts the HTTP request and immediately returns a **Promise**. Your code doesn't wait — it continues running.
2. `.then(response => ...)` — this callback runs when the server sends back a response. The `response` object contains the status code and headers, but the body hasn't been read yet.
3. `response.json()` — reads the response body and parses it as JSON. This also returns a Promise (because the body might be large and take time to read).
4. `.then(data => ...)` — this callback runs when the JSON parsing is complete. `data` is now a regular JavaScript object you can work with.
5. `.catch(error => ...)` — this callback runs if anything in the chain fails.

---

### 2. Using async/await (Cleaner Syntax)

The `.then().then().catch()` chain works, but `async/await` makes the same code much easier to read. It makes asynchronous code look like normal, synchronous code:

```javascript
async function getUser(id) {
    try {
        // 'await' pauses this function until the Promise resolves
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/" + id
        );

        // Check if the server returned an error status
        if (!response.ok) {
            throw new Error("HTTP error! Status: " + response.status);
        }

        // 'await' again — wait for the body to be parsed
        const user = await response.json();

        console.log("User:", user.name);
        console.log("Email:", user.email);
        return user;
    } catch (error) {
        // Handles both network errors and HTTP errors
        console.error("Failed to fetch user:", error.message);
        return null;
    }
}

// Call the async function
getUser(1);
```

**Why is async/await better?**
- Reads top-to-bottom like synchronous code
- Uses familiar `try/catch` for error handling
- Easier to debug (you can set breakpoints on each `await` line)
- No deeply nested `.then()` chains

> **Note:** `await` can only be used inside an `async` function. The `async` keyword before a function makes it return a Promise automatically. See the Async JavaScript self-study document for a deep dive.

---

### 3. POST Request (Sending Data to a Server)

GET requests retrieve data. POST requests **send** data to create something new:

```javascript
async function createPost(title, body) {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            // The second argument to fetch() is an options object
            method: "POST",                    // HTTP method
            headers: {
                "Content-Type": "application/json"  // Tell the server we're sending JSON
            },
            body: JSON.stringify({             // Convert our data to a JSON string
                title: title,
                body: body,
                userId: 1
            })
        });

        if (!response.ok) {
            throw new Error("HTTP error! status: " + response.status);
        }

        // The server typically responds with the created resource
        const newPost = await response.json();
        console.log("Created post with ID:", newPost.id);
        return newPost;
    } catch (error) {
        console.error("Failed to create post:", error.message);
    }
}

createPost("My First Post", "This is the content of my post.");
// Output: "Created post with ID: 101"
```

**Key differences from GET:**
- `method: "POST"` tells the server we're creating something
- `headers` includes `Content-Type` to tell the server what format our data is in
- `body` contains the data we're sending, converted to a JSON string with `JSON.stringify()`

---

### 4. HTTP Methods Summary

| Method | Purpose | Has Body? | Example |
|--------|---------|-----------|---------|
| `GET` | Read/retrieve data | No | Get a list of users |
| `POST` | Create new data | Yes | Create a new blog post |
| `PUT` | Replace existing data entirely | Yes | Update an entire user profile |
| `PATCH` | Partially update existing data | Yes | Update only the user's email |
| `DELETE` | Delete data | Usually no | Delete a user account |

```javascript
// PUT example — replace entire resource
await fetch("/api/users/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        name: "Alice Updated",
        email: "newalice@example.com",
        age: 23
    })
});

// PATCH example — update only specific fields
await fetch("/api/users/1", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: "newalice@example.com"  // Only updating email
    })
});

// DELETE example
await fetch("/api/users/1", {
    method: "DELETE"
});
```

---

### 5. Response Properties

The `response` object contains useful information about what the server sent back:

```javascript
const response = await fetch(url);

// Status information
console.log(response.status);      // 200, 404, 500, etc.
console.log(response.statusText);  // "OK", "Not Found", "Internal Server Error"
console.log(response.ok);          // true if status is 200-299, false otherwise

// The final URL (useful if the server redirected you)
console.log(response.url);

// Response headers (metadata from the server)
console.log(response.headers.get("Content-Type"));  // "application/json"

// Reading the body (IMPORTANT: you can only read the body ONCE!)
// Choose ONE of these:
const json = await response.json();   // Parse body as JSON (most common for APIs)
const text = await response.text();   // Read body as plain text
const blob = await response.blob();   // Read body as binary (for images, files)
```

**Common HTTP Status Codes:**

| Code | Meaning | When You See It |
|------|---------|-----------------|
| `200` | OK | Request succeeded |
| `201` | Created | POST request succeeded, new resource created |
| `204` | No Content | Success, but no body (common for DELETE) |
| `400` | Bad Request | Your request was malformed |
| `401` | Unauthorized | You need to log in |
| `403` | Forbidden | You're logged in but don't have permission |
| `404` | Not Found | The URL doesn't exist |
| `500` | Internal Server Error | Something broke on the server |

---

### 6. Handling Errors Properly

Error handling with `fetch()` has an important gotcha: **`fetch()` only rejects its Promise on network failures** (no internet, DNS error, etc.). HTTP error responses like 404 or 500 are NOT considered errors by `fetch()` — they're valid responses where the server is telling you something went wrong. You must check `response.ok` manually:

```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);

        // IMPORTANT: fetch() does NOT reject on HTTP errors!
        // A 404 or 500 response is still a "successful" fetch.
        // We must check response.ok ourselves.
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Resource not found (404)");
            } else if (response.status === 401) {
                throw new Error("You need to log in (401)");
            } else if (response.status === 403) {
                throw new Error("Access denied (403)");
            } else if (response.status >= 500) {
                throw new Error("Server error (" + response.status + ") — try again later");
            } else {
                throw new Error("HTTP error: " + response.status);
            }
        }

        return await response.json();
    } catch (error) {
        if (error.name === "TypeError") {
            // TypeError means a NETWORK error occurred:
            // - No internet connection
            // - DNS resolution failed
            // - CORS policy blocked the request
            // - The server is completely unreachable
            console.error("Network error — check your internet connection:", error.message);
        } else {
            // Our custom errors from the checks above
            console.error("Error:", error.message);
        }
        return null;  // Return null so the calling code can handle the failure
    }
}

// Usage:
const data = await fetchData("https://api.example.com/users");
if (data) {
    console.log("Got data!", data);
} else {
    console.log("Failed to get data — showing cached version instead");
}
```

---

### 7. Practical Example: User Directory (Complete Working App)

```html
<!DOCTYPE html>
<html>
<head>
    <title>User Directory</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; }
        .controls { margin-bottom: 20px; }
        .controls button {
            padding: 10px 20px; margin-right: 10px; border: none;
            border-radius: 4px; cursor: pointer; font-size: 16px;
        }
        .load-btn { background: #3498db; color: white; }
        .load-btn:disabled { background: #bbb; cursor: wait; }
        .search-input {
            padding: 10px; font-size: 16px; border: 1px solid #ddd;
            border-radius: 4px; width: 250px;
        }
        .user-card {
            border: 1px solid #ddd; padding: 15px; margin: 10px 0;
            border-radius: 8px; display: flex; gap: 15px;
        }
        .user-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .avatar {
            width: 60px; height: 60px; border-radius: 50%;
            background: #3498db; color: white; display: flex;
            align-items: center; justify-content: center;
            font-size: 24px; font-weight: bold; flex-shrink: 0;
        }
        .user-info h3 { margin: 0 0 5px 0; }
        .user-info p { margin: 3px 0; color: #555; font-size: 14px; }
        .loading { color: gray; font-style: italic; padding: 20px; }
        .error { color: red; padding: 20px; }
        .stats { color: #666; margin-bottom: 10px; }
    </style>
</head>
<body>
    <h1>User Directory</h1>
    <div class="controls">
        <button class="load-btn" id="loadUsers">Load Users from API</button>
        <input type="text" class="search-input" id="searchInput"
               placeholder="Filter users..." disabled>
    </div>
    <div class="stats" id="stats"></div>
    <div id="users"></div>

    <script>
        const usersDiv = document.getElementById("users");
        const loadBtn = document.getElementById("loadUsers");
        const searchInput = document.getElementById("searchInput");
        const statsDiv = document.getElementById("stats");
        let allUsers = [];  // Store fetched users for filtering

        // Render users to the page
        function renderUsers(users) {
            usersDiv.innerHTML = "";
            statsDiv.textContent = "Showing " + users.length + " user(s)";

            users.forEach(function(user) {
                const card = document.createElement("div");
                card.classList.add("user-card");

                // Avatar (first letter of name)
                const avatar = document.createElement("div");
                avatar.classList.add("avatar");
                avatar.textContent = user.name.charAt(0);

                // User info section
                const info = document.createElement("div");
                info.classList.add("user-info");

                const name = document.createElement("h3");
                name.textContent = user.name;

                const email = document.createElement("p");
                email.textContent = "Email: " + user.email;

                const company = document.createElement("p");
                company.textContent = "Company: " + user.company.name;

                const city = document.createElement("p");
                city.textContent = "City: " + user.address.city;

                info.appendChild(name);
                info.appendChild(email);
                info.appendChild(company);
                info.appendChild(city);

                card.appendChild(avatar);
                card.appendChild(info);
                usersDiv.appendChild(card);
            });
        }

        // Load users from the API
        loadBtn.addEventListener("click", async function() {
            usersDiv.innerHTML = '<p class="loading">Loading users from API...</p>';
            loadBtn.disabled = true;
            loadBtn.textContent = "Loading...";

            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );

                if (!response.ok) {
                    throw new Error("Failed to load users: " + response.status);
                }

                allUsers = await response.json();
                renderUsers(allUsers);

                // Enable search now that we have data
                searchInput.disabled = false;
                loadBtn.textContent = "Reload Users";
            } catch (error) {
                usersDiv.innerHTML =
                    '<p class="error">Error: ' + error.message + '</p>';
            } finally {
                loadBtn.disabled = false;
            }
        });

        // Filter users as user types in search box
        searchInput.addEventListener("input", function() {
            const query = this.value.toLowerCase();
            const filtered = allUsers.filter(function(user) {
                return (
                    user.name.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query) ||
                    user.company.name.toLowerCase().includes(query)
                );
            });
            renderUsers(filtered);
        });
    </script>
</body>
</html>
```

**What this demonstrates:** Making a real API call with `fetch()`, handling loading states (disabling the button, showing a loading message), error handling with try/catch, filtering fetched data in real-time, and building the UI from API data using DOM manipulation.

---

### 8. Fetching and Displaying Posts with Comments

```html
<!DOCTYPE html>
<html>
<head>
    <title>Blog Posts</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; padding: 0 20px; }
        .post {
            border: 1px solid #ddd; margin: 15px 0; padding: 20px;
            border-radius: 8px;
        }
        .post h3 { margin-top: 0; cursor: pointer; color: #3498db; }
        .post h3:hover { text-decoration: underline; }
        .comments { margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee; display: none; }
        .comment { background: #f9f9f9; padding: 10px; margin: 5px 0; border-radius: 4px; font-size: 14px; }
        .comment strong { color: #333; }
    </style>
</head>
<body>
    <h1>Blog Posts</h1>
    <p>Click a post title to load its comments (fetched from a separate API endpoint).</p>
    <div id="postsContainer">
        <p style="color: gray;">Loading posts...</p>
    </div>

    <script>
        const container = document.getElementById("postsContainer");

        async function loadPosts() {
            try {
                // Fetch the first 5 posts
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/posts?_limit=5"
                );
                const posts = await response.json();

                container.innerHTML = "";  // Clear "loading" message

                posts.forEach(function(post) {
                    const postDiv = document.createElement("div");
                    postDiv.classList.add("post");

                    const title = document.createElement("h3");
                    title.textContent = post.title;

                    const body = document.createElement("p");
                    body.textContent = post.body;

                    const commentsDiv = document.createElement("div");
                    commentsDiv.classList.add("comments");
                    commentsDiv.id = "comments-" + post.id;

                    // Click title to load/toggle comments
                    let commentsLoaded = false;
                    title.addEventListener("click", async function() {
                        if (!commentsLoaded) {
                            // Fetch comments for this post (a SECOND API call)
                            commentsDiv.innerHTML = '<p style="color:gray;">Loading comments...</p>';
                            commentsDiv.style.display = "block";

                            const commRes = await fetch(
                                "https://jsonplaceholder.typicode.com/posts/" + post.id + "/comments"
                            );
                            const comments = await commRes.json();

                            commentsDiv.innerHTML = "<strong>Comments (" + comments.length + "):</strong>";
                            comments.forEach(function(comment) {
                                const commentDiv = document.createElement("div");
                                commentDiv.classList.add("comment");
                                commentDiv.innerHTML =
                                    "<strong>" + comment.name + "</strong>" +
                                    "<p>" + comment.body + "</p>";
                                commentsDiv.appendChild(commentDiv);
                            });

                            commentsLoaded = true;
                        } else {
                            // Toggle visibility (comments already loaded)
                            const visible = commentsDiv.style.display !== "none";
                            commentsDiv.style.display = visible ? "none" : "block";
                        }
                    });

                    postDiv.appendChild(title);
                    postDiv.appendChild(body);
                    postDiv.appendChild(commentsDiv);
                    container.appendChild(postDiv);
                });
            } catch (error) {
                container.innerHTML = '<p style="color:red;">Failed to load posts: ' + error.message + '</p>';
            }
        }

        loadPosts();
    </script>
</body>
</html>
```

**What this demonstrates:** Making multiple sequential API calls (first load posts, then load comments when clicked), lazy loading (comments are only fetched when the user asks for them), and toggling visibility of loaded content.

---

## Part C: Combining Storage and Fetch

A common and powerful pattern is to **cache fetched API data** in localStorage. This way, the first visit fetches from the server, but subsequent visits load instantly from local cache:

```javascript
async function getUsersWithCache() {
    // Step 1: Check if we have cached data
    const cached = localStorage.getItem("users");
    if (cached) {
        console.log("Loaded from cache (instant!)");
        return JSON.parse(cached);
    }

    // Step 2: No cache — fetch from server
    console.log("Fetching from server (takes a moment)...");
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    // Step 3: Save to cache for next time
    localStorage.setItem("users", JSON.stringify(users));

    return users;
}
```

### Cache with Expiry

The problem with simple caching is that data can become stale. Here's a pattern that automatically re-fetches if the cache is older than a specified duration:

```javascript
async function fetchWithCache(url, cacheKey, maxAgeMinutes) {
    // Check for cached data
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const ageMinutes = (Date.now() - timestamp) / 1000 / 60;

        if (ageMinutes < maxAgeMinutes) {
            console.log("Using cache (" + Math.round(ageMinutes) + " min old)");
            return data;
        } else {
            console.log("Cache expired (" + Math.round(ageMinutes) + " min old)");
        }
    }

    // Fetch fresh data
    console.log("Fetching fresh data from server...");
    const response = await fetch(url);
    const data = await response.json();

    // Save to cache with timestamp
    localStorage.setItem(cacheKey, JSON.stringify({
        data: data,
        timestamp: Date.now()
    }));

    return data;
}

// Usage: cache for 5 minutes
const users = await fetchWithCache(
    "https://jsonplaceholder.typicode.com/users",
    "cached_users",
    5   // Re-fetch if older than 5 minutes
);
```

---

## Practice Challenges

1. **Theme Switcher:** Save the user's chosen theme (light/dark) in localStorage and apply it on page load. The theme should survive browser restarts.
2. **Notes App:** Build a simple notes app that stores notes in localStorage. Features: create a note with a title and body, display all notes, delete individual notes. Each note should have a timestamp.
3. **API Explorer:** Fetch and display data from a public API of your choice (try [JSONPlaceholder](https://jsonplaceholder.typicode.com), [PokéAPI](https://pokeapi.co), or [Dog CEO's Dog API](https://dog.ceo/dog-api/)). Add a search/filter feature.
4. **Bookmarks Manager:** Let users save bookmarks (name + URL) to localStorage and display them as a list. Include add, delete, and open-in-new-tab functionality.
5. **Cache with Expiry:** Build a user directory that fetches from an API and caches in localStorage with a timestamp. If the cache is older than 5 minutes, show a "Refresh" button that re-fetches.

---

## Key Differences: Storage vs Cookies

You might hear about cookies as another way to store data. Here's how they compare:

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|---------------|---------|
| **Capacity** | ~5-10 MB | ~5-10 MB | ~4 KB |
| **Sent to server?** | No | No | Yes, automatically with every HTTP request |
| **Expires** | Never (until cleared) | When tab closes | Configurable (can set expiry date) |
| **Access** | JavaScript only | JavaScript only | JavaScript + Server |
| **Best for** | App settings, caching | Temporary state | Authentication tokens, server-side data |

**Key takeaway:** Use `localStorage` for most client-side storage needs. Cookies are mainly used for authentication (sending session tokens to the server automatically).

---

## Further Reading

- [MDN: Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [JavaScript.info: Fetch](https://javascript.info/fetch)
- [JavaScript.info: LocalStorage, sessionStorage](https://javascript.info/localstorage)
- [Public APIs list for practice](https://github.com/public-apis/public-apis)

---

*Self-Study Document 3 of 5 — BCA IV Semester Client Side Scripting*
