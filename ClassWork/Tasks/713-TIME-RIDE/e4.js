/*
 * Experiment 4: Calculate Triangle Area (Standard formula)
 * Using Area = (base × height) / 2
 */

const base = 10;
const height = 5;

const area = (base * height) / 2;

console.log("Base: " + base);
console.log("Height: " + height);
console.log("Area: " + area);

// TEST CASES
console.log("\n--- Test Case 1: Common triangles ---");
console.log("Triangle 1 - Base: 8, Height: 6 → Area: " + ((8 * 6) / 2));
console.log("Triangle 2 - Base: 12, Height: 8 → Area: " + ((12 * 8) / 2));
console.log("Triangle 3 - Base: 15, Height: 10 → Area: " + ((15 * 10) / 2));

console.log("\n--- Test Case 2: Decimal measurements ---");
const b1 = 7.5;
const h1 = 4.8;
console.log("Base: " + b1 + ", Height: " + h1 + " → Area: " + ((b1 * h1) / 2).toFixed(2));

console.log("\n--- Test Case 3: Real-world scenario ---");
// Triangular garden
const gardenBase = 20;    // meters
const gardenHeight = 15;  // meters
const gardenArea = (gardenBase * gardenHeight) / 2;
console.log("Garden area: " + gardenArea + " square meters");

/*
 * Experiment 4: Calculate Triangle Area (Heron's formula)
 * Using sides: Area = √(s(s-a)(s-b)(s-c)) where s = (a+b+c)/2
 */

// Triangle with sides
const a = 5;
const b = 6;
const c = 7;

// Calculate semi-perimeter
const s = (a + b + c) / 2;

// Apply Heron's formula
const Area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

console.log("Triangle sides: " + a + ", " + b + ", " + c);
console.log("Semi-perimeter: " + s);
console.log("Area: " + Area.toFixed(2));

// TEST CASES
console.log("\n--- Test Case 1: 3-4-5 right triangle ---");
const side1 = 3;
const side2 = 4;
const side3 = 5;
const s1 = (side1 + side2 + side3) / 2;
const area1 = Math.sqrt(s1 * (s1 - side1) * (s1 - side2) * (s1 - side3));
console.log("Sides: " + side1 + ", " + side2 + ", " + side3);
console.log("Area: " + area1.toFixed(2));  // 6

console.log("\n--- Test Case 2: Equilateral triangle ---");
const side = 10;
const sEq = (side + side + side) / 2;
const areaEq = Math.sqrt(sEq * (sEq - side) * (sEq - side) * (sEq - side));
console.log("Equilateral triangle with side " + side);
console.log("Area: " + areaEq.toFixed(2));

console.log("\n--- Test Case 3: Scalene triangle ---");
const side4 = 8, side5 = 9, side6 = 10;
const s3 = (side4 + side5 + side6) / 2;
const area3 = Math.sqrt(s3 * (s3 - side4) * (s3 - side5) * (s3 - side6));
console.log("Area: " + area3.toFixed(2));