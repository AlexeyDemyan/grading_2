import { render } from "../framework/render.js";
import ItemView from "../view/item-view.js";
import { modals } from '../modals/init-modals.js';
import ModalView from "../view/modal-view.js";

export default class ItemPresenter {
  #itemListContainer = null;
  #modalContainer = null;
  #itemComponent = null;
  #modalComponent = null;

  #item = null;

  constructor(itemListContainer, modalContainer) {
    this.#itemListContainer = itemListContainer;
    this.#modalContainer = modalContainer;
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
    document.querySelector('body').classList.add('scroll-lock');
    modals.open("popup-data-attr");
    console.log('need to populate item data into popup now');
    this.#modalComponent = new ModalView(this.#item, this.#handleFaveClick);
    render(this.#modalComponent, this.#modalContainer);
  };

  #handleFaveClick = () => {
    console.log("fave button clicked");
  };
}
