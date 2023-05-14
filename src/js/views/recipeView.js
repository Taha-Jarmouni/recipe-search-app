import View from './View.js'

import icons from 'url:../../img/icons.svg'; //this is work in Parcel 2
import { Fraction } from 'fractional';//  any libraries or any packages that we import from npm we don't even have to specify any path all we have to do is to write their names here
// import { Fraction } from '../../../node_modules/fractional/index.js';//  any libraries or any packages that we import from npm we don't even have to specify any path all we have to do is to write their names here
// that was Fractional inside of Fractional So that We need to use destructuring {} to get the second Fractional / {Fraction: ƒ} Fraction: ƒ (numerator, denominator)

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We couldn not find that recipe. Please try another one';
  _message = '';
  
 
  
  addHandlerrender(handler) {
    ['hashchange','load'].forEach(ev => window.addEventListener(ev, handler));
    // window.addEventListener('hashchange', controlRecipes) //here the meal will show only when you click at the link and change the hash id
    // window.addEventListener('load', controlRecipes) // but here the meal will show when the page load

  }
  // if you listen to the button element directly  you are actually listening to a button element that not yet exist in the HTML page, you have to listen to it parent (this._parentElement.addEventListener) element whitch is .recipe in this case
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });  
  

  }
  
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
    // console.log(btn);
      const { updateTo } = btn.dataset; // 
      console.log(updateTo);
    //const  updateTo  = btn.dataset.updateTo; // updateTo it have this camel case here bc when there is a dash in the property name in html then that will be converted to camel case
      if (+updateTo > 0) handler(+updateTo);
    });
  }


  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings // if the servings number was 4
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${ // this botton if click on it it will gives you 3
              this._data.servings - 1
            }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${ // this botton if click on it it will gives you 5
              this._data.servings + 1
            }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'/* if the recipe has an key add an iconn*/}"> 
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

_generateMarkupIngredient(ing){
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
    `;
  }
}



export default new RecipeView();














































