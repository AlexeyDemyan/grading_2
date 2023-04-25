import { render, remove } from "../framework/render.js";
import ItemView from "../view/item-view.js";
import { modals } from "../modals/init-modals.js";
import ModalView from "../view/modal-view.js";

export default class ItemPresenter {
  #itemListContainer = null;
  #modalContainer = null;
  #itemComponent = null;
  #modalComponent = null;
  #itemsModel = null;
  #specificItem = null;

  #item = null;

  constructor(itemListContainer, modalContainer, itemsModel) {
    this.#itemListContainer = itemListContainer;
    this.#modalContainer = modalContainer;
    this.#itemsModel = itemsModel;

    this.#modalContainer
      .querySelector(".modal-product__btn-close")
      .addEventListener("click", this.#handleClose);
  }

  async init(item) {
    this.#item = item;

    this.#itemComponent = new ItemView(
      this.#item,
      this.#handleItemClick,
      this.#handleFaveClick
    );
    render(this.#itemComponent, this.#itemListContainer);

    this.#specificItem = await this.#itemsModel.getSpecificItem(this.#item.id);
  }

  async getSpecificItem(itemId) {
    const libba = await this.#itemsModel.getSpecificItem(itemId);
    return libba;
  }

  #handleItemClick = () => {
    this.#specificItem = this.getSpecificItem(this.#item.id);

    document.querySelector("body").classList.add("scroll-lock");
    modals.open("popup-data-attr");
    this.#modalComponent = new ModalView(
      this.#item,
      this.#specificItem,
      this.#handleFaveClick,
      this.#handleClose
    );
    document.addEventListener("keydown", this.#escKeyDownHandler);
    render(this.#modalComponent, this.#modalContainer);
  };

  #handleFaveClick = () => {
  };

  #handleClose = () => {
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
