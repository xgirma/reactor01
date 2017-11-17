# Computed Property Names in JavaScript | ES6 | ES2015

It allows you to have expression computed as a property name on an object.

```javascript
function objectify(key, value){
    let obj = {};
    obj[key] = value;
    return obj;
}
``` 
with computed property name 

```javascript
function objectify(key, value){
    return {
        [key]: value
    }
}
```