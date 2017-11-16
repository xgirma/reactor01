# var vs let vs const: variable declarations in ES6
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

if you created a `var` it is scoped to a function that `var` is created and any nested functions. If you created a variable with out using `var` that variable is coped to the global object. 

1. scoped to a function 
````javascript
function getDate() {
    var date = new Date();
    return date;
}

getDate();
console.log(date);
// ReferenceError: date is not defined
````

We get reference error because we created the `date` variable inside the `getDate` function. 

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
// ReferenceError: date is not defined
```
Because `formatDate` function is nested inside our `getDate` function still have access to the variable `date`. But outside we do not have access to it, because `date` is scoped to the `getDate` function. 

3. what about block-scope prop inside a function
````javascript
function discountedPrices (prices, discount) {
    var discounted = [];
    for(var i = 0; i < prices.length; i++){
        var discountedPrice = prices[i] * (1 - discount);
        var finalPrice = Math.round(discountedPrice * 100) / 100;
        discounted.push(finalPrice);
    }

    console.log('i: ', i);
    console.log('discountedPrice: ', discountedPrice);
    console.log('finalPrice: ', finalPrice);

    return discounted;
}

console.log(discountedPrices([100,200,300], .5));
// i:  3
// discountedPrice:  150
// finalPrice:  150
// [ 50, 100, 150 ]
````
What is wired is we still have access to the three variables even if we are outside of the `for` loop. It does not do us any good, eventually it might even cause us some error. But because functions are declared with the `var` keyword are `function-scoped` the three variables are accessable inside the `discountedPrices` function. 

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
function discountedPrices (prices, discount) {
    var discounted;
    var i;
    var discountedPrice;
    var finalPrice;


    discounted = [];
    for(i = 0; i < prices.length; i++){
        discountedPrice = prices[i] * (1 - discount);
        finalPrice = Math.round(discountedPrice * 100) / 100;
        discounted.push(finalPrice);
    }

    console.log('i: ', i);
    console.log('discountedPrice: ', discountedPrice);
    console.log('finalPrice: ', finalPrice);

    return discounted;
}

console.log(discountedPrices([100,200,300], .5));
console.log(discounted);
// i:  3
// discountedPrice:  150
// finalPrice:  150
// [ 50, 100, 150 ]
// ReferenceError: discounted is not defined
````

if you do not declare a variable without the `var` keyword, it will become attached to the global-scope, the reason for that is `hoisting`. 

your code
```javascript
function discountedPrices (prices, discount) {
    discounted = [];
    for( var i = 0; i < prices.length; i++){
        var discountedPrice = prices[i] * (1 - discount);
        var finalPrice = Math.round(discountedPrice * 100) / 100;
        discounted.push(finalPrice);
    }

    console.log('i: ', i);
    console.log('discountedPrice: ', discountedPrice);
    console.log('finalPrice: ', finalPrice);

    return discounted;
}

console.log(discountedPrices([100,200,300], .5));
console.log('last: ', discounted);
// i:  3
// discountedPrice:  150
// finalPrice:  150
// [ 50, 100, 150 ]
// last:  [ 50, 100, 150 ]
```
interpreted as 
```javascript
function discountedPrices (prices, discount) {
    var i;
    var discountedPrice;
    var finalPrice;


    discounted = [];
    for(i = 0; i < prices.length; i++){
        discountedPrice = prices[i] * (1 - discount);
        finalPrice = Math.round(discountedPrice * 100) / 100;
        discounted.push(finalPrice);
    }

    console.log('i: ', i);
    console.log('discountedPrice: ', discountedPrice);
    console.log('finalPrice: ', finalPrice);

    return discounted;
}

console.log(discountedPrices([100,200,300], .5));
console.log('last: ', discounted);
// i:  3
// discountedPrice:  150
// finalPrice:  150
// [ 50, 100, 150 ]
// last:  [ 50, 100, 150 ]
```
What the JavaScript interpreter is going to do look for `discount` declaration inside the `discountedPrices` and it will not find one, because we left-off the `var` keyword. Then it will go to the parent, it will repeat that process all the way to the `global-scope` and once it does not find a declaration for `discount`, it will add `discounted` as a property to the `global-scope`. 

## How dose var compare to let and const
The main difference between `var` and `let`

        var - function scoped
        let - block scoped, {{{},{}}}
        
`let` is block scoped. What that means is a variable created with the word `let` is available inside the block it was created in, as well as any nested blocks, like in `for` loop or an `if` statement. 

In the previous example 

```javascript
    console.log('i: ', i); // 50
    console.log('discountedPrice: ', discountedPrice); // 100
    console.log('finalPrice: ', finalPrice); // 150
```
give us `[ 50, 100, 150 ]` because they are declared with the `var` keyword and therefore they are function scoped. If we change all of `var` into `let` what will happen? 

```javascript
function discountedPrices (prices, discount) {
    let discounted = [];
    for(let i = 0; i < prices.length; i++){
        let discountedPrice = prices[i] * (1 - discount);
        let finalPrice = Math.round(discountedPrice * 100) / 100;
        discounted.push(finalPrice);
    }

    console.log('i: ', i);
    console.log('discountedPrice: ', discountedPrice);
    console.log('finalPrice: ', finalPrice);

    return discounted;
}

console.log(discountedPrices([100,200,300], .5));
// console.log('i: ', i);
//                    ^
// ReferenceError: i is not defined
```
Because `i` is scoped to the `for` loop block only. 

The second main difference between `var` and `let` is because of hoisting

With `var` referencing a variable before the variable is declared will give you a value of `undefind`. Variable declared with the `let` will hoist the variable to the top-of the block just like with `var` but referencing the variable before the declaration will resolve to a `reference error`. 

Try to reference a variable before they are declared 

        var - undefined 
        let - Reference Error
        
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
so when the hoisted variable gets logged we get `undefined`.

your code
```javascript
console.log(hoisted) // ReferenceError
let hoisted
```
interpreted as
```javascript
let hoisted
console.log(hoisted) // ReferenceError
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

NB: we can not reassign-new value for a variable declared with `const`.

```javascript
const person = {
    name: 'Tome'
};
console.log(person);
person.name = 'Tyler';
console.log(person);

// { name: 'Tome' }
// { name: 'Tyler' }
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
// TypeError: Assignment to constant variable.
```
