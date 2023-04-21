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

    this.#itemComponent = new ItemView(
      this.#item,
      this.#handleItemClick,
      this.#handleFaveClick
    );
    render(this.#itemComponent, this.#itemListContainer);
  }

  #handleItemClick = () => {
    console.log("main item clicked");
  };

  #handleFaveClick = () => {
    console.log("fave button clicked");
  };
}
