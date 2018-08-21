# Chapter 6 - Arrow Functions in JavaScript | ES6 | ES2015

:arrow_left: [Chapter 5 - Template Literals (Template Strings) in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/05)

:arrow_right: [Chapter 7 - Default Parameters in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/07)

    - less typing
    - this keyword
    
```javascript
// function declaration
function add (x,y){
    return x + y;
}
```

```javascript
// function expression
var add = function (x,y){
    return x/y;
};
```

```javascript
// function expression
var add = (x, y) => {
    return x * y;
};
```

Implicit return: with arrow function if we just have one line then we can leave off the return statement.

this
```javascript
function getTweets (uid) {
    return fetch('https://api.users.com/' + uid)
        .then(function (response){
            return response.json()
        })
        .then(function(response){
            return response.data;
        })
        .then(function(tweets){
            return tweets.filter(function(tweet){
                return tweet.starts > 50
            })
        })
        .then(function (tweets){
            return tweets.filter(function (tweets){
                return tweets.rts > 50
            })
        })
}
```
became
```javascript
function getTweets (uid) {
    return fetch('https://api.users.com/' + uid)
        .then((response) => response.json())
        .then((response) => response.data)
        .then((tweets) => tweets.filter((tweet) => tweet.starts > 50))
        .then((tweets) => tweets.filter((tweet) => tweet.rts > 50))
}
```

## this keyword
When you use arrow function you don't really need to worry about the `this` keyword, because it is not creating a new
context. Instead it is just going to use the same `this` keyword as its parent.

**video**: https://www.youtube.com/watch?v=dB1KA-yz65s

related videos: 

- [WTF is THIS: Understanding the "this" keyword in JavaScript](https://www.youtube.com/watch?v=zE9iro4r918)

:arrow_left: [Chapter 5 - Template Literals (Template Strings) in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/05)

:arrow_right: [Chapter 7 - Default Parameters in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/07)