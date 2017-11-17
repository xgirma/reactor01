function fetchRepos({language, minStars, maxStars, createdBefore, createdAfter}){
    // we remove the order out of the equation
}

fetchRepos({
    language: 'JavaScript',
    minStars: 100,
    maxStars: null,
    createdBefore: new Date('01/01/2019').getTime(),
    createdAfter: null
});