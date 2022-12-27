import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  addHandlerPagination(handler) {
    this._parentElement.addEventListener("click", (e) => {
      let btn = e.target.closest(".pagination__btn");
      if (!btn) return;

      let goToPage = +btn.getAttribute("data-goTo");

      handler(goToPage);
    });
  }

  _generateMarkup() {
    let curPage = this._data.page;
    let numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="pagination__btn pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        </button>`;
    }

    if (curPage < numPages) {
      return `  <button data-goto="${
        curPage - 1
      }" class="pagination__btn pagination__btn--prev">
                <span>Page ${curPage - 1}</span>
                </button>
                <button data-goto="${
                  curPage + 1
                }" class="pagination__btn pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                </button>`;
    }

    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="pagination__btn pagination__btn--prev">
      <span>Page ${curPage - 1}</span>
      </button>`;
    }

    return "";
  }
}

export default new PaginationView();
