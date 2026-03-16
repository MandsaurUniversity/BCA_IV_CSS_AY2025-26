
//Aggregate data using reduce()

const numbers = [53, 72, 43, 94, 85];
const mixed = [ 4, "sushant", 5.6, "prakash",2,9]
// Sum
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum: " + sum);

// Product
const product = numbers.reduce((acc, n) => acc * n, 1);
console.log("Product: " + product);

// // Concatenate with commas
// const concat = numbers.reduce((acc, n) => acc + ", " + n);
// console.log("Concatenated: " + concat);

// Find maximum
const max = numbers.reduce((acc, n) => n > acc ? n : acc);
console.log("Maximum: " + max);

// Find minimum
const min = numbers.reduce((acc, n) => n < acc ? n : acc);
console.log("Minimum: " + min);

const concat = mixed.reduce((acc, m) => acc + "=/ " + m);
console.log("Concatenated: " + concat);

//Combining filter() and reduce()

const transactions = [
    {type: "deposit", amount: 1000},
    {type: "withdraw", amount: 300},
    {type: "deposit", amount: 500},
    {type: "withdraw", amount: 200},
    {type: "deposit", amount: 2000}
];

// Sum of all deposits
const deposits = transactions
    .filter(t => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);

console.log("Total deposits: ₹" + deposits);

// Sum of all withdrawals
const withdrawals = transactions
    .filter(t => t.type === "withdraw")
    .reduce((sum, t) => sum + t.amount, 0);

console.log("Total withdrawals: ₹" + withdrawals);

// Net balance
const net = deposits - withdrawals;
console.log("Net balance: ₹" + net);

// Count transactions by type
const counts = transactions.reduce((acc, t) => {
    acc[t.type] = (acc[t.type] || 0) + 1;
    return acc;
}, {});

console.log("Transaction counts:", counts);