class Model {
  constructor() {
    this.lists = [];
  }

  _commit = (lists) => {
    this.onListChanged(lists);
  };

  bindToBooksListChanged = (callback) => {
    this.onListChanged = callback;
  };

  addBook = (obj) => {
    const { author, title, category, priority } = obj;
    const element = {
      author: author,
      title: title,
      category: category,
      priority: priority,
    };
    this.lists.push(element);
    this._commit(this.lists);
  };
}

export const model = new Model();
