# Refactoring

## API 
From:
```javascript
function getUserData (player) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(function (data) {
        let profile = data[0];
        let repos = data[1];

        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    })
}
```

We can just use native `Promise.all()`. but Promises are `transpiled`. So we need to include Promise with Babel polyfill. 
If we want to be able to support older browsers. 

            npm install babel-polyfill
            
And make sure the polyfill is included in all of our code, using `webpack.config.js` entry point the first item is going 
to be `babel-polyfill`. Because native Promise do not come with `babel-loader`.

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

let config = {
    entry: ['babel-polyfill', './app/index.js'], // ***
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    }, // more ...
};
```

```javascript
function getUserData (player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([ profile, repos ]) => ({
        profile,
        score: calculateScore(profile, repos)
    }))
}
```

## Battle.js
From 
```javascript

```
To 
```javascript
handleChange(event){
    const value = event.target.value;

    this.setState(() => ({ username: value }))
}
```
One thing you have to be careful with React, you can not really do the below to `events` in React specifically. 

```javascript
handleChange(event){
    this.setState(() => ({ username: event.target.value })) // wrong
}
```
What is going to happen here, by the time the callback `() => ({ username: event.target.value })` function runs, this event
will be long gone. Whenever you need to pass event to a `setState` you need to make sure to capture the `event` in a variable. 

More example: 
From;
```javascript
handleSubmit(event){
    event.preventDefault();

    this.props.onSubmit(
        this.props.id,
        this.state.username
    )
}
```
To:
```javascript
    handleSubmit(preventDefault){ // wrong
        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }
```
Destructuring `preventDefault` is not going to work, I do not know why. 

I like to get all my props at the top inside render.

From: 
```javascript
render() {
    return (
        <form className='column' onSubmit={this.handleSubmit}>
            <label className='header' htmlFor='username'>{this.props.label}</label>
            <input
                id='username'
                placeholder='github username'
                type='text'
                autoComplete='off'
                value={this.state.username} // binding the value of input field with our state
                onChange={this.handleChange}
            />
            <button
                className='button'
                type='submit'
                disabled={!this.state.username}
            >Submit</button>
        </form>
    )
}
``` 
To:
```javascript
render() {
    const { username } = this.state;
    const { label } = this.props;
    
    return (
        <form className='column' onSubmit={this.handleSubmit}>
            <label className='header' htmlFor='username'>{label}</label>
            <input
                id='username'
                placeholder='github username'
                type='text'
                autoComplete='off'
                value={username} // binding the value of input field with our state
                onChange={this.handleChange}
            />
            <button
                className='button'
                type='submit'
                disabled={!username}
            >Submit</button>
        </form>
    )
}
```

From:
```javascript
handleSubmit(id, username) {
        this.setState(function(){
            let newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'http://github.com/' + username + '.png?size=200';
            return newState; // merge the new state
        });
    }
```

To:
```javascript
handleSubmit(id, username) {
    this.setState(() => ({
        [id + 'Name'] : username,
        [id + 'Image'] : `http://github.com/'${username}.png?size=200`
    }))
}
```

From: 
```javascript
render() {
    let match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;

    return (
        <div>
            <div className='row'>
                {!playerOneName &&
                <PlayerInput
                    id='playerOne'
                    label='Player One'
                    onSubmit={this.handleSubmit}
                />}

                {playerOneImage !== null &&
                <PlayerPreview
                    avatar={playerOneImage}
                    username={playerOneName}
                >
                    <button
                        className='reset'
                        onClick={this.handleReset.bind(this, 'playerOne')}>
                        Reset
                    </button>

                </PlayerPreview>
                }

                {!playerTwoName &&
                <PlayerInput
                    id='playerTwo'
                    label='Player Two'
                    onSubmit={this.handleSubmit}
                />}

                {playerTwoImage !== null &&
                <PlayerPreview
                    avatar={playerTwoImage}
                    username={playerTwoName}
                >
                    <button
                        className='reset'
                        onClick={this.handleReset.bind(this, 'playerTwo')}>
                        Reset
                    </button>
                </PlayerPreview>
                }
            </div>

            {playerOneImage && playerTwoImage &&
            <Link
                className='button'
                to={{
                    pathname: match.url + '/results',
                    search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                }}> Battle
            </Link>
            }
        </div>
    )
}
```

To
```javascript
render() {
    const { match } = this.props; // ***
    const {playerOneName, playerTwoName, playerOneImage, playerTwoImage} = this.state; // ***

    return (
        <div>
            <div className='row'>
                {!playerOneName &&
                <PlayerInput
                    id='playerOne'
                    label='Player One'
                    onSubmit={this.handleSubmit}
                />}

                {playerOneImage !== null &&
                <PlayerPreview
                    avatar={playerOneImage}
                    username={playerOneName}
                >
                    <button
                        className='reset'
                        onClick={ () => this.handleReset('playerOne')}> // ***
                        Reset
                    </button>

                </PlayerPreview>
                }

                {!playerTwoName &&
                <PlayerInput
                    id='playerTwo'
                    label='Player Two'
                    onSubmit={this.handleSubmit}
                />}

                {playerTwoImage !== null &&
                <PlayerPreview
                    avatar={playerTwoImage}
                    username={playerTwoName}
                >
                    <button
                        className='reset'
                        onClick={() => this.handleReset('playerTwo')}> // ***
                        Reset
                    </button>
                </PlayerPreview>
                }
            </div>

            {playerOneImage && playerTwoImage &&
            <Link
                className='button'
                to={{
                    pathname: match.url + '/results',
                    search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}` 
                }}> Battle
            </Link>
            }
        </div>
    )
}
```
## Loading.js
From:
```javascript
componentDidMount() {
        let stopper = this.props.text + '...';
        this.interval = window.setInterval(function() {
            if(this.state.text === stopper){
                this.setState(function () {
                    return {
                        text: this.props.text
                    }
                })
            } else {
                this.setState(function(previousState) {
                    return {
                        text: previousState.text + '.'
                    }
                })
            }
        }.bind(this), this.props.speed)
    }
```
To:
```javascript

```