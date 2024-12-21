const token = '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'; // Your GitHub PAT

async function Usearch() {
    const userId = document.getElementById('txtUser').value;
    if (!userId) {
        alert('Please enter a Github User ID');
        return;
    }

    const profileDiv = document.getElementById('profile');
    profileDiv.classList.add('hidden');

    try {
        const response = await fetch(`https://api.github.com/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
            }
        });

        if (!response.ok) throw new Error('User not found');
        const data = await response.json();

        document.getElementById('avatar').src = data.avatar_url || '';
        document.getElementById('name').textContent = data.name || 'Not Available';
        document.getElementById('bio').textContent = data.bio || 'Not Available';
        document.getElementById('company').textContent = data.company || 'Not Available';
        document.getElementById('location').textContent = data.location || 'Not Available';
        document.getElementById('email').textContent = data.email || 'Not Available';
        document.getElementById('repos').textContent = data.public_repos || 0;
        document.getElementById('followers').textContent = data.followers || 0;
        document.getElementById('following').textContent = data.following || 0;
        document.getElementById('created').textContent = new Date(data.created_at).toLocaleString();
        document.getElementById('updated').textContent = new Date(data.updated_at).toLocaleString();

        profileDiv.classList.remove('hidden');
    } catch (error) {
        alert(error.message);
    }
}

async function fetchRepositories() {
    const userId = document.getElementById('txtUser').value;
    const reposList = document.getElementById('reposList');
    reposList.classList.toggle('hidden');

    if (!reposList.classList.contains('hidden')) {
        try {
            const response = await fetch(`https://api.github.com/users/${userId}/repos`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                }
            });

            const data = await response.json();
            reposList.innerHTML = data.map(repo => `<div>${repo.name}</div>`).join('');
        } catch (error) {
            reposList.innerHTML = `<div>Error fetching repositories</div>`;
        }
    }
}

async function fetchFollowers() {
    const userId = document.getElementById('txtUser').value;
    const followersList = document.getElementById('followersList');
    followersList.classList.toggle('hidden');

    if (!followersList.classList.contains('hidden')) {
        try {
            const response = await fetch(`https://api.github.com/users/${userId}/followers`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                }
            });

            const data = await response.json();
            followersList.innerHTML = data.map(follower =>
                `<div class="follower" onclick="fetchFollowerProfile('${follower.login}')">${follower.login}</div>`
            ).join('');
        } catch (error) {
            followersList.innerHTML = `<div>Error fetching followers</div>`;
        }
    }
}

async function fetchFollowing() {
    const userId = document.getElementById('txtUser').value;
    const followingList = document.getElementById('followingList');
    followingList.classList.toggle('hidden');

    if (!followingList.classList.contains('hidden')) {
        try {
            const response = await fetch(`https://api.github.com/users/${userId}/following`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                }
            });

            const data = await response.json();
            followingList.innerHTML = data.map(following =>
                `<div class="following" onclick="fetchFollowerProfile('${following.login}')">${following.login}</div>`
            ).join('');
        } catch (error) {
            followingList.innerHTML = `<div>Error fetching following</div>`;
        }
    }
}

// New function to fetch the profile of a follower
async function fetchFollowerProfile(followerLogin) {
    try {
        const response = await fetch(`https://api.github.com/users/${followerLogin}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
            }
        });

        if (!response.ok) throw new Error('Follower not found');
        const data = await response.json();

        // Check if a follower profile card already exists
        let followerProfileDiv = document.getElementById('followerProfileCard');

        if (!followerProfileDiv) {
            // Create the profile card container if it doesn't exist
            followerProfileDiv = document.createElement('div');
            followerProfileDiv.id = 'followerProfileCard';
            followerProfileDiv.style.position = 'fixed';
            followerProfileDiv.style.top = '10px';
            followerProfileDiv.style.right = '10px';
            followerProfileDiv.style.width = '300px';
            followerProfileDiv.style.backgroundColor = '#fff';
            followerProfileDiv.style.border = '1px solid #ccc';
            followerProfileDiv.style.borderRadius = '8px';
            followerProfileDiv.style.padding = '16px';
            followerProfileDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            followerProfileDiv.style.zIndex = '1000';

            document.body.appendChild(followerProfileDiv);
        }

        // Update the card content with the new follower's data
        followerProfileDiv.innerHTML = `
            <h3>Follower Profile</h3>
            <img src="${data.avatar_url}" alt="Avatar" style="width:100px;height:100px;border-radius:50%;" />
            <div><strong>Name:</strong> ${data.name || 'Not Available'}</div>
            <div><strong>Bio:</strong> ${data.bio || 'Not Available'}</div>
            <div><strong>Company:</strong> ${data.company || 'Not Available'}</div>
            <div><strong>Location:</strong> ${data.location || 'Not Available'}</div>
            <div><strong>Email:</strong> ${data.email || 'Not Available'}</div>
            <div><strong>Public Repos:</strong> ${data.public_repos}</div>
            <div><strong>Followers:</strong> ${data.followers}</div>
            <div><strong>Following:</strong> ${data.following}</div>
            <div><strong>Account Created:</strong> ${new Date(data.created_at).toLocaleString()}</div>
        `;
    } catch (error) {
        alert(error.message);
    }
}

