/*
 * Experiment 1: Print Hello World (Browser Console approach)
 * Run JavaScript directly in browser console
 */
    
// Open browser F12 → Console tab → type or paste this:

console.log("Hello World");
console.log("Welcome to JavaScript!");
console.log(42);
console.log(3.14);

// TEST CASES
console.log("--- Test Cases ---");
console.log("Test 1: " + "Hello World");
console.log("Test 2: String output");
console.log("Test 3: Number output - " + 100);

// Output will appear directly in console

/*
 * Experiment 1: Print Hello World (HTML file approach)
 * Create HTML file with embedded JavaScript
 */

// Save as hello_world.html and open in browser:

/*
<!DOCTYPE html>
<html>
<head>
    <title>Hello World Program</title>
</head>
<body>
    <h1>My First JavaScript Program</h1>
    
    <script>
        console.log("Hello World from HTML file");
        alert("Welcome to JavaScript!");
        document.write("Hello World - Written to page!");
    </script>
</body>
</html>
*/

// This shows output in:
// 1. Browser console (console.log)
// 2. Alert box (alert)
// 3. Page content (document.write)

// TEST CASES
console.log("Hello");
console.log("World");
alert("First Alert Box");