# Self-Study: Asynchronous JavaScript

**Estimated Time:** 5-6 hours
**Prerequisites:** Weeks 1-5 complete, Functions (Week 3), Higher-Order Functions (Week 4)
**Goal:** Understand how JavaScript handles tasks that take time — network requests, timers, file operations — without freezing the page

---

## Why Asynchronous?

JavaScript is **single-threaded** — it has only one "worker" that can execute code. If a task takes 3 seconds (like fetching data from a server), that worker would be stuck waiting for those 3 seconds. During that time, the entire page would freeze — buttons wouldn't respond, animations would stop, and the user would think the browser crashed.

**Asynchronous code** solves this problem. Instead of waiting for a slow task to finish, JavaScript says "start this task in the background, and let me know when it's done." Meanwhile, JavaScript continues running other code — keeping the page responsive.

**Analogy:** Imagine ordering food at a restaurant:
- **Synchronous:** You stand at the counter, staring at the kitchen, waiting until your food is ready. Nobody behind you can order. The entire restaurant freezes because of your one order.
- **Asynchronous:** You place your order, get a receipt number, and sit down. You can browse your phone, talk to friends — the kitchen works on your order in the background. When it's ready, they call your number and you pick it up.

JavaScript follows the "restaurant" model. It places orders (starts async tasks), gets receipts (Promises), and picks up food (runs callback functions) when the kitchen (browser/operating system) signals that the task is done.

**Real examples of tasks that are asynchronous:**
- Fetching data from a server (API calls) — could take milliseconds to seconds
- Reading/writing to a database
- Timers (`setTimeout`, `setInterval`)
- User interactions (waiting for a click or keypress)
- Loading images, scripts, or stylesheets
- Geolocation (getting the user's GPS coordinates)

---

## 1. Callbacks: The Foundation

A **callback** is a function that you pass to another function, to be called later when some task completes. It's the oldest pattern for handling asynchronous code in JavaScript, and understanding it is essential before learning Promises and async/await.

### Basic Callback Pattern

```javascript
// setTimeout is the simplest example of an async function with a callback
console.log("Start");

setTimeout(function() {
    console.log("This runs after 2 seconds");
}, 2000);

console.log("End");

// Output ORDER:
// "Start"                         ← runs immediately (synchronous)
// "End"                           ← runs immediately (synchronous)
// "This runs after 2 seconds"     ← runs 2 seconds later (asynchronous)
```

> **Key insight:** `setTimeout` does NOT pause JavaScript. It tells the browser "run this function after 2 seconds," and then JavaScript immediately moves on to the next line. This is fundamentally different from how `sleep()` works in other languages like Python or Java.

**Think of it this way:** `setTimeout` is like setting an alarm on your phone. Setting the alarm doesn't make you stand still and wait — you continue your day, and the alarm goes off later.

### setInterval (Repeated Callbacks)

While `setTimeout` runs a function **once** after a delay, `setInterval` runs it **repeatedly** at a fixed interval:

```javascript
let count = 0;

// setInterval returns an ID we can use to stop it later
const intervalId = setInterval(function() {
    count++;
    console.log("Tick:", count);

    if (count === 5) {
        clearInterval(intervalId);  // Stop the interval after 5 ticks
        console.log("Done! Timer stopped.");
    }
}, 1000);  // Runs every 1000 milliseconds (1 second)

// Output (one per second):
// "Tick: 1"
// "Tick: 2"
// "Tick: 3"
// "Tick: 4"
// "Tick: 5"
// "Done! Timer stopped."
```

**Common use cases for setInterval:**
- Countdown timers
- Clocks and stopwatches
- Auto-saving drafts (e.g., Google Docs saving every 30 seconds)
- Polling a server for updates (checking for new messages every 5 seconds)
- Animations (though `requestAnimationFrame` is better for visual animations)

### Real-World Example: Countdown Timer

```html
<!DOCTYPE html>
<html>
<head>
    <title>Countdown Timer</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
        .timer { font-size: 72px; font-weight: bold; color: #3498db; margin: 20px 0; }
        .timer.warning { color: #e67e22; }
        .timer.danger { color: #e74c3c; }
        .timer.done { color: #2ecc71; }
        button {
            padding: 12px 24px; font-size: 18px; margin: 5px;
            border: none; border-radius: 8px; cursor: pointer;
        }
        .start-btn { background: #2ecc71; color: white; }
        .stop-btn { background: #e74c3c; color: white; }
        .reset-btn { background: #95a5a6; color: white; }
        input {
            padding: 10px; font-size: 18px; width: 100px; text-align: center;
            border: 2px solid #ddd; border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>Countdown Timer</h1>
    <p>Enter seconds: <input type="number" id="seconds" value="10" min="1"></p>
    <div class="timer" id="display">10</div>
    <button class="start-btn" id="startBtn">Start</button>
    <button class="stop-btn" id="stopBtn" disabled>Stop</button>
    <button class="reset-btn" id="resetBtn">Reset</button>

    <script>
        const display = document.getElementById("display");
        const secondsInput = document.getElementById("seconds");
        const startBtn = document.getElementById("startBtn");
        const stopBtn = document.getElementById("stopBtn");
        const resetBtn = document.getElementById("resetBtn");
        let intervalId = null;
        let remaining = 10;

        function updateDisplay() {
            display.textContent = remaining;
            display.className = "timer";
            if (remaining <= 0) {
                display.classList.add("done");
                display.textContent = "Time's up!";
            } else if (remaining <= 3) {
                display.classList.add("danger");
            } else if (remaining <= 5) {
                display.classList.add("warning");
            }
        }

        startBtn.addEventListener("click", function() {
            if (intervalId !== null) return;  // Already running

            remaining = parseInt(secondsInput.value) || 10;
            updateDisplay();

            startBtn.disabled = true;
            stopBtn.disabled = false;
            secondsInput.disabled = true;

            intervalId = setInterval(function() {
                remaining--;
                updateDisplay();

                if (remaining <= 0) {
                    clearInterval(intervalId);
                    intervalId = null;
                    startBtn.disabled = false;
                    stopBtn.disabled = true;
                    secondsInput.disabled = false;
                }
            }, 1000);
        });

        stopBtn.addEventListener("click", function() {
            clearInterval(intervalId);
            intervalId = null;
            startBtn.disabled = false;
            stopBtn.disabled = true;
            secondsInput.disabled = false;
        });

        resetBtn.addEventListener("click", function() {
            clearInterval(intervalId);
            intervalId = null;
            remaining = parseInt(secondsInput.value) || 10;
            updateDisplay();
            startBtn.disabled = false;
            stopBtn.disabled = true;
            secondsInput.disabled = false;
        });
    </script>
</body>
</html>
```

### Callbacks in Practice

Callbacks aren't just for timers. They're used for any operation where the result isn't available immediately:

```javascript
// Simulating a network request with a callback
function loadUserData(userId, onSuccess, onError) {
    console.log("Loading user " + userId + "...");

    // setTimeout simulates the delay of a real network request
    setTimeout(function() {
        if (userId > 0) {
            // Success — call onSuccess with the data
            onSuccess({ id: userId, name: "Alice", age: 22 });
        } else {
            // Failure — call onError with an error message
            onError("Invalid user ID: " + userId);
        }
    }, 1000);  // Simulates 1 second of network delay
}

// Using it:
loadUserData(
    1,                                               // userId
    function(user) { console.log("Got:", user.name); }, // onSuccess
    function(error) { console.error("Error:", error); } // onError
);
// 1 second later: "Got: Alice"

loadUserData(
    -1,
    function(user) { console.log("Got:", user.name); },
    function(error) { console.error("Error:", error); }
);
// 1 second later: "Error: Invalid user ID: -1"
```

**Notice the pattern:** The async function (`loadUserData`) accepts two callbacks — one for success and one for failure. This is a very common pattern, but it gets messy when you need to chain multiple async operations...

---

### Callback Hell (The Problem)

When you need to do multiple async steps in sequence — where each step depends on the result of the previous one — callbacks get deeply nested:

```javascript
// Get a user, then get their orders, then get order details, then get shipping info
// Each step depends on the previous step's result

getUser(1, function(user) {
    getOrders(user.id, function(orders) {
        getOrderDetails(orders[0].id, function(details) {
            getShippingInfo(details.trackingId, function(shipping) {
                console.log("Shipping status:", shipping.status);
                // What if we need more steps? Even MORE nesting...
            }, handleError);
        }, handleError);
    }, handleError);
}, handleError);
```

This is called **"callback hell"** or the **"pyramid of doom"** because of its triangular shape. The problems are:
- **Hard to read** — you have to mentally track many levels of nesting
- **Hard to debug** — which callback are you inside when something breaks?
- **Hard to handle errors** — you need to pass `handleError` to every single call
- **Hard to modify** — adding a step in the middle requires re-indenting everything

**Promises** and **async/await** were invented specifically to solve this problem.

---

## 2. Promises: A Better Way

A **Promise** is an object that represents a value that will be available in the future. It's a standardized way to handle async operations, introduced in ES6 (2015).

**Analogy:** A Promise is like a receipt from a restaurant. You don't have the food yet, but you have a guarantee that it will come (fulfilled) or that they'll tell you if something went wrong (rejected). The receipt itself is not the food — it's a placeholder for the food.

### Promise States

A Promise is always in one of three states:

```
                    ┌─────── PENDING ───────┐
                    │ (waiting for result)   │
                    │                        │
                    │    ┌─────┐ ┌──────┐   │
                    │    │     │ │      │   │
                    └────┘     └─┘      └───┘
                        ↓           ↓
                  ┌──────────┐  ┌──────────┐
                  │ FULFILLED│  │ REJECTED  │
                  │ (success)│  │ (failure) │
                  │ has value│  │ has reason│
                  └──────────┘  └──────────┘
```

- **Pending** — the operation hasn't completed yet. Like waiting for your food.
- **Fulfilled** (resolved) — the operation completed successfully, and a **value** is available. Your food is ready!
- **Rejected** — the operation failed, and a **reason** (error) is available. The kitchen is out of that dish.

**One-way transition:** Once a Promise moves from Pending to Fulfilled or Rejected, it is **settled** and can NEVER change state again. A fulfilled Promise won't suddenly become rejected, and a rejected Promise won't suddenly succeed.

### Creating a Promise

```javascript
const myPromise = new Promise(function(resolve, reject) {
    // This function runs immediately when the Promise is created.
    // It receives two functions from JavaScript:
    //   resolve(value) — call this when the operation SUCCEEDS
    //   reject(reason) — call this when the operation FAILS

    const success = true;  // Simulate success or failure

    if (success) {
        resolve("Operation completed!");  // Fulfills the promise with this value
    } else {
        reject("Something went wrong");   // Rejects the promise with this reason
    }
});
```

**What's happening here, step by step:**
1. `new Promise(...)` creates a new Promise object in the Pending state
2. The function you pass (called the **executor**) runs immediately
3. Inside the executor, you do your async work (network request, timer, etc.)
4. When the work is done, call `resolve(value)` to fulfill the Promise or `reject(reason)` to reject it
5. You can only call resolve OR reject once — subsequent calls are ignored

### Consuming a Promise: .then(), .catch(), .finally()

Once you have a Promise, you use `.then()`, `.catch()`, and `.finally()` to specify what should happen when it settles:

```javascript
myPromise
    .then(function(result) {
        // This callback runs if the promise is FULFILLED
        // 'result' is the value passed to resolve()
        console.log("Success:", result);
    })
    .catch(function(error) {
        // This callback runs if the promise is REJECTED
        // 'error' is the value passed to reject()
        console.error("Error:", error);
    })
    .finally(function() {
        // This callback runs REGARDLESS of success or failure
        // Useful for cleanup (hiding loading spinners, re-enabling buttons)
        console.log("Operation complete (either way)");
    });
```

**Why this is better than callbacks:**
- Clear separation of success and error handling
- Errors are handled in ONE place (`.catch()`), not at every step
- The code reads top-to-bottom instead of nesting deeper and deeper

### Practical Example: Simulating a Network Request

```javascript
function fetchUserData(userId) {
    return new Promise(function(resolve, reject) {
        console.log("Fetching data for user " + userId + "...");

        // setTimeout simulates a 1.5 second network request
        setTimeout(function() {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "Alice",
                    email: "alice@example.com"
                });
            } else {
                reject(new Error("Invalid user ID: " + userId));
            }
        }, 1500);
    });
}

// Using the Promise — notice how clean this is compared to callbacks
fetchUserData(1)
    .then(function(user) {
        console.log("Got user:", user.name);  // "Got user: Alice"
    })
    .catch(function(error) {
        console.error("Failed:", error.message);
    });

fetchUserData(-1)
    .then(function(user) {
        console.log("Got user:", user.name);
    })
    .catch(function(error) {
        console.error("Failed:", error.message);  // "Failed: Invalid user ID: -1"
    });
```

---

### Promise Chaining

`.then()` returns a **new Promise**, which means you can chain multiple `.then()` calls together. Each `.then()` receives the value returned by the previous `.then()`:

```javascript
fetchUserData(1)
    .then(function(user) {
        console.log("User:", user.name);
        return fetchOrders(user.id);  // Returns another Promise
    })
    .then(function(orders) {
        console.log("Orders:", orders.length);
        return fetchOrderDetails(orders[0].id);  // Returns another Promise
    })
    .then(function(details) {
        console.log("Details:", details);
    })
    .catch(function(error) {
        // ONE catch handles errors from ANY step in the chain!
        console.error("Something failed:", error.message);
    });
```

**Compare this to callback hell:**
- The code is **flat**, not nested. Each step is at the same indentation level
- There's **one error handler** for the entire chain, not one per callback
- You can easily **add or remove steps** without re-indenting everything
- It reads **top-to-bottom**, following the natural order of operations

**How the chain works:**
1. `fetchUserData(1)` returns a Promise
2. When it fulfills, the first `.then()` runs. It calls `fetchOrders()` and **returns its Promise**
3. The second `.then()` waits for `fetchOrders()` to fulfill, then runs
4. If **any** step in the chain rejects (throws an error), the chain jumps directly to `.catch()`

```javascript
// If you return a REGULAR value (not a Promise) from .then,
// it's wrapped in a fulfilled Promise automatically:
Promise.resolve(5)
    .then(function(x) { return x * 2; })   // Returns 10
    .then(function(x) { return x + 3; })   // Returns 13
    .then(function(x) { console.log(x); }) // Logs 13
```

---

### Promise.all() — Run in Parallel

When you have multiple independent async operations that don't depend on each other, there's no reason to run them one after another. `Promise.all()` runs them **simultaneously** and waits for ALL of them to complete:

```javascript
// These three requests are independent — they don't depend on each other
const promise1 = fetch("https://jsonplaceholder.typicode.com/users");
const promise2 = fetch("https://jsonplaceholder.typicode.com/posts");
const promise3 = fetch("https://jsonplaceholder.typicode.com/comments");

// Start all three at the same time and wait for all to finish
Promise.all([promise1, promise2, promise3])
    .then(function(responses) {
        // All three have completed successfully
        console.log("All responses received!");
        // Parse all three responses as JSON (also in parallel)
        return Promise.all(responses.map(function(r) { return r.json(); }));
    })
    .then(function(results) {
        // Destructure the results array
        const users = results[0];
        const posts = results[1];
        const comments = results[2];
        console.log("Users:", users.length);       // 10
        console.log("Posts:", posts.length);        // 100
        console.log("Comments:", comments.length);  // 500
    })
    .catch(function(error) {
        // If ANY one fails, the whole Promise.all rejects
        console.error("One of the requests failed:", error);
    });
```

**Why parallel is faster:**
- Sequential: Task A (1s) + Task B (1s) + Task C (1s) = **3 seconds total**
- Parallel: All three run simultaneously = **~1 second total** (as fast as the slowest one)

**The catch:** If ANY one of the Promises rejects, the entire `Promise.all()` rejects immediately. The other Promises still run in the background, but their results are ignored.

### Promise.race() — First One Wins

Returns the result of whichever Promise **settles first** (whether fulfilled or rejected):

```javascript
const fast = new Promise(function(resolve) {
    setTimeout(function() { resolve("Fast! (100ms)"); }, 100);
});
const slow = new Promise(function(resolve) {
    setTimeout(function() { resolve("Slow... (2000ms)"); }, 2000);
});

Promise.race([fast, slow])
    .then(function(result) {
        console.log(result);  // "Fast! (100ms)"
    });
// The slow promise still runs but its result is ignored
```

**Real-world use: Timeout for a fetch request**

```javascript
// If the API doesn't respond within 5 seconds, give up
function fetchWithTimeout(url, timeoutMs) {
    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error("Request timed out after " + timeoutMs + "ms"));
        }, timeoutMs);
    });

    return Promise.race([fetchPromise, timeoutPromise]);
}

// Usage: give up after 5 seconds
fetchWithTimeout("https://api.example.com/data", 5000)
    .then(function(response) { return response.json(); })
    .then(function(data) { console.log("Got data:", data); })
    .catch(function(error) { console.error(error.message); });
```

### Promise.allSettled() — Wait for All, Don't Fail

Unlike `Promise.all()`, this waits for ALL promises to settle — even if some reject. It never rejects itself. Each result tells you whether that specific Promise fulfilled or rejected:

```javascript
const p1 = Promise.resolve("Success");
const p2 = Promise.reject("Error");
const p3 = Promise.resolve("Also success");

Promise.allSettled([p1, p2, p3])
    .then(function(results) {
        results.forEach(function(result) {
            if (result.status === "fulfilled") {
                console.log("Fulfilled:", result.value);
            } else {
                console.log("Rejected:", result.reason);
            }
        });
    });
// Output:
// "Fulfilled: Success"
// "Rejected: Error"
// "Fulfilled: Also success"
```

**When to use which:**
| Method | Behavior | Use when... |
|--------|----------|-------------|
| `Promise.all()` | Fails fast — rejects if ANY promise rejects | You need ALL results to proceed |
| `Promise.allSettled()` | Waits for all — never rejects | You want to know each outcome individually |
| `Promise.race()` | Returns first settled | You want the fastest result or need a timeout |

---

## 3. async/await: Promises Made Easy

`async/await` is **syntactic sugar** over Promises. It doesn't introduce new functionality — it makes the same Promise-based code look and behave like regular synchronous code. This makes it much easier to read, write, and debug.

### Basic Syntax

```javascript
// The 'async' keyword before a function makes it return a Promise automatically
async function greet() {
    return "Hello!";
}

// Even though we returned a string, it's wrapped in a Promise
greet().then(function(msg) {
    console.log(msg);  // "Hello!"
});

// This is equivalent to:
function greetWithPromise() {
    return Promise.resolve("Hello!");
}
```

### await — Pause Until Promise Resolves

The `await` keyword can only be used inside an `async` function. It **pauses** the function's execution until the Promise resolves, then gives you the resolved value:

```javascript
async function loadUser() {
    console.log("Loading...");

    // 'await' pauses HERE until fetch completes (the rest of your page stays responsive!)
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    // 'await' pauses again until the JSON is parsed
    const user = await response.json();

    console.log("User:", user.name);
    return user;
}

loadUser();
```

**Why this is powerful:** The code reads like synchronous code — top to bottom, line by line. But it's still asynchronous under the hood. The page doesn't freeze while waiting.

> **Important:** `await` can ONLY be used inside an `async` function. If you try to use it at the top level (outside any function), you'll get a syntax error. (Modern JavaScript modules DO support top-level await, but regular scripts don't.)

### Error Handling with try/catch

With async/await, you use the familiar `try/catch` syntax for error handling — the same pattern used for synchronous errors:

```javascript
async function loadUser(id) {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/" + id
        );

        if (!response.ok) {
            throw new Error("HTTP error! Status: " + response.status);
        }

        const user = await response.json();
        console.log("User:", user.name);
        return user;

    } catch (error) {
        // This catches:
        // - Network errors (no internet)
        // - Our throw above (bad status code)
        // - JSON parse errors (invalid response)
        console.error("Failed to load user:", error.message);
        return null;

    } finally {
        // Runs whether we succeeded or failed — great for cleanup
        console.log("Request finished (success or failure)");
    }
}
```

**Compare this to Promise chains:**

```javascript
// Promise chain version (harder to follow):
fetch(url)
    .then(r => { if (!r.ok) throw new Error("Bad"); return r.json(); })
    .then(data => console.log(data))
    .catch(err => console.error(err))
    .finally(() => console.log("Done"));

// async/await version (reads like normal code):
async function getData(url) {
    try {
        const r = await fetch(url);
        if (!r.ok) throw new Error("Bad");
        const data = await r.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    } finally {
        console.log("Done");
    }
}
```

### Sequential vs Parallel with async/await

A common mistake with async/await is accidentally running things sequentially when they could run in parallel:

```javascript
// SLOW — Sequential: each await waits for the previous one
async function loadSequential() {
    const user = await fetch("/api/user").then(r => r.json());       // Waits 1 sec
    const posts = await fetch("/api/posts").then(r => r.json());     // Then waits 1 sec
    const comments = await fetch("/api/comments").then(r => r.json()); // Then waits 1 sec
    // Total time: ~3 seconds (1 + 1 + 1)
}

// FAST — Parallel: all three start at the same time
async function loadParallel() {
    const [user, posts, comments] = await Promise.all([
        fetch("/api/user").then(r => r.json()),
        fetch("/api/posts").then(r => r.json()),
        fetch("/api/comments").then(r => r.json())
    ]);
    // Total time: ~1 second (as fast as the slowest one)
}
```

**Rule of thumb:** Use sequential `await` when step B depends on step A's result. Use `Promise.all()` when the operations are independent.

```javascript
// Sequential — necessary because step 2 needs step 1's result
async function getOrderHistory(userId) {
    const user = await getUser(userId);         // Step 1: get user
    const orders = await getOrders(user.id);    // Step 2: NEEDS user.id from step 1
    return orders;
}

// Parallel — these don't depend on each other
async function loadDashboard() {
    const [user, notifications, weather] = await Promise.all([
        getUser(1),
        getNotifications(),
        getWeather("Mumbai")
    ]);
    // All three loaded simultaneously
}
```

### Real-World Example: Dashboard Data Loader

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard Loader</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 700px; margin: 40px auto; padding: 0 20px; }
        .card { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .card h3 { margin-top: 0; }
        .loading { color: gray; font-style: italic; }
        .error { color: red; }
        .timing { color: #666; font-size: 14px; margin-top: 10px; }
        button {
            padding: 12px 24px; font-size: 16px; border: none;
            border-radius: 6px; cursor: pointer; margin: 5px;
        }
        .seq-btn { background: #e74c3c; color: white; }
        .par-btn { background: #2ecc71; color: white; }
    </style>
</head>
<body>
    <h1>Sequential vs Parallel Loading</h1>
    <p>Watch the timing difference between sequential and parallel API calls:</p>
    <button class="seq-btn" id="seqBtn">Load Sequentially (Slow)</button>
    <button class="par-btn" id="parBtn">Load in Parallel (Fast)</button>
    <div class="timing" id="timing"></div>
    <div id="results"></div>

    <script>
        const results = document.getElementById("results");
        const timing = document.getElementById("timing");

        async function fetchJSON(url) {
            const response = await fetch(url);
            return response.json();
        }

        // SEQUENTIAL — each request waits for the previous one
        document.getElementById("seqBtn").addEventListener("click", async function() {
            results.innerHTML = '<p class="loading">Loading sequentially...</p>';
            const start = Date.now();

            try {
                const users = await fetchJSON("https://jsonplaceholder.typicode.com/users");
                const posts = await fetchJSON("https://jsonplaceholder.typicode.com/posts?_limit=5");
                const todos = await fetchJSON("https://jsonplaceholder.typicode.com/todos?_limit=5");

                const elapsed = Date.now() - start;
                timing.textContent = "Sequential loading took: " + elapsed + "ms";
                displayResults(users.slice(0, 3), posts, todos);
            } catch (error) {
                results.innerHTML = '<p class="error">' + error.message + '</p>';
            }
        });

        // PARALLEL — all requests start at the same time
        document.getElementById("parBtn").addEventListener("click", async function() {
            results.innerHTML = '<p class="loading">Loading in parallel...</p>';
            const start = Date.now();

            try {
                const [users, posts, todos] = await Promise.all([
                    fetchJSON("https://jsonplaceholder.typicode.com/users"),
                    fetchJSON("https://jsonplaceholder.typicode.com/posts?_limit=5"),
                    fetchJSON("https://jsonplaceholder.typicode.com/todos?_limit=5")
                ]);

                const elapsed = Date.now() - start;
                timing.textContent = "Parallel loading took: " + elapsed + "ms";
                displayResults(users.slice(0, 3), posts, todos);
            } catch (error) {
                results.innerHTML = '<p class="error">' + error.message + '</p>';
            }
        });

        function displayResults(users, posts, todos) {
            results.innerHTML = "";
            var html = '<div class="card"><h3>Users (' + users.length + ')</h3>';
            users.forEach(function(u) { html += '<p>' + u.name + ' — ' + u.email + '</p>'; });
            html += '</div>';

            html += '<div class="card"><h3>Posts (' + posts.length + ')</h3>';
            posts.forEach(function(p) { html += '<p>' + p.title + '</p>'; });
            html += '</div>';

            html += '<div class="card"><h3>Todos (' + todos.length + ')</h3>';
            todos.forEach(function(t) {
                var icon = t.completed ? "Done" : "Pending";
                html += '<p>' + icon + ': ' + t.title + '</p>';
            });
            html += '</div>';

            results.innerHTML = html;
        }
    </script>
</body>
</html>
```

---

## 4. The Event Loop (How It All Works)

Now that you know about callbacks, Promises, and async/await, let's understand the mechanism that makes it all work: the **event loop**.

JavaScript is single-threaded, but it can handle async operations because of a clever system involving four components:

```
┌──────────────────────────────────────┐
│           CALL STACK                  │
│  (currently executing code)          │
│  One function at a time              │
│  Last in, first out (LIFO)           │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│         WEB APIs / NODE APIs          │
│  (handled by the BROWSER, not JS)    │
│                                      │
│  setTimeout    → browser runs timer  │
│  fetch         → browser does HTTP   │
│  DOM events    → browser watches     │
│  geolocation   → browser asks GPS    │
│                                      │
│  These run OUTSIDE the JS thread!    │
└──────────┬───────────────────────────┘
           │ When done, callbacks go to:
           ▼
┌──────────────────────────────────────┐
│              QUEUES                   │
│                                      │
│  Microtask Queue (high priority):    │
│  [Promise.then, async/await]         │
│                                      │
│  Macrotask Queue (low priority):     │
│  [setTimeout, setInterval, events]   │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│          EVENT LOOP                   │
│                                      │
│  "Is the call stack empty?"          │
│  YES → Take next from microtask Q   │
│        (if empty, take from macro Q) │
│  NO  → Wait until stack is empty     │
│                                      │
│  Repeat forever                      │
└──────────────────────────────────────┘
```

**How it works, step by step:**

1. JavaScript starts executing your code, pushing functions onto the **call stack**
2. When it encounters an async operation (like `setTimeout` or `fetch`), it hands it off to the **browser** (which runs it in a separate thread)
3. JavaScript continues executing the next line of code — it doesn't wait
4. When the browser finishes the async operation, it puts the callback into a **queue**
5. The **event loop** constantly checks: "Is the call stack empty?" If yes, it moves the next callback from the queue to the stack so it can run

**The priority rule:** Microtasks (Promise callbacks) always run before macrotasks (setTimeout callbacks), even if the setTimeout was registered first.

### Execution Order Example

This is one of the most common interview questions about JavaScript:

```javascript
console.log("1: Start");             // Synchronous — runs immediately

setTimeout(function() {
    console.log("2: Timeout");       // Macrotask — goes to macrotask queue
}, 0);  // Even with 0ms delay!

Promise.resolve().then(function() {
    console.log("3: Promise");       // Microtask — goes to microtask queue
});

console.log("4: End");              // Synchronous — runs immediately

// Output:
// "1: Start"     ← synchronous, runs immediately
// "4: End"       ← synchronous, runs immediately
// "3: Promise"   ← microtask, runs BEFORE setTimeout (higher priority)
// "2: Timeout"   ← macrotask, runs LAST (lower priority)
```

**Why this order?**
1. `console.log("1")` — synchronous, runs immediately
2. `setTimeout(...)` — registers a macrotask, continues
3. `Promise.resolve().then(...)` — registers a microtask, continues
4. `console.log("4")` — synchronous, runs immediately
5. Call stack is now empty. Event loop checks microtask queue first: Promise callback runs → logs "3"
6. Microtask queue empty. Event loop checks macrotask queue: setTimeout callback runs → logs "2"

> **Key takeaway:** Even `setTimeout(fn, 0)` doesn't run immediately. It waits until the call stack is empty AND all microtasks have been processed. This is why Promise callbacks always execute before setTimeout callbacks.

### Another Example: Mixing Sync and Async

```javascript
console.log("A");

setTimeout(function() { console.log("B"); }, 0);

Promise.resolve()
    .then(function() { console.log("C"); })
    .then(function() { console.log("D"); });

setTimeout(function() { console.log("E"); }, 0);

console.log("F");

// Output: A, F, C, D, B, E
// Explanation:
// A — sync
// F — sync
// C — microtask (from first .then)
// D — microtask (from second .then, chained)
// B — macrotask (first setTimeout)
// E — macrotask (second setTimeout)
```

---

## 5. Real-World Patterns

### Loading Spinner Pattern

Every real application shows a loading indicator while fetching data:

```javascript
async function loadDataWithSpinner() {
    const spinner = document.getElementById("spinner");
    const content = document.getElementById("content");
    const errorDiv = document.getElementById("error");

    // Show spinner, hide content and error
    spinner.style.display = "block";
    content.style.display = "none";
    errorDiv.style.display = "none";

    try {
        const response = await fetch("https://api.example.com/data");
        if (!response.ok) throw new Error("HTTP " + response.status);
        const data = await response.json();

        // Show content with data
        content.textContent = JSON.stringify(data, null, 2);
        content.style.display = "block";
    } catch (error) {
        // Show error message
        errorDiv.textContent = "Failed to load data: " + error.message;
        errorDiv.style.display = "block";
    } finally {
        // ALWAYS hide the spinner, whether we succeeded or failed
        spinner.style.display = "none";
    }
}
```

### Retry Logic with Exponential Backoff

When a network request fails, it's common to retry a few times before giving up. **Exponential backoff** means waiting longer between each retry (1 second, then 2 seconds, then 4 seconds) to avoid overwhelming the server:

```javascript
async function fetchWithRetry(url, maxRetries) {
    if (maxRetries === undefined) maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log("Attempt " + attempt + " of " + maxRetries + "...");
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            return await response.json();  // Success! Return the data.

        } catch (error) {
            console.log("Attempt " + attempt + " failed: " + error.message);

            if (attempt === maxRetries) {
                // No more retries left — give up
                throw new Error("Failed after " + maxRetries + " attempts: " + error.message);
            }

            // Wait before retrying (exponential backoff)
            // Attempt 1: wait 1s, Attempt 2: wait 2s, Attempt 3: wait 4s
            const waitTime = 1000 * Math.pow(2, attempt - 1);
            console.log("Waiting " + (waitTime / 1000) + " seconds before retry...");
            await new Promise(function(resolve) {
                setTimeout(resolve, waitTime);
            });
        }
    }
}

// Usage:
try {
    const data = await fetchWithRetry("https://api.example.com/data", 3);
    console.log("Got data:", data);
} catch (error) {
    console.error("All retries failed:", error.message);
}
```

### Debouncing (Rate-Limiting User Input)

When a user types in a search box, you don't want to make an API call on every single keystroke. **Debouncing** waits until the user stops typing for a specified delay before making the call:

```javascript
function debounce(fn, delay) {
    let timeoutId;
    return function() {
        var context = this;
        var args = arguments;
        // Cancel any previously scheduled call
        clearTimeout(timeoutId);
        // Schedule a new call
        timeoutId = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    };
}

// Only search after user stops typing for 300ms
const searchInput = document.getElementById("search");

const debouncedSearch = debounce(async function(query) {
    if (query.length < 2) return;  // Don't search for very short queries
    console.log("Searching for:", query);
    const response = await fetch("/api/search?q=" + encodeURIComponent(query));
    const results = await response.json();
    displayResults(results);
}, 300);

searchInput.addEventListener("input", function(e) {
    debouncedSearch(e.target.value);
});
```

**Without debouncing:** User types "hello" → 5 API calls (h, he, hel, hell, hello)
**With debouncing (300ms):** User types "hello" → 1 API call (hello) — because each keystroke cancels the previous timer, and the function only fires after the user pauses

### Processing Items One at a Time with async/await

Sometimes you need to process an array of items sequentially using async operations:

```javascript
// Process users one at a time (sequential)
async function processUsersOneByOne(userIds) {
    const results = [];

    for (const id of userIds) {
        console.log("Processing user " + id + "...");
        const response = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
        const user = await response.json();
        results.push(user);
        console.log("Done: " + user.name);
    }

    return results;
}

// Process all users simultaneously (parallel)
async function processUsersInParallel(userIds) {
    const promises = userIds.map(function(id) {
        return fetch("https://jsonplaceholder.typicode.com/users/" + id)
            .then(function(r) { return r.json(); });
    });

    return Promise.all(promises);
}

// Choose based on your needs:
// Sequential: when order matters or when the server limits concurrent requests
// Parallel: when you want speed and the operations are independent
```

---

## Comparison: Callbacks vs Promises vs async/await

| Feature | Callbacks | Promises | async/await |
|---------|-----------|----------|-------------|
| **Readability** | Low (deep nesting) | Medium (chaining) | High (looks synchronous) |
| **Error handling** | Manual (pass error callbacks) | `.catch()` at end of chain | `try/catch` blocks |
| **Chaining** | Callback hell | `.then()` chains | Sequential `await` lines |
| **Parallel** | Manual coordination | `Promise.all()` | `Promise.all()` with `await` |
| **When to use** | Legacy code, simple timers | Building reusable APIs | Most application code (preferred) |

**General recommendation:** Use `async/await` as your default. Use raw Promises when building utility functions. Only use callbacks for simple one-off operations like `setTimeout`.

---

## Practice Challenges

1. **Countdown Timer:** Use `setInterval` and Promises to create a countdown that resolves when it hits zero. Display the countdown visually on a page.
2. **Sequential Loader:** Fetch 3 different API endpoints one after another (users, posts, comments from JSONPlaceholder), passing data from each to display a combined result.
3. **Parallel Fetcher:** Fetch 5 different URLs simultaneously using `Promise.all()` and display how long it took compared to fetching them sequentially.
4. **Retry Button:** Create a button that fetches data from a URL. If it fails, automatically retry up to 3 times with exponential backoff. Show the attempt number and status.
5. **Search with Debouncing:** Build a search box that queries an API as the user types, but uses debouncing to avoid making too many requests. Display results below the search box.

---

## Further Reading

- [MDN: Introducing Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)
- [MDN: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [JavaScript.info: Promises, async/await](https://javascript.info/async)
- [What the heck is the Event Loop? (Video by Philip Roberts)](https://www.youtube.com/watch?v=8aGhZQkoFbQ) — Highly recommended visual explanation

---

*Self-Study Document 4 of 5 — BCA IV Semester Client Side Scripting*
