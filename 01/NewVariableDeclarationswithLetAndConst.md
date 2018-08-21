# New Variable Declarations with let and const

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
