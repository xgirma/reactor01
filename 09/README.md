# Chapter 9 - Refactoring 

    01. String template
    02. Arrow function: implicit return
    03. Destructuring object
    04. Destructing array
    05. Shorthand notation
    06. Remove keyword function
    07. Grab props and states top of render method
    08. Computed property name
    09. Use arrow function instead of bind
    10. Change if/else statement into a ternary
    11. Destruct props of functional componnts
    12. Var used only once
    
## String template 
**From:**
```javascript
function getProfile (username) {
    return axios.get('https://api.github.com/users/' + username)
        .then(function (user) {
            return user.data;
        })
}
```
**To:**
````diff
function getProfile (username) {
-    return axios.get('https://api.github.com/users/' + username)
+    return axios.get(`https://api.github.com/users/${username}`)
        .then(function (user) {
            return user.data;
        })
}
````

## Arrow function implicit return
**From:**
```javascript
function getProfile (username) {
    return axios.get(`https://api.github.com/users/${username}`)
        .then(function (user) {
            return user.data;
        })
}
```
**To:**
```diff
function getProfile (username) {
    return axios.get(`https://api.github.com/users/${username}`)
-        .then(function (user) {
-          return user.data;
-        })
+        .then((user) =>  user.data)
}
```

## Destructuring Object
**From:**
```javascript
function getProfile (username) {
    return axios.get(`https://api.github.com/users/${username}`)
        .then(function (user) {
          return user.data;
       })
}
```
**To:**
```diff
function getProfile (username) {
    return axios.get(`https://api.github.com/users/${username}`)
-        .then(function (user) {
-          return user.data;
-        })
+        .then(({data}) =>  data)
}
```

## Destructing array
**From:**
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
**To:**
```diff
function getUserData (player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
-     ]).then(function (data) {
-       let profile = data[0];
-       let repos = data[1];
+    ]).then(([profile, repos]) => ({
            profile: profile,
            score: calculateScore(profile, repos)
    }))
}
```

## Shorthand Notation
**From:**
```javascript
function getUserData (player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos]) => ({ // ***
            profile: profile,
            score: calculateScore(profile, repos)
    }))
}
```
**To:**
```diff
function getUserData (player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos]) => ({
-           profile: profile,
+           profile,
            score: calculateScore(profile, repos)
    }))
}
```

## Remove keyword function (shorthand method name)
**From:**
```javascript
module.exports = {
    battle: function (players) {
        return Promise.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },
};
```
**To:**
````diff
module.exports = {
-   battle: function (players) {
+   battle (players) {
        return Promise.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },
};
````

## Grab props and states top of render method
**From:**
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
**To:**
```diff
render() {
+    const { username } = this.state;
+    const { label } = this.props;

    return (
        <form className='column' onSubmit={this.handleSubmit}>
-            <label className='header' htmlFor='username'>{this.props.label}</label>
+            <label className='header' htmlFor='username'>{label}</label>
            <input
                id='username'
                placeholder='github username'
                type='text'
                autoComplete='off'
-               value={this.state.username}
+               value={username} // binding the value of input field with our state
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
# Computed property name
**From:**
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
**To:**
```diff
handleSubmit(id, username) {
        this.setState(() => ({
-            let newState = {};
-            newState[id + 'Name'] = username;
-            newState[id + 'Image'] = 'http://github.com/' + username + '.png?size=200';
+            [id + 'Name'] : username,
+            [id + 'Image'] : `http://github.com/${username}.png?size=200`
        }))
    }
```

## Use arrow function instead of bind
**From:**
```javascript
render() {
    let { match } = this.props;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;

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
            </div>
        </div>
    )
}
```
**To:** 
```diff
render() {
    let { match } = this.props;
    const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;

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
-                       onClick={this.handleReset.bind(this, 'playerOne')}>
+                       onClick={() => this.handleReset('playerOne')}>
                        Reset
                    </button>

                </PlayerPreview>
                }
            </div>
        </div>
    )
}
```

# Change if/else statement into a ternary
**From:** 
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
**To:**
```diff
componentDidMount() {
    const { text, speed } = this.props;
    const stopper = text + '...';

    this.interval = window.setInterval(() => {
-      if(this.state.text === stopper){
-                  this.setState(function () {
-                      return {
-                          text: this.props.text
-                      }
-                  })
-              } else {
-                  this.setState(function(previousState) {
-                      return {
-                          text: previousState.text + '.'
-                      }
-                  })
-              }
+        this.state.text === stopper
+            ? this.setState(() => ({ text }))
+            : this.setState((previousState) => ({ text: previousState.text + '.' }))
    }, speed)
}
```
# Destruct props of functional component
**From:**
```javascript
function SelectLanguage (props) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <div>
            <ul className='languages'>
                {languages.map((lang) => {
                    return (
                        <li
                            style={lang === props.selectedLanguage? { color: '#d0021b'}: null}
                            key={lang}
                            onClick={props.onSelect.bind(null, lang)}>
                            {lang}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
```
**To:**
```diff
- function SelectLanguage (props) {
+ function SelectLanguage ({ selectedLanguage, onSelect}) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <div>
            <ul className='languages'>
                {languages.map((lang) => {
                    return (
                        <li
-                           style={lang === props.selectedLanguage? { color: '#d0021b'}: null}
+                           style={lang === selectedLanguage? { color: '#d0021b'}: null}
                            key={lang}
-                           onClick={props.onSelect.bind(null, lang)}>
+                           onClick={() => onSelect(lang)}>
                            {lang}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
```

## Var used only once
**From:**
```javascript
function calculateScore (profile, repos) {
    let followers = profile.followers;
    let totalStars = getStarCount(repos);

    return (followers * 3) + totalStars;
}
```
**To:**
```diff
- function calculateScore (profile, repos) {
-    let followers = profile.followers;
-    let totalStars = getStarCount(repos);
+ function calculateScore ({ followers }, repos) {
-    return (followers * 3) + totalStars;
+    return (followers * 3) + getStarCount(repos);
}
```