import View from "./View.js";

class SearchResults extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your query. Please try again!";

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return this._data
      .map((recipe) => {
        return `<li class="preview">
    <a href="#${recipe.id}" class="preview__link ${
          recipe.id === id ? "preview__link--active" : ""
        }">
      <figure class="preview__fig">
        <img class="preview__image" src="${recipe.image}" alt="food" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
      </div>
    </a>
  </li>`;
      })
      .join("");
  }
}

export default new SearchResults();
