console.log("=== RANDOM NUMBER GENERATOR - METHOD 2: SMART FUNCTIONS ===\n");

// Function 1: Random integer in a range (inclusive)
function getRandomInt(min, max) {
    if (min > max) {
        return "Error: min must be less than or equal to max";
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function 2: Random float in a range with decimal places
function getRandomFloat(min, max, decimals) {
    if (decimals === undefined) decimals = 2;
    const random = Math.random() * (max - min) + min;
    return parseFloat(random.toFixed(decimals));
}

// Function 3: Get a random element from an array
function getRandomElement(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return "Error: Provide a non-empty array";
    }
    const randomIndex = getRandomInt(0, array.length - 1);
    return array[randomIndex];
}

// Function 4: Shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const copy = [...array];  // Don't modify original
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Function 5: Generate multiple random numbers
function generateMultipleRandom(count, min, max) {
    const numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(getRandomInt(min, max));
    }
    return numbers;
}

// TEST CASES
console.log("--- Function 1: Random Integer in Range ---");
console.log("Random 1-50: " + getRandomInt(1, 50));
console.log("Random 100-200: " + getRandomInt(100, 200));
console.log("Random -10 to +10: " + getRandomInt(-10, 10));
console.log();

console.log("--- Function 2: Random Float with Decimals ---");
console.log("Random 0-1 (2 decimals): " + getRandomFloat(0, 1, 2));
console.log("Random price $10-$100: $" + getRandomFloat(10, 100, 2));
console.log("Random 0-100 (3 decimals): " + getRandomFloat(0, 100, 3));
console.log();

console.log("--- Function 3: Random Element from Array ---");
const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
console.log("Array: " + fruits);
for (let i = 0; i < 5; i++) {
    console.log("Random pick " + (i + 1) + ": " + getRandomElement(fruits));
}
console.log();

console.log("--- Function 4: Shuffle Array ---");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Original: " + numbers);
console.log("Shuffled 1: " + shuffleArray(numbers));
console.log("Shuffled 2: " + shuffleArray(numbers));
console.log("Shuffled 3: " + shuffleArray(numbers));
console.log();

console.log("--- Function 5: Generate Multiple Random Numbers ---");
const randomList = generateMultipleRandom(10, 1, 100);
console.log("10 random numbers (1-100): " + randomList);
console.log();

// REAL-WORLD APPLICATION: Simple Game
console.log("--- Real-World: Number Guessing Game ---");
const secretNumber = getRandomInt(1, 100);
console.log("Computer generated a secret number between 1-100");
console.log("(Actual: " + secretNumber + " - shhh! Don't tell!)");
console.log();

const guess1 = getRandomInt(1, 100);
const guess2 = getRandomInt(1, 100);
const guess3 = getRandomInt(1, 100);
console.log("Player guesses: " + guess1 + ", " + guess2 + ", " + guess3);
console.log("Correct answer: " + secretNumber);
console.log("Player was " + Math.abs(guess1 - secretNumber) + " away with first guess");
console.log();

// REAL-WORLD APPLICATION: Simulated Dice Roll and Card Hand
console.log("--- Real-World: Card Game Setup ---");
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const hand = [];
for (let i = 0; i < 5; i++) {
    const suit = getRandomElement(suits);
    const value = getRandomElement(values);
    hand.push(value + " of " + suit);
}
console.log("Your hand: ");
hand.forEach((card, index) => {
    console.log("  " + (index + 1) + ". " + card);
});
console.log();

// REAL-WORLD APPLICATION: Lottery Number Generator
console.log("--- Real-World: Lottery Ticket ---");
const lotteryNumbers = generateMultipleRandom(6, 1, 49);
// Remove duplicates (simple approach - regenerate if needed)
console.log("Lucky numbers (Lotto 6/49): " + lotteryNumbers);