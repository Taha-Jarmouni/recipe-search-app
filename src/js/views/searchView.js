class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query =  this._parentElement.querySelector('.search__field').value // get the value from the search input
    this._clearInput(); // clear the input field
    return query; // return the query 
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler(); // this handler function should be the controlSearchResult function
                 // And all we have to do is to call the addHandlerSearch method in controller.js file and pass in that controlSearchResult function 
    });
  }
}

export default new SearchView();
