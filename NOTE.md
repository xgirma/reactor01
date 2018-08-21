# Note

## 01 
0. variables initialised with `undefined`

1. `global` scope vs `function` scope

2. scope in `nested function`

3. for(var i = 0; i < 3; i++) { ... } `console.log(i) = 3` because of `var`

4. javascript interpreter hoist `function` and `variable` declarations to the top of the `current-scope`

5. declare a variable without `var`, variable attached to global scope 

6. `var` function scoped, `let` block scoped

7. reference a variable before declaration result, `var` => `undefined`, `let` => `Reference Error`

8. `const` same as `let` except once you assigned a value to a variable using `const` you can not   re-assign new value for that variable.

9. You can modify the property of an object created with `const`, because it is not re-assigning, it is modifying a property.

## 10
0. You can not reassign an object created with `const`.

1. add object property one at a time

2. add multiple object property at the same time  

3. Object destructuring: helps extract multiple properties at the same time, before destructuring there is no way to extract properties at the same time

4. function destructuring 

5. array destructuring

6. object/function/array destructuring help fix `poorly named` object property names

7. function arguments/parameters, we need to remember the order of the args

8. function arguments/parameters, instead of passing args one by one, we can pass an `object` or an `array`

9. function arguments/parameters, helps us set default values

## 20
0. shorthand method name

1. shorthand property name

2. objectify ES5

3. objectify ES6: computed property names in JavaScript

4. template literals/Strings `${xyz}`, multi-line

5. function `declaration` 

6. function `expression`

7. arrow function: `implicit return`, one liner with no return statement

8. arrow function and `this` statement

9. arrow function concise syntax

## 30
0. arrow function sharing lexical "this" with the parent scope

1. default parameter problem, if check for `falsy`, instead of `undefined`

2. compiling: compiling with Babel takes your code and run it through syntax transformation, in order to get browser compatible syntax. What its not doing, `it is not adding` any new method or objects you may need to the browser's global object or any JavaScript primitives

3. polyfill: when you add a polyfill you `adding new functionality` to the browser

4. Babel: arrow functions : compiled

5. Babel: Promises : polyfilled

6. Change if/else statement into a ternary

7. shorthand notation

8. do not to destruct `event`, e.g. event.target.value;