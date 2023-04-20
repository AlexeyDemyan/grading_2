import { RenderPosition, render } from "../framework/render.js";
import NoItemsView from "../view/no-items-view.js";
import CatalogueListView from "../view/catalogue-list-view.js";
import ItemPresenter from "./item-presenter.js";
import { ITEMS_SHOW_COUNT } from '../const.js';
import { FilterReason, FilterColor } from '../const.js';
import { filterByReason, filterByColor } from '../utils/filter.js';
import CatalogueButtonWrapView from "../view/catalogue-btn-wrap-view.js";
import { disableAndHideButton } from "../utils/hide-button.js";

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
  #catalogueButtonWrapView = null;

  constructor(itemsListContainer, itemsModel, filtersModel) {
    this.#itemListContainer = itemsListContainer;
    this.#itemsModel = itemsModel;
    this.#filtersModel = filtersModel;
  }

  get items() {
    this.#filterReason = this.#filtersModel.filterReason;
    this.#filterColor = this.#filtersModel.filterColor;
    const items = this.#itemsModel.items;
    console.log(items);
    const filteredByReasonItems = filterByReason(items, this.#filtersModel.filterReason);
    console.log(items);
    const filteredByColorItems = filterByColor(filteredByReasonItems, this.#filtersModel.filterColor);
    console.log(filteredByColorItems);

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

  #renderLoadMoreButton() {
    this.#catalogueButtonWrapView = new CatalogueButtonWrapView(this.#handleLoadMoreButtonClick);
    render(this.#catalogueButtonWrapView, this.#itemListContainer, RenderPosition.AFTEREND);
  }

  #renderBoard() {
    if (this.items.length === 0) {
      render(this.#noItemsMessageComponent, this.#itemListContainer);
    } else {
      render(this.#itemsListComponent, this.#itemListContainer);
      this.#renderItems(this.items.slice(0, Math.min(ITEMS_SHOW_COUNT, this.#renderedItemCount)));
      // this.#renderItems(this.items);
      // console.log(this.items);
      this.#renderLoadMoreButton();

      if(this.#renderedItemCount >= this.items.length) {
        disableAndHideButton(loadMoreButtonElement);
      }
    }
  }

  #handleLoadMoreButtonClick = () => {
    const loadMoreButtonElement = this.#catalogueButtonWrapView.element.querySelector('.catalogue__show-more-btn');
    const newRenderedItemsCount = Math.min(this.items.length, this.#renderedItemCount + ITEMS_SHOW_COUNT);
    const items = this.items.slice(this.#renderedItemCount, newRenderedItemsCount);
    this.#renderItems(items);
    this.#renderedItemCount = newRenderedItemsCount;
    console.log(this.#renderedItemCount);

    if(this.#renderedItemCount >= this.items.length) {
      disableAndHideButton(loadMoreButtonElement);
    }
  }

  init() {
    this.#items = [...this.#itemsModel.items];

    this.#renderBoard();
  }
}
