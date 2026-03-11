console.log("=== RANDOM NUMBER GENERATOR - METHOD 1: MANUAL CALCULATION ===\n");

// Generate a random decimal between 0 and 1
const randomDecimal = Math.random();
console.log("Random decimal: " + randomDecimal);
console.log("(Always between 0 (inclusive) and 1 (exclusive))\n");

// TEST CASE 1: Random integer between 0 and 9
console.log("--- Random Integer 0-9 ---");
for (let i = 0; i < 5; i++) {
    const randomInt = Math.floor(Math.random() * 10);
    console.log("Attempt " + (i + 1) + ": " + randomInt);
}
console.log();

// TEST CASE 2: Random integer between 1 and 6 (like a dice)
console.log("--- Dice Roll (1-6) ---");
for (let i = 0; i < 5; i++) {
    const dice = Math.floor(Math.random() * 6) + 1;
    console.log("Roll " + (i + 1) + ": " + dice);
}
console.log();

// TEST CASE 3: Random integer between 1 and 100
console.log("--- Random 1-100 ---");
const rand100_1 = Math.floor(Math.random() * 100) + 1;
const rand100_2 = Math.floor(Math.random() * 100) + 1;
const rand100_3 = Math.floor(Math.random() * 100) + 1;
console.log("Three random numbers: " + rand100_1 + ", " + rand100_2 + ", " + rand100_3);
console.log();

// TEST CASE 4: Random integer within a custom range (50-150)
console.log("--- Random Between 50-150 ---");
const min = 50;
const max = 150;
for (let i = 0; i < 5; i++) {
    const randomInRange = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log("Attempt " + (i + 1) + ": " + randomInRange);
}
console.log();

// TEST CASE 5: Random with specific probabilities
console.log("--- Simple Probability (Coin Flip) ---");
for (let i = 0; i < 5; i++) {
    const flip = Math.random() > 0.5 ? "Heads" : "Tails";
    console.log("Flip " + (i + 1) + ": " + flip);
}
console.log();

// Step-by-step breakdown
console.log("--- Step-by-Step Breakdown: Generate 1-10 ---");
console.log("Step 1 - Math.random() = " + Math.random());
const step1 = Math.random();
console.log("Step 2 - Multiply by 10: " + (step1 * 10));
const step2 = step1 * 10;
console.log("Step 3 - Math.floor(): " + Math.floor(step2));
console.log("Step 4 - Add 1: " + (Math.floor(step2) + 1));