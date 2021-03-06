import TableCSVExporter from './tableCsvExport';
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
    this.formSubmit = document.getElementById('formSubmit');
    this.btnNewCategory = document.getElementById('btnNewCategory');
    this.newCategoryInput = document.getElementById('newCategoryInput');
    this.btnShowHide = document.getElementById('btnShowHide');
    this.btnBack = document.getElementById('btnBack');
    this.divMoveDown = document.getElementById('MoveDown');
    this.btnExportCsv = document.getElementById('btnExportCsv');
    this.btnExportXls = document.getElementById('btnExportXls');
  }

  _conditionFuntoGetValue(nameObj, refObj, text) {
    if (nameObj == 0) {
      refObj.fields = true;
      refObj.stringBuilder += `${text}.\n`;
    }
  }

  _getValues = () => {
    const passObj = {
      fields: false,
      stringBuilder: '',
    };

    this._conditionFuntoGetValue(
      this.authorInput.value.length,
      passObj,
      'Pole autor jest wymagane'
    );
    this._conditionFuntoGetValue(
      this.bookInput.value.length,
      passObj,
      'Pole tytuł książki jest wymagane'
    );
    this._conditionFuntoGetValue(
      this.categorySelect.selectedIndex,
      passObj,
      'Pole kategoria jest wymagane'
    );
    this._conditionFuntoGetValue(
      this.priority.selectedIndex,
      passObj,
      'Pole piorytet jest wymagane'
    );
    if (passObj.fields) {
      const d = document.getElementById('modalBodyBadInput');
      if (d.lastElementChild) {
        d.removeChild(d.lastElementChild);
      }
      const elP = document.createElement('p');
      elP.innerText = passObj.stringBuilder;
      d.appendChild(elP);
      $('#exampleModalBadInput').modal('show');
      return false;
    } else {
      this.divMoveDown.textContent = 'Dodano książkę pomyślnie!';
      this.divMoveDown.classList.add('divMoveDown');
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

  _getFilterInput = () => {
    return {
      isSearch: this.searchInput.value,
      columnName: this.categoryFilter[this.categoryFilter.selectedIndex].dataset
        .value,
    };
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
        handler(this._getValues(), this._getFilterInput());
      }
    });
  };

  bindSortColumn = (handler) => {
    this.tableBook.tHead.rows.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        handler(event.target.dataset.value, this._getFilterInput());
      });
    });
  };

  bindSearchInput = (handler) => {
    this.searchInput.addEventListener('input', (event) => {
      event.preventDefault();
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
      this.btnShowHide.textContent = 'Ukryj';
      $('.multi-collapse').collapse('show');
      this._displayNone(this.btnAdd);
      this._displayNone(this.btnClearOne);
      this._displayInline(this.btnBack);
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
        handler(this._getValues(), this._getFilterInput());
        this.divMoveDown.textContent = 'Zaktualizowano książkę pomyślnie!';
        this.divMoveDown.classList.add('divMoveDown');
        this._displayNone(this.btnUpdate);
        this._displayNone(this.btnDelete);
        this._displayNone(this.btnBack);
        this._displayInline(this.btnAdd);
        this._displayInline(this.btnClearOne);
      }
    });
  };

  bindDeleteBook = (handler) => {
    this.btnDelete.addEventListener('click', (event) => {
      event.preventDefault();
      handler(this._getFilterInput());
      this.divMoveDown.textContent = 'Usunięto książkę pomyślnie!';
      this.divMoveDown.classList.add('divMoveDown');
      this._displayNone(this.btnUpdate);
      this._displayNone(this.btnDelete);
      this._displayNone(this.btnBack);
      this._displayInline(this.btnAdd);
      this._displayInline(this.btnClearOne);
    });
  };

  bindDeleteAllBook = (handler) => {
    this.btnDeleteAll.addEventListener('click', () => {
      handler();
      this.divMoveDown.textContent = 'Usunięto wszystkie książki!';
      this.divMoveDown.classList.add('divMoveDown');
      this._displayNone(this.btnUpdate);
      this._displayNone(this.btnDelete);
      this._displayNone(this.btnBack);
      this._displayInline(this.btnAdd);
      this._displayInline(this.btnClearOne);
    });
  };

  stopSubmit = () => {
    this.formSubmit.addEventListener('submit', (event) => {
      event.preventDefault();
      this.searchInput.blur();
    });
  };

  createOptionElement = (handler) => {
    this.btnNewCategory.addEventListener('click', (event) => {
      const option = document.createElement('option');
      const id = parseInt(this.categorySelect.lastElementChild.value) + 1;
      const text = this.newCategoryInput.value;
      option.value = id;
      option.text = text;

      this.categorySelect.appendChild(option);
      handler(text);
    });
  };

  displayCategory = (listCategory) => {
    listCategory.forEach((element, index) => {
      const option = document.createElement('option');
      option.text = element;
      option.value = index + 1;
      this.categorySelect.appendChild(option);
    });
  };

  showHideCreateBookForm = () => {
    this.btnShowHide.addEventListener('click', () => {
      this.btnShowHide.textContent =
        this.btnShowHide.textContent.trim() == 'Ukryj' ? 'Pokaż' : 'Ukryj';
    });
  };

  backToEditOrDeleteItem = () => {
    this.btnBack.addEventListener('click', () => {
      this._displayNone(this.btnUpdate);
      this._displayNone(this.btnDelete);
      this._displayNone(this.btnBack);
      this._displayInline(this.btnAdd);
      this._displayInline(this.btnClearOne);
      this._clearInput();
    });
  };
  whichAnimationEvent = () => {
    var el = document.createElement('fakeelement');

    var animations = {
      animation: 'animationiteration',
      OAnimation: 'oAnimationIteration',
      MozAnimation: 'animationiteration',
      WebkitAnimation: 'webkitAnimationIteration',
    };

    for (let t in animations) {
      if (el.style[t] !== undefined) {
        return animations[t];
      }
    }
  };

  removeAnimation = () => {
    this.divMoveDown.addEventListener(this.whichAnimationEvent(), () => {
      this.divMoveDown.classList.remove('divMoveDown');
    });
  };

  afterSelectedDisplaySearch = () => {
    this.categoryFilter.addEventListener('change', (event) => {
      if (event.target.options.selectedIndex != 0) {
        if (this.searchInput.parentNode.classList.contains('d-none')) {
          this.searchInput.parentNode.classList.remove('d-none');
        }
      } else {
        if (!this.searchInput.parentNode.classList.contains('d-none')) {
          this.searchInput.parentNode.classList.add('d-none');
        }
      }
    });
  };

  exportTableToCsv = () => {
    this.btnExportCsv.addEventListener('click', () => {
      const exporter = new TableCSVExporter(this.tableBook);
      const csvOutput = exporter.convertToCSV();
      const csvBlob = new Blob([csvOutput], { type: 'text/csv' });
      const blobUrl = URL.createObjectURL(csvBlob);
      const anchorElement = document.createElement('a');

      anchorElement.href = blobUrl;
      anchorElement.download = 'table-export.csv';
      anchorElement.click();

      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 500);
    });
  };

  exportTableToXls = () => {
    this.btnExportXls.addEventListener('click', () => {
      $('#tableBook').table2excel({
        exclude: '.noExport',
        name: 'Data',
        filename: 'tableBook',
      });

      //   let tableData = document.getElementById('tableBook').outerHTML;
      //   tableData = tableData.replace(/<A[^>]*>|<\/A>/g, '');
      //   tableData = tableData.replace(/<input[^>]*>|<\/input>/gi, '');
      //   let a = document.createElement('a');
      //   let dataType = 'data:application/vnd.ms-excel';
      //   a.href = `data:application/vnd.ms-excel, ${encodeURIComponent(
      //     tableData
      //   )}`;
      //   a.download = 'tableBook.xls';
      //   a.click();
    });
  };
}

export const view = new View();
