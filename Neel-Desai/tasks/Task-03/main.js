const apiToken = 'YOUR_API_TOKEN';
async function fetchUser() {
    const username = document.getElementById('txtSearch').value;
    if (!username) {
        alert("Please enter a username!");
        return;
    }

    document.getElementById('profileDiv').classList.add('hidden');
    document.getElementById('errorP').classList.add('hidden');
    const url = `https://api.github.com/users/${username}`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${apiToken}`); 

    xhr.onload = function () {
        if (xhr.status === 200) {
            const user = JSON.parse(xhr.responseText);
            document.getElementById('avatar').src = user.avatar_url;
            document.getElementById('name').textContent = user.name || 'Not Available';
            document.getElementById('bio').textContent = user.bio || 'Not Available';
            document.getElementById('company').textContent = user.company || 'Not Available';
            document.getElementById('location').textContent = user.location || 'Not Available';
            document.getElementById('email').textContent = user.email || 'Not Available';
            document.getElementById('repos').textContent = user.public_repos;
            document.getElementById('followers').textContent = user.followers;
            document.getElementById('following').textContent = user.following;
            document.getElementById('created').textContent = new Date(user.created_at).toLocaleDateString() || 'Not Available';
            document.getElementById('updated').textContent = new Date(user.updated_at).toLocaleDateString() || 'Not Available';
            document.getElementById('profileDiv').classList.remove('hidden');
            document.getElementById('errorP').classList.add('hidden');
        } else if (xhr.status === 404) {
            document.getElementById('profileDiv').classList.add('hidden');
            document.getElementById('errorP').textContent = 'User not found. Please check the username.';
            document.getElementById('errorP').classList.remove('hidden');
        } else {
            document.getElementById('profileDiv').classList.add('hidden');
            document.getElementById('errorP').textContent = `Error: ${xhr.status} - ${xhr.statusText}`;
            document.getElementById('errorP').classList.remove('hidden');
        }
    };

    xhr.onerror = function () {
        document.getElementById('profileDiv').classList.add('hidden');
        document.getElementById('errorP').textContent = 'An error occurred while fetching the user data.';
        document.getElementById('errorP').classList.remove('hidden');
    };

    xhr.send();
}
function clearDetailsSection() {
    const detailsDiv = document.getElementById('detailsDiv');
    detailsDiv.classList.add('hidden'); 
    detailsDiv.innerHTML = ''; 
}

async function viewFollowers() {
    clearDetailsSection(); 
    const username = document.getElementById('txtSearch').value;
    const url = `https://api.github.com/users/${username}/followers`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${apiToken}`); 

    xhr.onload = function () {
        if (xhr.status === 200) {
            const followers = JSON.parse(xhr.responseText);
            const detailsDiv = document.getElementById('detailsDiv');
            detailsDiv.classList.remove('hidden');
            followers.forEach(follower => {
                const followerDiv = document.createElement('div');
                followerDiv.classList.add('follower');
                const avatar = document.createElement('img');
                avatar.src = follower.avatar_url;
                avatar.classList.add('avatar');
                const followerName = document.createElement('span');
                followerName.textContent = follower.login;

                followerDiv.appendChild(avatar);
                followerDiv.appendChild(followerName);

                followerDiv.addEventListener('click', () => fetchUserDetails(follower.login));

                detailsDiv.appendChild(followerDiv);
            });
        } else {
            console.error('Error fetching followers:', xhr.status);
        }
    };
    xhr.send();
}

async function viewFollowing() {
    clearDetailsSection(); 
    const username = document.getElementById('txtSearch').value;
    const url = `https://api.github.com/users/${username}/following`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${apiToken}`); 

    xhr.onload = function () {
        if (xhr.status === 200) {
            const following = JSON.parse(xhr.responseText);
            const detailsDiv = document.getElementById('detailsDiv');
            detailsDiv.classList.remove('hidden');
            following.forEach(followingUser => {
                const followingDiv = document.createElement('div');
                followingDiv.classList.add('following');
                const avatar = document.createElement('img');
                avatar.src = followingUser.avatar_url;
                avatar.classList.add('avatar');
                const followingName = document.createElement('span');
                followingName.textContent = followingUser.login;

                followingDiv.appendChild(avatar);
                followingDiv.appendChild(followingName);

                followingDiv.addEventListener('click', () => fetchUserDetails(followingUser.login));

                detailsDiv.appendChild(followingDiv);
            });
        } else {
            console.error('Error fetching following:', xhr.status);
        }
    };
    xhr.send();
}

async function viewRepos() {
    clearDetailsSection(); 
    const username = document.getElementById('txtSearch').value;
    const url = `https://api.github.com/users/${username}/repos`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${apiToken}`); 
    xhr.onload = function () {
        if (xhr.status === 200) {
            const repos = JSON.parse(xhr.responseText);
            const detailsDiv = document.getElementById('detailsDiv');
            detailsDiv.classList.remove('hidden');
            repos.forEach(repo => {
                const repoDiv = document.createElement('div');
                repoDiv.classList.add('repo');
                const repoName = document.createElement('span');
                repoName.textContent = repo.name;

                const repoDescription = document.createElement('div');
                repoDescription.textContent = repo.description || 'No description available.';

                repoDiv.appendChild(repoName);
                repoDiv.appendChild(repoDescription);

                detailsDiv.appendChild(repoDiv);
            });
        } else {
            console.error('Error fetching repositories:', xhr.status);
        }
    };
    xhr.send();
}
