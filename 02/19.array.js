function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(function([ profile, repos ]){
        return {
            profile: profile,
            repos: repos
        }
    })
}