//Exmaples of data aggregation using reduce()

const numbers = [23, 56, 86, 158, 57, 22];
const mixed = [4, "Sushant", 5.6, "Prakash", 2, 9];

//sum of all numbers...
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum of all numbers in Array: " + sum);

//Product of all numbers...
const mul = numbers.reduce((acc, n) => n * acc, 1);
console.log("Product of all numbers is: " + mul);

//Concatenation with '=||='
const concat = mixed.reduce( (acc, m) => acc + "=||=" + m, " " );
console.log("Concatenated string is: " + concat);
//Find the maximum in the numbers arrays...
const maximum = numbers.reduce((acc, num) => acc > num ? acc : num);
console.log("Maximum number in Array is: " + maximum);

//Exercise to use/combine filter() ans reduce()
//Obkective use both methods together
const transactions = [
    {type: "deposit", amount: 1000},
    {type: "withdraw", amount:300},
    {type: "deposit", amount: 700},
    {type: "withdraw", amount: 100},
    {type: "deposit", amount: 2000},
    {type: "withdraw", amount:1000},
    {type: "withdraw", amount: 500}
];

//Find the sum of all deposits
//filter out all the deposits and them calculate

//Sum of all deposit
const deposits = transactions.filter((transaction) => transaction.type === "deposit");
const total = deposits.reduce((acc, d) => acc + d.amount, 0);
console.log("Total deposit: " + total);

//Sum of all withdrawals
const withdrawals = transactions.filter((t) => t.type === "withdraw").reduce((sum, t) => sum + t.amount, 0);
console.log("Total withdarwals: " + withdrawals);

//Net balance...
const net = total - withdrawals;
console.log("Net balance: " + net);

//Count the transactions by type
const transactionCounts = transactions.reduce((acc, t) => {
    acc[t.type] = (acc[t.type] || 0) + 1;   
    return acc; 
}, {});
console.log("TransactionCounts: ", transactionCounts);