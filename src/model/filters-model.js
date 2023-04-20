import Observable from '../framework/observable.js';
import { FilterReason, FilterColor } from '../const.js';

export default class FiltersModel extends Observable {
  #filterReason = FilterReason.ALL;
  #filterColor = FilterColor.ALL;

  get filterReason() {
    return this.#filterReason;
  }

  get filterColor() {
    return this.#filterColor;
  }

  setFilters(filterReason, filterColor) {
    this.#filterReason = filterReason;
    this.#filterColor = filterColor;

    this._notify();
  }
}
