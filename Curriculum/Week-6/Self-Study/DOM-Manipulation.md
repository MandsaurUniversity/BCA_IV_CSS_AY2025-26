# Self-Study: DOM Manipulation

**Estimated Time:** 4-5 hours
**Prerequisites:** Weeks 1-5 complete
**Goal:** Learn to select, create, modify, and remove HTML elements using JavaScript

---

## What is the DOM?

The **DOM** (Document Object Model) is a programming interface for HTML documents. When a browser loads a web page, it does not simply display the raw HTML text. Instead, it **parses** the HTML and builds a **tree-like structure** in memory — this tree is the DOM. JavaScript can read and modify this tree, and any change to the DOM immediately updates what the user sees on the screen.

**Think of it this way:** The HTML file is like an architect's blueprint. The DOM is the actual building constructed from that blueprint. JavaScript is a worker who can walk around inside that building, move walls, paint rooms, and add new floors — all while people are living in it.

**Key terms:**
- **Document** — the entire web page, represented by the `document` object in JavaScript
- **Node** — any single item in the DOM tree. There are several types of nodes: element nodes, text nodes, comment nodes, and more
- **Element** — a specific type of node representing an HTML tag (`<div>`, `<p>`, `<h1>`, etc.). Elements are the most commonly manipulated nodes
- **Attribute** — a property of an HTML element (`id`, `class`, `href`, `src`, etc.) that provides additional information about the element

### The DOM Tree

When the browser reads this HTML:

```html
<html>
  <head>
    <title>My Page</title>
    <meta charset="UTF-8">
  </head>
  <body>
    <h1>Hello World</h1>
    <p id="intro">Welcome</p>
    <div class="container">
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
      <button id="btn">Click me</button>
    </div>
  </body>
</html>
```

It creates this tree in memory:

```
document
  └── <html>
        ├── <head>
        │     ├── <title>My Page</title>
        │     └── <meta charset="UTF-8">
        └── <body>
              ├── <h1>Hello World</h1>
              ├── <p id="intro">Welcome</p>
              └── <div class="container">
                    ├── <ul>
                    │     ├── <li>Item 1</li>
                    │     └── <li>Item 2</li>
                    └── <button id="btn">Click me</button>
```

Every HTML tag becomes a **node** in this tree. JavaScript can navigate this tree, find specific nodes, and change them. The relationship between nodes works exactly like a family tree: every node has a **parent** (the element it lives inside), and may have **children** (elements nested inside it) and **siblings** (elements at the same level).

---

## 1. Selecting Elements

Before you can change an element, you need to **select** (find) it in the DOM tree. This is the most fundamental skill in DOM manipulation. JavaScript gives you several methods to do this, and each has its own use case.

### getElementById()

Selects a **single** element by its `id` attribute. Since `id` values must be unique on a page, this always returns either one element or `null` (if no element has that ID).

```javascript
// HTML: <h1 id="title">Hello World</h1>
const title = document.getElementById("title");
console.log(title.textContent);  // "Hello World"
```

**Why use it?** It is the fastest selection method because the browser maintains an internal lookup table of all IDs. When you have a specific unique element (like a main heading, a navigation bar, or a form), use this method.

**What if the element doesn't exist?**

```javascript
const nonExistent = document.getElementById("xyz");
console.log(nonExistent);  // null

// Always check before using!
if (nonExistent) {
    nonExistent.textContent = "Found it!";
} else {
    console.log("Element not found");
}
```

### querySelector()

Selects the **first** element matching a CSS selector. This is the most versatile method because it accepts any valid CSS selector — the same selectors you use in CSS stylesheets.

```javascript
// By ID (same as getElementById but uses CSS selector syntax)
const title = document.querySelector("#title");

// By class (selects the FIRST element with this class)
const box = document.querySelector(".container");

// By tag name (selects the FIRST <p> on the page)
const firstParagraph = document.querySelector("p");

// By complex CSS selector
const listItem = document.querySelector("ul > li:first-child");

// By attribute
const emailInput = document.querySelector('input[type="email"]');

// By combination
const activeMenuItem = document.querySelector("nav .menu-item.active");
```

**Why use it?** It's the Swiss Army knife of element selection. You can use any CSS selector you already know. If you're comfortable writing CSS, you already know how to use this method.

### querySelectorAll()

Selects **all** elements matching a CSS selector. Returns a **NodeList** — which is similar to an array but not exactly the same.

```javascript
// All paragraphs on the page
const paragraphs = document.querySelectorAll("p");
console.log(paragraphs.length);  // Number of <p> elements found

// Loop through them using forEach
paragraphs.forEach(p => {
    console.log(p.textContent);
});

// All items with class "item"
const items = document.querySelectorAll(".item");

// All checked checkboxes
const checked = document.querySelectorAll('input[type="checkbox"]:checked');
```

**NodeList vs Array — What's the difference?**

A NodeList looks like an array and has `.length` and `.forEach()`, but it is NOT a real array. It doesn't have methods like `.map()`, `.filter()`, or `.reduce()`. If you need those methods, convert it to an array:

```javascript
const paragraphs = document.querySelectorAll("p");

// This works:
paragraphs.forEach(p => console.log(p.textContent));

// This does NOT work:
// paragraphs.map(p => p.textContent);  // Error! .map is not a function

// Convert to array first, then you can use all array methods:
const paragraphArray = Array.from(paragraphs);
const texts = paragraphArray.map(p => p.textContent);
console.log(texts);  // ["First paragraph", "Second paragraph", ...]

// Or use the spread operator:
const texts2 = [...paragraphs].map(p => p.textContent);
```

### getElementsByClassName() and getElementsByTagName()

These are older methods that return **live HTMLCollections**:

```javascript
// By class name (returns live HTMLCollection)
const boxes = document.getElementsByClassName("box");

// By tag name
const divs = document.getElementsByTagName("div");
```

**What does "live" mean?** A live collection automatically updates when the DOM changes. If you add a new element with class "box" to the page, the `boxes` collection above will automatically include it without you needing to re-query. A NodeList from `querySelectorAll()` is **static** — it's a snapshot of what existed at the moment you called it.

```javascript
// Live vs Static demonstration:
const liveBoxes = document.getElementsByClassName("box");  // LIVE
const staticBoxes = document.querySelectorAll(".box");      // STATIC

console.log(liveBoxes.length);   // e.g., 3
console.log(staticBoxes.length); // e.g., 3

// Now add a new box to the page
const newBox = document.createElement("div");
newBox.className = "box";
document.body.appendChild(newBox);

console.log(liveBoxes.length);   // 4  (automatically updated!)
console.log(staticBoxes.length); // 3  (still the same — it's a snapshot)
```

> **Best Practice:** Use `querySelector()` and `querySelectorAll()` for most tasks — they accept any CSS selector and are the most flexible. Use `getElementById()` when you need maximum speed for a single element with a known ID.

### Real-World Example: Highlighting Search Results

```html
<!DOCTYPE html>
<html>
<head>
    <title>Element Selection Demo</title>
    <style>
        .highlight { background-color: yellow; font-weight: bold; }
        .product { padding: 10px; margin: 5px 0; border: 1px solid #ddd; }
    </style>
</head>
<body>
    <h2>Product List</h2>
    <input type="text" id="searchBox" placeholder="Type to search products...">
    <div id="products">
        <div class="product">Wireless Bluetooth Headphones</div>
        <div class="product">USB-C Charging Cable</div>
        <div class="product">Laptop Stand Aluminum</div>
        <div class="product">Mechanical Keyboard RGB</div>
        <div class="product">Wireless Mouse Ergonomic</div>
    </div>

    <script>
        const searchBox = document.getElementById("searchBox");
        // querySelectorAll to get all product elements
        const products = document.querySelectorAll(".product");

        searchBox.addEventListener("input", function() {
            const searchTerm = this.value.toLowerCase();

            products.forEach(product => {
                const text = product.textContent.toLowerCase();
                if (searchTerm === "") {
                    // No search term — show all, remove highlight
                    product.style.display = "block";
                    product.classList.remove("highlight");
                } else if (text.includes(searchTerm)) {
                    // Match found — show and highlight
                    product.style.display = "block";
                    product.classList.add("highlight");
                } else {
                    // No match — hide
                    product.style.display = "none";
                    product.classList.remove("highlight");
                }
            });
        });
    </script>
</body>
</html>
```

**What this demonstrates:** Using `getElementById` for a unique element (the search box), `querySelectorAll` for a group of elements (all products), and combining selection with modification (showing/hiding, adding/removing classes) to create a useful feature.

---

## 2. Modifying Element Content

Once you've selected an element, you can change what it displays. There are three main properties for this, and choosing the right one matters for both functionality and security.

### textContent

Gets or sets the **plain text** inside an element. It ignores any HTML tags — if you set HTML through `textContent`, the tags will be displayed as literal text, not rendered.

```javascript
const heading = document.querySelector("h1");

// Read the text
console.log(heading.textContent);  // "Hello World"

// Write new text
heading.textContent = "New Title";

// HTML tags are NOT rendered — they appear as text
heading.textContent = "<em>Italic?</em>";
// The page shows literally: <em>Italic?</em>
// NOT italic text
```

**Why is this important?** Because `textContent` is **safe from injection attacks**. If a user types `<script>alert('hacked')</script>` into a form and you display it with `textContent`, the script tags appear as harmless text. This makes `textContent` the right choice whenever you're displaying user-provided data.

### innerHTML

Gets or sets the **HTML** inside an element. Unlike `textContent`, HTML tags ARE parsed and rendered:

```javascript
const container = document.querySelector(".container");

// Read — returns all the HTML inside the element
console.log(container.innerHTML);

// Write — HTML tags are rendered as actual HTML elements
container.innerHTML = "<p>New paragraph</p><strong>Bold text</strong>";
// The page now shows a paragraph and bold text

// You can build complex HTML structures
container.innerHTML = `
    <h2>Product Card</h2>
    <p class="price">$29.99</p>
    <button class="buy-btn">Add to Cart</button>
`;
```

> **Security Warning:** NEVER use `innerHTML` with user input! A malicious user could inject `<script>` tags or other harmful HTML. This is called a **Cross-Site Scripting (XSS)** attack. Always use `textContent` for user-provided text, or sanitize the input first.

```javascript
// DANGEROUS — never do this with user input!
const userInput = '<img src="x" onerror="alert(\'Hacked!\')">';
container.innerHTML = userInput;  // This would execute the attacker's code!

// SAFE — textContent escapes HTML
container.textContent = userInput;  // Shows the raw text harmlessly
```

### innerText vs textContent

You might also see `innerText`. The key difference:

```javascript
// HTML: <p>Hello <span style="display:none">hidden</span> World</p>
const p = document.querySelector("p");

console.log(p.textContent);  // "Hello hidden World" (includes hidden text)
console.log(p.innerText);    // "Hello  World" (only visible text)
```

`textContent` returns ALL text including hidden content. `innerText` only returns what's visually visible. `textContent` is generally faster and more predictable — prefer it unless you specifically need to check what's visible.

### value (for form inputs)

Form elements like `<input>`, `<textarea>`, and `<select>` don't use `textContent`. They use the `value` property:

```javascript
const input = document.querySelector("#username");

// Read the value typed by the user
console.log(input.value);  // Whatever the user has typed

// Set the value programmatically
input.value = "default_user";

// Clear the input
input.value = "";

// For checkboxes and radio buttons, use .checked
const checkbox = document.querySelector("#agree");
console.log(checkbox.checked);  // true or false
checkbox.checked = true;        // Check the box

// For <select> dropdowns
const dropdown = document.querySelector("#country");
console.log(dropdown.value);  // The value of the selected option
dropdown.value = "IN";         // Select the option with value="IN"
```

### Real-World Example: Live Character Counter

```html
<!DOCTYPE html>
<html>
<head>
    <title>Character Counter</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        textarea { width: 100%; height: 120px; font-size: 16px; padding: 10px; }
        .counter { margin-top: 5px; font-size: 14px; }
        .counter.warning { color: orange; }
        .counter.danger { color: red; font-weight: bold; }
    </style>
</head>
<body>
    <h2>Write a Tweet</h2>
    <textarea id="tweetBox" placeholder="What's happening?"></textarea>
    <div class="counter" id="charCounter">280 characters remaining</div>

    <script>
        const tweetBox = document.getElementById("tweetBox");
        const charCounter = document.getElementById("charCounter");
        const MAX_CHARS = 280;

        tweetBox.addEventListener("input", function() {
            const remaining = MAX_CHARS - this.value.length;

            // Update the counter text using textContent (safe)
            charCounter.textContent = remaining + " characters remaining";

            // Change color based on remaining characters
            charCounter.className = "counter";  // Reset classes
            if (remaining < 0) {
                charCounter.classList.add("danger");
                charCounter.textContent = Math.abs(remaining) + " characters over limit!";
            } else if (remaining < 50) {
                charCounter.classList.add("warning");
            }
        });
    </script>
</body>
</html>
```

---

## 3. Modifying Element Styles

There are two main approaches to changing how elements look: modifying inline styles directly, or toggling CSS classes. Understanding the difference helps you write cleaner, more maintainable code.

### Inline Styles (style property)

Every element has a `style` property that lets you set CSS properties directly in JavaScript. CSS property names with hyphens are converted to **camelCase**:

```javascript
const box = document.querySelector(".box");

// Set individual styles
box.style.backgroundColor = "blue";    // CSS: background-color
box.style.color = "white";             // CSS: color
box.style.padding = "20px";            // CSS: padding
box.style.borderRadius = "10px";       // CSS: border-radius
box.style.fontSize = "18px";           // CSS: font-size
box.style.display = "flex";            // CSS: display
box.style.justifyContent = "center";   // CSS: justify-content

// Reading a style
console.log(box.style.padding);  // "20px"

// Removing an inline style (set to empty string)
box.style.backgroundColor = "";
```

**Conversion Rule:**
| CSS Property | JavaScript Property |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |
| `z-index` | `zIndex` |
| `margin-top` | `marginTop` |

**When to use inline styles:** Quick, dynamic changes that depend on JavaScript calculations — like positioning an element based on mouse coordinates, or animating a progress bar's width.

### CSS Classes (classList) — The Better Approach

Instead of setting styles one by one, a better approach is to define CSS classes in your stylesheet and toggle them with JavaScript. This keeps your styles in CSS (where they belong) and your logic in JavaScript:

```javascript
const element = document.querySelector("#myElement");

// Add a class
element.classList.add("active");

// Remove a class
element.classList.remove("hidden");

// Toggle — adds the class if absent, removes it if present
element.classList.toggle("highlighted");
// Returns true if the class was added, false if removed

// Check if a class exists
if (element.classList.contains("active")) {
    console.log("Element is active");
}

// Replace one class with another
element.classList.replace("old-class", "new-class");

// Add multiple classes at once
element.classList.add("bold", "large", "primary");

// Remove multiple classes
element.classList.remove("bold", "large");
```

**Why is classList better than inline styles?**
1. **Separation of concerns** — styles stay in CSS files, logic stays in JS
2. **Reusability** — the same class can style many elements
3. **Maintainability** — changing the look means editing CSS, not diving into JS code
4. **Performance** — toggling a class is faster than setting multiple style properties
5. **Transitions** — CSS transitions and animations work with class changes

### Reading Computed Styles

The `.style` property only shows **inline** styles. To read the actual computed style (including styles from CSS files), use `getComputedStyle()`:

```javascript
const box = document.querySelector(".box");

// This only shows what's set inline
console.log(box.style.width);  // "" (empty if set by CSS, not inline)

// This shows the actual rendered value
const computed = getComputedStyle(box);
console.log(computed.width);           // "200px"
console.log(computed.backgroundColor); // "rgb(0, 0, 255)"
console.log(computed.fontSize);        // "16px"
```

### Real-World Example: Theme Switcher

```html
<!DOCTYPE html>
<html>
<head>
    <title>Theme Switcher</title>
    <style>
        /* Default (light) theme */
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            transition: background-color 0.3s, color 0.3s;
        }

        /* Dark theme — applied when body has "dark-theme" class */
        body.dark-theme {
            background-color: #1a1a2e;
            color: #e0e0e0;
        }
        body.dark-theme .card {
            background-color: #16213e;
            border-color: #0f3460;
        }
        body.dark-theme button {
            background-color: #e94560;
            color: white;
        }

        .card {
            border: 1px solid #ddd;
            padding: 20px;
            margin: 10px 0;
            border-radius: 8px;
            transition: background-color 0.3s, border-color 0.3s;
        }
        button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
    </style>
</head>
<body>
    <h1>My Dashboard</h1>
    <button id="themeToggle">Switch to Dark Mode</button>

    <div class="card"><h3>Card 1</h3><p>Using classList.toggle for theme switching</p></div>
    <div class="card"><h3>Card 2</h3><p>CSS transitions make the switch smooth</p></div>

    <script>
        const themeToggle = document.getElementById("themeToggle");
        const body = document.body;

        // Load saved theme preference
        if (localStorage.getItem("theme") === "dark") {
            body.classList.add("dark-theme");
            themeToggle.textContent = "Switch to Light Mode";
        }

        themeToggle.addEventListener("click", function() {
            // Toggle the dark-theme class on the body
            body.classList.toggle("dark-theme");

            // Update button text
            const isDark = body.classList.contains("dark-theme");
            this.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";

            // Save preference to localStorage
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    </script>
</body>
</html>
```

**What this demonstrates:** Using `classList.toggle()` to switch an entire theme, CSS transitions for smooth animation, and `localStorage` for persisting the user's preference across page loads.

---

## 4. Modifying Attributes

HTML attributes (like `href`, `src`, `id`, `class`, `data-*`, etc.) control how elements behave. JavaScript lets you read, set, and remove these attributes.

```javascript
const link = document.querySelector("a");

// Get an attribute's value
console.log(link.getAttribute("href"));  // "https://example.com"

// Set an attribute (creates it if it doesn't exist)
link.setAttribute("href", "https://example.com");
link.setAttribute("target", "_blank");   // Open in new tab

// Remove an attribute
link.removeAttribute("target");

// Check if an attribute exists
console.log(link.hasAttribute("href"));  // true

// Common shortcuts — many attributes have direct properties
const img = document.querySelector("img");
img.src = "new-image.jpg";       // Same as setAttribute("src", "new-image.jpg")
img.alt = "A beautiful sunset";  // Same as setAttribute("alt", "...")

// For images, you can also read the dimensions
console.log(img.width);   // Rendered width in pixels
console.log(img.height);  // Rendered height in pixels
```

### Data Attributes

HTML5 introduced **data attributes** (`data-*`) — custom attributes for storing extra data on elements:

```html
<button data-product-id="42" data-action="add-to-cart">Add to Cart</button>
```

```javascript
const button = document.querySelector("button");

// Using getAttribute
console.log(button.getAttribute("data-product-id"));  // "42"

// Using the dataset property (cleaner, converts to camelCase)
console.log(button.dataset.productId);  // "42"
console.log(button.dataset.action);     // "add-to-cart"

// Set a data attribute
button.dataset.quantity = "1";  // Creates data-quantity="1" on the element
```

**Why use data attributes?** They let you store information directly on HTML elements — like product IDs, user IDs, or configuration values — without using hidden form fields or global variables. Event delegation patterns rely heavily on data attributes to identify which item was clicked.

---

## 5. Creating and Adding Elements

So far, we've been modifying elements that already exist in the HTML. But JavaScript can also create brand new elements and add them to the page.

### createElement() and appendChild()

This is a three-step process: **create** the element, **configure** it (set text, classes, attributes), then **attach** it to the DOM:

```javascript
// Step 1: Create a new element (it exists in memory but is NOT on the page yet)
const newParagraph = document.createElement("p");

// Step 2: Configure it
newParagraph.textContent = "This paragraph was created by JavaScript!";
newParagraph.classList.add("dynamic");
newParagraph.id = "generated-text";

// Step 3: Attach it to the DOM (NOW it appears on the page)
const container = document.querySelector(".container");
container.appendChild(newParagraph);
```

**Key insight:** The element doesn't appear on the page until you append it to a parent element that's already in the DOM. Until then, it only exists in memory.

### insertBefore()

Inserts a new element before a specific existing child:

```javascript
const parent = document.querySelector("ul");
const newItem = document.createElement("li");
newItem.textContent = "Inserted Item";

// Insert the new item before the first child of the list
const firstChild = parent.firstElementChild;
parent.insertBefore(newItem, firstChild);

// If the second argument is null, insertBefore acts like appendChild
parent.insertBefore(newItem, null);  // Adds to the end
```

### insertAdjacentHTML()

A powerful method that lets you insert HTML at specific positions relative to an element:

```javascript
const list = document.querySelector("ul");

// Four insertion positions:
// "beforebegin" — immediately before the element itself
// "afterbegin"  — inside the element, before its first child
// "beforeend"   — inside the element, after its last child
// "afterend"    — immediately after the element itself

list.insertAdjacentHTML("beforeend", "<li>Added at end</li>");
list.insertAdjacentHTML("afterbegin", "<li>Added at start</li>");
```

```
<!-- Visual representation of insertion positions -->
<!-- "beforebegin" inserts HERE -->
<ul>
    <!-- "afterbegin" inserts HERE -->
    <li>Existing item 1</li>
    <li>Existing item 2</li>
    <!-- "beforeend" inserts HERE -->
</ul>
<!-- "afterend" inserts HERE -->
```

### Cloning Elements

Sometimes you want to duplicate an existing element:

```javascript
const original = document.querySelector(".card");

// Shallow clone (the element itself, but not its children)
const shallowClone = original.cloneNode(false);

// Deep clone (the element AND all its children)
const deepClone = original.cloneNode(true);

// Modify the clone and add it to the page
deepClone.querySelector("h3").textContent = "Cloned Card";
document.body.appendChild(deepClone);
```

### Document Fragment — Batch Additions

When adding many elements, creating them one at a time triggers a page re-render each time. A **DocumentFragment** is a lightweight container that holds elements in memory, and inserting the fragment into the DOM causes only ONE re-render:

```javascript
// BAD — each appendChild triggers a re-render
for (let i = 0; i < 100; i++) {
    const li = document.createElement("li");
    li.textContent = "Item " + i;
    list.appendChild(li);  // Re-renders 100 times!
}

// GOOD — one re-render at the end
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const li = document.createElement("li");
    li.textContent = "Item " + i;
    fragment.appendChild(li);  // No re-render (fragment is in memory)
}
list.appendChild(fragment);  // Only ONE re-render!
```

### Real-World Example: Product Card Generator

```html
<!DOCTYPE html>
<html>
<head>
    <title>Product Cards</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .products { display: flex; flex-wrap: wrap; gap: 15px; }
        .product-card {
            border: 1px solid #ddd; border-radius: 8px;
            padding: 15px; width: 200px;
        }
        .product-card h3 { margin: 0 0 10px 0; }
        .price { color: green; font-size: 20px; font-weight: bold; }
        .stock { font-size: 12px; color: gray; }
        .out-of-stock { color: red; }
        .add-btn {
            width: 100%; padding: 8px; margin-top: 10px;
            background: #3498db; color: white; border: none;
            border-radius: 4px; cursor: pointer;
        }
        .add-btn:disabled { background: #ccc; cursor: not-allowed; }
    </style>
</head>
<body>
    <h1>Our Products</h1>
    <div class="products" id="productContainer"></div>

    <script>
        // Data — in a real app, this would come from an API
        const products = [
            { name: "Wireless Headphones", price: 2499, stock: 15 },
            { name: "Phone Case", price: 499, stock: 0 },
            { name: "USB-C Cable", price: 299, stock: 42 },
            { name: "Laptop Stand", price: 1899, stock: 7 },
            { name: "Mouse Pad XL", price: 699, stock: 23 },
            { name: "Webcam HD", price: 3499, stock: 0 }
        ];

        const container = document.getElementById("productContainer");
        const fragment = document.createDocumentFragment();

        products.forEach(product => {
            // Create the card
            const card = document.createElement("div");
            card.classList.add("product-card");

            // Product name
            const name = document.createElement("h3");
            name.textContent = product.name;

            // Price
            const price = document.createElement("div");
            price.classList.add("price");
            price.textContent = "\u20B9" + product.price;

            // Stock status
            const stock = document.createElement("div");
            stock.classList.add("stock");
            if (product.stock > 0) {
                stock.textContent = product.stock + " in stock";
            } else {
                stock.textContent = "Out of Stock";
                stock.classList.add("out-of-stock");
            }

            // Add to Cart button
            const button = document.createElement("button");
            button.classList.add("add-btn");
            button.textContent = product.stock > 0 ? "Add to Cart" : "Notify Me";
            button.disabled = product.stock === 0;
            button.addEventListener("click", function() {
                alert("Added " + product.name + " to cart!");
            });

            // Assemble the card
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(stock);
            card.appendChild(button);

            // Add to the fragment (not to the DOM yet)
            fragment.appendChild(card);
        });

        // One DOM insertion for all cards
        container.appendChild(fragment);
    </script>
</body>
</html>
```

**What this demonstrates:** Creating elements from data, using `DocumentFragment` for performance, conditionally styling elements (out of stock items), and attaching event listeners to dynamically created elements.

---

## 6. Removing Elements

Removing elements from the DOM is straightforward:

```javascript
// Method 1: remove() — modern and simple
const element = document.querySelector("#old-element");
element.remove();
// The element is gone from the page

// Method 2: removeChild() — older but still widely used
const parent = document.querySelector(".container");
const child = document.querySelector(".unwanted");
parent.removeChild(child);

// Remove all children of an element
const container = document.querySelector("#list");
// Option A: Set innerHTML to empty
container.innerHTML = "";
// Option B: Remove children one by one (safer, no HTML parsing)
while (container.firstChild) {
    container.removeChild(container.firstChild);
}
```

**What happens to removed elements?** When you call `remove()` or `removeChild()`, the element is detached from the DOM tree and no longer visible on the page. However, if you still have a JavaScript variable pointing to it, the element still exists in memory and can be re-attached later:

```javascript
const detached = document.querySelector("#myElement");
detached.remove();  // Gone from the page

// Later, you can put it back
document.body.appendChild(detached);  // It's back!
```

---

## 7. DOM Traversal

DOM traversal means navigating between elements using their family relationships (parent, children, siblings) instead of selecting them by ID or class. This is useful when you know an element's position relative to another element but don't know its selector.

```javascript
const item = document.querySelector("#middle-item");

// === PARENT ===
const parent = item.parentElement;
// Climbs up one level in the tree

// === CHILDREN ===
const children = parent.children;           // All child ELEMENTS (HTMLCollection)
const firstChild = parent.firstElementChild; // First child element
const lastChild = parent.lastElementChild;   // Last child element
const childCount = parent.childElementCount; // Number of child elements

// === SIBLINGS ===
const next = item.nextElementSibling;      // Next sibling element
const prev = item.previousElementSibling;  // Previous sibling element

// === CLOSEST ANCESTOR ===
// Searches UP the tree for the nearest ancestor matching a CSS selector
const closestDiv = item.closest("div");
const closestForm = item.closest("form");
// Returns null if no matching ancestor is found
```

**When to use traversal instead of direct selection?**

1. **Inside event handlers** — when you know which element was clicked but need to access a near relative (like the parent card or a sibling button)
2. **Working with lists** — moving between items, accessing the next/previous item
3. **Dynamic content** — when elements don't have unique IDs or classes, but you know their structure

```javascript
// Common pattern: clicking a delete button to remove its parent card
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-btn")) {
        // We know the button was clicked, but we need to remove its parent card
        const card = e.target.closest(".card");
        card.remove();
    }
});
```

> **Note:** There are also `firstChild`, `lastChild`, `nextSibling`, `previousSibling`, and `parentNode` properties. These include ALL node types (text nodes, comment nodes, etc.), not just elements. The `Element` versions (`firstElementChild`, `nextElementSibling`, etc.) skip over text and comment nodes, which is almost always what you want.

---

## 8. How the Browser Renders Changes

Understanding what happens when you modify the DOM helps you write faster, smoother web pages.

When you change the DOM, the browser may need to:

1. **Recalculate styles** — determine which CSS rules apply to changed elements
2. **Reflow (Layout)** — recalculate the position and size of elements. This is expensive because changing one element's size can affect the position of everything around it
3. **Repaint** — redraw the pixels on screen. Changing colors or visibility triggers repaints without needing reflow

**What causes reflow (expensive):** Changing width, height, margin, padding, position, display, adding/removing elements, reading layout properties like `offsetWidth`

**What causes only repaint (cheaper):** Changing color, background-color, visibility, outline, box-shadow

**Best practices for performance:**
- Batch your DOM changes (use `DocumentFragment` or build HTML strings)
- Avoid reading layout properties (like `offsetWidth`) between write operations
- Use CSS classes instead of setting many individual style properties
- For animations, use CSS transitions/animations or `requestAnimationFrame` instead of `setInterval`

```javascript
// BAD — causes multiple reflows
const el = document.querySelector(".box");
el.style.width = "100px";        // Reflow
el.style.height = "100px";       // Reflow
el.style.marginTop = "20px";     // Reflow
el.style.marginLeft = "20px";    // Reflow

// GOOD — one reflow (use a CSS class)
el.classList.add("box-resized");
// CSS: .box-resized { width: 100px; height: 100px; margin: 20px 0 0 20px; }
```

---

## 9. Common Mistakes and Pitfalls

### Mistake 1: Manipulating the DOM Before It Loads

If your script runs before the HTML elements exist, you'll get `null`:

```javascript
// In the <head>, BEFORE <body> loads:
const btn = document.getElementById("myButton");
console.log(btn);  // null! The element doesn't exist yet!
```

**Fix:** Put your script at the bottom of `<body>` or use `DOMContentLoaded`:

```javascript
document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById("myButton");
    console.log(btn);  // Now it works!
});
```

### Mistake 2: Using innerHTML with User Input (XSS Vulnerability)

```javascript
// DANGEROUS!
const name = userInputField.value;
container.innerHTML = "<p>Welcome, " + name + "</p>";
// If user types: <script>stealCookies()</script>

// SAFE
const p = document.createElement("p");
p.textContent = "Welcome, " + name;  // Text is escaped automatically
container.appendChild(p);
```

### Mistake 3: Forgetting That querySelectorAll Returns a NodeList, Not an Array

```javascript
const items = document.querySelectorAll(".item");

// This does NOT work:
// items.map(item => item.textContent);  // TypeError: items.map is not a function

// Do this instead:
Array.from(items).map(item => item.textContent);
// or
[...items].map(item => item.textContent);
```

### Mistake 4: Not Checking if an Element Exists Before Using It

```javascript
// This crashes if the element doesn't exist:
document.querySelector("#nonexistent").textContent = "Hello";
// TypeError: Cannot set properties of null

// Always check first:
const el = document.querySelector("#nonexistent");
if (el) {
    el.textContent = "Hello";
}
```

---

## 10. Practical Example: Dynamic Todo List

This is a complete, fully working todo list application that combines all the DOM manipulation concepts learned above:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Todo List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: 50px auto;
            padding: 0 20px;
        }
        .input-row {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        .input-row input {
            flex: 1;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .input-row button {
            padding: 10px 20px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        .todo-item {
            display: flex;
            align-items: center;
            padding: 10px;
            margin: 5px 0;
            border: 1px solid #eee;
            border-radius: 4px;
        }
        .todo-item span {
            flex: 1;
            font-size: 16px;
        }
        .todo-item.completed span {
            text-decoration: line-through;
            color: gray;
        }
        .todo-item button {
            margin-left: 5px;
            padding: 5px 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        .complete-btn { background: #2ecc71; color: white; }
        .delete-btn { background: #e74c3c; color: white; }
        .stats { margin-top: 15px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <h1>My Todo List</h1>
    <div class="input-row">
        <input type="text" id="todoInput" placeholder="Enter a task...">
        <button id="addBtn">Add</button>
    </div>
    <ul id="todoList" style="list-style: none; padding: 0;"></ul>
    <div class="stats" id="stats"></div>

    <script>
        // Select elements we'll interact with
        const input = document.getElementById("todoInput");
        const addBtn = document.getElementById("addBtn");
        const todoList = document.getElementById("todoList");
        const stats = document.getElementById("stats");

        function updateStats() {
            const total = todoList.children.length;
            const completed = todoList.querySelectorAll(".completed").length;
            stats.textContent = completed + " of " + total + " tasks completed";
        }

        function addTodo() {
            const text = input.value.trim();  // .trim() removes whitespace
            if (text === "") return;           // Don't add empty todos

            // --- CREATE the list item ---
            const li = document.createElement("li");
            li.classList.add("todo-item");

            // --- Task text ---
            const span = document.createElement("span");
            span.textContent = text;  // textContent is safe from XSS

            // --- Complete button ---
            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Done";
            completeBtn.classList.add("complete-btn");
            completeBtn.addEventListener("click", function() {
                // Toggle completed class on the parent <li>
                li.classList.toggle("completed");
                updateStats();
            });

            // --- Delete button ---
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function() {
                li.remove();  // Remove the <li> from the DOM
                updateStats();
            });

            // --- Assemble and add to page ---
            li.appendChild(span);
            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);

            // --- Clear input and refocus ---
            input.value = "";
            input.focus();
            updateStats();
        }

        // Add todo when button is clicked
        addBtn.addEventListener("click", addTodo);

        // Also add when Enter key is pressed
        input.addEventListener("keypress", function(e) {
            if (e.key === "Enter") addTodo();
        });

        updateStats();
    </script>
</body>
</html>
```

---

## 11. Practical Example: Dynamic FAQ Accordion

```html
<!DOCTYPE html>
<html>
<head>
    <title>FAQ Accordion</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
        .faq-item { border: 1px solid #ddd; margin-bottom: 5px; border-radius: 4px; }
        .faq-question {
            padding: 15px; cursor: pointer; display: flex;
            justify-content: space-between; align-items: center;
            background: #f9f9f9; font-weight: bold;
        }
        .faq-question:hover { background: #f0f0f0; }
        .faq-arrow { transition: transform 0.3s; }
        .faq-item.open .faq-arrow { transform: rotate(180deg); }
        .faq-answer {
            max-height: 0; overflow: hidden;
            transition: max-height 0.3s ease, padding 0.3s ease;
            padding: 0 15px;
        }
        .faq-item.open .faq-answer {
            max-height: 200px; padding: 15px;
        }
    </style>
</head>
<body>
    <h1>Frequently Asked Questions</h1>
    <div id="faqContainer"></div>

    <script>
        const faqs = [
            {
                question: "What is JavaScript?",
                answer: "JavaScript is a programming language used to make web pages interactive. It runs in the browser and can manipulate HTML, respond to user actions, and communicate with servers."
            },
            {
                question: "What is the DOM?",
                answer: "The DOM (Document Object Model) is a tree-like representation of an HTML page in memory. JavaScript uses the DOM to read and change what's displayed on the screen."
            },
            {
                question: "What is the difference between let and const?",
                answer: "'let' declares a variable whose value can be reassigned later. 'const' declares a variable whose value cannot be reassigned after initialization. Both are block-scoped."
            },
            {
                question: "How do I start learning JavaScript?",
                answer: "Start with the basics: variables, data types, and operators. Then learn control flow (if/else, loops). Practice by building small projects like calculators, to-do lists, and quizzes."
            }
        ];

        const container = document.getElementById("faqContainer");

        faqs.forEach(faq => {
            // Create FAQ item container
            const item = document.createElement("div");
            item.classList.add("faq-item");

            // Create question (clickable header)
            const question = document.createElement("div");
            question.classList.add("faq-question");
            question.innerHTML = faq.question + ' <span class="faq-arrow">&#9660;</span>';

            // Create answer (hidden by default)
            const answer = document.createElement("div");
            answer.classList.add("faq-answer");
            answer.textContent = faq.answer;

            // Toggle open/close on click
            question.addEventListener("click", function() {
                // Close all other items first (optional — for single-open behavior)
                document.querySelectorAll(".faq-item.open").forEach(openItem => {
                    if (openItem !== item) openItem.classList.remove("open");
                });
                // Toggle this item
                item.classList.toggle("open");
            });

            item.appendChild(question);
            item.appendChild(answer);
            container.appendChild(item);
        });
    </script>
</body>
</html>
```

---

## Practice Challenges

1. **Color Switcher:** Create a page with 5 buttons, each changing the background to a different color. Use `classList` and CSS transitions for smooth changes.
2. **Character Counter:** Build a `<textarea>` that shows how many characters have been typed and changes color when nearing a limit (like the real-world example above).
3. **Accordion:** Create a list of questions that expand/collapse their answers when clicked. Only one answer should be visible at a time.
4. **Image Gallery:** Display thumbnails that show a larger version when clicked. Use `createElement` to build the gallery from an array of image URLs.
5. **Dynamic Table:** Create a table from an array of objects (e.g., student data), with the ability to add new rows via a form and delete existing rows with a button.

---

## Further Reading

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [JavaScript.info: DOM Nodes](https://javascript.info/dom-nodes)
- [MDN: Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [Google: Minimize Browser Reflows](https://developers.google.com/speed/docs/insights/browser-reflow)

---

*Self-Study Document 1 of 5 — BCA IV Semester Client Side Scripting*
