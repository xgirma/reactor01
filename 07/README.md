# Chapter 7 - Default Parameters in JavaScript | ES6 | ES2015

:arrow_left: [Chapter 6 - Arrow Functions in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/06)

:arrow_right: [Chapter 8 - Compiling vs Polyfills with Babel](https://github.com/xgirma/reactor01/tree/master/08)

Set default value for parameters, that are undefined when the function is invoked. 

**ES5**
```javascript
// required param is price only, the other two can be replaced by default if not provided
function calculatePayment(price, salseTax, discount){
    salseTax = salseTax || 0.047;
    discount = discount || 0;

    console.log('tax', salseTax);
    console.log('discount', discount);
}

calculatePayment(100, 0, 0);

// tax 0.047
// discount 0
``` 

Instead of checking for undefined we are just checking if it is `falsy`, so because `0` is  `falsy` we get `0.047` as a tax.

**ES5**
```javascript
// required param is price only, the other two can be replaced by default if not provided
function calculatePayment(price, salseTax, discount){
    salseTax = typeof salseTax === 'undefined' ? 0.047 : salseTax;
    discount = typeof discount === 'undefined' ? 0 : discount;

    console.log('tax', salseTax);
    console.log('discount', discount);
}

calculatePayment(100, 0, 0);

// tax 0
// discount 0
```

**ES6**

```javascript
// required param is price only, the other two can be replaced by default if not provided
function calculatePayment(price, salseTax = 0.047, discount = 0){
    console.log('tax', salseTax);
    console.log('discount', discount);
}

calculatePayment(100, 0, 0);

// tax 0
// discount 0
```

The only thing that is really required in this function is the `price` parameter. 

```javascript
function isRequired(name){
    throw new Error(name + ' is required');
}

// required param is price only, the other two can be replaced by default if not provided
function calculatePayment(price = isRequired('price'), salseTax = 0.047, discount = 0){
    console.log('tax', salseTax);
    console.log('discount', discount);
}

calculatePayment();

// Error: price is required
```

It's a fairly common pattern to want to set initial or default values to specific parameters if those arguments aren't specified when the function is invoked, for example, like the wait parameter below.

````javascript
function debounce (func, wait, immediate) {
  if (typeof wait === 'undefined') {
    wait = 1000
  }
  
  var timeout;
  
  return function () {
    var args = arguments;
    var later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args)
    };
    
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args)
  }
}
````

Here we have a typical debounce function. Don't worry about the actual implementation but I do want you to notice the `if (typeof wait === 'undefined')` line. We're saying if wait is undefined, set it's value to 1000. This works great, but now with Default Parameters we can do this logic between the parens where the parameters are.

````javascript
function debounce (func, wait = 1000, immediate) {
  var timeout;
  
  return function () {
    var args = arguments;
    var later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args)
    };
    
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args)
  }
}
````

Now it's going to function the exact same. If wait is undefined, then it will set it to 1000.

**video**: https://www.youtube.com/watch?v=aF3-ub5bkXQ

:arrow_left: [Chapter 6 - Arrow Functions in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/06)

:arrow_right: [Chapter 8 - Compiling vs Polyfills with Babel](https://github.com/xgirma/reactor01/tree/master/08)
