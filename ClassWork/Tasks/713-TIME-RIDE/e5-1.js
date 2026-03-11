/*
 * Experiment 5: Swap Two Variables (Using temp variable)
 * Classic approach with temporary storage
 */

let a = 10;
let b = 20;

console.log("Before swap:");
console.log("a = " + a + ", b = " + b);

// Swapping with temporary variable
let temp = a;
a = b;
b = temp;

console.log("\nAfter swap:");
console.log("a = " + a + ", b = " + b);

// TEST CASES
console.log("\n--- Test Case 1: Swap numbers ---");
let num1 = 100;
let num2 = 200;
console.log("Before: num1 = " + num1 + ", num2 = " + num2);

let tempVar = num1;
num1 = num2;
num2 = tempVar;

console.log("After: num1 = " + num1 + ", num2 = " + num2);

console.log("\n--- Test Case 2: Swap strings ---");
let name1 = "Alice";
let name2 = "Bob";
console.log("Before: name1 = " + name1 + ", name2 = " + name2);

let tempName = name1;
name1 = name2;
name2 = tempName;

console.log("After: name1 = " + name1 + ", name2 = " + name2);

console.log("\n--- test case swap string ---");
let Name1 = "Radhe";
let Name2 = "Chetanya";
console.log("Before swap: Name1 =", Name1 ,"Name2 = ",Name2);

let tempname = Name1;
Name1 = Name2;
Name2 = tempname;

console.log("After swap: Name1 =", Name1 ,"Name2 = ",Name2);

console.log("\n--- Test Case 3: Swap booleans ---");
let flag1 = true;
let flag2 = false;
console.log("Before: flag1 = " + flag1 + ", flag2 = " + flag2);

let tempFlag = flag1;
flag1 = flag2;
flag2 = tempFlag;

console.log("After: flag1 = " + flag1 + ", flag2 = " + flag2);