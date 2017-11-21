# Class Properties (Class Fields) in JavaScript

    [add class properties transform from babel](https://babeljs.io/docs/plugins/transform-class-properties/)
    
```javascript
  class Bork {
    //Property initializer syntax
    instanceProperty = "bork";
    boundFunction = () => {
      return this.instanceProperty;
    }

    //Static class properties
    static staticProperty = "babelIsCool";
    static staticFunction = function() {
      return Bork.staticProperty;
    }
  }

  let myBork = new Bork;

  //Property initializers are not on the prototype.
  console.log(myBork.__proto__.boundFunction); // > undefined

  //Bound functions are bound to the class instance.
  console.log(myBork.boundFunction.call(undefined)); // > "bork"

  //Static function exists on the class.
  console.log(Bork.staticFunction()); // > "babelIsCool"
``` 

What it is going to allow us to add `specifc properties` to our components, to not only make it easier to manage state in our app, 
we can also forget about `.bind` specifically to make sure that methods are being called in correct context. 

This is currently a stage 2 proposal. Create-react-app uses it. 

        npm install --save-dev babel-plugin-transform-class-properties
        
And it to `package.josn` 

```json
{
  "name": "reactor01",
  "version": "1.0.0",
  "description": "Tyler's React Fundamentals Video Project with Modern JavaScript",
  "main": "index.js",
  "scripts": {
    "create": "webpack",
    "start": "webpack-dev-server --open",
    "build": "NODE_ENV='production' webpack -p",
    "firebase-init": "firebase login && firebase init",
    "deploy": "npm run build && firebase deploy"
  },
  "babel": {
    "presets": [
      "env",
      "react"
    ],
    "plugins": [
      "transform-class-properties"
    ]
  },
  "//": "more ..."
}
```

We will refactor any component that have `state`, or that has `prop` types or `default props`. 

From:
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
 

To:
````javascript
class PlayerInput extends React.Component {
    state = {
        username: ''
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
    }

    static defaultProps = {
        label: 'Username',
    }

    handleChange = (event) => {
        const value = event.target.value;

        this.setState(() => ({ username: value }))
    }
    handleSubmit = (event) => {
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
````

More example

From: 
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
To:
```javascript
class Loading extends React.Component {
    state = {
        text: this.props.text // :triumph:
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired,
    };

    static defaultProps = {
        text: 'Loading',
        speed: 300
    };

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
```

What is intersting about `class-properties` you can see everything inside the component/class. 
