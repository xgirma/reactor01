# Refactoring app/components/Popular.js
From:
```javascript
function RepoGrid (props) {
    return (
        <ul className='popular-list'>
            {props.repos.map(function (repo, index) {
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}
                                />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}
```
To:
```javascript
function RepoGrid ({ repos }) {
    return (
        <ul className='popular-list'>
            {repos.map(({ name, owner, html_url, stargazers_count }, index) => ( 
                <li key={name} className='popular-item'>
                    <div className='popular-rank'>#{index + 1}</div>
                    <ul className='space-list-items'>
                        <li>
                            <img
                                className='avatar'
                                src={owner.avatar_url}
                                alt={'Avatar for ' + owner.login}
                            />
                        </li>
                        <li><a href={html_url}>{name}</a></li>
                        <li>@{owner.login}</li>
                        <li>{stargazers_count} stars</li>
                    </ul>
                </li>
            ))}
        </ul>
    )
}
```