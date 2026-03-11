//Filter arrays of objects

const students = [
    {name: "Diksha", dreamCompany: "Google", houseNo: 24},
    {name: "Harshita", dreamCompany: "Microsoft", houseNo: 4},
    {name: "Harsh", dreamCompany: "Nvidia", houseNo: 27},
    {name: "Divya", dreamCompany: "Amazon", houseNo: 5},
    {name: "Radhe", dreamCompany: "X", houseNo: 58},
    {name: "Deepika", dreamCompany: "Own Company", houseNo: 3},
    {name: "Anurag", dreamCompany: "Farming", houseNo: 0},
    {name: "Rahul", dreamCompany: "Nvidia", houseNo: 73}
]
//Students want to work in "Nvidia"
const wantToWorkInNvidia = students.filter(s=> s.dreamCompany==="Nvidia");
console.log(wantToWorkInNvidia);