# Async Await in JavaScript (ES2017)

`babel-polyfill` includes support for async/await. 

webpack.config.js
````javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

let config = {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: "/"
    }, // more ...
}    
````
We are changing anything that deals with asynchronous request.

From
```javascript
class Popular extends React.Component {
    state = {
        selectedLanguage: 'All',
        repos: null,
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage = (lang) => {
        this.setState(() => ({
            selectedLanguage: lang,
            repos: null
        }));

        fetchPopularRepos(lang)
            .then((repos) => this.setState(() => ({ repos })));
    } // ...
}
```

We take our asynchronous code and make it looks like synchronous. 

```javascript
class Popular extends React.Component {
    state = {
        selectedLanguage: 'All',
        repos: null,
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage = async (lang) => { 
        this.setState(() => ({
            selectedLanguage: lang,
            repos: null
        }));

        const repos = await fetchPopularRepos(lang); 
        this.setState(() => ({ repos }));
    } // more ... 
}
```
more example: `Results.js`

From:
```javascript
componentDidMount() {
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);

    battle([
        playerOneName,
        playerTwoName
    ]).then((players) => {
        if (players === null) {
            return this.setState(() => ({
                error: 'Looks like there was an error. Check that both users exist on Github.',
                loading: false,
            }))
        }

        this.setState(() => ({
            error: null,
            winner: players[0],
            loser: players[1],
            loading: false,
        }));
    });
}
```

To
```javascript
async componentDidMount() {
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);

    const players = await battle([playerOneName, playerTwoName]);

    if (players === null) {
        return this.setState(() => ({
            error: 'Looks like there was an error. Check that both users exist on Github.',
            loading: false,
        }))
    }

    this.setState(() => ({
        error: null,
        winner: players[0],
        loser: players[1],
        loading: false,
    }));
}
```

more example: `api.js`

From:
```javascript
function getProfile(username) {
    return axios.get(`https://api.github.com/users/${username}${params}`)
        .then(({data}) => data);
}
```

To:
```javascript
async function getProfile(username) {
    const profile = await axios.get(`https://api.github.com/users/${username}${params}`);
    return profile.data;
}
```

From: 
```javascript
function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos]) => ({
        profile,
        score: calculateScore(profile, repos)
    }))
}
```

To:
```javascript
async function getUserData(player) {
    const [profile, repos] = await Promise.all([
        getProfile(player),
        getRepos(player)
    ]);

    return {
        profile,
        score: calculateScore(profile, repos)
    }
}
```
From:
```javascript
export function battle(players) {
    return Promise.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError);
}
```

To:
```javascript
export async function battle(players) {
    const results = await Promise.all(players.map(getUserData))
        .catch(handleError);

    return results === null
        ? results
        : sortPlayers(results)
}
```
