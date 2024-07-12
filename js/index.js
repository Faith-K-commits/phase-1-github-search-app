document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', event => {
      event.preventDefault();
      const query = searchInput.value;
      searchUsers(query);
    });
  
    const searchUsers = query => {
      fetch(`https://api.github.com/search/users?q=${query}`)
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => console.error('Error:', error));
    };
  
    const displayUsers = users => {
      userList.innerHTML = ''; 
      users.forEach(user => {
        const li = document.createElement('li');
        const avatar = document.createElement('img');
        avatar.src = user.avatar_url;
        avatar.alt = user.login;
        avatar.width = 50;
  
        const username = document.createElement('p');
        username.textContent = user.login;
  
        const profileLink = document.createElement('a');
        profileLink.href = user.html_url;
        profileLink.textContent = 'Profile';
        profileLink.target = '_blank';
  
        li.appendChild(avatar);
        li.appendChild(username);
        li.appendChild(profileLink);
  
        li.addEventListener('click', () => {
          fetchUserRepos(user.login);
        });
  
        userList.appendChild(li);
      });
    };
  
    const fetchUserRepos = username => {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        })
        .catch(error => console.error('Error:', error));
    };
  
    const displayRepos = repos => {
      reposList.innerHTML = '';     
      repos.forEach(repo => {
        const li = document.createElement('li');
        const repoName = document.createElement('p');
        repoName.textContent = repo.name;
  
        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.textContent = 'Repo Link';
        repoLink.target = '_blank';
  
        li.appendChild(repoName);
        li.appendChild(repoLink);
  
        reposList.appendChild(li);
      });
    };
  });
  