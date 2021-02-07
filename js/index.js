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
    this.initFun(this.model.lists, this.model.listsCategory);
    this.view.bindDeleteBook(this.handleDeleteBook);
    this.view.bindDeleteAllBook(this.handleDeleteAllBook);
    this.view.stopSubmit();
    this.view.createOptionElement(this.handleCreateOption);
    this.view.showHideCreateBookForm();
    this.view.backToEditOrDeleteItem();
    this.view.removeAnimation();
    this.view.afterSelectedDisplaySearch();
    this.view.exportTableToCsv();
    this.view.exportTableToXls();
    //this.view.windowsTarget();
  }

  initFun = (listBook, listCategory) => {
    this.view.displayBooks(listBook);
    this.view.displayCategory(listCategory);
  };

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

  handleDeleteBook = () => {
    this.model.onDeleteBook();
  };

  handleDeleteAllBook = () => {
    this.model.onDeleteAllBook();
  };

  handleCreateOption = (text) => {
    this.model.onSaveNewOption(text);
  };
}

const app = new Controller(view, model);
