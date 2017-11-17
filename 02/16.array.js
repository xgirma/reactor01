function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(function(data){
        var profile = data[0];
        var repos = data[1];

        return {
            profile: profile,
            repos: repos
        }
    })
}