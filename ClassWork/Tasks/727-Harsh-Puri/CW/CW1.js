// function greet(name, greeting) {
//     console.log(greeting + ", " + name + "!");
// }

// greet("Alice", "Hello");    // "Hello, Alice!"
// greet("Bob");               // "undefined, Bob!"  — greeting is undefined
// greet("Charlie", "Hi", 42); // "Hi, Charlie!"     — 42 is ignored
//default values
function greet(name = "Scorpion", Dialouge = "GET OVER HERE!" ) {
    console.log(name + ", Dialouge :" + Dialouge + "!");
}
greet("SubZero","Finish HIM");    
