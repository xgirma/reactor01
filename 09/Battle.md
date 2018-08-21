# Refactoring app/components/Battle.js
You have to be careful with refactoring `setState`, especially when you are using `event`.

**From:** :warning: :warning: :warning:
````javascript
handleChange(event){
    let value = event.target.value;

    this.setState(function () {
        return {
            username: value
        }
    })
}
````

**To:** :skull: :skull: :skull: 
```diff
- handleChange(event){
+ handleChange({ target }){
-    let value = event.target.value;
+    let value = target.value;

    this.setState(function () {
        return {
            username: value
        }
    })
}
```

**To:** works :v: :v: :v:
```diff
handleChange(event){
-    let value = event.target.value;

-    this.setState(function () {
-        return {
-            username: value
-        }
-    })
+    this.setState(() => ({ username: event.target.value }))
}
```
One thing you have to be careful with React, you can not really do the below to `events` in React specifically. 
What is going to happen here, by the time the callback `() => ({ username: event.target.value })` function runs, this event
will be long gone. Whenever you need to pass event to a `setState` you need to make sure to capture the `event` in a variable. 

Same thing below

**From:**
```javascript
handleSubmit(event){
    event.preventDefault();

    this.props.onSubmit(
        this.props.id,
        this.state.username
    )
}
```
**To:** :skull: :skull: :skull:
```javascript
-  handleSubmit(event){
+  handleSubmit({ preventDefault }){
        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }
```
Destructuring `preventDefault` is not going to work, I do not know why. 