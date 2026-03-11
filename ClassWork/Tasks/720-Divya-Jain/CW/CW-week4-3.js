//filter array of objects

const students=[
    {name:"Harshita",dreamCompany:"Microsoft",houseNo:4},
   { name:"Divya",dreamCompany:"Amazon",houseNo:3},
   {name:"Deepika",dreamCompany:"Google",houseNo:5},
   {name:"Harsh",dreamCompany:"Nvidia",houseNo:27},
]

//student work on Amazon
const wantToWorkInAmazon=students.filter(s=>s.dreamCompany==="Amazon");
console.log(wantToWorkInAmazon);