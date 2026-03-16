//Exercise to use/combine filter() and reduce()
//Objective use both method together 

const transactions =[
    {type: "deposit", amount:1000},
    {type: "withdraw", amount:500},
    {type: "deposit", amount:2000},
    {type: "withdraw", amount:1000},
    {type: "deposit", amount:5000},
    {type: "withdraw", amount:3500},
];

//find the sum of all deposits
//filter out all the deposits and them calculate 

// const deposits = transactions.filter((transactions) => transactions.type === "deposit");
// const total = deposits.reduce((acc,deposit ) => acc + deposit.amount ,0);
// console.log(total);

const withdrawls = transactions.filter((transactions) => transactions.type === "withdraw");
const total = withdrawls.reduce((acc,deposit ) => acc + deposit.amount ,0);
console.log("Sum of all Withdraw :",total);

const tot = transactions.filter(transactions => transactions.type === "deposit")
.reduce((acc,deposit ) => acc + deposit.amount ,0);

console.log(tot);

const net = tot - withdrawls;
console.log("Net balance: ", net);

//conunt the transaction by types

const transactionCounts = transactions.reduce((acc, tra) => {
    acc[tra.type] = (acc[tra.type] || 0)+ 1;
    return acc;
});

console.log(transactionCounts);