# Refactoring app/utils/api.js
Destructuring, arrow function implicit return

**From:**
```javascript
function getStarCount (repos) {
    return repos.data.reduce(function (count, repo) {
        return count + repo.stargazers_count;
    }, 0)
}
```
**To:**
```diff
function getStarCount ({ data }) {
-    return repos.data.reduce(function (count, repo) {
-        return count + repo.stargazers_count;
-    }, 0)
+    return data.reduce((count, { stargazers_count }) =>  count + stargazers_count, 0)
}
```
## Polyfill
**From:**:
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
