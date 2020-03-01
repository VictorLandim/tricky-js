// Uses function to simulate classes
// Constructor functions!

function Dog(name, breed, age) {
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.bark = function() {
        return this.name + ': woof woof!';
    };
}

var rex = new Dog('Rex', 'Husky', '2');
console.log(rex.bark());
// What does the new keyword do?
// - Creates an empty object {}
// - Sets the this keyword inside the function to the empty object that was just created
// - Adds an implicit 'return this' to the end of a function
// - Finally, it adds to the empty object a property called __proto__ (dunder proto) which links the prototype property of the constructor function to the empty object

// Removing code duplication

function Dog(name, breed, age) {
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.sayHi = function() {
        return this.name + ': woof woof!';
    };
}

function Cat(name, breed, age) {
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.sayHi = function() {
        return this.name + ': meow meow!';
    };
}

// We can:

function Cat(name, breed, age) {
    Dog.bind(this, name, breed, age);
    this.sayHi = function() {
        return this.name + ': meow meow!';
    };
}

// Or even better!

function Cat(name, breed, age) {
    Dog.apply(this, arguments);
    this.sayHi = function() {
        return this.name + ': meow meow!';
    };
}

// Prototypes!

// Every constructor function has an object property caleed prototype
// The prototype object has a property called constructor, which points back to the constructor function
// When an object is created with the new keyword, a property called __proto__ is created , linking the object and the prototype property of the constructor function
// The properties of the proto object are shared by all objects created by the same constructor function

function Dog(name) {
    this.name = name;
}

Person.prototype; // {}

var max = new Dog('Max');
var rex = new Dog('Rex');
max.__proto__ === Person.prototype; // true
rex.__proto__ === Person.prototype; // true

// How is the prototype useful?
// - It is shared amongst all objects created by the same constructor function

Dog.prototype.isCute = true;
max.isCute; // true
rex.isCute; // true

// Prototype chain
// How does javascript find methods and properties inside and object?
// If it can't find it in the object directly, it tries to find it inside the __proto__ property
// And if it isn't there, it looks inside it's __proto__.
// This process repeats until the property if found or if it isn't, the expression evaluates to undefined (Object.__proto__ === null)

var arr = []; // (new Array())
arr.__proto__ === Array.prototype; // true

// Also, using prototype allows us to avoid code duplication
// For example:

function Dog(name) {
    this.name = name;
    this.sayHi = function() {
        return this.name + ': woof woof!';
    };
}

var max = new Dog('Max');
max.sayHi(); // Max: woof woof!

// A new function will be created for each new object
// But instead, if we:

function Dog(name) {
    this.name = name;
}

Dog.prototype.sayHi = function() {
    return this.name + ': woof woof!';
};

var max = new Dog('Max');
max.sayHi(); // Max: woof woof!

// Now, 1 function is shared by all instances of Dog
