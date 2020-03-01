// This -> reserved keyword which value is determined by the caller's function's execution context.
// Can be determined using 4 rules

// 1 - Global context (when this is not inside a declared object)
// Supposing we are in the browser!

function getThis() {
    return this;
}

// This will create a global variable
function variableInThis() {
    this.person = 'John';
}

variableInThis();
console.log(person); // John
getThis(); // window

// To declare global variables is to attach a variable to the global this
console.log(this.person === person); // true

// if we enable 'use strict', the value of this will be undefined when it is not inside a declared object

('use strict');

function willThrowError() {
    this.variable = 'oops!'; // this is undefined
}

getThis(); // undefined

// 2 - Implicit/Object (when this is inside a declared object)
// When the keyword this is found inside a declared object, its value will always be the closest parent object

var dog = {
    name: 'Max',
    bark: function() {
        return this.name + ' says: woof woof!';
    },
    determineContext: function() {
        return this === dog;
    }
};

dog.bark(); // Max says: woof woof!
dog.determineContext(); // true

// What about nested objects?
var animals = {
    breed: 'husky',
    rex: {
        bark: function() {
            return "Woof! I'm a " + this.breed;
        },
        determineContext: function() {
            return this === dog;
        }
    },

    max: {
        bark: function() {
            return "Woof! I'm a " + this.breed;
        },
        determineContext: function() {
            return this === animals;
        }
    }
};

animals.rex.bark(); // "Woof! I'm a undefined"
animals.rex.determineContext(); // false

// Solution: it is necessary to rebind the value of this -> call, apply, bind

// 3 - Explicit binding
// Choose what the value of this will be
// Call, apply and bind => methods that can only be used by functions

//  METHOD   PARAMS                 IMM. INVOKED
//  CALL    newThis, a, b, c, ...   YES
//  APPLY   newThis, [a, b, c, ...] YES
//  BIND    newThis, a, b, c, ...   NO

// Apply accepts only two parameters
// Bind returns a function definition

animal.rex.bark.call(animals); // "Woof! I'm a husky"
animal.rex.determineContext.call(animals); // true

var john = {
    name: 'John',
    greet: function() {
        return "Hi, I'm " + this.name;
    },
    calculate: function(a, b, c, d) {
        return this.name + ' calculated ' + (a + b + c + d);
    }
};

var peter = {
    name: 'Peter'
};

john.greet(); // Hi, I'm John!
john.calculate(1, 2, 3, 4); // John calculated 10

john.calculate.call(peter, 1, 2, 3, 4); // Peter calculated 10
john.calculate.apply(peter, [1, 2, 3, 4]); // Peter calculated 10

// Bind -> Useful for partial application

var peterCalc = john.calculate.bind(peter, 1, 2, 3, 4);
peterCalc(); // Peter calculated 10

var peterCalc = john.calculate.bind(peter, 1, 2);
peterCalc(3, 4); // Peter calculated 10

// Bind is useful to set the value of this in a function that will be called in a later point in time

var carl = {
    name: 'Carl',
    greet: function() {
        setTimeout(function() {
            console.log("Hi, I'm " + this.name);
        }, 1000);
    }
};

carl.greet(); // Hi, I'm undefined

var carl = {
    name: 'Carl',
    greet: function() {
        setTimeout(
            function() {
                console.log("Hi, I'm " + this.name);
            }.bind(this),
            1000
        );
    }
};

carl.greet(); // Hi, I'm Carl

// The new keyword
// The new keyword created a new object. When used with a function, the this occurences will refer to the newly created object
// Also, when the new keyword is used, an implicit 'return this' is added to the function that uses it.

function Dog(name, breed) {
    this.name = name;
    this.breed = breed;
}

var max = new Dog('Max', 'Husky');
max.name; // Max
max.breed; // Husky
