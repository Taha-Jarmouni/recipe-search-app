import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import icons from '../img/icons.svg'; 
// // import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime'; 
import { async } from 'regenerator-runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

 

/*
const renderSpinner = function(parentEl) {
  const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
  `;
  parentEl.innerHTML = ''
  parentEl.insertAdjacentHTML('afterbegin', markup)
}
*/



export const controlRecipes = async function () {
  try {

  
  const id = window.location.hash.slice(1) 
  console.log(id);

  if(!id) return; 

  // renderSpinner(controlRecipes);
  recipeView.renderSpinner()

  // 0) Update results view to mark selected search result
  resultsView.update(model.getSearchResultsPage()); 
  // 3) 
  bookmarksView.update(model.state.bookmarks)

  // 1 - Loading the recipe from the url  !!!
  await model.loadRecipe(id); 

  recipeView.render(model.state.recipe) 
  } catch (err) {
    recipeView.renderError() 
    } 

};


const controlSearchResult = async function() {
  try {

    // Render spinner
    resultsView.renderSpinner()

    // 1) Get Search query 
    const query = searchView.getQuery();
    if (!query) return;
    
    // 2) Load search result 
    await model.loadSearchResult(query) 

    // 3) Render results 
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage()); 
    // 4) Render initial pagination buttons // 
    paginationView.render(model.state.search) //

    console.log(model.state.search);

  }catch(err) {
    console.log(err);
  }
}

const controlPagination = function(goToPage) {
  // 3) Render New results 
  resultsView.render(model.getSearchResultsPage(goToPage)); 
  // 4) Render New pagination buttons 
  paginationView.render(model.state.search)
}
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};



const controlAddBookmark = function () {

//1) Add or Remove Bookmarks
if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
else  model.deleteBookmark(model.state.recipe.id)
console.log(model.state.recipe);

//2) Render Recipe
recipeView.update(model.state.recipe) 
//3) Render Bookmarks 
bookmarksView.render(model.state.bookmarks)

};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {

  try {

  //Show loading spinner   
  addRecipeView.renderSpinner(); 

   await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // Upload the new recipe data to the api
    
    recipeView.render(model.state.recipe) 

    //Success message 
    addRecipeView.renderMessage();

  

    //Render the bookmark view again 
    bookmarksView.render(model.state.bookmarks);


     
     window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //  window.history.back()

    // Clode window form after 2.5 second
    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000) 

        
  }catch(err) {
    console.log('💥', err);
    addRecipeView.renderError(err.message)
  }
}
 
const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerrender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
  
}
init()
