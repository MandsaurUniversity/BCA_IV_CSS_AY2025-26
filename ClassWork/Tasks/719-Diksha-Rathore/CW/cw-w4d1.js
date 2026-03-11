//Apply multiple transfromations in sequence(chaing map() calls)

let numbers = [1, 2, 3, 4, 5];
console.log("Numbers:", numbers);
//Double the number Array: stroe in result Array.
let result = numbers.map(function(param){
    return param * 2;
})
//Output:
console.log("Result(doubled):", result);

//Double the numbers array and add 5 to each number.
result = numbers.map(param => param * 2);
console.log(result);
result = numbers.map(param => param*2).map(param => param + 5);
console.log(result);
