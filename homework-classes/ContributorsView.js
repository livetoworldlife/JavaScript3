'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      this.container.innerHTML = '';
      createAndAppend('h2', this.container, { text: 'Contributors', id: 'cont-header' });
      contributors.forEach(repoCont => {
        createAndAppend('div', this.container, {
          text:
            `   <p><img src=${repoCont.avatar_url} alt=${repoCont.login} width="50" height="50"> </p>
                  <p><a href=${repoCont.html_url}>${repoCont.login}</a></p>
                  <p id="contribution-count">${repoCont.contributions} </p>
              ` ,
          class: "contributors-detail"
        });
      })
    }
  }

  window.ContributorsView = ContributorsView;
}
