//Task: Apply multiple transformation in sequence(Chaining map() Calls)

let numbers = [1,2,3,4,5,];
console.log("Numbers: " , numbers)

//Double the numbers array: store in result array.
let result = numbers.map(function(param){
    return param * 2;
})

console.log("Result (Doubled): ", result);

//Double the numbers array and add 5 to each number.
result = numbers.map(param => param * 2 + 5);
console.log(result);
result = numbers.map(param => param * 2).map(param => param + 5);
console.log(result);