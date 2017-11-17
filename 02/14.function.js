function fetchRepos({language, minStars, maxStars, createdBefore, createdAfter}){
   language = language || 'All';
   minStars = minStars || 0;
   maxStars = maxStars || 0;
   createdAfter = createdAfter || '';
   createdBefore = createdBefore || '';
}

fetchRepos({
    language: 'JavaScript',
    minStars: 100,
    maxStars: null,
    createdBefore: new Date('01/01/2019').getTime(),
    createdAfter: null
});