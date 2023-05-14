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
//We can simply attach this to any parent element that data is passed in here
//And we render the renderSpinner function inside if the controlRecipes bc when we render the recipe we want to see the spinner befor that
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

  // Get the curren id of thee meal from the hash in the Url
  const id = window.location.hash.slice(1) //and using the slice method to get just the id without the hash #
  console.log(id);

  if(!id) return; 

  // renderSpinner(controlRecipes);
  recipeView.renderSpinner()

  // 0) Update results view to mark selected search result
  resultsView.update(model.getSearchResultsPage()); 
  // 3) each time that we display a recipe on the page we should update the entire bookmark view so then it can highlite the selected recipe 
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
    await model.loadSearchResult(query) //just like loadRecipe(), here we don't need to store this at any variable bc it does't return anythig all it does is manipulate the state object in model.js
    //Render results
    // console.log(model.state.search.results);

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
  recipeView.update(model.state.recipe); // deferent between render and update is the update method will update only the text and attribut in the Dom And we, And wz want this update method to available in all the views bc we will use this in multiple situations in this project 
};



const controlAddBookmark = function () {

//1) Add or Remove Bookmarks
if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
else  model.deleteBookmark(model.state.recipe.id)
console.log(model.state.recipe);

//2) Render Recipe
recipeView.update(model.state.recipe) 
//3) Render Bookmarks // when ever we add a new bookMark we want to render all bookMark in the array 
bookmarksView.render(model.state.bookmarks)

};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {

  try {

  //Show loading spinner   
  addRecipeView.renderSpinner(); 

   await model.uploadRecipe(newRecipe); // this is an await promise so we have to await that promise coming from model
    console.log(model.state.recipe);
    // Upload the new recipe data to the api
    
    recipeView.render(model.state.recipe) // render the recipe that we just added or aploaded to the api

    //Success message 
    addRecipeView.renderMessage();

  

    //Render the bookmark view again 
    bookmarksView.render(model.state.bookmarks);


     // This is allow us to change the URL without reloading the page 
     window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //  window.history.back()

    // Clode window form after 2.5 second
    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000) //milliseconds to seconds

        
  }catch(err) {
    console.log('💥', err);
    addRecipeView.renderError(err.message)
  }
}
 
const newFeature = function() {
  console.log('Welcom to the application');
  
}
const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerrender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
  newFeature()
  alert('HACKED')
}
init()