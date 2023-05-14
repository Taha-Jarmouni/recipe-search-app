import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';
  

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
      
  }
}

export default new BookmarksView();






















/*
import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';
  
  _generateMarkup() {
    return  this._data.map(this._generateMarkupPerview).join('')
  }
  _generateMarkupPerview(bookmark) {
    
    const id = window.location.hash.slice(1);
    // here we want to say if the result bookmark id is equal to the current id in the hash link make it active 
    return `
    <li class="preview">   
      <a class="preview__link ${bookmark.id === id ? 'preview__link--active' : ''}" href="#${bookmark.id}"> 
        <figure class="preview__fig">
          <img src="${bookmark.image}" alt="${bookmark.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${bookmark.title}...</h4>
          <p class="preview__publisher">${bookmark.publisher}</p>
        </div>
      </a>
    </li>
    `;
  }
}

export default new BookmarksView();



*/