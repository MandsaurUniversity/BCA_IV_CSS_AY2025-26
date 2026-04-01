// create a date
const today = new Date();
console.log(today);
console.log(Date.now());


// create specific date
const birthday = new Date("2026-03-12");
console.log(birthday);
const nextchristmas = new Date("2005-03-15");
console.log(nextchristmas);
// timestamp of my birthdate (in milliseconds from jan 01,1970)
const birthdaytimestamp = birthday.getTime();
console.log(birthdaytimestamp);
// Get Current Timestamp(in milliseconds since Jan 01,1970)
const timestamp = Date.now();
console.log(timestamp);