const overviewDiv = document.querySelector(".overview");
const reposList = document.querySelector(".repo-list");
const username = "Amr-Dabaa";

const getUserInfo = async function (username) {

    const request = await fetch(`https://api.github.com/users/${username}`);
    const result = await request.json();
    displayUserInfo(result);
    // console.log(result);

}

const getUserRepos = async function(username) {

    const request = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc`)
    const result = await request.json();
    displayUserRepos(result);
    console.log(result);
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



getUserInfo(username);
getUserRepos(username);