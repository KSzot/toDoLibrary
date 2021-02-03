import '../scss/main.scss';
import * as mdb from 'mdb-ui-kit';
import { view } from './view';
import { model } from './model';

export default {
  mdb,
};

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.view.bindAddBook(this.handleAddBook);
    this.model.bindToBooksListChanged(this.onListChanged);
    this.view.bindSortColumn(this.handleSortColumn);
  }

  onListChanged = (lists) => {
    this.view.displayBooks(lists);
  };

  handleAddBook = (books) => {
    this.model.addBook(books);
  };

  handleSortColumn = (columnName) => {
    this.model.sortColumn(columnName);
  };
}

const app = new Controller(view, model);
