const transactions = [
    {type : "deposit", amount : 1000},
    {type : "withdraw",amount :300},
    {type : "deposit",amount :700},
    {type : "withdraw",amount :100},
    {type : "deposit",amount :2000},
    {type : "withdraw",amount :1000},
    {type : "withdraw",amount :500},
];

let deposit = transactions.filter( transactions => transactions.type==="deposit");
console.log(deposit);
let totaldeposit = deposit.reduce((acc,dep)=>acc+dep.amount,0);
console.log(totaldeposit);

let withdraw = transactions.filter( transactions => transactions.type==="withdraw");
console.log(withdraw);
let totalwithdraw =  withdraw.reduce((acc,dep)=>acc+dep.amount,0);
console.log(totalwithdraw);


const total = deposit.reduce((acc,dep)=>acc+dep.amount,0) - withdraw.reduce((acc,dep)=>acc+dep.amount,0);
console.log(total);