# Shorthand Property and Method Names in JavaScript ES6 | ES2015
Objective is to make Object more concise. They are syntactical sugar, not necessary but it is nice.

## Shorthand Method Names

For example,

```javascript
const actions = {
  sayName: function () {
    alert(this.name)
  },
  takeStep: function () {
    this.step++
  }
}
```

Now we can write ^ code as,

```javascript
const actions = {
  sayName () {
    alert(this.name)
  },
  takeStep () {
    this.step++
  }
}
```

## Shorthand Property Names
This is an example where seeing the code will be easier than anything I can write.

```javascript
function getUser (username) {
  const email = getEmail(username)
  return {
    username: username,
    email: email,
    date: '01/01/2017'
  }
}
```

Notice how we're mirroring username and email? username: username, email: email? With concise objects, you can change that code to this

```javascript
function getUser (username) {
  const email = getEmail(username)
  return {
    username,
    email,
    date: '01/01/2017'
  }
}
```