import Observable from "../framework/observable.js";
import { UpdateType, ErrorMessage } from "../const.js";

export default class ItemsModel extends Observable {
  #itemsApiService = null;
  #items = [];
  #favorites = [];
  #specificItem = {};

  constructor({ itemsApiService }) {
    super();
    this.#itemsApiService = itemsApiService;
  }

  get items() {
    return this.#items;
  }

  get favorites() {
    return this.#favorites;
  }

  async init() {
    try {
      this.#items = await this.#itemsApiService.items;
    } catch (err) {
      this.#items = [];
    }
    this._notify(UpdateType.INIT);
  }

  async getSpecificItem(itemId) {
    try {
      this.#specificItem = await this.#itemsApiService.getSpecificItem(itemId);
    } catch (err) {
      this.#specificItem = {};
    }
    return this.#specificItem;
  }

  async addToFaves(UpdateType, update) {
    const index = this.#items.findIndex((item) => {
      item.id === update.id;
    });

    if (index === -1) {
      throw new Error(ErrorMessage.ADD_ITEM);
    }

    try {
      await this.#itemsApiService.addItemToFaves(update);
      this._notify(UpdateType, update);
    } catch (err) {
      throw new Error(ErrorMessage.ADD_ITEM);
    }
  }

  async removeFromFaves(UpdateType, update, type) {
    try {
      await this.#itemsApiService.removeItemFromFaves(update, type);
      this._notify(UpdateType, update);
    } catch (err) {
      throw new Error(ErrorMessage.REMOVE_ITEM);
    }
  }
}
