# Refactoring app/components/Results.js

From: 
```javascript
function Profile (props){
    let info = props.info;

    return (
        <div>
           <PlayerPreview avatar={info.avatar_url} username={info.login}>
               <ul className='space-list-items'>
                   {info.name && <li>{info.name}</li>}
                   {info.location && <li>{info.location}</li>}
                   {info.company && <li>{info.company}</li>}
                   <li>Followers: {info.followers}</li>
                   <li>Following: {info.following}</li>
                   <li>Public Repos: {info.public_repos}</li>
                   {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
               </ul>
           </PlayerPreview>
        </div>
    )
}
```
To: 
```javascript
function Profile ({info}){
    const {avatar_url,login, name, location, company, followers, following, public_repos, blog } = info;

    return (
        <div>
           <PlayerPreview avatar={avatar_url} username={login}>
               <ul className='space-list-items'>
                   {name && <li>{name}</li>}
                   {location && <li>{location}</li>}
                   {company && <li>{company}</li>}
                   <li>Followers: {followers}</li>
                   <li>Following: {following}</li>
                   <li>Public Repos: {public_repos}</li>
                   {blog && <li><a href={blog}>{blog}</a></li>}
               </ul>
           </PlayerPreview>
        </div>
    )
}
```

From: 
```javascript
componentDidMount () {
        let players = queryString.parse(this.props.location.search);

        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(function (results){
            if (results === null) {
                return this.setState(function () {
                    return {
                        error: 'Looks like there was error. Check that both users exist on Github',
                        loading: false
                    }
                });
            }

            this.setState(function () {
                return {
                    error: null,
                    winner: results[0],
                    loser: results[1],
                    loading: false
                }
            });
        }.bind(this));

    }
```
To:
```javascript

```