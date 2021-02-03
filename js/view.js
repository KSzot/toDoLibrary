class View {
  constructor() {
    this.authorInput = document.getElementById('author');
    this.bookInput = document.getElementById('book');
    this.categorySelect = document.getElementById('category');
    this.priority = document.getElementById('priority');
    this.btnAdd = document.getElementById('btnAdd');
    this.btnClearOne = document.getElementById('btnClearOne');
    this.tableBook = document.getElementById('tableBook');
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

  displayBooks = (lists) => {
    this._generateTable(this.tableBook.lastElementChild, lists);
  };
}

export const view = new View();
