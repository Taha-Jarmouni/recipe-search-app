import View from './View.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';
  
  
  _generateMarkup() {
    console.log(this._data);
    return  this._data.map(result => previewView.render(result, false)).join('') // in every bookmark in the bookmarks Array we want to render a preview at the bookmark view
    // and here we want actually to return a string so all of this should be a string that we need to retirn from the _generateMarkup
    // So at then in the view it can insert that markup into the DOM,  How ever bu having render() method here previewView.js it self will try to render some markup so this is not going to work 
    // so what we are going to do its to change the render method in the View.js  and add secode parametter to it called render whitch by default will set to true 
    // and we want to write if render is false we want to return markup that was just generated
  }}

export default new ResultsView();



























































/*

import View from './View.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';
  
  
  _generateMarkup() {
    return  this._data.map(this._generateMarkupPerview).join('')
  }
  _generateMarkupPerview(result) {
    
    const id = window.location.hash.slice(1);
    // here we want to say if the result id is equal to the current id in the hash link make it active 
    return `
    <li class="preview">
      <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}"> 
        <figure class="preview__fig">
          <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}...</h4>
          <p class="preview__publisher">${result.publisher}</p>
        </div>
      </a>
    </li>
    `;
  }
}

export default new ResultsView();


*/