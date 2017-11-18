# Arrow Functions in JavaScript | ES6 | ES2015
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