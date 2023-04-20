import { render } from "../framework/render.js";
import NoItemsView from "../view/no-items-view.js";
import CatalogueListView from "../view/catalogue-list-view.js";
import ItemPresenter from "./item-presenter.js";
import { ITEMS_SHOW_COUNT } from '../const.js';
import { FilterReason, FilterColor } from '../const.js';
import { filterByReason, filterByColor } from '../utils/filter.js';

export default class ItemListPresenter {
  #itemListContainer = null;
  #itemsModel = null;
  #filtersModel = null;

  #itemPresenters = [];
  #items = [];

  #renderedItemCount = ITEMS_SHOW_COUNT;
  #filterReason = FilterReason.ALL;
  #filterColor = FilterColor.ALL;
  #isLoading = true;

  #itemsListComponent = new CatalogueListView();
  #noItemsMessageComponent = new NoItemsView();

  constructor(itemsListContainer, itemsModel, filtersModel) {
    this.#itemListContainer = itemsListContainer;
    this.#itemsModel = itemsModel;
    this.#filtersModel = filtersModel;
  }

  get items() {
    this.#filterReason = this.#filtersModel.filterReason;
    this.#filterColor = this.#filtersModel.filterColor;
    const items = this.#itemsModel.items;
    const filteredByReasonItems = filterByReason[this.#filterReason](items);
    const filteredByColorItems = filterByColor[this.#filterColor](filteredByReasonItems);

    return filteredByColorItems;
  }

  #renderItem(item) {
    const itemPresenter = new ItemPresenter(this.#itemListContainer);
    itemPresenter.init(item);
    this.#itemPresenters.push(itemPresenter);
  }

  #renderItems(items) {
    items.forEach(item => {this.#renderItem(item)});
  }

  #renderBoard() {
    if (this.items.length === 0) {
      render(this.#noItemsMessageComponent, this.#itemListContainer);
    } else {
      render(this.#itemsListComponent, this.#itemListContainer);
      this.#renderItems(this.items.slice(0, Math.min(6, this.#renderedItemCount)));
    }
  }

  init() {
    this.#items = [...this.#itemsModel.items];

    this.#renderBoard();
  }
}
