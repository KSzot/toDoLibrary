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
    this.view.bindSearchInput(this.handleSearchInput);
    this.view.bindEditOrDeleteItem(this.handleCurrentItem);
    this.view.bindClearInput();
    this.view.bindUpdateBook(this.handleUpdateBook);
    this.onListChanged(this.model.lists);
    //this.view.windowsTarget();
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

  handleSearchInput = (value, columnName) => {
    this.model.filterByValue(value, columnName);
  };

  handleCurrentItem = (id) => {
    this.model.onCurrentItem(id, this.view.onInsertToInput);
  };
  handleUpdateBook = (book) => {
    this.model.onUpdateBook(book);
  };
}

const app = new Controller(view, model);
