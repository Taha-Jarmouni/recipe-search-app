import icons from 'url:../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Taha jarmouni
   * @todo Finish implementation
   */

  render(data, render = true) { 
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError(); // it will render the _errorMessage in the resultsView.js
    // 
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    
    this._clear();
    // recipeContainer.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

  }


  
  update(data) { // We Don't need that check here 
    // if (!data || (Array.isArray(data) && data.length === 0)) 
    //   return this.renderError();
    //   We don't need this condition here bc when we load the page and there is an id it will amidiatly load that recipe even if there was no search before 
    //   so then here  resultsView.update(model.getSearchResultsPage()); as we are trying to update there is no search results So this here (model.getSearchResultsPage()) will return an empty Array And this condition will be true and it will reveal an ugly error 

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup)

    const newElement = Array.from(newDom.querySelectorAll('*'))// read from line 32 to understand 
    const curElements = Array.from(this._parentElement.querySelectorAll('*')) 
    // console.log(curElements);
    // console.log(newElement);
    /*3
    */

    newElement.forEach((newEl, i) => { 
      const curEl = curElements[i]; 
      
      if(!newEl.isEqualNode(curEl) &&
         newEl.firstChild?.nodeValue.trim() !== '')
      {
        // console.log('💥', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent  //  then update the curElements with the newElement
      }

      if(!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>    
        curEl.setAttribute(attr.name, attr.value)
        );
      }
    }); 
  }

  
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    console.log(this._parentElement);
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p> ${message} !</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p> ${message} !</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

}

