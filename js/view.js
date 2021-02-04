class View {
  constructor() {
    this.authorInput = document.getElementById('author');
    this.bookInput = document.getElementById('book');
    this.categorySelect = document.getElementById('category');
    this.priority = document.getElementById('priority');
    this.btnAdd = document.getElementById('btnAdd');
    this.btnClearOne = document.getElementById('btnClearOne');
    this.tableBook = document.getElementById('tableBook');
    this.searchInput = document.getElementById('searchInput');
  }

  _getValues = () => {
    if (
      this.authorInput.value.length === 0 ||
      this.bookInput.value.length === 0 ||
      this.categorySelect.selectedIndex == 0 ||
      this.priority.selectedIndex == 0
    ) {
      return null;
    } else {
      const obj = {
        author: this.authorInput.value,
        title: this.bookInput.value,
        category: this.categorySelect.options[this.categorySelect.selectedIndex]
          .text,
        priority: this.priority.options[this.priority.selectedIndex].text,
      };
      return obj;
    }
  };

  _generateTable = (table, data) => {
    for (let element of data) {
      let row = table.insertRow();
      for (const key in element) {
        let cell = row.insertCell();
        cell.classList.add('text-wrap', 'text-break', 'smallPadding');
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  };

  _clearDOM = () => {
    while (this.tableBook.lastElementChild.firstChild) {
      this.tableBook.lastElementChild.removeChild(
        this.tableBook.lastElementChild.firstChild
      );
    }
  };

  _clearInput = () => {
    this.authorInput.value = '';
    this.bookInput.value = '';
    this.categorySelect.selectedIndex = 0;
    this.priority.selectedIndex = 0;
  };

  bindAddBook = (handler) => {
    this.btnAdd.addEventListener('click', (event) => {
      event.preventDefault();
      if (this._getValues()) {
        handler(this._getValues());
      } else {
        alert('Uzupełnij pola');
      }
    });
  };

  bindSortColumn = (handler) => {
    this.tableBook.tHead.rows.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        //console.log(event.target.dataset.value);
        handler(event.target.dataset.value);
      });
    });
  };

  bindSearchInput = (handler) => {
    this.searchInput.addEventListener('input', (event) => {
      handler(event.target.value);
    });
    // this.searchInput.addEventListener('click', (event) => {
    //   handler(event.target.value);
    // });
  };

  windowsTarget = () => {
    window.addEventListener('click', (event) => {
      console.log(event.target);
    });
  };

  displayBooks = (lists) => {
    this._clearDOM();
    this._generateTable(this.tableBook.lastElementChild, lists);
    this._clearInput();
  };
}

export const view = new View();
