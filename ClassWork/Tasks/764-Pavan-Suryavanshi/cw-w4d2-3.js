//filter arrays of objects
const students = [
    { name: "Pavan", dreamCompany: "Google", houseNo: 34 },
    { name: "Nana", dreamCompany: "Microsoft", houseNo: 55 },
    { name: "Chacha", dreamCompany: "Facebook", houseNo: 12 },
    { name: "Kaka", dreamCompany: "Amazon", houseNo: 10 },
    { name: "Goutu", dreamCompany: "Google", houseNo: 35 },

]

//Srudents want to work in "Google"
const wantToWorkInGoogle = students.filter(s => s.dreamCompany === "Google");
console.log(wantToWorkInGoogle);