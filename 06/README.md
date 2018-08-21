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

## Arrow functions
In case we didn't have enough ways to write a function in JavaScript, we have one more! This one actually adds some value though.

Why were Arrow Functions added to the spec? They serve two main purposes: more concise syntax and sharing lexical "this" with the parent scope.

```javascript
var FriendsList = React.createClass({
  getInitialState () {
    return {
      friends: [
        {id: 0, name: 'Mikenzi'},
        {id: 1, name: 'Ryan'},
        {id: 2, name: 'Jake'},
      ]
    }
  },
  onAddFriend (friend) {
    this.setState({
      friends: this.state.friends.concat([friend])
    })
  }
  render () {
    return (
      <ul>
        {this.state.friends.map(function (friend) {
          return <FriendItem key={friend.id} handleAddFriend={this.onAddFriend}>{friend.name}</FriendItem>
        })}
      </ul>        
    )
  }
});
```

Above we have a typical React component. Can you spot the error? Inside of our this.state.friends.map invocation we're handing the FriendItem component this.onAddFriend. The problem here is that 'this', in this context, doesn't have an onAddFriend method. Because we've created another function, we're now in a different context. One way to fix this is to add .bind(this) to the end of the function in our map invocation. Another more elegant way though is to use an arrow function instead. The reason for this is because arrow functions don't create a new context, so the "this" keyword inside map will be the same as the "this" keyword outside of map, which solves our problem.

```javascript
render () {
    return (
      <ul>
        {this.state.friends.map((friend) => {
          return <FriendItem key={friend.id} handleAddFriend={this.onAddFriend}>{friend.name}></FriendItem>
        })}
      </ul>
    )
  }
```

Another benefit of using arrow functions is that, if you have everything on one line, the arrow function will implicitly return whatever is on that line. Here's what I mean by that. Our render method below has the same functionality as the one above, but no return statement.

```javascript
render () {
    return (
      <ul>
        {this.state.friends.map((friend) => <FriendItem key={friend.id} handleAddFriend={this.onAddFriend}>{friend.name}</FriendItem>)}
      </ul>
    )
  }
```

**video**: https://www.youtube.com/watch?v=dB1KA-yz65s

related video: [WTF is THIS: Understanding the "this" keyword in JavaScript](https://www.youtube.com/watch?v=zE9iro4r918)

:arrow_left: [Chapter 5 - Template Literals (Template Strings) in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/05)

:arrow_right: [Chapter 7 - Default Parameters in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/07)