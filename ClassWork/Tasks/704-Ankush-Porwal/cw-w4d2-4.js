// Examples of Data Aggregation using Reduce()...

const numbers = [23,56,89,158,57,22];
const mixed = [4, "Ankush",5.6,"Ajay",2,9];
// Sum of all numbers...
const sum = numbers.reduce((acc , num) => acc + num,0 );
console.log("Sum of all numbers in Array: " + sum);
// Product of all numbers...
const multiply = numbers.reduce((acc , num) => acc * num,1 );
console.log("Product of all numbers in Array: " + multiply);
// Concatenation with '= || ='
const concate = mixed.reduce(( acc, m) => acc + "= || =" + m,);
console.log("Concatinated String is:" + concate);

// Exercise to use/combine filter() and reduce()...
// Objective use both methods together
const transactions = [{ type:"deposit",amount:1000},{ type:"withdraw",amount:300},{type:"deposit",amount:700},{type:"withdraw",amount:100},{type:"deposit",amount:2000},{type:"withdraw",amount:1000},{type:"withdraw",amount:500},];

// find the sum of all deposits
// filter out all the deposits and then calculate the sum of those deposits with reduce()
// sum of all deposits
const deposits = transactions.filter((transaction) => transaction.type === "deposit");
const total = deposits.reduce((acc,d) => acc + d.amount, 0);
// sum of all withdrawls
const withdrawls = transactions.filter((t) => t.type === "withdraw").reduce((sum,t) => sum + t.amount, 0);
console.log("total deposits:" + total);
console.log("total withdrawls:" + withdrawls);
// net balance...
const net = total - withdrawls;
console.log("net balane:",net);
// count the transactions by type...
const transactioncounts = transactions.reduce((acc,t) => {
    acc[t.type] = (acc[t.type] || 0) + 1;
    return acc;
},{});

console.log("transaction counts:", transactioncounts);