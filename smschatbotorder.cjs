const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const menu = {
    "Pizza": {
        sizes: ["Small", "Medium", "Large"],
        toppings: ["Pepperoni", "Mushrooms", "Extra Cheese"]
    },
    "Burger": {
        sizes: ["Single", "Double"],
        toppings: ["Lettuce", "Tomato", "Bacon"]
    },
    "Drinks": ["Coke", "Sprite", "Water"]
};

let order = {};

const askQuestion = (question) => {
    return new Promise(resolve => rl.question(question, answer => resolve(answer)));
};

async function startOrder() {
    console.log("Welcome to SMS Takeout Bot! Here is our menu:");
    console.log("1. Pizza\n2. Burger\n3. Drinks");
    
    let choice = await askQuestion("What would you like to order? (Pizza/Burger) ");
    choice = choice.trim();
    
    if (!menu[choice]) {
        console.log("Sorry, we don't have that item. Please choose Pizza or Burger.");
        return startOrder();
    }
    
    let size = await askQuestion(`What size would you like? (${menu[choice].sizes.join(", ")}) `);
    size = size.trim();
    if (!menu[choice].sizes.includes(size)) {
        console.log("Invalid size selection.");
        return startOrder();
    }
    
    let topping = await askQuestion(`Choose a topping: (${menu[choice].toppings.join(", ")}) `);
    topping = topping.trim();
    if (!menu[choice].toppings.includes(topping)) {
        console.log("Invalid topping selection.");
        return startOrder();
    }
    
    order[choice] = { size, topping };
    
    let drinkChoice = await askQuestion(`Would you like a drink? (${menu.Drinks.join(", ")}) (Yes/No) `);
    if (drinkChoice.toLowerCase() === "yes") {
        let drink = await askQuestion(`Choose a drink: (${menu.Drinks.join(", ")}) `);
        if (!menu.Drinks.includes(drink)) {
            console.log("Invalid drink selection.");
        } else {
            order.Drink = drink;
        }
    }
    
    console.log("Your order:", order);
    console.log("Thank you for ordering! Your food will be ready soon.");
    rl.close();
}

startOrder();