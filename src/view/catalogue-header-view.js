import AbstractView from "../framework/view/abstract-view.js";
import { SortType } from "../const.js";

const createCatalogueHeaderViewTemplate = (
  chosenSortType
) => `<div class="catalogue__header">
<h2 class="title title--h3 catalogue__title">Каталог</h2>
<div class="catalogue__sorting">
  <div class="sorting-price">
    <h3 class="title sorting-price__title">Цена</h3><a class="sorting-price__link sorting-price__link--incr ${
      chosenSortType === SortType.PRICE_UP ? "sorting-price__link--active" : ""
    }" href="#" aria-label="сортировка по возрастанию цены">
      <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
        <use xlink:href="#icon-increase-sort"></use>
      </svg></a><a class="sorting-price__link ${
        chosenSortType === SortType.PRICE_DOWN
          ? "sorting-price__link--active"
          : ""
      }" href="#" aria-label="сортировка по убыванию цены">
      <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true">
        <use xlink:href="#icon-descending-sort"></use>
      </svg></a>
  </div>
</div>
</div>`;

export default class CatalogueHeaderView extends AbstractView {
  #chosenSortType = null;
  #handleSortTypeChange = null;

  constructor(chosenSortType, onSortTypeChange) {
    super();
    this.#chosenSortType = chosenSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener("click", this.#sortTypeChangeHandler);
  }

  get template() {
    return createCatalogueHeaderViewTemplate(this.#chosenSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.classList.contains("sorting-price__icon")) {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
