const numbers = [23,56,89,18,57,22];

const sum=numbers.reduce((acc,num)=>acc+num,0);
console.log("Sum of all numbers in Array :"+ sum);

const mul= numbers.reduce((acc,n)=>n*acc,1);
console.log("Product at all nums is : "+mul);
