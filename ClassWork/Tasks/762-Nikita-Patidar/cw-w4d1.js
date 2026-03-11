let numbers =[1,2,3,4,5];
console.log("Number :",numbers);

let result = numbers.map(function(param){
    return param *2;
})
console.log("Result(double):",result);

console.log(numbers.map(param=>param*2+5));
console.log(numbers.map(param=>param*2).map(param=>param+5));