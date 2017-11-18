# Default Parameters

Set default value for parameters, that are undefined when the function is invoked. 

ES5
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

ES5
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

ES6

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


