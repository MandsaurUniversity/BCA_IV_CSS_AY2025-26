function repWord(str,word,replace){
    let end  = str.length
    while(str.indexOf(word) != -1){
        str = str.slice(0,str.indexOf(word)) + replace +str.slice(str.indexOf(word)+1,end);
    }
    return str;
}
let str = "naman is my name";
let replace = '@'
console.log("Before : " + str);
str = repWord(str,'a',replace);
console.log("After : "  + str);