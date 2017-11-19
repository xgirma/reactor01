# Popular bar implementation

Use `className` instead of `class`. The reason for that we can not use `class` is because `class` in JavaScript is a 
reserved keyword. 

```javascript
const React = require('react');

class Popular extends React.Component {
    render() {
        return (
            <div className='container'>
                Popular !!!
            </div>
        );
    }
}

module.exports = Popular;
```
System fonts used by github, medium, instead of loading heavy fonts. 

```css
body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,OXygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
}
```

## Add state

To add a state, first add a constructor method. 

Setting a default state:

```javascript
const React = require('react');

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
    }
    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            <div className='container'>
                <ul className='languages'>
                    {languages.map(function(lang){
                        return (
                            <li key={lang}>
                                {lang}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

module.exports = Popular;
``` 

Update initial state when ever a language link is clicked. Create a `updateLanguage` function, whenever this function returns it 
will be a new state. 

```javascript
const React = require('react');

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
    }

    updateLanguage(lang) {
        this.setState( function() {
            return {
                selectedLanguage: lang
            }
        })
    }

    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            <div className='container'>
                <ul className='languages'>
                    {languages.map(function(lang){
                        return (
                            <li key={lang}>
                                {lang}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

module.exports = Popular;
```

Hookup the `updateLanguage` to a specific list ite, so whenever its clicked we know which specific item is clicked on
and update our `selectedLanguage`. 

Inside the `updateLanguage` there is the `this` keyword. We don't know what the `this` keyword bound to until the `updateLanguage`
function is invoked. The problem with that, if `updateLanguage` invoked in the wrong context, then the `this` keyword would be
different. As a result of that, `this.Setstate` is going to be `undefined`.

```javascript
const React = require('react');

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang) {
        this.setState( function() {
            return {
                selectedLanguage: lang
            }
        })
    }

    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            <div className='container'>
                <ul className='languages'>
                    {languages.map(function(lang){
                        return (
                            <li key={lang}>
                                {lang}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

module.exports = Popular;
```

`this.updateLanguage = this.updateLanguage.bind(this);` you need to really understand what this is and what the `this` 
keyword is doing. Let us walk through it: 

Again the problem is that, we don't know what the `this` keyword would be bound until `updateLanguage` is invoked. But
we know that with `bind` property. What the `bind` property would do is basically takes in a context. It is going to 
return a brand new function with `this` keyword inside of that function bound to whatever you pass in. 

So what we are doing is, hey `this.updateLanguage` we want to be a function whose `this` keyword is bound ALWAYS no matter what
to the `this` key word in the right ( i.e `this.updateLanguage.bind(this)`). Now, no matter in what context the `updateLanguage`
is going to be called in it is going to be called with the correct `this` keyword. 

Example how the this keyword change context:

```javascript
const React = require('react');

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang) {
        this.setState( function() {
            return {
                selectedLanguage: lang
            }
        })
    }

    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
        console.log('Up here: ', this); // component instance 

        return (
            <div className='container'>
                <ul className='languages'>
                    {languages.map(function(lang){
                        console.log('Down here: ', this); // new instance
                        return (
                            <li key={lang}>
                                {lang}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

module.exports = Popular;

/**
* Up here:  
  Popular {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
  context: {}
  props: {}
  refs: {}
  state: {selectedLanguage: "All"}
  updateLanguage: ƒ ()
  updater: {isMounted: ƒ, enqueueSetState: ƒ, enqueueReplaceState: ƒ, enqueueForceUpdate: ƒ}
  _reactInternalFiber: FiberNode {tag: 2, key: null, stateNode: Popular, return: FiberNode, type: ƒ, …}
  _reactInternalInstance: {_processChildContext: ƒ}
  isMounted: (...)
  replaceState: (...)
  __proto__: ReactComponent
*/
// Down here:  undefined
```
The `this` keyword in side `map` will be different, because it is a new function. Whenever you create a new function 
the `this` keyword inside of it is different. Whenever we create a new function we create a new context. 

The whole goal of `this.updateLanguage = this.updateLanguage.bind(this);` is to make it so that the `this` keyword 
inside of the `updateLanguage` is ALWAYS the component instance itself, which will have a `setState` property. 

Making the `this` keyword refer to the same instance/context. `map` allows us to pass a second argument is the specific
context the function you want to invoked in. 

```javascript
const React = require('react');

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang) {
        this.setState( function() {
            return {
                selectedLanguage: lang
            }
        })
    }

    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
        console.log('Up here: ', this); // component context 

        return (
            <div className='container'>
                <ul className='languages'>
                    {languages.map(function(lang){
                        console.log('Down here: ', this); // same component context 
                        return (
                            <li key={lang}>
                                {lang}
                            </li>
                        )
                    }, this)}
                </ul>
            </div>
        );
    }
}

module.exports = Popular;

// Up here:  Popular {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
// Down here:  Popular {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
// Down here:  Popular {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
// Down here:  Popular {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
// Down here:  Popular {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
// Down here:  Popular {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
// Down here:  Popular {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}
```

Adding the `onClick`:

```javascript
const React = require('react');

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang) {
        this.setState( function() {
            return {
                selectedLanguage: lang
            }
        })
    }

    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            <div className='container'>
                <ul className='languages'>
                    {languages.map(function(lang){
                        return (
                            <li onClick={this.updateLanguage}
                                key={lang}>
                                {lang}
                            </li>
                        )
                    }, this)}
                </ul>
            </div>
        );
    }
}

module.exports = Popular;
``` 

Whenever we click a language link we car calling `updateLanguage`. The problem, `updateLanguage` take a specific parameter 
`lang` that was clicked on and update the state. But we are not passing the specific language instead we are just 
invoking it. To fix we use `.bind`. The `.bind` allows us to 1. to set the *context* of a function and also pass along
arguments. 

```javascript
const React = require('react');

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang) {
        console.log('You clicked: ', lang);
        this.setState( function() {
            return {
                selectedLanguage: lang
            }
        })
    }

    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            <div className='container'>
                <p> Selected: {this.state.selectedLanguage} </p>
                <ul className='languages'>
                    {languages.map(function(lang){
                        return (
                            <li onClick={this.updateLanguage.bind(null, lang)}
                                key={lang}>
                                {lang}
                            </li>
                        )
                    }, this)}
                </ul>
            </div>
        );
    }
}

module.exports = Popular;

// click Java
// You clicked:  Java
```

Exploring `onClick={this.updateLanguage.bind(null, lang)}`. We want `onClick` to be a function when it is invoked is 
going to call `updateLanguage` passing it a specific language. So, we call `.bind` in this case the `this` keyword 
dose not matter. Because we already established that `updateLanguage` is going to be called in the correct context 
(i.e. `this.updateLanguage = this.updateLanguage.bind(this);`). So we can say pass `null` we are already bound. No need
to do it again. Now we pass the argument `lang`. 

ES6 arrow function

The `this` keyword inside the arrow function is the exact same of the outside of the function. The context of the 
arrow function inside is same as the context of the outside of the function.

```javascript
const React = require('react');

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        };
        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang) {
        console.log('You clicked: ', lang);
        this.setState( function() {
            return {
                selectedLanguage: lang
            }
        })
    }

    render() {
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            <div className='container'>
                <p>Selected: {this.state.selectedLanguage} </p>
                <ul className='languages'>
                    {languages.map((lang) => {
                        return (
                            <li style={lang === this.state.selectedLanguage? { color: '#d0021b'}: null}
                                onClick={this.updateLanguage.bind(null, lang)}
                                key={lang}>
                                {lang}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

module.exports = Popular;
// click JavaScript
// You clicked: JavaScript
```
 