class Model {
  constructor() {
    this.lists = [];
    //this.sortDirection = false;
  }

  _commit = (lists) => {
    this.onListChanged(lists);
  };

  _sortColumn = (columnName, sortDirection) => {
    const dataType = typeof this.lists[0][columnName];
    switch (dataType) {
      case 'number':
        this._sortNumberColumn(sortDirection, columnName);
        break;
      case 'string':
        this._sortStringColumn(sortDirection, columnName);
        break;
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

  addBook = (obj) => {
    const { author, title, category, priority } = obj;
    const element = {
      title: title,
      author: author,
      category: category,
      priority: parseInt(priority),
    };
    this.lists.push(element);
    this._sortColumn('priority', false);
    this._commit(this.lists);
  };
}

export const model = new Model();