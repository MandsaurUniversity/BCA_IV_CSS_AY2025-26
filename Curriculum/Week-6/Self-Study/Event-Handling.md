# Self-Study: Event Handling

**Estimated Time:** 3-4 hours
**Prerequisites:** Weeks 1-5 complete, DOM Manipulation self-study
**Goal:** Learn to respond to user interactions — clicks, keyboard input, form submissions, and more

---

## What are Events?

An **event** is something that happens in the browser. Every time a user clicks a button, presses a key, moves the mouse, submits a form, or even when the page finishes loading — the browser creates an **event**. **Event handling** is the process of writing JavaScript code that responds to these events.

Without events, web pages would be static and non-interactive. Events are what make web applications feel alive — they connect user actions to JavaScript functions.

**Key terms:**
- **Event** — an action or occurrence detected by the browser (e.g., `"click"`, `"keydown"`, `"submit"`)
- **Event handler** (or **event listener**) — a function that runs when a specific event occurs on a specific element
- **Event target** — the element on which the event occurred (the button that was clicked, the input that was typed into)
- **Event object** — an object automatically created by the browser containing details about the event (which key was pressed, where the mouse was, which modifier keys were held, etc.)

**Analogy:** Think of events like a doorbell system. The doorbell (event) rings when someone presses it. The wiring (event listener) connects it to the speaker inside your house. The sound (handler function) plays as a result. You can disconnect the wiring (remove the listener) or connect it to play a different sound (change the handler).

---

## 1. Adding Event Listeners

### addEventListener() — The Recommended Way

The modern and recommended way to handle events is `addEventListener()`. It takes two required arguments: the **event type** (as a string) and the **callback function** (what to do when the event happens):

```javascript
const button = document.querySelector("#myButton");

button.addEventListener("click", function() {
    console.log("Button was clicked!");
});
```

**How it works step by step:**
1. `document.querySelector("#myButton")` — finds the button element in the DOM
2. `.addEventListener("click", ...)` — tells the browser: "When this button is clicked, run this function"
3. The browser stores this connection internally. Every time the button is clicked, it calls your function

You can use a named function (useful when you need to reuse the handler or remove it later):

```javascript
function handleClick() {
    console.log("Button clicked!");
}

button.addEventListener("click", handleClick);
// Note: we pass 'handleClick', NOT 'handleClick()'
// We're passing the function itself, not calling it
```

With arrow functions (concise syntax for simple handlers):

```javascript
button.addEventListener("click", () => {
    console.log("Clicked with arrow function!");
});
```

### Why addEventListener is Better Than Alternatives

You might see older code using inline HTML handlers or the `onclick` property. Here's why `addEventListener` is preferred:

```html
<!-- Method 1: Inline HTML handler (AVOID) -->
<button onclick="doSomething()">Click</button>
<!-- Problem: Mixes HTML and JavaScript, hard to maintain -->

<!-- Method 2: onclick property (AVOID) -->
<script>
    button.onclick = function() { console.log("clicked"); };
    button.onclick = function() { console.log("another"); };
    // Problem: The second assignment OVERWRITES the first!
    // Only "another" will log.
</script>

<!-- Method 3: addEventListener (USE THIS) -->
<script>
    button.addEventListener("click", function() {
        console.log("first handler");
    });
    button.addEventListener("click", function() {
        console.log("second handler");
    });
    // Both handlers run! addEventListener allows multiple listeners.
</script>
```

**Advantages of addEventListener:**
- You can attach **multiple** listeners for the same event on the same element
- You can **remove** specific listeners later
- You have control over the **capturing/bubbling phase** (explained later)
- It keeps your HTML clean — no JavaScript in HTML attributes

### Removing Event Listeners

To remove a listener, you must pass the **exact same function reference** that was used when adding it. This is why named functions are important:

```javascript
function handleClick() {
    console.log("Clicked!");
}

// Add the listener
button.addEventListener("click", handleClick);

// Later, remove it
button.removeEventListener("click", handleClick);

// COMMON MISTAKE: This does NOT work with anonymous functions
button.addEventListener("click", () => console.log("test"));
button.removeEventListener("click", () => console.log("test"));
// These are TWO DIFFERENT function objects, even though the code is identical!
// The browser doesn't match them because they're different objects in memory.
```

**When would you remove a listener?**
- A one-time action (like a "Continue" button that should only work once)
- Cleaning up when a component is removed from the page
- Temporarily disabling interactivity

### One-Time Listeners (Built-In)

If you only want a listener to fire once, use the `{ once: true }` option:

```javascript
button.addEventListener("click", function() {
    console.log("This only runs once, then automatically removes itself");
}, { once: true });
```

---

## 2. Common Event Types

JavaScript can respond to dozens of different event types. Here are the most commonly used ones, organized by category.

### Mouse Events

Mouse events fire when the user interacts using a mouse or trackpad:

```javascript
const box = document.querySelector(".box");

// click — fires when the element is clicked (press AND release)
box.addEventListener("click", () => console.log("Clicked"));

// dblclick — fires on a double-click
box.addEventListener("dblclick", () => console.log("Double-clicked"));

// mousedown — fires the instant a mouse button is PRESSED (before release)
box.addEventListener("mousedown", () => console.log("Mouse button pressed"));

// mouseup — fires when a mouse button is RELEASED
box.addEventListener("mouseup", () => console.log("Mouse button released"));

// mouseover — fires when the mouse pointer ENTERS the element
box.addEventListener("mouseover", () => console.log("Mouse entered"));

// mouseout — fires when the mouse pointer LEAVES the element
box.addEventListener("mouseout", () => console.log("Mouse left"));

// mousemove — fires CONTINUOUSLY as the mouse moves over the element
// (this fires many times per second — use sparingly!)
box.addEventListener("mousemove", (e) => {
    console.log(`Mouse at (${e.clientX}, ${e.clientY})`);
});
```

**The difference between `click`, `mousedown`, and `mouseup`:**
- `mousedown` fires the instant you press the button (before you release it)
- `mouseup` fires the instant you release the button
- `click` fires after a complete press-and-release cycle

This matters for features like drag-and-drop, where you need to track when the user starts dragging (mousedown), moves the mouse (mousemove), and releases (mouseup).

**The difference between `mouseover`/`mouseout` and `mouseenter`/`mouseleave`:**
- `mouseover`/`mouseout` fire again when moving between child elements inside the target
- `mouseenter`/`mouseleave` only fire when entering/leaving the target itself (ignoring children)

```javascript
// Use mouseenter/mouseleave for hover effects — they behave more intuitively
box.addEventListener("mouseenter", () => box.style.backgroundColor = "yellow");
box.addEventListener("mouseleave", () => box.style.backgroundColor = "");
```

### Keyboard Events

Keyboard events fire when the user presses or releases keys. They are usually attached to `document` (to capture global shortcuts) or to specific input elements:

```javascript
// keydown — fires when ANY key is pressed (fires repeatedly if held down)
document.addEventListener("keydown", (e) => {
    console.log("Key pressed:", e.key);    // Human-readable: "a", "Enter", "ArrowUp"
    console.log("Key code:", e.code);       // Physical key: "KeyA", "Enter", "ArrowUp"
    console.log("Shift held?", e.shiftKey); // true if Shift was held during the keypress
    console.log("Ctrl held?", e.ctrlKey);   // true if Ctrl was held
    console.log("Alt held?", e.altKey);     // true if Alt was held
    console.log("Meta held?", e.metaKey);   // true if Windows/Cmd key was held
});

// keyup — fires when a key is RELEASED (fires only once per key press)
document.addEventListener("keyup", (e) => {
    console.log("Key released:", e.key);
});
```

**`e.key` vs `e.code` — which should you use?**
- `e.key` gives the **character** produced by the key. On a US keyboard, pressing the "A" key gives `"a"` (or `"A"` with Shift). This changes with keyboard layout.
- `e.code` gives the **physical key** name. Pressing the same key always gives `"KeyA"` regardless of keyboard layout. Use this for game controls or shortcuts where the physical position matters.

```javascript
// Listening on a specific input for Enter key
const input = document.querySelector("#search");
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log("Searching for:", input.value);
        // Trigger search logic here
    }
});

// Keyboard shortcut: Ctrl+S to save
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();  // Prevent browser's save dialog
        console.log("Custom save triggered!");
    }
});
```

### Form Events

Form events are essential for interactive forms — login pages, registration forms, search bars, and data entry:

```javascript
const form = document.querySelector("#myForm");

// submit — fires when the form is submitted (button click or Enter key)
form.addEventListener("submit", (e) => {
    e.preventDefault();  // CRUCIAL: Prevents the page from reloading!

    // Without preventDefault(), the browser would reload the page,
    // which is the default HTML form behavior.
    // We prevent it so we can handle the form data with JavaScript.

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    console.log("Form submitted:", name, email);
});

// input — fires on EVERY change (every keystroke, paste, etc.)
const textInput = document.querySelector("#textField");
textInput.addEventListener("input", (e) => {
    console.log("Current value:", e.target.value);
    // Perfect for live search, character counting, real-time validation
});

// change — fires when the input LOSES FOCUS after being changed
// (for text inputs: fires when you click away or press Tab)
// (for checkboxes/selects: fires immediately on change)
textInput.addEventListener("change", (e) => {
    console.log("Final value:", e.target.value);
});

// focus — fires when an input GAINS focus (user clicks or tabs into it)
textInput.addEventListener("focus", () => console.log("Input focused"));

// blur — fires when an input LOSES focus (user clicks or tabs away)
textInput.addEventListener("blur", () => console.log("Input lost focus"));
```

**`input` vs `change` — when to use which?**
- Use `input` for **real-time** feedback: live search, character counting, instant validation
- Use `change` for actions that should happen **after the user is done editing**: saving data, running expensive validation

### Window and Document Events

These events relate to the page itself, not specific elements:

```javascript
// DOMContentLoaded — DOM structure is ready (before images/stylesheets finish loading)
// This is the BEST place to put your DOM manipulation code
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready — safe to manipulate elements");
    // All your querySelector calls, event listeners, etc. go here
});

// load — page is FULLY loaded (including all images, stylesheets, fonts, etc.)
window.addEventListener("load", () => {
    console.log("Page fully loaded including all resources");
});

// resize — fires when the browser window is resized
// (can fire many times per second during resize)
window.addEventListener("resize", () => {
    console.log(`Window size: ${window.innerWidth} x ${window.innerHeight}`);
});

// scroll — fires when the page is scrolled
window.addEventListener("scroll", () => {
    console.log("Scroll position:", window.scrollY);
    // Useful for: "back to top" buttons, infinite scroll, parallax effects
});

// beforeunload — fires when the user is about to leave the page
window.addEventListener("beforeunload", (e) => {
    // Show a "Are you sure you want to leave?" dialog
    e.preventDefault();
    // Note: Modern browsers show a generic message, not custom ones
});
```

### Real-World Example: Click Counter Dashboard

```html
<!DOCTYPE html>
<html>
<head>
    <title>Click Counter</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
        .counter-display {
            font-size: 72px; font-weight: bold; color: #3498db;
            margin: 20px 0;
        }
        .btn {
            padding: 15px 30px; font-size: 18px; margin: 5px;
            border: none; border-radius: 8px; cursor: pointer;
        }
        .btn-click { background: #3498db; color: white; }
        .btn-click:hover { background: #2980b9; }
        .btn-reset { background: #e74c3c; color: white; }
        .btn-reset:hover { background: #c0392b; }
        .info { color: #666; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Click Counter</h1>
    <div class="counter-display" id="count">0</div>
    <button class="btn btn-click" id="clickBtn">Click Me!</button>
    <button class="btn btn-reset" id="resetBtn">Reset</button>
    <p class="info" id="info">Click the button to start counting</p>

    <script>
        let count = 0;
        const countDisplay = document.getElementById("count");
        const clickBtn = document.getElementById("clickBtn");
        const resetBtn = document.getElementById("resetBtn");
        const info = document.getElementById("info");

        clickBtn.addEventListener("click", function() {
            count++;
            countDisplay.textContent = count;

            // Change color based on count milestones
            if (count >= 50) {
                countDisplay.style.color = "#e74c3c";  // Red
                info.textContent = "You're on fire! " + count + " clicks!";
            } else if (count >= 20) {
                countDisplay.style.color = "#f39c12";  // Orange
                info.textContent = "Keep going! " + count + " clicks!";
            } else if (count >= 10) {
                countDisplay.style.color = "#2ecc71";  // Green
                info.textContent = "Nice! Double digits!";
            } else {
                info.textContent = "Keep clicking!";
            }
        });

        resetBtn.addEventListener("click", function() {
            count = 0;
            countDisplay.textContent = "0";
            countDisplay.style.color = "#3498db";
            info.textContent = "Counter reset. Click the button to start again.";
        });

        // Also count keyboard Enter presses
        document.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                clickBtn.click();  // Simulate a button click
            }
        });
    </script>
</body>
</html>
```

---

## 3. The Event Object

Every event handler receives an **event object** (commonly named `e`, `event`, or `evt`) as its first argument. This object is created by the browser and contains detailed information about exactly what happened.

```javascript
document.addEventListener("click", function(e) {
    // What type of event occurred
    console.log("Event type:", e.type);           // "click"

    // WHICH element triggered the event
    console.log("Target element:", e.target);       // The specific element clicked
    console.log("Tag name:", e.target.tagName);     // "BUTTON", "DIV", etc.

    // WHERE the mouse was when click happened
    console.log("Viewport X:", e.clientX);  // X position relative to browser window
    console.log("Viewport Y:", e.clientY);  // Y position relative to browser window
    console.log("Page X:", e.pageX);        // X position relative to full page
    console.log("Page Y:", e.pageY);        // Y position relative to full page

    // WHEN it happened
    console.log("Timestamp:", e.timeStamp); // Milliseconds since page load
});
```

### e.target vs e.currentTarget

This distinction is critical for understanding event delegation (covered in the next section):

```javascript
const list = document.querySelector("ul");

list.addEventListener("click", function(e) {
    // e.target: the element that was ACTUALLY clicked (where the event originated)
    console.log("target:", e.target.tagName);           // "LI" (what user clicked)

    // e.currentTarget: the element the listener is ATTACHED to
    console.log("currentTarget:", e.currentTarget.tagName); // "UL" (where listener is)

    // e.currentTarget is always the same as 'this' (when using regular functions)
    console.log(this === e.currentTarget);  // true
});
```

**Think of it this way:** If you're standing in a crowd and hear someone yell, `e.target` is the person who yelled, and `e.currentTarget` is you (the listener).

### Useful Properties for Different Event Types

```javascript
// For keyboard events:
document.addEventListener("keydown", (e) => {
    e.key;       // "a", "Enter", "Escape", "ArrowUp"
    e.code;      // "KeyA", "Enter", "Escape", "ArrowUp"
    e.shiftKey;  // true/false
    e.ctrlKey;   // true/false
    e.altKey;    // true/false
    e.repeat;    // true if key is being held down
});

// For mouse events:
element.addEventListener("click", (e) => {
    e.button;    // 0 = left, 1 = middle, 2 = right
    e.clientX;   // X relative to viewport
    e.clientY;   // Y relative to viewport
    e.pageX;     // X relative to full page
    e.pageY;     // Y relative to full page
});

// For form/input events:
input.addEventListener("input", (e) => {
    e.target.value;  // Current value of the input
    e.data;          // The character that was just typed (for "input" event)
    e.inputType;     // "insertText", "deleteContentBackward", etc.
});
```

---

## 4. Event Propagation: Bubbling and Capturing

This is one of the most important (and often confusing) concepts in event handling. Understanding it unlocks powerful patterns like **event delegation**.

### What is Event Propagation?

When you click a button inside a div inside the body, you're not just clicking the button — you're also clicking the div and the body. The browser needs a system to decide which event handlers fire and in what order. This system is called **event propagation**.

When an event occurs on an element, it doesn't just fire on that element. It travels through the DOM tree in **three phases**:

1. **Capturing phase** — the event travels **DOWN** from the document root to the target element
2. **Target phase** — the event arrives at the element where it happened
3. **Bubbling phase** — the event travels **UP** from the target back to the document root

```
         Document              PHASE 1: Capturing (DOWN)
            |                     Document -> body -> div -> button
          <body>
            |                  PHASE 2: Target
          <div>                   Event arrives at the button
            |
         <button>  <-- User clicks here
            |
          <div>                PHASE 3: Bubbling (UP)
            |                     button -> div -> body -> Document
          <body>
            |
         Document
```

### Bubbling (Default Behavior)

By default, event listeners fire during the **bubbling phase** — events bubble UP from the target to the root. This means clicking a deeply nested element will trigger listeners on all its ancestors:

```javascript
document.querySelector("button").addEventListener("click", () => {
    console.log("1. Button clicked");    // Fires first (target)
});

document.querySelector("div").addEventListener("click", () => {
    console.log("2. Div clicked");       // Fires second (bubbles up)
});

document.querySelector("body").addEventListener("click", () => {
    console.log("3. Body clicked");      // Fires third (bubbles up more)
});

// When you click the button, ALL THREE handlers fire:
// "1. Button clicked"
// "2. Div clicked"
// "3. Body clicked"
```

### Visualizing Bubbling: A Working Demo

```html
<!DOCTYPE html>
<html>
<head>
    <title>Event Bubbling Demo</title>
    <style>
        .outer {
            background: #3498db; padding: 40px; color: white;
            border-radius: 8px;
        }
        .middle {
            background: #2ecc71; padding: 30px; margin-top: 10px;
            border-radius: 8px;
        }
        .inner {
            background: #e74c3c; padding: 20px;
            border-radius: 8px; cursor: pointer;
        }
        .flash { outline: 3px solid yellow; }
        #log {
            margin-top: 20px; padding: 10px; background: #f9f9f9;
            font-family: monospace; min-height: 80px;
            border: 1px solid #ddd; border-radius: 4px;
        }
    </style>
</head>
<body>
    <h2>Click the Red Box and Watch Events Bubble Up</h2>

    <div class="outer" id="outer">
        OUTER (Blue)
        <div class="middle" id="middle">
            MIDDLE (Green)
            <div class="inner" id="inner">
                INNER (Red) - Click me!
            </div>
        </div>
    </div>

    <div id="log">Click log will appear here...</div>
    <button id="clearLog">Clear Log</button>

    <script>
        const log = document.getElementById("log");
        let logEntries = [];

        function addLog(message, color) {
            logEntries.push('<span style="color:' + color + '">' + message + '</span>');
            log.innerHTML = logEntries.join("<br>");
        }

        // Each layer has a listener — watch them fire in order
        document.getElementById("inner").addEventListener("click", function(e) {
            addLog("1. INNER clicked (target: " + e.target.id + ")", "#e74c3c");
            this.classList.add("flash");
            setTimeout(() => this.classList.remove("flash"), 300);
        });

        document.getElementById("middle").addEventListener("click", function(e) {
            addLog("2. MIDDLE heard it (bubbled up) (target: " + e.target.id + ")", "#2ecc71");
            this.classList.add("flash");
            setTimeout(() => this.classList.remove("flash"), 300);
        });

        document.getElementById("outer").addEventListener("click", function(e) {
            addLog("3. OUTER heard it (bubbled up more) (target: " + e.target.id + ")", "#3498db");
            this.classList.add("flash");
            setTimeout(() => this.classList.remove("flash"), 300);
        });

        document.getElementById("clearLog").addEventListener("click", function(e) {
            e.stopPropagation();  // Prevent this click from bubbling
            logEntries = [];
            log.innerHTML = "Click log will appear here...";
        });
    </script>
</body>
</html>
```

### Stopping Propagation

Sometimes you want an event to stop bubbling — you want it to be handled ONLY by the element it happened on, not by its ancestors:

```javascript
button.addEventListener("click", (e) => {
    e.stopPropagation();  // The event stops here — parent handlers won't fire
    console.log("Only the button handler runs");
});

// There's also stopImmediatePropagation() which is stronger:
// It stops the event from reaching parents AND prevents other listeners
// on the SAME element from firing
button.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    console.log("This runs");
});
button.addEventListener("click", (e) => {
    console.log("This does NOT run (same element, but stopped)");
});
```

**When to use stopPropagation:**
- A modal dialog where clicks inside should not close the modal (but clicks outside should)
- A dropdown menu where clicking inside it should not trigger the document-level click handler that closes it

### Capturing Phase

To listen during the capturing phase (events going DOWN), pass `true` or `{ capture: true }` as the third argument:

```javascript
// Capturing phase listener (fires BEFORE the default bubbling listeners)
document.addEventListener("click", () => {
    console.log("Document captured the click (going DOWN)");
}, true);  // <-- third argument: true = capturing phase

// Bubbling phase listener (default)
document.addEventListener("click", () => {
    console.log("Document heard the bubble (going UP)");
});

// When you click a button:
// "Document captured the click (going DOWN)"  ← capturing fires first
// "Document heard the bubble (going UP)"       ← bubbling fires after
```

Capturing is rarely used in practice, but it's good to know it exists. The main use case is intercepting events before they reach their target, for things like global event logging.

### Event Delegation — A Powerful Pattern

**Event delegation** is one of the most useful patterns in JavaScript. Instead of adding event listeners to many individual elements, you add **ONE listener to a common parent** and use `e.target` to determine which child was actually interacted with.

```javascript
// INEFFICIENT: Adding a listener to every button individually
document.querySelectorAll(".item-btn").forEach(btn => {
    btn.addEventListener("click", handleClick);
});
// Problem: If you dynamically add new buttons later, they won't have listeners!

// EFFICIENT: One listener on the parent (event delegation)
document.querySelector(".item-list").addEventListener("click", (e) => {
    // Check if the clicked element (or its ancestor) is a button
    const button = e.target.closest(".item-btn");
    if (button) {
        console.log("Button clicked:", button.textContent);
        console.log("Product ID:", button.dataset.productId);
    }
});
```

**Why delegation is better:**
1. **Works for future elements** — Elements added dynamically after the page loads will automatically be handled. You don't need to re-attach listeners.
2. **Uses less memory** — One listener instead of potentially hundreds
3. **Cleaner code** — One central handler instead of scattered listeners

**When to use `e.target.closest()` vs `e.target.classList.contains()`:**

```javascript
// closest() is safer because it works even if the user clicks
// on a child element inside the button (like an icon or span)
listElement.addEventListener("click", (e) => {
    // If button has <button class="delete"><span>X</span></button>
    // and user clicks the <span>, e.target is the span, NOT the button

    // This might fail:
    if (e.target.classList.contains("delete")) { /* ... */ }
    // Because e.target is <span>, which doesn't have class "delete"

    // This works reliably:
    const deleteBtn = e.target.closest(".delete");
    if (deleteBtn) { /* ... */ }
    // closest() walks UP the tree to find the matching ancestor
});
```

### Real-World Example: Delegated Shopping List

```html
<!DOCTYPE html>
<html>
<head>
    <title>Shopping List with Delegation</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 40px auto; padding: 0 20px; }
        .item {
            display: flex; align-items: center; padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .item span { flex: 1; }
        .item.bought span { text-decoration: line-through; color: #999; }
        .item button { margin-left: 5px; padding: 5px 10px; cursor: pointer; border: none; border-radius: 4px; }
        .buy-btn { background: #2ecc71; color: white; }
        .del-btn { background: #e74c3c; color: white; }
        .add-row { display: flex; gap: 10px; margin-bottom: 20px; }
        .add-row input { flex: 1; padding: 8px; font-size: 16px; }
        .add-row button { padding: 8px 16px; }
    </style>
</head>
<body>
    <h1>Shopping List</h1>
    <div class="add-row">
        <input type="text" id="itemInput" placeholder="Add item...">
        <button id="addBtn">Add</button>
    </div>
    <div id="list"></div>

    <script>
        const list = document.getElementById("list");
        const itemInput = document.getElementById("itemInput");

        // ONE event listener on the parent handles ALL buttons
        // (even buttons that don't exist yet!)
        list.addEventListener("click", function(e) {
            const buyBtn = e.target.closest(".buy-btn");
            const delBtn = e.target.closest(".del-btn");

            if (buyBtn) {
                const item = buyBtn.closest(".item");
                item.classList.toggle("bought");
            }

            if (delBtn) {
                const item = delBtn.closest(".item");
                item.remove();
            }
        });

        function addItem(text) {
            const item = document.createElement("div");
            item.classList.add("item");
            item.innerHTML =
                "<span>" + text + "</span>" +
                '<button class="buy-btn">Bought</button>' +
                '<button class="del-btn">Remove</button>';
            list.appendChild(item);
        }

        document.getElementById("addBtn").addEventListener("click", function() {
            const text = itemInput.value.trim();
            if (text) {
                addItem(text);
                itemInput.value = "";
                itemInput.focus();
            }
        });

        itemInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") document.getElementById("addBtn").click();
        });

        // Add some default items
        ["Milk", "Bread", "Eggs", "Butter"].forEach(addItem);
    </script>
</body>
</html>
```

**Notice:** The "Bought" and "Remove" buttons work perfectly even for items added AFTER the page loaded. That's the power of event delegation — the single listener on `#list` catches clicks from all current and future children.

---

## 5. Preventing Default Behavior

Many HTML elements have built-in default behaviors. For example, clicking a link navigates to a URL, submitting a form reloads the page, and right-clicking shows a context menu. `e.preventDefault()` stops these default actions so you can handle them with JavaScript instead:

```javascript
// Prevent form submission (which would reload the page)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Now handle the form data with JavaScript instead of reloading
    const data = new FormData(form);
    console.log("Name:", data.get("name"));
});

// Prevent a link from navigating away
link.addEventListener("click", (e) => {
    e.preventDefault();
    // Handle the "navigation" with JavaScript (like a single-page app)
    console.log("Navigating to:", link.href);
    loadPage(link.href);  // Custom navigation function
});

// Prevent right-click context menu (to show a custom one)
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showCustomMenu(e.clientX, e.clientY);
});

// Prevent a checkbox from being checked/unchecked
checkbox.addEventListener("click", (e) => {
    e.preventDefault();
    alert("You need to accept the terms first!");
});
```

**Important distinction:**
- `e.preventDefault()` stops the **browser's default action** (navigation, form submission, etc.)
- `e.stopPropagation()` stops the **event from bubbling** to parent elements
- They do different things and are used for different purposes. You might need both, one, or neither depending on the situation.

---

## 6. Custom Events

JavaScript lets you create and dispatch your own custom events. This is useful for communication between different parts of your application without tightly coupling them.

```javascript
// Creating a custom event
const myEvent = new CustomEvent("userLoggedIn", {
    detail: {
        username: "alice",
        timestamp: Date.now(),
        role: "admin"
    }
});

// Listening for the custom event
document.addEventListener("userLoggedIn", (e) => {
    console.log("User logged in:", e.detail.username);
    console.log("Role:", e.detail.role);
    // Update the UI, load user data, etc.
});

// Dispatching (triggering) the custom event
document.dispatchEvent(myEvent);
// Output: "User logged in: alice"
//         "Role: admin"
```

**When to use custom events:**
- Notifying other parts of your app when something happens (a cart item is added, user logs in, data finishes loading)
- Decoupling components so they don't need to directly reference each other
- Building a simple event-based communication system

### Real-World Example: Cart Notification System

```html
<!DOCTYPE html>
<html>
<head>
    <title>Custom Events Demo</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .notification {
            background: #2ecc71; color: white; padding: 15px;
            border-radius: 8px; margin: 10px 0;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; } }
        .product { display: inline-block; margin: 10px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .product button { margin-top: 10px; padding: 8px 16px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; }
        #cartCount { font-weight: bold; color: #e74c3c; }
    </style>
</head>
<body>
    <h1>Shop <span id="cartCount">(0 items in cart)</span></h1>
    <div id="notifications"></div>

    <div class="product">
        <h3>Headphones</h3>
        <p>$49.99</p>
        <button data-product="Headphones" data-price="49.99">Add to Cart</button>
    </div>
    <div class="product">
        <h3>Keyboard</h3>
        <p>$79.99</p>
        <button data-product="Keyboard" data-price="79.99">Add to Cart</button>
    </div>

    <script>
        let cartItems = 0;

        // LISTEN for custom "addToCart" events (this could be in a separate module)
        document.addEventListener("addToCart", function(e) {
            cartItems++;
            document.getElementById("cartCount").textContent =
                "(" + cartItems + " items in cart)";

            // Show a notification
            const note = document.createElement("div");
            note.classList.add("notification");
            note.textContent = "Added " + e.detail.product + " ($" + e.detail.price + ") to cart!";
            document.getElementById("notifications").appendChild(note);

            // Auto-remove notification after 3 seconds
            setTimeout(() => note.remove(), 3000);
        });

        // DISPATCH custom events when buttons are clicked
        document.querySelectorAll(".product button").forEach(btn => {
            btn.addEventListener("click", function() {
                const event = new CustomEvent("addToCart", {
                    detail: {
                        product: this.dataset.product,
                        price: this.dataset.price
                    }
                });
                document.dispatchEvent(event);
            });
        });
    </script>
</body>
</html>
```

---

## 7. Common Mistakes and Pitfalls

### Mistake 1: Forgetting preventDefault() on Forms

```javascript
// WITHOUT preventDefault, the page reloads and you lose everything!
form.addEventListener("submit", (e) => {
    // e.preventDefault();  // Oops, forgot this!
    console.log("This logs but then the page immediately reloads...");
});

// FIX: Always call preventDefault() when handling forms with JavaScript
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("This logs and the page stays put.");
});
```

### Mistake 2: Adding Listeners Inside Loops Without Closures

```javascript
// PROBLEM: All buttons alert the same number (the final value of i)
const buttons = document.querySelectorAll("button");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        alert("Button " + i);  // Always shows the LAST value of i
    });
}
// If there are 5 buttons, clicking ANY button shows "Button 5"

// FIX 1: Use let instead of var (let is block-scoped)
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        alert("Button " + i);  // Each button shows its own number
    });
}

// FIX 2: Use forEach (which creates a new scope for each iteration)
buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        alert("Button " + index);
    });
});
```

### Mistake 3: Memory Leaks from Not Removing Listeners

If you create and destroy elements frequently (like in a single-page app), always clean up listeners to prevent memory leaks:

```javascript
// If an element is removed from the DOM but its event listener references
// other objects, those objects can't be garbage collected

// When removing dynamic components, clean up:
function createWidget() {
    const widget = document.createElement("div");
    const handler = () => console.log("clicked");
    widget.addEventListener("click", handler);

    // Store reference for cleanup
    widget._cleanup = () => widget.removeEventListener("click", handler);

    return widget;
}

// When removing the widget:
function removeWidget(widget) {
    widget._cleanup();  // Remove listener
    widget.remove();     // Remove from DOM
}
```

### Mistake 4: Using this Inside Arrow Functions

Arrow functions do NOT have their own `this` — they inherit `this` from the surrounding code. This can be surprising inside event handlers:

```javascript
const button = document.querySelector("button");

// Regular function: 'this' refers to the element
button.addEventListener("click", function() {
    console.log(this);           // The <button> element
    this.style.color = "red";    // Works!
});

// Arrow function: 'this' refers to the outer scope (usually window or undefined)
button.addEventListener("click", () => {
    console.log(this);           // Window object (not the button!)
    this.style.color = "red";    // Error or modifies the wrong thing
});

// If you need both: use the event object's target instead
button.addEventListener("click", (e) => {
    e.target.style.color = "red";  // Works with arrow functions!
    // Or e.currentTarget for the element the listener is on
});
```

---

## 8. Practical Example: Real-Time Form Validation

```html
<!DOCTYPE html>
<html>
<head>
    <title>Form Validation</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 400px; margin: 40px auto; padding: 0 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input {
            width: 100%; padding: 10px; font-size: 16px;
            border: 2px solid #ddd; border-radius: 4px; box-sizing: border-box;
        }
        input.valid { border-color: #2ecc71; }
        input.invalid { border-color: #e74c3c; }
        .message { font-size: 13px; margin-top: 3px; min-height: 18px; }
        .message.error { color: #e74c3c; }
        .message.success { color: #2ecc71; }
        .strength-bar {
            height: 6px; border-radius: 3px; margin-top: 5px;
            transition: width 0.3s, background 0.3s;
        }
        button[type="submit"] {
            width: 100%; padding: 12px; font-size: 16px;
            background: #3498db; color: white; border: none;
            border-radius: 4px; cursor: pointer;
        }
        button[type="submit"]:disabled { background: #ccc; cursor: not-allowed; }
    </style>
</head>
<body>
    <h2>Create Account</h2>
    <form id="signupForm">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" id="email" placeholder="you@example.com">
            <div class="message" id="emailMsg"></div>
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="At least 8 characters">
            <div class="strength-bar" id="strengthBar"></div>
            <div class="message" id="passwordMsg"></div>
        </div>
        <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder="Re-enter password">
            <div class="message" id="confirmMsg"></div>
        </div>
        <button type="submit" id="submitBtn" disabled>Create Account</button>
    </form>

    <script>
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const submitBtn = document.getElementById("submitBtn");
        const form = document.getElementById("signupForm");

        const validity = { email: false, password: false, confirm: false };

        function checkSubmitReady() {
            submitBtn.disabled = !(validity.email && validity.password && validity.confirm);
        }

        // --- Email Validation (on input) ---
        email.addEventListener("input", function() {
            const msg = document.getElementById("emailMsg");
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (this.value === "") {
                this.className = "";
                msg.textContent = "";
                validity.email = false;
            } else if (emailPattern.test(this.value)) {
                this.className = "valid";
                msg.textContent = "Valid email address";
                msg.className = "message success";
                validity.email = true;
            } else {
                this.className = "invalid";
                msg.textContent = "Please enter a valid email (e.g., name@domain.com)";
                msg.className = "message error";
                validity.email = false;
            }
            checkSubmitReady();
        });

        // --- Password Strength (on input) ---
        password.addEventListener("input", function() {
            const msg = document.getElementById("passwordMsg");
            const bar = document.getElementById("strengthBar");
            const val = this.value;
            let strength = 0;

            if (val.length >= 8) strength++;
            if (val.length >= 12) strength++;
            if (/[A-Z]/.test(val)) strength++;
            if (/[0-9]/.test(val)) strength++;
            if (/[^A-Za-z0-9]/.test(val)) strength++;

            const colors = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60"];
            const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
            const widths = ["20%", "40%", "60%", "80%", "100%"];

            if (val === "") {
                bar.style.width = "0";
                msg.textContent = "";
                this.className = "";
                validity.password = false;
            } else {
                const level = Math.min(strength, 4);
                bar.style.width = widths[level];
                bar.style.backgroundColor = colors[level];
                msg.textContent = "Strength: " + labels[level];
                msg.className = level >= 2 ? "message success" : "message error";
                this.className = val.length >= 8 ? "valid" : "invalid";
                validity.password = val.length >= 8;
            }

            // Re-check confirm password if it has a value
            if (confirmPassword.value !== "") {
                confirmPassword.dispatchEvent(new Event("input"));
            }
            checkSubmitReady();
        });

        // --- Confirm Password (on input) ---
        confirmPassword.addEventListener("input", function() {
            const msg = document.getElementById("confirmMsg");

            if (this.value === "") {
                this.className = "";
                msg.textContent = "";
                validity.confirm = false;
            } else if (this.value === password.value) {
                this.className = "valid";
                msg.textContent = "Passwords match";
                msg.className = "message success";
                validity.confirm = true;
            } else {
                this.className = "invalid";
                msg.textContent = "Passwords do not match";
                msg.className = "message error";
                validity.confirm = false;
            }
            checkSubmitReady();
        });

        // --- Form Submission ---
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Account created successfully!\nEmail: " + email.value);
        });
    </script>
</body>
</html>
```

**What this demonstrates:** Using the `input` event for real-time validation, computing password strength from multiple criteria, checking field matching, enabling/disabling the submit button based on combined validity, and using `preventDefault` on form submission.

---

## 9. Practical Example: Interactive Quiz

```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Quiz</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
        .question { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .correct { background-color: #d4edda; border-color: #28a745; }
        .incorrect { background-color: #f8d7da; border-color: #dc3545; }
        button { margin: 5px; padding: 8px 16px; cursor: pointer; border: 1px solid #ddd; border-radius: 4px; background: white; }
        button:hover { background: #f0f0f0; }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
        #result { font-size: 24px; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>JavaScript Quiz</h1>
    <div id="quiz"></div>
    <div id="result"></div>

    <script>
        const questions = [
            {
                question: "What does === check?",
                options: ["Value only", "Type only", "Value and type", "Reference"],
                answer: 2
            },
            {
                question: "Which keyword declares a block-scoped variable?",
                options: ["var", "let", "function", "global"],
                answer: 1
            },
            {
                question: "What does Array.map() return?",
                options: ["undefined", "The original array", "A new array", "A single value"],
                answer: 2
            }
        ];

        let score = 0;
        const quizDiv = document.getElementById("quiz");

        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");
            questionDiv.id = "q" + index;

            const questionText = document.createElement("p");
            questionText.textContent = (index + 1) + ". " + q.question;
            questionDiv.appendChild(questionText);

            q.options.forEach((option, optIndex) => {
                const btn = document.createElement("button");
                btn.textContent = option;
                btn.addEventListener("click", () => {
                    // Disable all buttons for this question
                    const buttons = questionDiv.querySelectorAll("button");
                    buttons.forEach(b => b.disabled = true);

                    if (optIndex === q.answer) {
                        questionDiv.classList.add("correct");
                        score++;
                    } else {
                        questionDiv.classList.add("incorrect");
                        buttons[q.answer].style.fontWeight = "bold";
                        buttons[q.answer].style.border = "2px solid #28a745";
                    }

                    // Check if all questions answered
                    const answered = document.querySelectorAll(".correct, .incorrect");
                    if (answered.length === questions.length) {
                        document.getElementById("result").textContent =
                            "Final Score: " + score + "/" + questions.length;
                    }
                });
                questionDiv.appendChild(btn);
            });

            quizDiv.appendChild(questionDiv);
        });
    </script>
</body>
</html>
```

---

## Practice Challenges

1. **Click Counter:** Display a number that increases each time a button is clicked. Add a reset button and persist the count in localStorage.
2. **Keyboard Piano:** Assign different sounds or on-screen messages to keys A through G. Highlight the "key" visually when pressed.
3. **Drag and Drop:** Make a `<div>` draggable using mouse events (`mousedown`, `mousemove`, `mouseup`). Show its X/Y coordinates as it moves.
4. **Form Validator:** Build a registration form that validates in real-time — check email format, password strength (length, uppercase, numbers, symbols), and matching confirm password.
5. **Dark Mode Toggle:** Add a button that switches the entire page between light and dark themes. Save the preference in localStorage so it persists across page loads.

---

## Further Reading

- [MDN: Introduction to Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [MDN: Event Reference (full list of all events)](https://developer.mozilla.org/en-US/docs/Web/Events)
- [JavaScript.info: Introduction to Browser Events](https://javascript.info/introduction-browser-events)
- [JavaScript.info: Event Delegation](https://javascript.info/event-delegation)
- [MDN: Creating and Triggering Events](https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events)

---

*Self-Study Document 2 of 5 — BCA IV Semester Client Side Scripting*
