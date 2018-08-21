# Converting axios to fetch

:arrow_left: [Chapter 12 - Async Await in JavaScript (ES2017)](https://github.com/xgirma/reactor01/tree/master/12)

        Fetch - LS
        A modern replacement for XMLHttpRequest.
        
It is well supported by most major browsers, so we don't want to polyfill it. Let us delete `axios` from `package.json` we no longer need that. 

<img width="1319" alt="screen shot 2017-11-21 at 1 41 55 am" src="https://user-images.githubusercontent.com/5876481/33065301-4fa87208-ce5d-11e7-9cd2-e4974910e9ce.png">

And install `whatwg-fetch`. It is a polyfill with `fetch` that we can use it with browsers that don't support it, such as IE 11. 

        npm i whatwg-fetch
        
And we need to add, just like we do for `babel-polyfill`, `whatwg-fetch` as `entry` to our application inside `webpack.config.js` 


````javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

let config = {
    entry: ['babel-polyfill', 'whatwg-fetch', './app/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: "/"
    }, // more ...
}
````

Delete `axios` occurrences, e.g. from `api.js` We don't need to import `fetch` because it is  going to be on the `window` object. Because we did `entry: ['babel-polyfill', 'whatwg-fetch', './app/index.js'],` even in Chrome without using `entry: ['babel-polyfill', 'whatwg-fetch', './app/index.js'],` we will have `fetch` on the `window` object regardless. 

<img width="1433" alt="screen shot 2017-11-21 at 1 50 54 am" src="https://user-images.githubusercontent.com/5876481/33065803-77606854-ce5e-11e7-9f6d-a232301ed0f0.png">

Remember the way `axios` return data is a little bit different from `fetch` does. Replace `axios.get` with `fetch`. The
way `axios` returns data is a little bit different than what `fetch` does. So what we do here instead of returning 
`profile.data` we return a response after we made a JSON`response.json();`. 

**From:**
````javascript
async function getProfile(username) {
    const profile = await axios.get(`https://api.github.com/users/${username}${params}`);
    return profile.data;
}
```` 

**To:**
````diff
async function getProfile(username) {
-   const profile = await axios.get(`https://api.github.com/users/${username}${params}`);
+   const response = await fetch(`https://api.github.com/users/${username}${params}`);
    return response.json();
}
````

More example: we cant just return `fetch()` so let us create async function. 

**From:**
```javascript
function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
}
```

**To:**
```diff
- function getRepos(username) {
+ async function getRepos(username) {
-  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
+  const response = await fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`);
  return response.json();
}
```

`axios` wrap our response inside a `data` property, but `fetch` does not do that. 

From
```javascript
function getStarCount(repos) {
    return repos.data.reduce((count, {stargazers_count}) => count + stargazers_count, 0);
}
```

`repos` is not going to have `.data` so we need to remove that. 

To: 

```javascript
function getStarCount(repos) {
-  return repos.data.reduce((count, {stargazers_count}) => count + stargazers_count, 0);
+  return repos.reduce((count, {stargazers_count}) => count + stargazers_count, 0);
}
```

More example

From:
````javascript
export async function fetchPopularRepos(language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    const repos = await axios.get(encodedURI)
        .catch(handleError);

    return repos.data.items;
}
````
To: 
```javascript
export async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    
-   const repos = await axios.get(encodedURI)
-        .catch(handleError);

+   const response = await fetch(encodedURI)
+        .catch(handleError);

+   const repos = await response.json(); // don't forget await

-   return repos.data.items;

+   return repos.items;
}
```

:arrow_left: [Chapter 12 - Async Await in JavaScript (ES2017)](https://github.com/xgirma/reactor01/tree/master/12)