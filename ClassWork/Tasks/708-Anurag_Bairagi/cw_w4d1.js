let numbers = [1,2,3,4,5];
console.log(numbers);

let double = numbers.map(function(num){
    return num*2;
});

console.log(double);
console.log(numbers.map(num=>(num*2)+5));
