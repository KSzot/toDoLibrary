class Model {
  constructor() {
    this.lists = JSON.parse(localStorage.getItem('listOfBooks')) || [];
    this.listsCategory = JSON.parse(localStorage.getItem('listOfCategory')) || [
      'Kryminał',
      'Poezja',
      'Dramat',
    ];
    this.sortDirection = false;
    this.temporaryList = [];
  }

  _saveInLocalStorage = (lists) => {
    localStorage.removeItem('listOfBooks');
    localStorage.setItem('listOfBooks', JSON.stringify(lists));
  };
  _commit = (lists) => {
    this.onListChanged(lists);
  };

  sortColumn = (columnName, obj) => {
    this.sortDirection = !this.sortDirection;
    if (obj.isSearch && obj.columnName != undefined) {
      this._sortColumnTemp(columnName, this.sortDirection);
      this._commit(this.temporaryList);
    } else {
      this._sortColumn(columnName, this.sortDirection);
      this._commit(this.lists);
    }
  };

  _sortColumnTemp = (columnName, sortDirection) => {
    if (this.temporaryList.length > 0) {
      const dataType = typeof this.temporaryList[0][columnName];
      switch (dataType) {
        case 'number':
          this._sortNumberColumnTemp(sortDirection, columnName);
          break;
        case 'string':
          this._sortStringColumnTemp(sortDirection, columnName);
          break;
      }
    }
  };

  _sortNumberColumnTemp = (sort, columnName) => {
    this.temporaryList = this.temporaryList.sort((p1, p2) =>
      sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
    );
  };
  _sortStringColumnTemp = (sort, columnName) => {
    this.temporaryList = this.temporaryList.sort((p1, p2) => {
      let x = p1[columnName].toLowerCase();
      let y = p2[columnName].toLowerCase();
      if (this.sortDirection) {
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      } else {
        if (x < y) {
          return 1;
        }
        if (x > y) {
          return -1;
        }
        return 0;
      }
    });
  };

  _sortColumn = (columnName, sortDirection) => {
    if (this.lists.length > 0) {
      const dataType = typeof this.lists[0][columnName];
      switch (dataType) {
        case 'number':
          this._sortNumberColumn(sortDirection, columnName);
          break;
        case 'string':
          this._sortStringColumn(sortDirection, columnName);
          break;
      }
    }
  };

  _sortNumberColumn = (sort, columnName) => {
    this.lists = this.lists.sort((p1, p2) =>
      sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
    );
  };
  _sortStringColumn = (sort, columnName) => {
    this.lists = this.lists.sort((p1, p2) => {
      let x = p1[columnName].toLowerCase();
      let y = p2[columnName].toLowerCase();
      if (this.sortDirection) {
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      } else {
        if (x < y) {
          return 1;
        }
        if (x > y) {
          return -1;
        }
        return 0;
      }
    });
  };

  bindToBooksListChanged = (callback) => {
    this.onListChanged = callback;
  };

  addBook = (book, obj) => {
    const { author, title, category, priority } = book;
    const element = {
      title: title,
      author: author,
      category: category,
      priority: parseInt(priority),
      id: new Date().getTime(),
    };
    this.lists.push(element);
    this._saveInLocalStorage(this.lists);
    if (obj.isSearch && obj.columnName != undefined) {
      this.filterByValue(obj.isSearch, obj.columnName);
    } else {
      this._sortColumn('priority', false);
      this._commit(this.lists);
    }
  };

  filterByValue = (value, columnName) => {
    this.temporaryList = [
      ...this.lists.filter((obj) =>
        Object.keys(obj).some((key) =>
          obj[columnName].toLowerCase().includes(value.toLowerCase())
        )
      ),
    ];
    //this._commit(this.temporaryList);
    this._commit(this.temporaryList);
  };

  onCurrentItem = (id, handler) => {
    this.currentItem = id;
    const obj = this.lists.find((e) => e.id == id);
    handler(obj);
  };

  onUpdateBook = (book, obj) => {
    this.lists = this.lists.map((el) =>
      el.id == this.currentItem
        ? {
            title: book.title,
            author: book.author,
            category: book.category,
            priority: parseInt(book.priority),
            id: this.currentItem,
          }
        : el
    );
    this._saveInLocalStorage(this.lists);
    if (obj.isSearch && obj.columnName != undefined) {
      this.filterByValue(obj.isSearch, obj.columnName);
    } else {
      this._sortColumn('priority', false);
      this._commit(this.lists);
    }
  };

  onDeleteBook = (obj) => {
    this.lists = this.lists.filter((item) => item.id != this.currentItem);
    this._saveInLocalStorage(this.lists);
    if (obj.isSearch && obj.columnName != undefined) {
      this.filterByValue(obj.isSearch, obj.columnName);
    } else {
      this._sortColumn('priority', false);
      this._commit(this.lists);
    }
  };

  onDeleteAllBook = () => {
    this.lists = [];
    this._saveInLocalStorage(this.lists);
    this._commit(this.lists);
  };
  onSaveNewOption = (text) => {
    localStorage.removeItem('listOfCategory');
    this.listsCategory.push(text);
    localStorage.setItem('listOfCategory', JSON.stringify(this.listsCategory));
  };
}

export const model = new Model();
