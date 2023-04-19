import { render } from "../framework/render.js";
import NoItemsView from "../view/no-items-view.js";
import CatalogueListView from "../view/catalogue-list-view.js";
import ItemPresenter from "./item-presenter.js";

export default class ItemListPresenter {
  #itemListContainer = null;
  #itemsModel = null;

  #itemPresenters = [];
  #items = [];

  #itemsListComponent = new CatalogueListView();
  #noItemsMessageComponent = new NoItemsView();

  constructor(itemsListContainer, itemsModel) {
    this.#itemListContainer = itemsListContainer;
    this.#itemsModel = itemsModel;
  }

  #renderItem(item) {
    const itemPresenter = new ItemPresenter(this.#itemListContainer);
    itemPresenter.init(item);
    this.#itemPresenters.push(itemPresenter);
  }

  #renderBoard() {
    if (this.#items.length === 0) {
      render(this.#noItemsMessageComponent, this.#itemListContainer);
    } else {
      render(this.#itemsListComponent, this.#itemListContainer);
      this.#items.forEach(item => {
        this.#renderItem(item);
      })
    }
  }

  init() {
    this.#items = [...this.#itemsModel.items];

    this.#renderBoard();
  }
}
