# DAY 6: Interactive Expense Calculator Project (Extended)

## 🎯 Project Overview

This is an **extended version** of the Week 1 mini-project with web interactivity. Students will build a working expense calculator that runs entirely in the browser with user-friendly input and output options.

**Learning Objectives:**
- Implement JavaScript logic with real user input
- Create interactive web applications using HTML forms
- Display dynamic output to web pages
- Practice all Week 1 concepts in a real-world scenario
- Build confidence in DOM manipulation (preview for Week 6)

**Skill Level:** Intermediate | **Time:** 30-45 minutes setup, then experimentation

---

## 💻 **Solution 1: Alert-Based Interactive Calculator**

**Method:** Using `alert()` and `prompt()` for input, console for output  
**Difficulty:** Beginner-friendly | **No DOM manipulation needed**

<details>
<summary><b>Solution 1: Alert-Based Calculator (Click to expand)</b></summary>

**HTML File: `expense-calculator-v1.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Calculator v1 - Alert Based</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 500px;
            margin: 0 auto;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        h1 { color: #333; text-align: center; }
        .info {
            background: #e8f4f8;
            padding: 15px;
            border-left: 4px solid #2196F3;
            margin: 20px 0;
            font-size: 14px;
        }
        button {
            background: #2196F3;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
        }
        button:hover { background: #0b7dda; }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>💰 Expense Calculator v1</h1>
        
        <div class="info">
            <strong>Instructions:</strong><br>
            1. Click the button below<br>
            2. Enter your expenses when prompted<br>
            3. Check the browser console (F12) for the detailed receipt
        </div>
        
        <button onclick="calculateExpenses()">Start Expense Calculator</button>
        
        <div class="footer">
            <p>Open Developer Tools (F12) → Console tab to see detailed output</p>
        </div>
    </div>

    <script>
        function calculateExpenses() {
            // Get expenses from user via prompt
            const groceries = parseFloat(prompt("Enter grocery expenses (₹):") || 0);
            const transportation = parseFloat(prompt("Enter transportation expenses (₹):") || 0);
            const entertainment = parseFloat(prompt("Enter entertainment expenses (₹):") || 0);
            const utilities = parseFloat(prompt("Enter utilities expenses (₹):") || 0);

            // Validate input
            if (isNaN(groceries) || isNaN(transportation) || isNaN(entertainment) || isNaN(utilities)) {
                alert("Invalid input! Please enter valid numbers.");
                return;
            }

            // Calculate totals
            const subtotal = groceries + transportation + entertainment + utilities;
            const taxRate = 0.05;  // 5% tax
            const tax = subtotal * taxRate;
            const total = subtotal + tax;

            // Generate receipt (using all Week 1 concepts)
            console.clear();
            console.log("════════════════════════════════════════");
            console.log("         💳 EXPENSE RECEIPT              ");
            console.log("════════════════════════════════════════");
            console.log("");
            console.log("ITEMIZED EXPENSES:");
            console.log("-".repeat(40));
            console.log(`Groceries           : ₹${groceries.toFixed(2)}`);
            console.log(`Transportation      : ₹${transportation.toFixed(2)}`);
            console.log(`Entertainment       : ₹${entertainment.toFixed(2)}`);
            console.log(`Utilities           : ₹${utilities.toFixed(2)}`);
            console.log("-".repeat(40));
            console.log(`Subtotal            : ₹${subtotal.toFixed(2)}`);
            console.log(`Tax (5%)            : ₹${tax.toFixed(2)}`);
            console.log("=".repeat(40));
            console.log(`TOTAL               : ₹${total.toFixed(2)}`);
            console.log("=".repeat(40));
            
            // Additional analysis
            const highestCategory = Math.max(groceries, transportation, entertainment, utilities);
            let categoryName = "";
            if (highestCategory === groceries) categoryName = "Groceries";
            else if (highestCategory === transportation) categoryName = "Transportation";
            else if (highestCategory === entertainment) categoryName = "Entertainment";
            else categoryName = "Utilities";
            
            console.log("");
            console.log("📊 ANALYSIS:");
            console.log(`Highest expense: ${categoryName} (₹${highestCategory.toFixed(2)})`);
            console.log(`Average per category: ₹${(subtotal / 4).toFixed(2)}`);
            const savingsTip = total * 0.1;
            console.log(`💡 Tip: Save 10% next month (₹${savingsTip.toFixed(2)})`);
            console.log("");
            
            // Alert user
            alert(`✅ Receipt generated!\n\nTotal Expenses: ₹${total.toFixed(2)}\n\nCheck console (F12) for detailed receipt`);
        }
    </script>
</body>
</html>
```

**Key Features:**
- ✅ Input via `prompt()` dialogs
- ✅ All Week 1 concepts: arithmetic operators, type conversion, string formatting
- ✅ Output in browser console
- ✅ Real-world expense tracking
- ✅ Professional-looking receipt format

**Test Cases:**
```
Input:
- Groceries: 500
- Transportation: 200
- Entertainment: 150
- Utilities: 100

Output (in console):
- Subtotal: ₹950
- Tax (5%): ₹47.50
- Total: ₹997.50
- Analysis with highest category and savings tip
```

</details>

---

## 🎨 **Solution 2: HTML Form-Based Calculator with DOM Output**

**Method:** Using HTML input fields and displaying output on webpage  
**Difficulty:** Intermediate | **Introduces basic DOM manipulation**

<details>
<summary><b>Solution 2: HTML Form Calculator (Click to expand)</b></summary>

**Complete HTML File: `expense-calculator-v2.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Expense Calculator v2 - Interactive Form</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            padding: 30px;
            margin-bottom: 20px;
        }
        
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
            font-size: 28px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: 600;
            font-size: 14px;
        }
        
        input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 6px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        
        input:focus {
            outline: none;
            border-color: #667eea;
            background: #f9f9ff;
        }
        
        .button-group {
            display: flex;
            gap: 10px;
        }
        
        button {
            flex: 1;
            padding: 14px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .btn-calculate {
            background: #667eea;
            color: white;
        }
        
        .btn-calculate:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .btn-reset {
            background: #e0e0e0;
            color: #333;
        }
        
        .btn-reset:hover {
            background: #d0d0d0;
        }
        
        .results {
            display: none;
        }
        
        .results.show {
            display: block;
        }
        
        .receipt {
            background: #f9f9f9;
            border: 2px dashed #667eea;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            line-height: 1.8;
            color: #333;
            font-size: 14px;
        }
        
        .summary {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .summary-item {
            background: #f0f4ff;
            padding: 15px;
            border-radius: 6px;
            text-align: center;
            border-left: 4px solid #667eea;
        }
        
        .summary-label {
            color: #666;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        
        .summary-value {
            color: #667eea;
            font-size: 24px;
            font-weight: bold;
        }
        
        .error {
            background: #ffebee;
            color: #c62828;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 15px;
            display: none;
        }
        
        .error.show {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>💰 Expense Calculator v2</h1>
            
            <div class="error" id="errorMsg"></div>
            
            <div id="inputForm">
                <div class="form-group">
                    <label for="groceries">🛒 Groceries (₹)</label>
                    <input type="number" id="groceries" placeholder="Enter amount" min="0" step="0.01">
                </div>
                
                <div class="form-group">
                    <label for="transport">🚗 Transportation (₹)</label>
                    <input type="number" id="transport" placeholder="Enter amount" min="0" step="0.01">
                </div>
                
                <div class="form-group">
                    <label for="entertainment">🎬 Entertainment (₹)</label>
                    <input type="number" id="entertainment" placeholder="Enter amount" min="0" step="0.01">
                </div>
                
                <div class="form-group">
                    <label for="utilities">⚡ Utilities (₹)</label>
                    <input type="number" id="utilities" placeholder="Enter amount" min="0" step="0.01">
                </div>
                
                <div class="button-group">
                    <button class="btn-calculate" onclick="calculateExpenses()">Calculate Receipt</button>
                    <button class="btn-reset" onclick="resetForm()">Reset</button>
                </div>
            </div>
            
            <div class="results" id="results">
                <h2 style="margin-bottom: 20px; color: #333;">📋 Receipt & Summary</h2>
                
                <div class="receipt" id="receiptDisplay"></div>
                
                <div class="summary">
                    <div class="summary-item">
                        <div class="summary-label">Subtotal</div>
                        <div class="summary-value" id="subtotalDisplay">₹0.00</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Total (with Tax)</div>
                        <div class="summary-value" id="totalDisplay">₹0.00</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Highest Expense</div>
                        <div class="summary-value" id="highestDisplay">N/A</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-label">Daily Average</div>
                        <div class="summary-value" id="averageDisplay">₹0.00</div>
                    </div>
                </div>
                
                <input type="text" id="textReceipt" placeholder="Receipt summary (auto-filled)" readonly style="background: #f9f9f9; color: #666;">
            </div>
        </div>
    </div>

    <script>
        function calculateExpenses() {
            // Get input values
            const groceries = parseFloat(document.getElementById('groceries').value) || 0;
            const transport = parseFloat(document.getElementById('transport').value) || 0;
            const entertainment = parseFloat(document.getElementById('entertainment').value) || 0;
            const utilities = parseFloat(document.getElementById('utilities').value) || 0;

            // Validate input
            if (groceries < 0 || transport < 0 || entertainment < 0 || utilities < 0) {
                showError("Amounts cannot be negative!");
                return;
            }

            if (groceries === 0 && transport === 0 && entertainment === 0 && utilities === 0) {
                showError("Please enter at least one expense!");
                return;
            }

            clearError();

            // Calculate totals
            const subtotal = groceries + transport + entertainment + utilities;
            const taxRate = 0.05;
            const tax = subtotal * taxRate;
            const total = subtotal + tax;

            // Find highest category
            const expenses = [
                { name: "Groceries", amount: groceries },
                { name: "Transportation", amount: transport },
                { name: "Entertainment", amount: entertainment },
                { name: "Utilities", amount: utilities }
            ];
            const highest = expenses.reduce((prev, current) => 
                (prev.amount > current.amount) ? prev : current
            );

            // Assuming 30-day month
            const dailyAverage = total / 30;

            // Build receipt
            let receipt = "════════════════════════════════════════\n";
            receipt += "         💳 EXPENSE RECEIPT              \n";
            receipt += "════════════════════════════════════════\n\n";
            receipt += "ITEMIZED EXPENSES:\n";
            receipt += "────────────────────────────────────────\n";
            receipt += `🛒 Groceries          : ₹${groceries.toFixed(2)}\n`;
            receipt += `🚗 Transportation     : ₹${transport.toFixed(2)}\n`;
            receipt += `🎬 Entertainment      : ₹${entertainment.toFixed(2)}\n`;
            receipt += `⚡ Utilities          : ₹${utilities.toFixed(2)}\n`;
            receipt += "────────────────────────────────────────\n";
            receipt += `Subtotal              : ₹${subtotal.toFixed(2)}\n`;
            receipt += `Tax (5%)              : ₹${tax.toFixed(2)}\n`;
            receipt += "════════════════════════════════════════\n";
            receipt += `TOTAL                 : ₹${total.toFixed(2)}\n`;
            receipt += "════════════════════════════════════════\n";

            // Display results
            document.getElementById('receiptDisplay').textContent = receipt;
            document.getElementById('subtotalDisplay').textContent = `₹${subtotal.toFixed(2)}`;
            document.getElementById('totalDisplay').textContent = `₹${total.toFixed(2)}`;
            document.getElementById('highestDisplay').textContent = `${highest.name} (₹${highest.amount.toFixed(2)})`;
            document.getElementById('averageDisplay').textContent = `₹${dailyAverage.toFixed(2)}/day`;
            document.getElementById('textReceipt').value = `Total: ₹${total.toFixed(2)} | Highest: ${highest.name}`;
            
            document.getElementById('results').classList.add('show');
        }

        function resetForm() {
            document.getElementById('groceries').value = '';
            document.getElementById('transport').value = '';
            document.getElementById('entertainment').value = '';
            document.getElementById('utilities').value = '';
            document.getElementById('results').classList.remove('show');
            clearError();
            document.getElementById('groceries').focus();
        }

        function showError(msg) {
            const errorDiv = document.getElementById('errorMsg');
            errorDiv.textContent = msg;
            errorDiv.classList.add('show');
        }

        function clearError() {
            const errorDiv = document.getElementById('errorMsg');
            errorDiv.classList.remove('show');
        }

        // Auto-focus first input on page load
        window.onload = function() {
            document.getElementById('groceries').focus();
        };
    </script>
</body>
</html>
```

**Key Features:**
- ✅ Professional HTML form with validation
- ✅ Real-time input from user
- ✅ Dynamic DOM manipulation (`.classList`, `.textContent`, `.value`)
- ✅ Beautiful gradient UI with responsive design
- ✅ Error handling and validation
- ✅ Summary cards with instant updating
- ✅ Receipt output in both text area and div
- ✅ All Week 1 concepts: arithmetic, type conversion, logic

**Test Case:**
```
Input:
- Groceries: 2500
- Transportation: 800
- Entertainment: 500
- Utilities: 450

Output:
- Subtotal: ₹4,250
- Total with 5% tax: ₹4,462.50
- Daily average: ₹148.75
- Highest: Groceries (₹2,500)
```

</details>

---

## 🚀 How to Use These Files

### For Solution 1 (Beginner):
1. Copy the HTML code into a file called `expense-calculator-v1.html`
2. Open it in a browser
3. Click the button
4. Enter expenses when prompted
5. Open Developer Tools (F12) and go to Console tab to see the receipt

### For Solution 2 (More Interactive):
1. Copy the HTML code into a file called `expense-calculator-v2.html`
2. Open it in a browser
3. Fill in the expense amounts
4. Click "Calculate Receipt"
5. See instant results on the page with no console needed!

---

## 📚 Concepts Used (Week 1 Review)

| Concept | Solution 1 | Solution 2 |
|---------|-----------|-----------|
| Variables & Constants | ✅ | ✅ |
| Arithmetic Operators | ✅ | ✅ |
| String Concatenation | ✅ | ✅ |
| Type Conversion (parseFloat) | ✅ | ✅ |
| Conditionals (if/else) | ✅ | ✅ |
| Comparison Operators | ✅ | ✅ |
| Methods (.toFixed(), .parseFloat()) | ✅ | ✅ |
| Functions (introduction) | ✅ | ✅ |
| DOM Manipulation (preview) | ❌ | ✅ |
| HTML Forms (preview) | ❌ | ✅ |

---

## 🎯 Learning Activities

**Activity 1: Modify Solution 1**
- Change the tax rate from 5% to 8%
- Add a new expense category (like "Medical")
- Add a discount if total > 2000

**Activity 2: Customize Solution 2**
- Change colors in the CSS
- Add more expense categories
- Show percentage breakdown for each category
- Add a "Print Receipt" button

**Activity 3: Combine Both**
- Try creating your own version using console.log AND HTML output
- Create a version with multiple months tracking

---

## 💡 Real-World Extensions

After mastering these, students can:
- Add local storage to persist data between sessions
- Create charts using Chart.js to visualize expenses
- Add budget alerts ("You've exceeded your budget!")
- Build a full expense tracking app with categories, dates, and reports

---

**Difficulty Progression:**
- Solution 1: Perfect for beginners (concepts only, no DOM)
- Solution 2: Intermediate (introduces real-world web development)
- Both: Excellent foundation for Week 3-6 projects

