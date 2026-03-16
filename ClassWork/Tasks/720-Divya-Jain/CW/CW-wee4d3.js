//create a date
const today = new Date();
console.log(today);
console.log(Date.now());

//output: 2026-03-12T06:39:02.525Z   1773297542536

//create specific date
const birthday = new Date("2026-3-12");
const nextChristmas= new Date("2026-12-25");
console.log(birthday);
console.log(nextChristmas);

//timestamp of my birthday
const birthdayTimestamp = birthday.getTime();
console.log(birthdayTimestamp);
//Get current timestamp (in milliseconds since Jan 01,1970)
const timestamp = Date.now();
console.log(timestamp);

