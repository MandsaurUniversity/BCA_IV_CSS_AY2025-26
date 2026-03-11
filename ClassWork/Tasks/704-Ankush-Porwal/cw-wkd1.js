// Apply Multiple Transformations in Sequence(chaining map()calls)
let numbers = [1, 2, 3, 4, 5];
console.log("Numbers:", numbers);
// Double the Numbers Array
let result = numbers.map(function(param){
    return param * 2;
}
);

// Output:
console.log("Result(doubled):", result);

// Doble the numbers array and add 5 to each numbers...
result = numbers.map(param => param * 2 ).map(param => param + 5);
console.log("Result(doubled and added 5):", result);

