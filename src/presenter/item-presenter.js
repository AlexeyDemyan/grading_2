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

    // const libba = await this.#itemsModel.getSpecificItem(item.id)
    // console.log(libba);
    // this.#specificItem = item.id;
    // await this.#itemsModel.get
  }

  async getSpecificItem(itemId) {
    const libba = await this.#itemsModel.getSpecificItem(itemId);
    console.log(libba);
    console.log('I guess will be creating photos here then');
    return libba;
  }

  #handleItemClick = () => {
    // try {
    //   this.#itemsModel.getSpecificItem(this.#item.id);
    //   console.log(this.#itemsModel.specificItem);
    // }
    // catch(err) {
    //   console.log(err)
    // }
    // console.log(this.#itemsModel.specificItem);


    // this.#itemsModel.specificItem = this.#itemsModel.getSpecificItem(this.#item.id);
    // this.#specificItem = this.#itemsModel.getSpecificItem(this.#item.id);
    this.#specificItem = this.getSpecificItem(this.#item.id);
    console.log(this.#specificItem)
    console.log(this.#itemsModel.specificItem);

    document.querySelector("body").classList.add("scroll-lock");
    modals.open("popup-data-attr");
    this.#modalComponent = new ModalView(
      this.#item,
      this.#specificItem,
      this.#handleFaveClick,
      this.#handleClose
    );
    console.log(this.#specificItem);
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
