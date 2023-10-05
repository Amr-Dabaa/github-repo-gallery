//--------------------Global variables---------------------//
{
    var overviewDiv = document.querySelector(".overview");
    var reposList = document.querySelector(".repo-list");
    var reposSection = document.querySelector(".repos");
    var repoDataSection = document.querySelector(".repo-data");
    var backToReposButton = document.querySelector(".view-repos");
    var searchFilterInput = document.querySelector(".filter-repos");

    var username = "Amr-Dabaa";    
}

//----------------Data fetching functions------------------//
{
    var getUserInfo = async function (username) {

        const request = await fetch(`https://api.github.com/users/${username}`);
        const result = await request.json();
        displayUserInfo(result);

    }

    var getUserRepos = async function (username) {

        const request = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=100`)
        const result = await request.json();
        displayUserRepos(result);
    }

    var getRepoInfo = async function (repoName, username) {

        const request = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        const result = await request.json();
        const fetchLanguages = await fetch(result.languages_url);
        const languageData = await fetchLanguages.json();
        let languages = [];
        for (let key in languageData) {
            languages.push(key);
        }
        console.log(result);
        displayRepoInfo(result, languages);
        backToReposButton.classList.remove('hide');

    }
}

//---------------- Displaying functions -------------------//
{
    var displayUserInfo = function (result) {

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

    var displayUserRepos = function (result) {
        for (const item of result) {
            let li = document.createElement('li');
            li.classList.add('repo');
            li.innerHTML = `<h3>${item.name}</h3>`;
            reposList.append(li);
        }
        searchFilterInput.value = "";
        searchFilterInput.classList.remove('hide');
    }

    var displayRepoInfo = function (repoInfo, languages) {
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
        searchFilterInput.classList.add('hide');
    }        
}
  

//------------------ Events Listeners ---------------------//
{
    reposList.addEventListener("click", function (e) {
        if (e.target.matches("h3")) {
            let repoName = e.target.innerText;
            getRepoInfo(repoName, username);

        }
    })

    backToReposButton.addEventListener("click", function () {
        repoDataSection.classList.add('hide');
        backToReposButton.classList.add('hide');
        reposList.classList.remove('hide');
        searchFilterInput.classList.remove('hide');
    })

    searchFilterInput.addEventListener("input", function(e){
        let currentInput = searchFilterInput.value;
        const repos = document.querySelectorAll(".repo");
        for(let repo of repos){
            if(repo.innerText.includes(currentInput)){
                repo.classList.remove('hide');
            } else {
                repo.classList.add('hide');
            }
        }
    })
}


//--------------------Startup Code-------------------------//
{
    getUserInfo(username);
    getUserRepos(username);    
}

