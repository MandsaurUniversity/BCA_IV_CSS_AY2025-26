
    let modified = "";
    let start = 0;
    let end  = str.length
    console.log(start + ":" + end + ":" + str + ":" + word + ":" + str.indexOf(word)); 
    while(str.indexOf(word)<str.length){
        str = str.slice(start,str.indexOf(word)) + word +str.slice(str.indexOf(word)+1,end);
    }
    console.log(str);
}