# Object and Array Destructuring in JavaScript. ES6 | ES2015

:arrow_left: [Chapter 1 - var vs let vs const: variable declarations in ES6](https://github.com/xgirma/reactor01/tree/master/01)

:arrow_right: [Chapter 3 - Shorthand Property and Method Names in JavaScript ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/03)

## Object

To add a new property you use dot notation, you can only add one property at a time. 

```javascript
var user = {};

// adding one at a time
user.name = "Tayler";
user.handle = "@tyler";
user.location = "Seattle, WA";
```
The same syntax can be used to extract data again one at a a time.
````javascript
var user = {};

user.name = "Tayler";
user.handle = "@tyler";
user.location = "Seattle, WA";

// extracting one at a time.
var name = user.name;
var handle = user.handle;
var location = user.location;
```` 
Add multiple properties at the same time. 
````javascript
// add multiple properties at the same time.
var user = {
    name: "Tayler",
    handle: "@tyler",
    location: "Seattle, WA"
};
````

> Unfortunately there is no comparable way to extract properties at the same time :frowning: Until `destructing` is 
introduced in 2015. 

    Destructuring allowes us to extract multiple properties from an object.
    
Destructuring reduces the amount of code we need to write to extract properties from an object. 

```javascript
// extract multiple properties at the same time.
var user = {
    name: "Tayler",
    handle: "@tyler",
    location: "Seattle, WA"
};

var { name, handle, location } = user;
``` 

if you want to add property to an object do it on the right hand side of the `=` sign and if you want extract a property from 
an object do it on the left hand side of the `=` sign.  

A nice feature of destructuring is you can also destruct a function invocation. 

```javascript
// destructing function invocation
function getUser() {
    return {
        name: "Tayler",
        handle: "@tyler",
        location: "Seattle, WA"
    };
}

var {name, handle, location} = getUser();
```

Object destructuring helps fix poorly named object property names. 

```javascript
// fix bad property names
var user = {
    n: "Tayler",
    h: "@tyler",
    l: "Seattle, WA"
};

var {n: name, h: handle, l: location } = user;

console.log(name);
console.log(handle);
console.log(location);

// Tayler
// @tyler
// Seattle, WA
```

## Array

Not as common as object destructuring. Array destructing is useful in certain circumstances. Specifically when the location of
an item in the array is the main differentiators of that item. 

```javascript
var user = ['Tyler', '@tyler', 'Seattle, WA'];
```

You notice this should be an object, but sometimes you have to take what you get from external APIs.

Typically we need to create a variable for each item 

```javascript
var user = ['Tyler', '@tyler', 'Seattle, WA'];

var name = user[0];
var handle = user[1];
var location = user[2];
```

Array destructing helpw

```javascript
var user = ['Tyler', '@tyler', 'Seattle, WA'];

var [ name, handle, location ] = user;
```

Array destructing with function invocation. 

```javascript
var csv = "1997,Ford,F350,Must Sell";
var [ year, make, model, description ] = csv.split(',');
```

## Function arguments and parameters
When we invoke a function with multiple arguments we have two problems 

        1. we need to remember the order of the arguments or lookup
        2. we need to read the documentation and understand what to do with the arguments we do not care about
        
```javascript
function fetchRepos(language, minStars, maxStars, createdBefore, createdAfter){
    //
}

fetchRepos('JavaScript', 100, null, new Date('01/01/2019').getTime(), null);
```

Destructuring helps us to deal with both of these problems. 

First let us solve the positional parameter problem.

> instead of passing argument one by one, what if we pass an `object` instead. 

```javascript
function fetchRepos(language, minStars, maxStars, createdBefore, createdAfter){
    //
}

fetchRepos({
    language: 'JavaScript',
    minStars: 100,
    maxStars: null,
    createdBefore: new Date('01/01/2019').getTime(),
    createdAfter: null
});
```
Now before we ever need to look at the function definition of the `fetchRepos` function we know exactly what information 
it needs, and mor important order no longer matters. 

Now we need to modify the function definition of the `fetchRepos` function. 

```javascript
function fetchRepos({language, minStars, maxStars, createdBefore, createdAfter}){
    // we remove the order out of the equation
}

fetchRepos({
    language: 'JavaScript',
    minStars: 100,
    maxStars: null,
    createdBefore: new Date('01/01/2019').getTime(),
    createdAfter: null
});
```

What about the parameters, we do not care about? passing `null`? We are passing an object so we can remove the `null` 
value parameters.

```javascript
function fetchRepos({language, minStars, maxStars, createdBefore, createdAfter}){}

fetchRepos({
 language: 'JavaScript',
 minStars: 100,
 createdBefore: new Date('01/01/2019').getTime()
});
```

This leads us to `default values` for any properties that are not on the argument object when the function invoked. 
Typically that looks like this before ES2015 :grin:

```javascript
function fetchRepos({language, minStars, maxStars, createdBefore, createdAfter}){
   language = language || 'All';
   minStars = minStars || 0;
   maxStars = maxStars || 0;
   createdAfter = createdAfter || '';
   createdBefore = createdBefore || '';
}

fetchRepos({
    language: 'JavaScript',
    minStars: 100,
    maxStars: null,
    createdBefore: new Date('01/01/2019').getTime(),
    createdAfter: null
});
```

Destructuring allows you to set `default` values. :+1:

```javascript
function fetchRepos({language='All', minStars=0, maxStars=0, createdBefore='', createdAfter=''}){}

fetchRepos({
    language: 'JavaScript',
    minStars: 100,
    maxStars: null,
    createdBefore: new Date('01/01/2019').getTime(),
    createdAfter: null
});
```
We have seen object destructuring to destruct function parameters. Can the same be done for Arrays, yes. 

## Array destructuring inside function parameter
Same thing can be done with array destructing. 

```javascript
function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(function(data){
        var profile = data[0];
        var repos = data[1];

        return {
            profile: profile,
            repos: repos
        }
    })
}
```
First update: destruct our `data` array

```javascript
function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(function(data){
        var [profile, repos ] = data;

        return {
            profile: profile,
            repos: repos
        }
    })
}
```

Second update: move that destructuring to the parameter itself

```javascript
function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(function([ profile, repos ]){
        return {
            profile: profile,
            repos: repos
        }
    })
}
```

Final update: Arrow function

````javascript
function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([ profile, repos ]) => ({ profile, repos}))
}
````

## Object destructuring

Destructuring gives us a convenient way to extract values from data stored in objects and arrays.

Let's say we had a Stateless Functional Component that looked like this,

```javascript
function register (props) {
  return (
    <div>
      <span>Email:</span>
      <input type='text' onChange={props.onChangeEmail} value={props.email} />
      <span>Password:</span>
      <input type='text' onChange={props.onChangePassword} value={props.password} />
      <button onClick={props.submit}>Submit</button>
    </div>
  )
}
```

You'll notice that props is an object, and by just looking at it, we're not really sure what's on it. One really nice way to write functions is to have them be as obvious as possible. Meaning, when I look at my register function, I want to know exactly what values it needs in order to work properly. Let's pretend that PropTypes didn't exist, one way to solve this problem would be

```javascript
function register (props) {
  var onChangeEmail = props.onChangeEmail;
  var email = props.email;
  var onChangePassword = props.onChangePassword;
  var password = props.password;
  var submit = props.submit;
  return (
    <div>
      <span>Email:</span>
      <input type='text' onChange={onChangeEmail} value={email} />
      <span>Password:</span>
      <input type='text' onChange={onChangePassword} value={password} />
      <button onClick={submit}>Submit</button>
    </div>
  )
}
```

That's better, but now our function is ugly "AF".

As mentioned above, destructuring allows you to extract values (or methods) from data stored in objects and arrays.

We can use destructuring to solve our ugliness problem.

```javascript
function register (props) {
  var { onChangeEmail, email, onChangePassword, password, submit }  = props;
  return (
    <div>
      <span>Email:</span>
      <input type='text' onChange={onChangeEmail} value={email} />
      <span>Password:</span>
      <input type='text' onChange={onChangePassword} value={password} />
      <button onClick={submit}>Submit</button>
    </div>
  )
}
```
Much better. As you can see, we're basically plucking those properties off of that object and setting them to local variables with the same name as the specific property on the object. 

:arrow_left: [Chapter 1 - var vs let vs const: variable declarations in ES6](https://github.com/xgirma/reactor01/tree/master/01)

:arrow_right: [Chapter 3 - Shorthand Property and Method Names in JavaScript ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/03)