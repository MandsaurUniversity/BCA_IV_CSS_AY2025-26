const users = [
    {name: "Alice", age: 25, city: "New York"},
    {name: "Bob", age: 17, city: "London"},
    {name: "Charlie", age: 30, city: "New York"}
];

// Adults only
const Adults = users.filter(u => u.age >= 18)
console.log("Adults only : " + Adults);

// From New York
const NewYork = users.filter(u => u.city === "New York");
console.log("From New York : " + NewYork);

// Combined conditions
const comb = users.filter(u => u.age >= 18 && u.city === "New York")
console.log("Combined conditions : " + comb);
