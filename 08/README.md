# Compiling vs Polyfills with Babel(Javascript)

:arrow_left: [Chapter 7 - Default Parameters in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/07)

:arrow_right: [Chapter 9 - Refactor](https://github.com/xgirma/reactor01/tree/master/09)

JavaScript is a living language it is constantly progressing. 

Compiling our code with Babel only gets our code part of the way. There is still another step for using certain new features
we need to take that is `polyfilling`.

What is the difference between compiling and polyfilling? 

When compiling Babel takes your code and run it through syntax transformation, in order to get browser compatible syntax. 
What its not doing, it is not adding any new method or objects you may need to the browser's global object or any JavaScript
primitives. 

When you compile a code you transform it, when you add a polyfill you adding new functionality to the browser. 

e.g. 

Babel can transform arrow functions into regular functions so they are compiled.

There is nothing Babel can do to transform Promises to native syntax browsers can understand, even more important compiling
would not add new properties to the global namespace. Promises need to be polyfilled.  

## Compiled

        Arrow function
        Async functions
        Classes
        Class properties
        Computed property names
        Constants
        Decorators
        Default parameters
        Destructing
        Modules
        Object rest/spread
        Property method assignment
        Property name shorthand
        Rest parameters
        Spread
        Template literals
        
## Polyfilled

        ArrayBuffer
        Array.from
        Array.of
        Array#findIndex
        Function#name
        Map
        Number.isNaN
        Object.assign
        Object.entries
        Object.values
        Promise
        Set
        String#includes
        Symbol
        WeakMap
        WeakSet
        
        
**video**: https://www.youtube.com/watch?v=BXoiuN1a0-E

:arrow_left: [Chapter 7 - Default Parameters in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/07)

:arrow_right: [Chapter 9 - Refactor](https://github.com/xgirma/reactor01/tree/master/09)
