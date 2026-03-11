//Using filter() on Array of String

const words = ["banana", "apple", "strawberry", "orange", "grapes", "mangoes", "guava", "kiwi", "cherry", "blueberry", "apricot"];
 
//Words starting with "a"
const wordsStartingWithA = words.filter( word => word.startsWith("a"));
console.log("Starts with a:", wordsStartingWithA);

//Words starting with "b"
const wordsStringWithB = words.filter(word => word [0] === "b");
console.log("Starting with b: ", wordsStringWithB);

//Words containing "rr"
const doubleR = words.filter(word => word.includes("r"));
console.log("words containing 'r' :",doubleR);

//Words longerthan 6 character
const longerThan6Char = words.filter( w => w.length > 6);
console.log("Words longer then 6 chars are:", longerThan6Char);   