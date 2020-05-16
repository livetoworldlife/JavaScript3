'use strict';

{
  const sectionRepo = document.querySelector('.repo-container');
  const sectionContributors = document.querySelector('.contributors-container');

  function getFetch(url) {
    fetch(url)
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json') || !response.ok) {
          const errorMessage = new Error("Oops, we haven't got JSON!");
          return Promise.reject(errorMessage);
        }
        return response.json();
      })
      .then(data => { (sectionRepo.innerHTML === '') ? createOptionsOfSelect(data) : createContributors(data) })
      .catch(errorMessage => (sectionRepo.innerHTML === '') ? createErrorDiv(errorMessage, sectionRepo) : createErrorDiv(errorMessage, sectionContributors));
  }

  // this function create an element or attribute and return it
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

  // this function create a div an error message on section
  function createErrorDiv(errorMessage, sectionName) {
    createAndAppend('div', sectionName, {
      text: errorMessage,
      class: 'alert-error',
    });
  }

  // this function create header s elements
  function createHeader() {
    const header = document.querySelector('header');
    createAndAppend('h2', header, { text: 'HYF Repositories', id: 'hyf-header' });
    createAndAppend('select', header);
    const select = document.querySelector('select');
    createAndAppend('option', select, { text: "--HYF Repositories--", value: 0 });
  }

  //this function create options elements of select
  function createOptionsOfSelect(data) {
    const select = document.querySelector('select');
    select.innerHTML = "";
    //The list of repositories in the select element should be sorted (case-insensitive) on repository name.
    const sortedRepos = data.sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }, { sensitivity: 'base' }));
    sortedRepos.forEach((data, index, arr) => {
      createAndAppend('option', select, {
        text: `${data.name}`,
        value: `${index}`
      });
    });
    // At start-up your application should display information about the first repository as displayed in the select element.
    onChangeSelect(0, data);
    // When the user changes the selection, the information in the web page should be refreshed for the newly selected repository.
    select.addEventListener('change', (event) => { onChangeSelect(event, data) });
  }

  // this function create repositories when onchange the select value
  function onChangeSelect(event, repos) {
    sectionRepo.innerHTML = '';
    const select = document.querySelector('select');
    const selectedText = select.options[select.selectedIndex].text;
    const filteredRepo = repos.filter(repo => repo.name === selectedText);
    createAndAppend('div', sectionRepo, {
      text:
        `     <p>Repository  : </p>
                  <p><a href=${filteredRepo[0].html_url}>${filteredRepo[0].name}</a></p>
                  <p>Description : </p>
                  <p>${(filteredRepo[0].description === null) ? 'No description, website, or topics provided.' : filteredRepo[0].description}</p>
                  <p>Forks : </p>
                  <p>${filteredRepo[0].forks}</p>
                  <p>Updated : </p>
                  <p> ${new Date(filteredRepo[0].updated_at).toLocaleString()}</p>
          ` ,
      class: "repo-detail"
    });
    // contributors fetch
    const contUrl = filteredRepo[0].contributors_url;
    getFetch(contUrl);
  }

  function createContributors(data) {
    sectionContributors.innerHTML = '';
    createAndAppend('h2', sectionContributors, { text: 'Contributors', id: 'cont-header' });
    data.forEach(repoCont => {
      createAndAppend('div', sectionContributors, {
        text:
          `   <p><img src=${repoCont.avatar_url} alt=${repoCont.login} width="50" height="50"> </p>
                <p><a href=${repoCont.html_url}>${repoCont.login}</a></p>
                <p id="contribution-count">${repoCont.contributions} </p>
            ` ,
        class: "contributors-detail"
      });
    })
  }

  function main(url) {
    // Add header
    createHeader();
    // fetch for repos
    getFetch(url);
  }

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
