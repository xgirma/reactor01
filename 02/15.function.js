function fetchRepos({language='All', minStars=0, maxStars=0, createdBefore='', createdAfter=''}){}

fetchRepos({
    language: 'JavaScript',
    minStars: 100,
    maxStars: null,
    createdBefore: new Date('01/01/2019').getTime(),
    createdAfter: null
});