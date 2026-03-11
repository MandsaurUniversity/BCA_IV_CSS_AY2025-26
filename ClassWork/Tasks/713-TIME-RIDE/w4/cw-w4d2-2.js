//Using filter() on array of Strings

const words = ["banana","apple","strawberry","orange","Apricot","appy"];

// words starting with "a"()
const wordsStartingWithA = words.filter(word => word.toLowerCase().startsWith("a"));
console.log("Start with A",wordsStartingWithA);

//Words starting with "b"
const startB = words.filter(word => word[0] === "b");
console.log(startB);

//words containing "pp"
const doubleP = words.filter(words => words.includes("pp"));
console.log("Double PP words : ", doubleP);

//words longer than six character
const longerThanSix = words.filter(word => word.length > 6 );
console.log("Words Longer than Six",longerThanSix);

//words less than six character
const lessThanSix = words.filter(word => word.length < 6 );
console.log("Words Longer than Six",lessThanSix);
