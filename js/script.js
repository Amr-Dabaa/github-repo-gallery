const overviewDiv = document.querySelector(".overview");
const reposList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");
const username = "Amr-Dabaa";

const getUserInfo = async function (username) {

    const request = await fetch(`https://api.github.com/users/${username}`);
    const result = await request.json();
    displayUserInfo(result);
    // console.log(result);

}

const getUserRepos = async function(username) {

    const request = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=100`)
    const result = await request.json();
    displayUserRepos(result);
}

const displayUserInfo = function (result) {

    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    let userInfo = `<figure>
                        <img alt="user avatar" src=${result.avatar_url} />
                    </figure>
                    <div>
                        <p><strong>Name:</strong> ${result.name}</p>
                        <p><strong>Bio:</strong> ${result.bio}</p>
                        <p><strong>Location:</strong> Cairo, Egypt</p>
                        <p><strong>Number of public repos:</strong> ${result.public_repos}</p>
                    </div>`
    userInfoDiv.innerHTML = userInfo;
    overviewDiv.append(userInfoDiv);

}

const displayUserRepos = function(result) {
    for(const item of result){
        let li = document.createElement('li');
        li.classList.add('repo');
        li.innerHTML = `<h3>${item.name}</h3>`;
        reposList.append(li);
    }
}


reposList.addEventListener("click", function(e){
    if(e.target.matches("h3")){
        let repoName = e.target.innerText;
        getRepoInfo(repoName, username);
    
    }
})

const getRepoInfo = async function(repoName, username){

    const request = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const result = await request.json();
    const fetchLanguages = await fetch(result.languages_url);
    const languageData = await fetchLanguages.json();
    let languages = [];
    for(let key in languageData){
        languages.push(key);
    }
    console.log(result);
    displayRepoInfo(result, languages);

}

const displayRepoInfo = function(repoInfo, languages){
    repoDataSection.innerHTML = "";
    let divElement = document.createElement('div');
    divElement.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
                            <p>Description: ${repoInfo.description}</p>
                            <p>Default Branch: ${repoInfo.default_branch}</p>
                            <p>Languages: ${languages.join(", ")}</p>
                            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataSection.append(divElement);
    reposList.classList.add('hide');
    repoDataSection.classList.remove('hide');
}



getUserInfo(username);
getUserRepos(username);