console.log("=== TEMPERATURE CONVERTER - METHOD 2: SMART CONVERTER FUNCTIONS ===\n");

// Celsius to Fahrenheit converter with validation
function celsiusToFahrenheit(celsius) {
    // Validate input
    if (typeof celsius !== 'number') {
        return "Error: Input must be a number";
    }
    
    // Check against absolute zero (-273.15°C)
    if (celsius < -273.15) {
        return "Error: Temperature below absolute zero (-273.15°C)!";
    }
    
    // Perform conversion
    const fahrenheit = (celsius * 9/5) + 32;
    return parseFloat(fahrenheit.toFixed(2));
}

// Fahrenheit to Celsius converter with validation
function fahrenheitToCelsius(fahrenheit) {
    // Validate input
    if (typeof fahrenheit !== 'number') {
        return "Error: Input must be a number";
    }
    
    // Check against absolute zero (-459.67°F)
    if (fahrenheit < -459.67) {
        return "Error: Temperature below absolute zero (-459.67°F)!";
    }
    
    // Perform conversion
    const celsius = (fahrenheit - 32) * 5/9;
    return parseFloat(celsius.toFixed(2));
}

// Bidirectional converter that returns object with both scales
function convertTemperature(value, fromUnit) {
    if (typeof value !== 'number') {
        return { error: "Temperature must be a number" };
    }
    
    if (fromUnit.toUpperCase() === "C") {
        if (value < -273.15) {
            return { error: "Temperature below absolute zero!" };
        }
        const f = (value * 9/5) + 32;
        return {
            celsius: value,
            fahrenheit: parseFloat(f.toFixed(2)),
            kelvin: parseFloat((value + 273.15).toFixed(2))
        };
    } else if (fromUnit.toUpperCase() === "F") {
        if (value < -459.67) {
            return { error: "Temperature below absolute zero!" };
        }
        const c = (value - 32) * 5/9;
        return {
            celsius: parseFloat(c.toFixed(2)),
            fahrenheit: value,
            kelvin: parseFloat((c + 273.15).toFixed(2))
        };
    } else {
        return { error: "Unknown unit. Use 'C' or 'F'" };
    }
}

// TEST CASES - Valid conversions
console.log("--- Valid Temperature Conversions ---");
console.log("25°C to F: " + celsiusToFahrenheit(25) + "°F");
console.log("77°F to C: " + fahrenheitToCelsius(77) + "°C");
console.log("0°C to F: " + celsiusToFahrenheit(0) + "°F");
console.log("100°C to F: " + celsiusToFahrenheit(100) + "°F");
console.log("37°C (body): " + celsiusToFahrenheit(37) + "°F");
console.log();

// TEST CASES - Error handling
console.log("--- Error Handling Tests ---");
console.log("Invalid input (string): " + celsiusToFahrenheit("25"));
console.log("Below absolute zero: " + celsiusToFahrenheit(-300));
console.log("Below absolute zero (F): " + fahrenheitToCelsius(-500));
console.log();

// TEST CASES - Bidirectional conversion
console.log("--- Bidirectional Conversion (All Scales) ---");
const temp1 = convertTemperature(25, "C");
console.log("25°C -> All scales:");
console.log("  Celsius: " + temp1.celsius + "°");
console.log("  Fahrenheit: " + temp1.fahrenheit + "°");
console.log("  Kelvin: " + temp1.kelvin + "K");
console.log();

const temp2 = convertTemperature(77, "F");
console.log("77°F -> All scales:");
console.log("  Celsius: " + temp2.celsius + "°");
console.log("  Fahrenheit: " + temp2.fahrenheit + "°");
console.log("  Kelvin: " + temp2.kelvin + "K");
console.log();

// Real-world application: Weather dashboard
console.log("--- Weather Dashboard Simulation ---");
const cities = [
    { name: "Mumbai", tempC: 32 },
    { name: "Delhi", tempC: 40 },
    { name: "Shimla", tempC: 8 },
    { name: "Srinagar", tempC: 2 }
];

cities.forEach(city => {
    const tempF = celsiusToFahrenheit(city.tempC);
    const advisory = city.tempC < 5 ? "❄️ Freezing" :
                     city.tempC < 15 ? "🧥 Cold" :
                     city.tempC < 25 ? "😊 Comfortable" :
                     city.tempC < 35 ? "☀️ Warm" : "🔥 Very Hot";
    console.log(city.name + ": " + city.tempC + "°C (" + tempF + "°F) " + advisory);
});

// Challenge: Temperature range validator
function isTemperatureValid(celsius) {
    const isValid = celsiusToFahrenheit(celsius) !== "Error: Temperature below absolute zero (-273.15°C)!";
    return isValid;
}

console.log("\n--- Validity Check ---");
console.log("-273.15°C is valid: " + isTemperatureValid(-273.15));
console.log("-300°C is valid: " + isTemperatureValid(-300));