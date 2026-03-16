//Example of data aggregation using reduce()

const number=[21,45,67,78,98];
const mixed =[4,"Divya",8.8,"Harshita",8.9];
//sum of all number....
const sum =number.reduce((acc, num) => acc +num ,0);
console.log("sum of all numbers in array: "+sum);

//Product of all number is..
const mul =number.reduce((acc, num) => num*acc ,1);
console.log("mul of all numbers in array: "+mul);
//concatenation with 
const concat = mixed.reduce( (acc,m)=> acc +" || = " + m,);
console.log("concatenated string is: ", concat);

//Exercise to use combine filter() and reduce()
//objective use both methods together

const transactions=[
    {type: "deposit",amount: 1000},
     {type: "withdraw",amount: 300},
      {type: "deposit",amount: 700},
       {type: "withdraw",amount: 100},
        {type: "deposit",amount: 2000},
         {type: "withdraw",amount: 1000},
          {type: "withdraw",amount: 500},
         
];
//find the sum of all deposit
// filter out all the deposit and then
 const deposits= transactions.filter( ( transaction )=> transaction.type==="deposit");
const total = deposits.reduce( (acc, t)=>acc + t.amount ,0);
console.log("Total deposit: " +total);

//find the sum of all deposit
const withdrawals= transactions.filter( (t )=> t.type ==="withdraw").reduce(( sum ,t)=> sum + t.amount ,0);
console.log("Total Withdraw: " +withdrawals);

//net balance...
const net = total-withdrawals;
console.log( "Net Balance: " +net);

//Count the transactions by type
const transactionCounts=transactions.reduce( ( acc,t)=> {
 acc[t.type]   =( acc[t.type] || 0)+1;
 return acc;
}, {});
console.log(transactionCounts);
