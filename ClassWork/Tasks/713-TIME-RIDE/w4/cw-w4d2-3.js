//Filetr array of objects

const students =[
    {name: "Harshita", dreamCompany: "Microsoft", houseNo: 4},
    {name: "Harsh", dreamCompany: "Nvidia", houseNo: 27},  
    {name: "Divya", dreamCompany: "Amazon", houseNo: 3},
    {name: "Deepika", dreamCompany: "X", houseNo: 5},
    {name: "Radhe", dreamCompany: "X", houseNo: 58},
];
const dreamCom = students.filter(stu => stu.dreamCompany === "Nvidia");
console.log("nvidia :",dreamCom);
