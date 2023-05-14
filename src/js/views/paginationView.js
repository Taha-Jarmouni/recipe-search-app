import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      // console.log(btn);
      const goToPage = +btn.dataset.goto
      
      console.log(goToPage);
      handler(goToPage)
    });
  }


/*
in order to figure out if we are now in page number one and they are other pages
we need to know how manny pages there are
in order to know the number of the pages we need the number of the result divided by
the number of the results per page 'RES_PER_PAGE'
*/

  _generateMarkup() {

    const curPage = this._data.page;
    console.log(curPage);
    const numPages = Math.ceil( // we use ceil bc numPages might equal to 5.9 so we need that method to make it equal 6 pages in the button
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) { // curPage === 1  that mean that current page has to be less then other pages and the number of the pages greater then one 
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) { // if the the current page number equal the number of the other pages   // and the numPages also has to be greater then one 
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    // Other page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();


