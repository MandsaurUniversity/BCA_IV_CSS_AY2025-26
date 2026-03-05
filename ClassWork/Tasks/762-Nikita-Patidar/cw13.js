function palindorme(value){
    value.toLowerCase();
    let sr= value.split(" ");
    let wSpace="";
    for(let i=0;i<sr.length;i++){
        wSpace +=sr[i];
    }
    let rev="";
    for(let i=wSpace.length-1;i>=0;i--){
        rev+=wSpace[i];
    }
    return rev==wSpace;ṇ
}
let str = "a man a plan a canal panama";
console.log(str + " is palindorome : " + palindorme(str));