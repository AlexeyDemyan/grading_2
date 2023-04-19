import { render } from "../framework/render.js";
import ItemView from "../view/item-view.js";

export default class ItemPresenter {
  #itemListContainer = null;
  #itemComponent = null;

  #item = null;

  constructor(itemListContainer) {
    this.#itemListContainer = itemListContainer;
  }

  init(item) {
    this.#item = item;

    this.#itemComponent = new ItemView(this.#item);

    render(this.#itemComponent, this.#itemListContainer);
  }
}
