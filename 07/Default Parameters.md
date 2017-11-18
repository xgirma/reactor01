# Default Parameters

It's a fairly common pattern to want to set initial or default values to specific parameters if those arguments aren't specified when the function is invoked, for example, like the wait parameter below.

````javascript
function debounce (func, wait, immediate) {
  if (typeof wait === 'undefined') {
    wait = 1000
  }
  var timeout
  return function () {
    var args = arguments
    var later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}
````

Here we have a typical debounce function. Don't worry about the actual implementation but I do want you to notice the `if (typeof wait === 'undefined')` line. We're saying if wait is undefined, set it's value to 1000. This works great, but now with Default Parameters we can do this logic between the parens where the parameters are.

````javascript
function debounce (func, wait = 1000, immediate) {
  var timeout
  return function () {
    var args = arguments
    var later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}
````

Now it's going to function the exact same. If wait is undefined, then it will set it to 1000.