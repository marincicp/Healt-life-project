import { isInteger } from "fractional-arithmetic";
import * as model from "./model.js";
import recipeView from "./views/RecipeView.js";
import SearchResults from "./views/SearchResults.js";
import SearchView from "./views/SearchView.js";
import PaginationView from "./views/PaginationView.js";
import BookmarkView from "./views/BookmarkView.js";

// https://forkify-api.herokuapp.com/v2/25ed6604591c37cdc054bc886
//5ed6604591c37cdc054bc886

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    SearchResults.render(model.getSearchResultPage());
    // load recipe
    await model.loadRecipe(id);

    // render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchRecipe = async function () {
  try {
    const query = SearchView.getQuery();
    console.log(query);
    if (!query) return;

    SearchResults.renderSpinner();

    //laod search resilts
    await model.loadSearchResults(query);

    // render
    // SearchResults.render(model.state.search.results);
    SearchResults.render(model.getSearchResultPage());
    PaginationView.render(model.state.search);
  } catch {
    SearchResults.renderError();
  }
};

const controlPagination = function (goToPage) {
  SearchResults.render(model.getSearchResultPage(goToPage));
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
};

const controlAddBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmarks(model.state.recipe.id);

  recipeView.render(model.state.recipe);
  BookmarkView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addEventHandler(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmarks(controlAddBookmarks);
  SearchView.addhandlerSearch(controlSearchRecipe);
  PaginationView.addHandlerPagination(controlPagination);
};
init();
