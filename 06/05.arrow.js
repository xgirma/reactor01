function getTweets (uid) {
    return fetch('https://api.users.com/' + uid)
        .then((response) => response.json())
        .then((response) => response.data)
        .then((tweets) => tweets.filter((tweet) => tweet.starts > 50))
        .then((tweets) => tweets.filter((tweet) => tweet.rts > 50))
}