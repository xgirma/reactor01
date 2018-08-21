# Computed Property Names in JavaScript | ES6 | ES2015

:arrow_left: [Chapter 3 - Shorthand Property and Method Names in JavaScript ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/03)

:arrow_right: [Chapter 5 - Template Literals (Template Strings) in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/05)

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

**video**: https://www.youtube.com/watch?v=R1Ms2_8BdKg

:arrow_left: [Chapter 3 - Shorthand Property and Method Names in JavaScript ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/03)

:arrow_right: [Chapter 5 - Template Literals (Template Strings) in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/05)