import { RenderPosition, render } from "../framework/render.js";
import NoItemsView from "../view/no-items-view.js";
import CatalogueListView from "../view/catalogue-list-view.js";
import ItemPresenter from "./item-presenter.js";
import { ITEMS_SHOW_COUNT } from "../const.js";
import { FilterReason, FilterColor } from "../const.js";
import { filterByReason, filterByColor } from "../utils/filter.js";
import CatalogueButtonWrapView from "../view/catalogue-btn-wrap-view.js";
import { disableAndHideButton } from "../utils/hide-button.js";
import { sortPriceDown, sortPriceUp } from "../utils/sort.js";
import { SortType } from "../const.js";

export default class ItemListPresenter {
  #itemListContainer = null;
  #modalContainer = null;
  #itemsModel = null;
  #filtersModel = null;
  #chosenSortType = null;

  #itemPresenters = [];
  #items = [];

  #renderedItemCount = ITEMS_SHOW_COUNT;
  #filterReason = FilterReason.ALL;
  #filterColor = FilterColor.ALL;

  #itemsListComponent = new CatalogueListView();
  #noItemsMessageComponent = new NoItemsView();
  #catalogueButtonWrapView = null;

  constructor(
    itemsListContainer,
    modalContainer,
    itemsModel,
    filtersModel,
    chosenSortType
  ) {
    this.#itemListContainer = itemsListContainer;
    this.#modalContainer = modalContainer;
    this.#itemsModel = itemsModel;
    this.#filtersModel = filtersModel;
    this.#chosenSortType = chosenSortType;
  }

  get items() {
    this.#filterReason = this.#filtersModel.filterReason;
    this.#filterColor = this.#filtersModel.filterColor;
    const items = this.#itemsModel.items;
    const filteredByReasonItems = filterByReason(
      items,
      this.#filtersModel.filterReason
    );
    const filteredByColorItems = filterByColor(
      filteredByReasonItems,
      this.#filtersModel.filterColor
    );
    this.#items = filteredByColorItems;

    switch (this.#chosenSortType) {
      case SortType.PRICE_UP:
        return filteredByColorItems.sort(sortPriceUp);
      case SortType.PRICE_DOWN:
        return filteredByColorItems.sort(sortPriceDown)
    }
    this.#items = filteredByColorItems;

    return filteredByColorItems;
  }

  #renderItem(item) {
    const itemPresenter = new ItemPresenter(
      this.#itemListContainer,
      this.#modalContainer,
      this.#itemsModel
    );
    itemPresenter.init(item);
    this.#itemPresenters.push(itemPresenter);
  }

  #renderItems(items) {
    items.forEach((item) => {
      this.#renderItem(item);
    });
  }

  #renderLoadMoreButton() {
    this.#catalogueButtonWrapView = new CatalogueButtonWrapView(
      this.#handleLoadMoreButtonClick
    );
    render(
      this.#catalogueButtonWrapView,
      this.#itemListContainer,
      RenderPosition.AFTEREND
    );
  }

  #renderBoard() {
    if (this.items.length === 0) {
      render(this.#noItemsMessageComponent, this.#itemListContainer);
    } else {
      render(this.#itemsListComponent, this.#itemListContainer);
      this.#renderItems(
        this.items.slice(0, Math.min(ITEMS_SHOW_COUNT, this.#renderedItemCount))
      );
      this.#renderLoadMoreButton();

      if (this.#renderedItemCount >= this.items.length) {
        disableAndHideButton(loadMoreButtonElement);
      }
    }
  }

  #handleLoadMoreButtonClick = () => {
    const loadMoreButtonElement =
      this.#catalogueButtonWrapView.element.querySelector(
        ".catalogue__show-more-btn"
      );
    const newRenderedItemsCount = Math.min(
      this.items.length,
      this.#renderedItemCount + ITEMS_SHOW_COUNT
    );
    const items = this.items.slice(
      this.#renderedItemCount,
      newRenderedItemsCount
    );
    this.#renderItems(items);
    this.#renderedItemCount = newRenderedItemsCount;
    if (this.#renderedItemCount >= this.items.length) {
      disableAndHideButton(loadMoreButtonElement);
    }
  };

  init() {
    this.#items = [...this.#itemsModel.items];

    this.#renderBoard();
  }
}
