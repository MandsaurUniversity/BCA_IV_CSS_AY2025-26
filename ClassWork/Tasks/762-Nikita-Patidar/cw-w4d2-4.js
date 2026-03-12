const transaction =[
    {type :"deposit", amount :1000},
    {type : "withdraw", amount :300},
    {type : "deposit", amount : 700},
    {type : "withdraw",amount : 100},
    {type : "deposit", amount : 2000},
    {type : "withdraw",amount : 1000},
    {type : "withdraw",amount : 500},
];

const deposits=transaction.filter((transaction)=>transaction.type=="deposit");
const total =deposits.reduce( (acc,d) => acc +d.amount,0);

const withdrawals=transaction.filter((t) => t.type ==="withdraw").reduce( (sum,t) => sum +t.amount,0);
console.log("Total withdrawals : ", withdrawals);

const net =total-withdrawals;
console.log("Net balance : " + net);

const transactionCounts = transaction.reduce(( acc,t)=>{acc[t.type] =(acc[t.type]||0)+1;
    return acc;
},{});

console.log("Transaction counts",transactionCounts);