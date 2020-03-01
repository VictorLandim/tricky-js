// "A closure is a function that makes use of variables defined in outer functions that have previusly returned"

function outer() {
    var data = 'Closures are ';
    return function inner() {
        var innerData = ' cool!';
        return data + innerData;
    };
}
outer()(); // Closures are cool!

function outer(a) {
    return function inner(b) {
        return a + b;
    };
}

outer(1)(5); // 6

var storeOuter = outer(1);
storeOuter(5); // 6

// Closures allows us to simulate private variables in javascript

function counter() {
    var count = 0;
    return function() {
        return ++count;
    };
}

var myCounter = counter();
myCounter(); // 1
myCounter(); // 2

function dogShelter() {
    var dogs = ['Max', 'Rex'];

    return {
        getDogs: function() {
            return dogs;
        },
        addDog: function(dog) {
            dogs.push(dog);
            return dogs;
        }
    };
}

// The dogs variable cannot be modified, it is private

var shelter = dogShelter();
shelter.getDogs(); // ['Max', 'Rex']
shelter.addDog('Noa'); // ['Max', 'Rex', 'Noa']

// Also,

var shelter2 = dogShelter();
shelter2.getDogs(); // ['Max', 'Rex']
