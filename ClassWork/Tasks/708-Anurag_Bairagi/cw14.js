function cap1stLetter(str){
    if(str.length==0){
        return str;
    }
    return str[0].toUpperCase() + str.slice(1);
}

let dem = 'javascript';
console.log(`Method 1\n Capitalizing ${dem} :${cap1stLetter(dem)}`);

let capp = str => str[0].toUpperCase() + str.slice(1);
dem = "this is String";
console.log(`Method 2\nCapitalizing ${dem} :${cap1stLetter(dem)}`);

function capitalizeAllWords(){
    
}
