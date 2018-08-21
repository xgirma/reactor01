# Chapter 1 - var vs let vs const: variable declarations in ES6
A variable declaration introduces a new identifier. 

```javascript
var declaration
console.log(declaration);
// undefined
```
In JavaScript variables are `initalised` with `undefined` when they are created.
 
Initialisation is when you first assign a value to a variable. 

```javascript
var declaration = "initialising ..."
console.log(declaration);
// initialising ...
```

## Scope
Defines where `variables` and `functions` are accessible inside of your program. In JavaScript there are two kinds of scope `global` and `function-local` scope.

> If the variable statement occurs inside a FunctionDeclaration, the variables are defined with function-local scope in that function. Otherwise, they are defined with global scope, that is, they are created as members of the global object. -ECMAScript Spec

If you created a `var` it is scoped to a function that `var` is created and any `nested` functions. If you created a variable with out using `var` that variable is coped to the global object. 

1. scoped to a function 
````javascript
function getDate() {
  var date = new Date();
  return date;
}

getDate();
console.log(date);
// Uncaught ReferenceError: date is not defined
````

We get reference error because we created the `date` variable inside the `getDate` function. But not in the global object.

2. scoped to a nested function

```javascript
function getDate() {
  var date = new Date();
  
  function formatDate() {
    console.log('inside nested function: ', date);
    return date.toDateString().slice(4);
  }
  
  return formatDate();
}

getDate();
console.log('outside: ', date);
// inside nested function:  2017-11-16T09:06:00.589Z
// Uncaught ReferenceError: date is not defined
```
Because `formatDate` function is nested inside our `getDate` function still have access to the variable `date`. But outside we do not have access to it, because `date` is scoped to the `getDate` function. 

3. what about block-scope prop inside a function
````javascript
function multiply(first, second){
  var multiple = [];
  
  for(var i = 0; i < first.length; i++){
    var result = first[i] * second[i];
    multiple.push(result);
  }
  
  console.log('i: ', i);
  console.log('result: ', result);
  
  return multiple;
}

console.log(multiply([1,2,3], [4,5,6]));
// i:  3
// result:  18
// finalPrice:  150
// [ 4, 10, 18 ]
````
What is wired !!! We still have access to `i` and `result` even if we are outside of the `for` loop. It does not do us any good, eventually it might even cause us some error. But because functions are declared with the `var` keyword are `function-scoped` the two variables are accessible inside the `multiply` function. 

## Hoisting
When the JavaScript interpreter evaluates your code it will move all `function declarations` and `variable declarations` to the top of the `current-scope` this is refereed to as hoisting. 

your code
```javascript
console.log(hoisted) // undefined
var hoisted
```
interpreted as
```javascript
var hoisted
console.log(hoisted) // undefined
```

Why this happened? I don't really know and honestly I do not really care. 6:13. :joy: :joy: :joy: :joy: :joy:

````javascript
function multiply(first, second) {
  var multiple;
  var i;
  
  multiple = [];
  for (i = 0; i < first.length; i++) {
    var result = first[i] * second[i];
    multiple.push(result);
  }
  
  console.log('i: ', i);
  console.log('result: ', result);
  
  return multiple;
}

console.log(multiply([1, 2, 3], [4, 5, 6]));
// i:  3
// result:  18
// [ 4, 10, 18 ]
````

If you do not declare a variable without the `var` keyword, it will become attached to the global-scope, the reason for that is `hoisting`. 

your code
```javascript
function multiply(first, second) {
  multiple = [];
  
  for (var i = 0; i < first.length; i++) {
    var result = first[i] * second[i];
    multiple.push(result);
  }
  
  console.log('i: ', i);
  console.log('result: ', result);
  
  return multiple;
}

console.log(multiply([1, 2, 3], [4, 5, 6]));
console.log(multiple);
// i:  3
// result:  18
// [ 4, 10, 18 ]
// [ 4, 10, 18 ]
```
interpreted as 
```javascript
global.multiple;

function multiply(first, second) {
  var i;
  var result;
  
  multiple = [];
  
  for (i = 0; i < first.length; i++) {
    result = first[i] * second[i];
    multiple.push(result);
  }
  
  console.log('i: ', i);
  console.log('result: ', result);
  
  return multiple;
}

console.log(multiply([1, 2, 3], [4, 5, 6]));
console.log(multiple);
// i:  3
// result:  18
// [ 4, 10, 18 ]
// [ 4, 10, 18 ]
```
What the JavaScript interpreter is going to do look for `multiple` declaration inside the `multiply` function and it will not find one, because we left-off the `var` keyword. Then it will go to the parent, next parent ... It will repeat that process all the way to the `global-scope` and once it does not find a declaration for `multiple`, it will add `multiple` as a property to the `global-scope`. 

## How dose var compare to let and const
The main difference between `var` and `let`

        var - function scoped
        let - block scoped, {{{},{}}}
        
`let` is block scoped. What that means is a variable created with the word `let` is available inside the block it was created in, as well as any nested blocks, like in `for` loop or an `if` statement. 

In the previous example 

```javascript
  console.log('i: ', i); // 3
  console.log('result: ', result); // 18
```
give us `[ 4, 10, 18 ]` because they are declared with the `var` keyword and therefore they are function scoped. If we change all of `var` into `let` what will happen? 

```javascript
function multiply(first, second){
  var multiple = [];
  
  for(let i = 0; i < first.length; i++){
    let result = first[i] * second[i];
    multiple.push(result);
  }
  
  console.log('i: ', i);
  console.log('result: ', result);
  
  return multiple;
}

console.log(multiply([1,2,3], [4,5,6]));
// console.log('i: ', i);
//                    ^
// Uncaught ReferenceError: i is not defined
```
Because `i` is scoped to the `for` loop block ONLY. 

The second main difference between `var` and `let` is because of hoisting

With `var` referencing a variable before the variable is declared will give you a value of `undefind`. Variable declared with the `let` will hoist the variable to the top-of the block just like with `var` but referencing the variable before the declaration will resolve to a `reference error`. 

Try to reference a variable before they are declared 

        var - undefined 
        let - Reference Error
        
your code
```javascript
console.log(hoisted); // undefined
var hoisted;
```
interpreted as
```javascript
var hoisted;
console.log(hoisted);
```
so when the hoisted variable gets logged we get `undefined`.

your code
```javascript
console.log(hoisted); // Uncaught ReferenceError: hoisted is not defined
let hoisted;
```
interpreted as
```javascript
let hoisted;
console.log(hoisted);
```

## How does let and const compare
`let` and `const` are almost the same except, the only difference is once you assigned a value to a variable using `const` you can not re-assign it to a new value.  

```javascript
let x = 100;
const y = 200;
x = 120;
y = 230;
// y = 230; // TypeError: Assignment to constant variable
//   ^
```

We can not reassign new value for a variable declared with `const`.

```javascript
const person = {
    name: 'Tome'
};

console.log(person);

person.name = 'Tyler';
person.age = 33;

console.log(person);

// { name: 'Tome' }
// { name: 'Tyler', age: 33 }
```
This works because I am not `re-assigning` the object, instead I am modifying a property. But I cant `re-assign` the `person` object. 

```javascript
const person = {
    name: 'Tome'
};

console.log(person);

person = {};

console.log(person);

// { name: 'Tome' }
// person = {};
//        ^
// Uncaught TypeError: Assignment to constant variable.
```

## New variable declarations with let and const

If you're coming to JavaScript from another programming language a "feature" of JavaScript that will probably throw you off is that JavaScript is function scoped. What that means is that only functions introduce new scopes.

```javascript
// global Scope
var firstFunction = function () {
  // firstFunction's Scope
  
  var secondFunction = function () {
    // secondFunction's Scope
  };
};
```

In the code above we have three scopes. The Global Scope, firstFunction's scope, and secondFunction's scope. Any child scopes have access to every one of their parents scope. Any example of this can be seen below.

```javascript
function doThing() {
  var num = 1;
  
  if (num >= 0) {
    var secondNum = 2;
    console.log(num); // 1
    console.log(secondNum); // 2
  }
  
  console.log(num); // 1
  console.log(secondNum); // 2
}

doThing();
```
Now the reason I'm putting so much emphasis on scope is because that's the biggest differentiator between var and let. let allows you to have code which is block scoped, meaning anywhere we have an opening and closing curly brace we're creating a new scope.

```javascript
function doThing() {
  var num = 1;
  
  if (num >= 0) {
    let secondNum = 2;
    console.log(num); // 1
    console.log(secondNum); // 2
  }
  
  console.log(num); // 1
  console.log(secondNum); // Uncaught ReferenceError: secondNum is not defined
}

doThing();
```
It's generally agreed upon that block scope is a better paradigm than function scope which is why organizations like Mozilla have been primarily using `let` internally for years.

Now that brings us to `const`. Everything `let` has, `const` also has. The only difference is that when you create a variable with const, that variable can't be reassigned a new reference. Notice I didn't say that variable is immutable.

```javascript
const user = {
  name: 'Tyler',
  age: 25
};

user.name = 'Joey'
```

The code above is valid. We're not reassigning the reference to user, we're just reassigning a specific value.

```javascript
const user = {
  name: 'Tyler',
  age: 25
};

user = {
  name: 'Joey', 
  age: 25
}
```

Now this will throw a "user is already defined" error (`specifically Uncaught TypeError: Assignment to constant variable.`) since we're trying to `reassign the actual reference`.

As far as "Which one should I use?", here's what I do. I always default with const, if I'm mutating the variable, I'll use let. Rarely do I ever use var. Even though const isn't purely immutable, whenever I see a const variable I treat it as such.

>>> [Object and Array Destructuring in JavaScript. ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/02)