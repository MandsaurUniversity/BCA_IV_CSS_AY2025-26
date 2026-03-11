//Filter arrays of object

const students = [
{name: "Harshita", dreamCompany: "Microsoft", houseNo:4},
{name: "Harshita", dreamCompany: "Microsoft", houseNo:4},
{name: "Harshita", dreamCompany: "Microsoft", houseNo:4},
{name: "Harshita", dreamCompany: "Microsoft", houseNo:4},
{name: "Harshita", dreamCompany: "Microsoft", houseNo:4}];

//Students want to want in "Nvidia"
const wantToWorkInMicrosoft = students.filter(s => s.dreamCompany==="Microsoft");
console.log(wantToWorkInMicrosoft);