# Arrow Function

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