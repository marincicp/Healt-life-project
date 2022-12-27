import { timeout } from "./helper.js";
import { TIMEOUT_SEC, REC_PER_PAGE } from "./config.js";

export const state = {
  recipe: {},
  search: {
    results: [],
    query: "",
    page: 1,
    resultsPerPage: REC_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const res = await Promise.race([
      fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`),
      timeout(TIMEOUT_SEC),
    ]);

    const data = await res.json();

    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
      ingredients: recipe.ingredients,
    };

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.log(err);
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const res = await Promise.race([
      fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/?search=${query}`
      ),
      timeout(TIMEOUT_SEC),
    ]);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    const data = await res.json();

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        image: recipe.image_url,
        title: recipe.title,
        publisher: recipe.publisher,
        id: recipe.id,
      };
      state.search.page = 1;
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * REC_PER_PAGE;
  const end = page * REC_PER_PAGE;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);
  // mark curent recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmarks = function (id) {
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  return state.bookmarks.splice(index, 1);
};
