import { render, remove } from "../framework/render.js";
import ItemView from "../view/item-view.js";
import { modals } from "../modals/init-modals.js";
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

    this.#modalContainer
      .querySelector(".modal-product__btn-close")
      .addEventListener("click", this.#handleClose);
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
    document.querySelector("body").classList.add("scroll-lock");
    modals.open("popup-data-attr");
    this.#modalComponent = new ModalView(
      this.#item,
      this.#handleFaveClick,
      this.#handleClose
    );
    document.addEventListener("keydown", this.#escKeyDownHandler);
    render(this.#modalComponent, this.#modalContainer);
  };

  #handleFaveClick = () => {
    console.log("fave button clicked");
  };

  #handleClose = () => {
    console.log("closing functionality");
    remove(this.#modalComponent);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === "Escape" || evt.key === "Esc") {
      evt.preventDefault();
      remove(this.#modalComponent);
      document.removeEventListener("keydown", this.#escKeyDownHandler);
    }
  };
}
