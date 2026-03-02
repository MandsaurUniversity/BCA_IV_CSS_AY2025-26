// JS program to Genrate Randwom number between two numbers

let num =  function (MIN,MAX){   return Math.floor(Math.random()*(MAX - MIN)+MIN)  };

console.log(num(10,20));
