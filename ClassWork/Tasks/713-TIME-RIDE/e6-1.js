console.log("=== TEMPERATURE CONVERTER - METHOD 1: MANUAL FORMULA ===\n");

// Basic Celsius to Fahrenheit conversion
const celsius1 = 25;
const fahrenheit1 = (celsius1 * 9/5) + 32;
console.log("Conversion 1: " + celsius1 + "°C = " + fahrenheit1 + "°F");

// Fahrenheit to Celsius conversion
const fahrenheit2 = 77;
const celsius2 = (fahrenheit2 - 32) * 5/9;
console.log("Conversion 2: " + fahrenheit2 + "°F = " + celsius2.toFixed(2) + "°C");

// Test with various important temperature points
console.log("\n--- Reference Temperature Points ---");

// Water freezing point
const c_freeze = 0;
const f_freeze = (c_freeze * 9/5) + 32;
console.log("Water Freezes: " + c_freeze + "°C = " + f_freeze + "°F");

// Room temperature
const c_room = 20;
const f_room = (c_room * 9/5) + 32;
console.log("Room Temp: " + c_room + "°C = " + f_room + "°F");

// Normal body temperature
const c_body = 37;
const f_body = (c_body * 9/5) + 32;
console.log("Body Temp: " + c_body + "°C = " + f_body.toFixed(1) + "°F");

// Water boiling point
const c_boil = 100;
const f_boil = (c_boil * 9/5) + 32;
console.log("Water Boils: " + c_boil + "°C = " + f_boil + "°F");

// Very hot day
const c_hot = 40;
const f_hot = (c_hot * 9/5) + 32;
console.log("Very Hot Day: " + c_hot + "°C = " + f_hot + "°F");

// Extreme cold
const c_cold = -20;
const f_cold = (c_cold * 9/5) + 32;
console.log("Extreme Cold: " + c_cold + "°C = " + f_cold + "°F");

// TEST CASES
console.log("\n--- Edge Case Testing ---");
console.log("Test 1 - Zero Celsius: " + ((0 * 9/5) + 32) + "°F (expect 32°F)");
console.log("Test 2 - Negative: " + ((-40 * 9/5) + 32) + "°F (expect -40°F - same in both scales!)");
console.log("Test 3 - Decimal Input: " + ((36.5 * 9/5) + 32) + "°F (expect ~97.7°F)");

// Formula memorization aid
console.log("\n--- Formula Breakdown ---");
console.log("Formula: F = (C × 9/5) + 32");
console.log("Step 1: Multiply Celsius by 9/5 (or 1.8)");
console.log("Step 2: Add 32 to get Fahrenheit");