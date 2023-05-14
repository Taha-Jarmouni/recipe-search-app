import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

// the explanation of that constrator method with using empty super() is here :
//  https://chat.openai.com/c/ac6d2d57-cacd-4697-bbf5-e4b692a18aed
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() { //this handler here we going to us it just inside of this class 
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() { //this handler here we going to us it just inside of this class 
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) { // the this keyword this._parentElement refers to a property called  _parentElement on the object instance that the method is being called on.
      e.preventDefault();
      const dataArray = [...new FormData(this)]; 
      const data = Object.fromEntries(dataArray); 
            handler(data);
    });
  }
/*
In the code snippet you provided, 
this._parentElement refers to a property
called _parentElement on the object instance 
that the method is being called on.
*/
  _generateMarkup() {}
}

export default new AddRecipeView();
