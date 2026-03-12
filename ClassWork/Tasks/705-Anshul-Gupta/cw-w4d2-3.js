
//Filter arrays of objects

const students = [
    {name: "Anshul", Dreamcompany: "microsoft", houseno: 4},
    {name: "goutam", Dreamcompany: "nvidia", houseno: 27},
    {name: "harsh", Dreamcompany: "amazon", houseno: 3},
    {name: "radey", Dreamcompany: "X", houseno: 56},
    {name: "Ankush", Dreamcompany: "farming", houseno: 8},
    {name: "rahul", Dreamcompany: "nvidia", houseno: 73}

];

const wantstoworkinnvidia = students.filter( s => s.Dreamcompany === "nvidia");
console.log(wantstoworkinnvidia);
