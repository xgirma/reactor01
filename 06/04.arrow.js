function getTweets (uid) {
    return fetch('https://api.users.com/' + uid)
        .then(function (response){
            return response.json()
        })
        .then(function(response){
            return response.data;
        })
        .then(function(tweets){
            return tweets.filter(function(tweet){
                return tweet.starts > 50
            })
        })
        .then(function (tweets){
            return tweets.filter(function (tweets){
                return tweets.rts > 50
            })
        })
}