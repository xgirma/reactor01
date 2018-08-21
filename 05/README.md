# Chapter 5 - Template Literals (Template Strings) in JavaScript | ES6 | ES2015

:arrow_left: [Chapter 4 - Computed Property Names in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/04)

:arrow_right: [Chapter 6 - Arrow Functions in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/06)

String concatenation is hard. Take this code for example

```javascript
function makeGreeting (name, email, id) {
  return 'Hello, ' + name + '. We\'ve emailed you at ' + email '. Your user id is ' + id + '.'
}
``` 
Doing a balancing act between quotations and +'s isn't fun. Template Strings (also called Template Literals) fixes this problem.

```javascript
function makeGreeting (name, email, id) {
  return `Hello, ${name}. We've emailed you at ${email}. Your user id is ${id}.`
}
```

Much better. No more pluses or escaped characters. The two main things to notice are that the whole line is wrapped in back ticks (`) not quotations (') and each variable is wrapped in ${},

Another benefit of Template Strings is they support mutli-line strings

```javascript
var thing = `this is a multi
 line
 update and it is 
 valid.
`
```
**video**: https://www.youtube.com/watch?v=Re2FAmbNV8g

:arrow_left: [Chapter 4 - Computed Property Names in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/04)

:arrow_right: [Chapter 6 - Arrow Functions in JavaScript | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/06)