function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(function(data){
        var [profile, repos ] = data;

        return {
            profile: profile,
            repos: repos
        }
    })
}