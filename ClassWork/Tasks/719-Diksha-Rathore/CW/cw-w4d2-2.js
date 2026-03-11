//Using filter() on Array of String

const words =["banana", "apple", "strawberry", "orange", "grapes", "mangoes", 
    "guava", "kiwi", "cherry", "blueberry", "apricot", "appy"];

    //Words starting with "a"
    const wordsStringWithA = words.filter(word => word.toLowerCase().startsWith("a") );
    console.log("Starts with a: ", wordsStringWithA);

    //Words starting with "b"
    const wordsStringWithB = words.filter(word => word[0] === "b");
    console.log("Starting with b: ", wordsStringWithB);
    
    //Words containing "rr"
    const doubleR = words.filter(word => word.includes("rr"));
    console.log("Words containing 'rr' :" , doubleR);

    //Words longer than 6 charcters
    const longerThan6Chars = words.filter(w => w.length > 6);
    console.log("Words longer then 6 chars are :", longerThan6Chars);