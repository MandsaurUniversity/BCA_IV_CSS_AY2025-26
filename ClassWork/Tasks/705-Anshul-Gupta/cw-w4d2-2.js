
const words = ["apple", "banana", "kiwi", "orange", "mangoes"];

// words starting with a 
const wordsstartingwithA = words.filter(word => word.toLowerCase().startsWith("a"));
console.log("starts with a :", wordsstartingwithA);

// words containing rr
const doubleR = words.filter(words => words.includes("rr"));
console.log("words containing 'rr': " + doubleR);

// Words longer than 6 characters
const longWords = words.filter(w => w.length > 6);
console.log("Longer than 6 chars: " + longWords);
