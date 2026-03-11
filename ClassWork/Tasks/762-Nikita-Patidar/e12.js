function randomBetween(min,max){
    const random = Math.random();
    const range = max - min +1;
    const randomeRange = Math.floor(random * range);
    return min + randomeRange;
}

console.log(randomBetween(50,100));