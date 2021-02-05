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
    this.categoryFilter = document.getElementById('categoryFilter');
    this.itemCounter = document.getElementById('itemCounter');
    this.btnUpdate = document.getElementById('btnUpdate');
    this.btnDelete = document.getElementById('btnDelete');
    this.btnDeleteAll = document.getElementById('btnDeleteAll');
    this.btnNavbar = document.querySelector('.navbar-toggler');
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
        if (key != 'id') {
          let cell = row.insertCell();
          cell.classList.add('text-wrap', 'text-break', 'smallPadding');
          cell.setAttribute('data-value', element.id);
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
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
    this.authorInput.classList.remove('active');
    this.bookInput.value = '';
    this.bookInput.classList.remove('active');
    this.categorySelect.selectedIndex = 0;
    this.priority.selectedIndex = 0;
  };

  _changeItemCounter = (value) => {
    this.itemCounter.textContent = `Licznik pozycji: ${value}`;
  };

  _displayNone(element) {
    element.classList.remove('d-inline-block');
    element.classList.add('d-none');
  }
  _displayInline(element) {
    element.classList.add('d-inline-block');
    element.classList.remove('d-none');
  }

  _setValueonFormSelected = (selectForm, name) => {
    selectForm.forEach((element, index) => {
      if (element.text == name) {
        selectForm.selectedIndex = index;
      }
    });
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
      if (this.categoryFilter.selectedIndex != 0) {
        const columnName = this.categoryFilter[
          this.categoryFilter.selectedIndex
        ].dataset.value;
        handler(event.target.value, columnName);
      }
    });
    // this.searchInput.addEventListener('click', (event) => {
    //   handler(event.target.value);
    // });
  };

  bindEditOrDeleteItem = (handler) => {
    this.tableBook.lastElementChild.addEventListener('click', (event) => {
      const id = event.target.dataset.value;
      this._displayNone(this.btnAdd);
      this._displayInline(this.btnDelete);
      this._displayInline(this.btnUpdate);
      handler(id);
    });
  };

  bindClearInput = () => {
    this.btnClearOne.addEventListener('click', () => {
      this._clearInput();
    });
  };

  windowsTarget = () => {
    window.addEventListener('click', (event) => {
      console.log(event.target);
    });
  };

  displayBooks = (lists) => {
    this._clearDOM();
    this._generateTable(this.tableBook.lastElementChild, lists);
    this._changeItemCounter(lists.length);
    this._clearInput();
  };
  onInsertToInput = (obj) => {
    this.authorInput.value = obj.author;
    this.authorInput.classList.add('active');
    this.bookInput.value = obj.title;
    this.bookInput.classList.add('active');

    this._setValueonFormSelected(this.categorySelect, obj.category);
    this._setValueonFormSelected(this.priority, obj.priority);
  };

  bindUpdateBook = (handler) => {
    this.btnUpdate.addEventListener('click', (event) => {
      event.preventDefault();
      if (this._getValues()) {
        handler(this._getValues());
        this._displayNone(this.btnUpdate);
        this._displayNone(this.btnDelete);
        this._displayInline(this.btnAdd);
      } else {
        alert('Uzupełnij pola');
      }
    });
  };

  bindDeleteBook = (handler) => {
    this.btnDelete.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
      this._displayNone(this.btnUpdate);
      this._displayNone(this.btnDelete);
      this._displayInline(this.btnAdd);
    });
  };

  bindDeleteAllBook = (handler) => {
    this.btnDeleteAll.addEventListener('click', () => {
      handler();
      this._displayNone(this.btnUpdate);
      this._displayNone(this.btnDelete);
      this._displayInline(this.btnAdd);
    });
  };
}

export const view = new View();
