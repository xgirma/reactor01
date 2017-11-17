# Object Destructuring

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