'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.innerHTML = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, ul) {
    createAndAppend('li', ul, {
      text:
        `   <div class="repo-detail">
              <p>Repository  : </p>
              <p><a href=${repo.html_url}>${repo.name}</a></p>
              <p>Description : </p>
              <p>${(repo.description === null) ? 'No description, website, or topics provided.' : repo.description}</p>
              <p>Forks : </p>
              <p>${repo.forks}</p>
              <p>Updated : </p>
              <p> ${new Date(repo.updated_at).toLocaleString()}</p>
            </div >
      ` });
  }

  // if there is an error create new div and return, else create ul and render foreach
  function main(url) {
    // Add header
    createAndAppend('h2', root, { text: 'HYF Repositories', id: 'hyf-header' });

    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }

      const ul = createAndAppend('ul', root);
      // before create li sort and get first 10 
      repos.sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }, { sensitivity: 'base' }))
        .slice(0, 10)
        .forEach(repo => renderRepoDetails(repo, ul));
    });

  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
