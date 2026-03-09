    //Mehtod 2.1: using String methods to do substring operations (Capitalize first latter of a stiring)
    function CapitalizeFirstLetter(str){
    if(str.length === 0)
    return str;
    return str[0].toUpperCase()+ str.slice(1)

    }
    console.log(" -- Method: 2.1 --")
    console.log(`Capitalizing "guns" : ${CapitalizeFirstLetter("guns")}`)

    // Method 2.2: making using Arrow Functions
console.log(" -- Method: 2.2 --")
    const cap = (str)=> str[0].toUpperCase()+str.slice(1);
    console.log(`Capitalizing "roses" : ${CapitalizeFirstLetter("roses")}`)

    // Method 2.3 : capitalize all the wrods (Title Case)
function Cap_All(str){
    const newstr = str.split("").map(word => word[0].toUpperCase()+word.slice(1)  )
return  newstr.join(" ");
}

    console.log(" -- Method: 2.3 --")
      console.log(`Capitalizing "roses" : ${Cap_All("guns and roses")}`)