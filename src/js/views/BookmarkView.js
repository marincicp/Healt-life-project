import View from "./View.js";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet !";

  _generateMarkup() {
    console.log(this._data);
    const id = window.location.hash.slice(1);

    return this._data
      .map((bookmark) => {
        return ` <li class="preview__bookmarks">
            <a href="#${bookmark.id}" class="preview__bookmarks-link">
              <figure class="preview__bookmarks-fig">
                <img class="preview__bookmarks-image" src="${bookmark.image}" alt="food" />
              </figure>
              <div class="preview__bookmarks-data">
                <h4 class="preview__bookmarks-title">${bookmark.title}</h4>
                <p class="preview__bookmarks-publisher">${bookmark.publisher}</p>
              </div>
            </a>
          </li>
      `;
      })
      .join("");
  }

  //   _generateMarkup() {
  //     const id = window.location.hash.slice(1);

  //     return this._data
  //       .map((recipe) => {
  //         return `<li class="preview">
  //     <a href="#${recipe.id}" class="preview__link ${
  //           recipe.id === id ? "preview__link--active" : ""
  //         }">
  //       <figure class="preview__fig">
  //         <img class="preview__image" src="${recipe.image}" alt="food" />
  //       </figure>
  //       <div class="preview__data">
  //         <h4 class="preview__title">${recipe.title}</h4>
  //         <p class="preview__publisher">${recipe.publisher}</p>
  //       </div>
  //     </a>
  //   </li>`;
  //       })
  //       .join("");
  //   }
}

export default new BookmarkView();
