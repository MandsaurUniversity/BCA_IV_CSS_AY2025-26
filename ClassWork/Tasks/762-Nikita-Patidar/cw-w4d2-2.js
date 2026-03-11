const words=["Banana","Apple","Strawberry","Orange","Grapes","Mangoes","Guava","Kiwi","Cherry","Blueberry","apricote"];

const wordsStartingWithA=words.filter(word=>word.toLowerCase().startsWith("a"));
console.log("Fruits Starts with A :", wordsStartingWithA);

const wordsStartingWithB= words.filter(word=>word.startsWith("B"));
console.log("Words Starting With B :",wordsStartingWithB);

const doublePP=words.filter(word=>word.includes("pp"));
console.log("Words containg 'pp' : ",doublePP);

const longerThan6Char=words.filter(word=>word.length<=6);
console.log("Words greater than 6 char :", longerThan6Char);

