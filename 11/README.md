# Class Properties (Class Fields) in JavaScript

:arrow_left: [Chapter 10 - import and export with JavaScript Modules | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/10)

:arrow_right: [Chapter 12 - Async Await in JavaScript (ES2017)](https://github.com/xgirma/reactor01/tree/master/12)

   >[add class properties transform from babel](https://babeljs.io/docs/plugins/transform-class-properties/) using babel-plugin-transform-class-properties

What it is going to allow us to add `specifc properties` to our components, to not only make it easier to manage state in our app, 
we can also forget about `.bind` specifically to make sure that methods are being called in correct context. 

This is currently a stage 2 proposal. Create-react-app uses it. 

        npm install --save-dev babel-plugin-transform-class-properties
        
And it to `package.josn` 

```json
{
  "name": "reactor01",
  "version": "1.0.0",
  "//": "more ...",
  "babel": {
    "presets": [
      "env",
      "react"
    ],
    "plugins": [
      "transform-class-properties"
    ]
  }
}
```

We will refactor any component that have `state`, or that has `prop` types or `default props`. 

**From:**
```javascript
class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        const value = event.target.value;

        this.setState(() => ({ username: value }))
    }
    
    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        );
    }
    
    render() {
        const { username } = this.state
        const { label } = this.props

        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>{label}</label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    value={username}
                    autoComplete='off'
                    onChange={this.handleChange}
                />
                <button
                    className='button'
                    type='submit'
                    disabled={!username}>
                    Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

PlayerInput.defaultProps = {
    label: 'Username',
}
```
You noticed we are doing few things here, one we have this ` constructor` so that we can specify the inital state of our 
application. Also we have two `bind`s, `this` to the two methods `handleChange` and `handleSubmit`. 

With this new class syntax what happens here we can change our state by adding it directly to the class itself. and add the 
two class-methods as properties of the class using arrow function. 

Now because we are using arrow function and we do not create a new context, we don't need to use `bind`. 

We also have `propTypes` and `defaultProps`, we can add them as `static` properties of our component. Because they will
never change they will be static. 
 

**To:**
````diff
class PlayerInput extends React.Component {
-    constructor(props) {
-        super(props);
-        this.state = {
-            username: ''
-        };
-
-        this.handleChange = this.handleChange.bind(this);
-        this.handleSubmit = this.handleSubmit.bind(this);
-    }
 
+    state = {
+        username: ''
+    }

+    static propTypes = {
+        id: PropTypes.string.isRequired,
+        label: PropTypes.string.isRequired,
+        onSubmit: PropTypes.func.isRequired,
+    }

+    static defaultProps = {
+        label: 'Username',
+    }

-   handleChange(event) {
+   handleChange = (event) => {
        const value = event.target.value;

        this.setState(() => ({ username: value }))
    }
    
-   handleSubmit(event) {
+   handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        );
    }
    
    render() {
        const { username } = this.state
        const { label } = this.props

        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>{label}</label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    value={username}
                    autoComplete='off'
                    onChange={this.handleChange}
                />
                <button
                    className='button'
                    type='submit'
                    disabled={!username}>
                    Submit
                </button>
            </form>
        )
    }
}

- PlayerInput.propTypes = {
-    id: PropTypes.string.isRequired,
-    label: PropTypes.string.isRequired,
-    onSubmit: PropTypes.func.isRequired,
- }

- PlayerInput.defaultProps = {
-    label: 'Username',
- }
````

More example

**From:** 
```javascript
class Loading extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.text
        };
    }
    
    componentDidMount() {
        const { text, speed } = this.props
        const stopper = text + '...';

        this.interval = window.setInterval(() => {
            this.state.text === stopper
                ? this.setState(() => ({ text: this.props.text }))
                : this.setState((prevState) => ({ text: prevState.text + '.' }))
        }, speed)
    }
    componentWillUnmount() {
        window.clearInterval(this.interval);
    }
    
    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
};

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
};
```
Notice here, we are not getting passed a `props` argument but we can still just do `this.props.text`

**To:**
```diff
class Loading extends React.Component {
-   constructor(props) {
-       super(props);
-  
-       this.state = {
-           text: props.text
-       };
-   }
      
+   state = {
+       text: this.props.text
+   }

+   static propTypes = {
+       text: PropTypes.string.isRequired,
+       speed: PropTypes.number.isRequired,
+   };

+   static defaultProps = {
+       text: 'Loading',
+       speed: 300
+   };

    componentDidMount() {
        const { text, speed } = this.props
        const stopper = text + '...';

        this.interval = window.setInterval(() => {
            this.state.text === stopper
                ? this.setState(() => ({ text: this.props.text }))
                : this.setState((prevState) => ({ text: prevState.text + '.' }))
        }, speed)
    }
    
    componentWillUnmount() {
        window.clearInterval(this.interval);
    }
    
    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        )
    }
}

- Loading.propTypes = {
-   text: PropTypes.string.isRequired,
-    speed: PropTypes.number.isRequired,
- };

- Loading.defaultProps = {
-   text: 'Loading',
-   speed: 300
- };
```

What is interesting about `class-properties` you can see everything inside the component/class. 

:arrow_left: [Chapter 10 - import and export with JavaScript Modules | ES6 | ES2015](https://github.com/xgirma/reactor01/tree/master/10)

:arrow_right: [Chapter 12 - Async Await in JavaScript (ES2017)](https://github.com/xgirma/reactor01/tree/master/12)
