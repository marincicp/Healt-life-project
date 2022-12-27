import View from "./View.js";
// import { Fraction } from "fractional";

// const Fraction = require("fractional").Fraction;
const fracty = require("fracty");

console.log(fracty);
class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");

  addEventHandler(handler) {
    ["load", "hashchange"].forEach((e) => window.addEventListener(e, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-update-servings");
      if (!btn) return;

      let newServings = +btn.getAttribute("data-update-to");
      if (newServings > 0) handler(newServings);
    });
  }

  addHandlerAddBookmarks(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn__add-bookmark");
      if (!btn) return;

      handler();
    });
  }

  _generateMarkup() {
    return `
  <figure class="recipe__fig">
            <img src="${this._data.image}" alt="pizza" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${this._data.title}</span>
            </h1></figure>

          <!--   recipe details box-->
          <div class="recipe__details">
            <div class="recipe__info">
              <ion-icon class="recipe__info-icons" name="time-outline"></ion-icon>
              <span class="recipe__info-data recipe_info-data-minutes">${
                this._data.cookingTime
              }</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info">
              <ion-icon
                class="recipe__info-icons"
                name="people-outline"
              ></ion-icon>
              <span class="recipe__info-data recipe_info-data-people">${
                this._data.servings
              }</span>
              <span class="recipe__info-text">servings</span>

              <div class="recipe__info-buttons">
                
                <button data-update-to="${
                  this._data.servings - 1
                }" class="btn-tiny btn-update-servings">
                  <ion-icon
                    class="icon-servings"
                    name="remove-circle-outline"
                  ></ion-icon>
                </button><button data-update-to="${
                  this._data.servings + 1
                }" class="btn-tiny btn-update-servings">
                  <ion-icon
                    class="icon-servings"
                    name="add-circle-outline"
                  ></ion-icon>
                </button>
              </div>
            </div>

            <div class="recipe__bookmarks">
              <button class="btn__add-bookmark">
                <ion-icon class="bookmark-icon" name="${
                  this._data.bookmarked ? "bookmark" : "bookmark-outline"
                }"
                ></ion-icon>
              </button>
            </div>
          </div>

          <!--   recipe ingridient box-->

          <div class="recipe__ingridents">
            <h2>Recipe ingridents</h2>
            <ul class="recipe__ingridents-list">
             ${this._data.ingredients
               .map((ing) => {
                 return ` <li class="recipe__ingridient">
              <ion-icon
                class="recipe__ingridient-icon"
                name="checkmark-outline"
              ></ion-icon>
              <div class="recipe__ingridient-quantity">${
                ing.quantity ? fracty(ing.quantity).toString() : ""
              }</div>
              <div class="recipe__ingridient-description">
              ${ing.unit}
                ${ing.description}
              </div>
            </li>`;
               })
               .join("")}

             
             
            </ul>
          </div>

          <!--   recipe direction box-->
          <div class="recipe__direction">
            <h2>How it cook it</h2>
            <p>
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${
                this._data.publisher
              }</span>. <br />Please
              check out directions at their website.
            </p>
            <a href="${this._data.sourceUrl}" class="recipe__direction-link"
              ><span>Direction</span>
              <ion-icon name="arrow-forward-outline"></ion-icon
            ></a>
          </div>

  `;
  }
}
export default new RecipeView();
