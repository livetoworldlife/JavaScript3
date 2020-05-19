'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      this.container.innerHTML = "";
      createAndAppend('div', this.container, {
        text:
          ` <p>Repository  : </p>
          <p><a href=${repo.html_url}>${repo.name}</a></p>
          <p>Description : </p>
          <p>${(repo.description === null) ? 'No description, website, or topics provided.' : repo.description}</p>
          <p>Forks : </p>
          <p>${repo.forks}</p>
          <p>Updated : </p>
          <p> ${new Date(repo.updated_at).toLocaleString()}</p> `,
        class: "repo-detail"
      });
    }
  }

  window.RepoView = RepoView;
}
