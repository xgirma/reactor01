# ES6 imports, exports, modules. and named imports

If you're reading this you're most likely familiar with the idea of modules. If not, a module is a section of self contained code that should be able to be added, removed, or edited from certain parts of your system without breaking other parts of your system. We've discovered that composing modules together is a great way to architect applications. However, up until ES6, there was no standardized way of doing this. Some patterns used to include [IIFEs](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression), CommonJS syntax (what you're used to with Node), AMD Modules, etc.

However, now with ES6 we have a standardized way of dealing with modules - as in, importing and exporting them from different files.

In this case code speaks much louder than writing, so let's look at a bunch of examples.

You can export more than one item (called named exports) from a function and when you import those items, you can specify which of those items being exported you would like to import (called named imports). You're not restricted to importing everything if you only care about a few properties.

```javascript
// math.js
export function add (x,y) {
  return x + y
}
export function multiply (x,y) {
  return x * y
}
export function divide (x,y) {
  return x / y
}
// main.js
import { add, multiply } from './math'
add(1,2) // 3
multiply(3,4) // 12
```

You can also use the import * as X syntax to import everything that is being exported from a specific module and save it to a specific variable.

```javascript
// math.js (same as above)
// main.js
import * as math from './math'
math.add(1,2) // 3
math.multiply(3,4) // 12
math.divide(4,4) // 1
```

You can also have modules that only export single values using default. *Note here we're not using named imports.

```javascript
// math.js
export default function doAllTheMath (x,y,z) {
  return x + y + x * x * y * z / x / y / z
}
// main.js
import doAllTheMath from './math'
doAllTheMath(1,2,3) // 4
```

You can even mix named exports with default exports

```javascript
// math.js
export function add (x,y) {
  return x + y
}
export default function doAllTheMath (x,y,z) {
  return x + y + x * x * y * z / x / y / z
}
// main.js
import doAllTheMath, { add } from './math'
doAllTheMath(1,2,3) // 4
add(1,2) // 3
```

##named imports:
 
Now, what if we combine the idea of imports with destructuring? We can do this with something called named imports, which look very similar. It's common to want to use just a few methods on a library, but instead of just being able to import one of two methods, you have to grab the whole thing.

```javascript
import ReactRouter from 'react-router';
const Route = ReactRouter.Route;
const Link = ReactRouter.Link;
const Router = ReactRouter.Router;
```

Now using named imports, the code above cleans up to look like this.

```javascript
import { Route, Link, Router } from 'react-router';
```

Much cleaner and one less variable since we actually don't care about the whole ReactRouter object, just specific methods it has on it.

What you've seen is just the tip of the iceberg for using destructuring but it's the most common pattern that you'll see and we'll use it consistently throughout this program.