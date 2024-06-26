# Chapter 12 - Async Await in JavaScript (ES2017)

:arrow_left: [Chapter 11 - Class Properties (Class Fields) in JavaScript](https://github.com/xgirma/reactor01/tree/master/11)

:arrow_right: [Chapter 13 - API request with fetch](https://github.com/xgirma/reactor01/tree/master/13)

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
    },
}    
````
We are changing anything that deals with asynchronous request.

**From:**
```javascript
class Popular extends React.Component {
    state = {
        selectedLanguage: 'All',
        repos: null,
    };

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
    }
}
```

We take our asynchronous code and make it looks like synchronous. 

**To:**
```diff
class Popular extends React.Component {
    state = {
        selectedLanguage: 'All',
        repos: null,
    };

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage = async (lang) => { 
        this.setState(() => ({
            selectedLanguage: lang,
            repos: null
        }));

-        fetchPopularRepos(lang)
-            .then((repos) => this.setState(() => ({ repos })));
        
+        const repos = await fetchPopularRepos(lang); 
+        this.setState(() => ({ repos }));
    } 
}
```
Results.js

**From:**
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

**To:**
```diff
async componentDidMount() {
    const { playerOneName, playerTwoName } = queryString.parse(this.props.location.search);
    
-   battle([
-       playerOneName,
-       playerTwoName
-   ]).then((players) => {
-       if (players === null) {
-           return this.setState(() => ({
-               error: 'Looks like there was an error. Check that both users exist on Github.',
-               loading: false,
-           }))
-       }

-       this.setState(() => ({
-           error: null,
-           winner: players[0],
-           loser: players[1],
-           loading: false,
-       }));
-   });

+   const players = await battle([playerOneName, playerTwoName]);
+
+   if (players === null) {
+       return this.setState(() => ({
+           error: 'Looks like there was an error. Check that both users exist on Github.',
+           loading: false,
+       }))
+   }

+   this.setState(() => ({
+       error: null,
+       winner: players[0],
+       loser: players[1],
+       loading: false,
+   }));
+ }
```

api.js

**From:**
```javascript
function getProfile(username) {
  return axios.get(`https://api.github.com/users/${username}${params}`)
    .then(({data}) => data);
}
```

**To:**
```diff
async function getProfile(username) {
-  return axios.get(`https://api.github.com/users/${username}${params}`)
-     .then(({data}) => data);
      
+  const profile = await axios.get(`https://api.github.com/users/${username}${params}`);
_  return profile.data;
}
```

**From:** 
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

**To:**
```diff
- function getUserData(player) {
+ async function getUserData(player) {
-   return Promise.all([
-       getProfile(player),
-       getRepos(player)
-   ]).then(([profile, repos]) => ({
-       profile,
-       score: calculateScore(profile, repos)
-   }))
      
+  const [profile, repos] = await Promise.all([
+      getProfile(player),
+      getRepos(player)
+  ]);

+  return {
+      profile,
+      score: calculateScore(profile, repos)
+  }
+ }
```
**From:**
```javascript
export function battle(players) {
  return Promise.all(players.map(getUserData))
     .then(sortPlayers)
     .catch(handleError);
}
```

**To:**
```diff
- export function battle(players) {
+ export async function battle(players) {
  
-  return Promise.all(players.map(getUserData))
-      .then(sortPlayers)
-      .catch(handleError);
    
+  const results = await Promise.all(players.map(getUserData))
+      .catch(handleError);

+  return results === null
+      ? results
+      : sortPlayers(results)
}
```

# Async/Await in React
To gain value from adding Async/Await to your code, you need to first be familiar with promises. If you're not, I recommend reading [this](https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8) article (conveniently titled "Understanding Promises before you use Async Await") and [this](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html) article before continuing.

There's a reason Async/Await is many developers' favorite new feature added to the specification. It's a beautiful way for writing asynchronous code that appears to be synchronous. The most important thing to understand when getting started with Async/Await is that they're very closely tied to Promises. In fact `every async function you write will return a promise, and every single thing you await will ordinarily be a promise`. When I started out with Async/Await I referred to that line over and over. It's so important I'm going to repeat it - every async function you write will return a promise, and every single thing you await will ordinarily be a promise.

Let's say we had an asynchronous function called getUser that looked something like this,

```javascript
function getUser () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({name: 'Tyler'}), 2000)
  })
}
```
Our `getUser` function returns us a promise that takes 2 seconds to resolve. This is, by definition, asynchronous code. That means that we can't expect to receive the `user` object immediately, it's going to take some time (specifically 2 seconds in this example).

To deal with this delay, promises allow us to pass a function to `.then` and that function will be called when our promise resolves (when the user object is ready).

```javascript
function handleGetUser () {
  getUser()
    .then((user) => {
      console.log('The user is: ', user)
    })
}
```

So when handleGetUser gets invoked, getUser will be invoked and roughly two seconds later we'll see "The user is: Object {name: "Tyler"}" in our console. So what we've done is we've essentially said "Hey getUser, I know you're probably not going to immediately have the value that I need ready for me, but when you do, go ahead and call the function that I gave to `.then` with the value. Thanks!".

So far so good. Last thing about promises is that we want to have a catch all case so that if any of the functions in our promise chain throw an error, we'll hear about it.

````javascript
function handleGetUser () {  
  getUser()
    .then((user) => {
      console.log('The user is: ', user)
    })
    .catch((error) => {
      console.warn('Oh no there was an error: ', error)
    })
}
````

Perfect. Now we're handling errors as well.

If you're already familiar with promises you're probably bored at this point, that's fair. Let's jump into how we can change this code with async/await.

As I mentioned above, Async/Await allows you to write asynchronous code that appears to be synchronous.

If we were to change out code above to try to appear synchronous, we'd probably do something like this.

````javascript
function handleGetUser () {
  var user = getUser()
  console.log(user)
}
````
That's beautiful, no? Unfortunately, it won't work. With the code the way it is, user is going to be a promise and then we'll just log a promise to the console. That's no good. What if we made some small changes though. We need to tell the compiler that our getUser function is asynchronous so that it will hold off execution of our console.log until it's done resolving.

```javascript
function handleGetUser () {  
  var user = await getUser()
  console.log(user)
}
```

Simple enough. Remember our initial statement earlier? "and every single thing you await will ordinarily be a promise." We're using await to tell the compiler that this function is going to return a promise and we want to pause execution of the rest of the function until this promise resolves.

Unfortunately, if you ran the code above it still wouldn't work. The reason for that is you can't use await without using async. That's why it's called async/await. The rule I like to repeat to myself is this, "if I want to use await, I need to make sure that the function I'm in is an async function." What that looks like in code is this.

```javascript
async function handleGetUser () {
  var user = await getUser()
  console.log(user)
}
```

And that's it! We've successfully gotten rid of our `.then` method and replaced it with more synchronous looking code.

Now if you were observant you might have noticed that we got rid of our `.catch` invocation so we're currently not handling any error. Don't fear though, there's already a native way to do this in JavaScript we can take advantage of and that's with try/catch.

```javascript
async function handleGetUser () {
  try {
    var user = await getUser()
    console.log(user)
  } catch (error) {
    console.log('Error in handleGetUser', error)
  }
}
```
Beautiful. Now any errors that are thrown in our try block will be caught by our catch block. As we refactor in the video you'll see even more examples of using Async/Await.

:arrow_left: [Chapter 11 - Class Properties (Class Fields) in JavaScript](https://github.com/xgirma/reactor01/tree/master/11)

:arrow_right: [Chapter 13 - API request with fetch](https://github.com/xgirma/reactor01/tree/master/13)