# Template Strings

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