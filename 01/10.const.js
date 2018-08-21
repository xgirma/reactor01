const person = {
  name: 'Tome'
};

console.log(person);

person = {};

console.log(person);

// { name: 'Tome' }
// person = {};
//        ^
// TypeError: Assignment to constant variable.

