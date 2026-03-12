//Using filter() on array of String

const words = ["Strawberry", "Blueberry",  "Banana", "Apple", "Mango", "Orange", "Kivi", "Cherry", "Chiku", "apricot", "guava", "appy"];

//Starting with "A"
const wordsStratingWithA = words.filter( word => word.toLocaleLowerCase().startsWith("a") );
console.log("Starts With A: " , wordsStratingWithA);

//words containing "pp"
const doubleR = words.filter( word=> word.includes("rr") );
console.log("Containing 'rr': ", doubleR);

//Words longer than six Character
const longerThanSixChar = words.filter( word => word.length > 6 );
console.log("Words longer than six: " , longerThanSixChar);

//Words starts with "B"
const startsWithB = words.filter( word => word [0] === "B");
console.log("Words starts with 'B': ",startsWithB);