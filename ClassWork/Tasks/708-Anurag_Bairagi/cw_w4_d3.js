const today = new Date();

let yy = 2005,mm = 12,dd = 4;
const birth = new Date(yy,mm-1,dd+1);
let ns = Math.floor((today - birth)/1000);
let nm = Math.floor(ns/60);
let nh = Math.floor(nm/60);

console.log(nh + "-" + nm + "-" + ns);