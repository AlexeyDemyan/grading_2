import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class ItemsModel extends Observable {
  #itemsApiService = null;
  #items = [];
  #favorites = [];
  #specificItem = {};

  constructor({itemsApiService}) {
    super();
    this.#itemsApiService = itemsApiService;
  }

  get items() {
    return this.#items;
  }

  get favorites() {
    return this.#favorites;
  }

  get specificItem () {
    return this.#specificItem;
  }

  async init() {
    try {
      this.#items = await this.#itemsApiService.items;
    }
    catch(err) {
      console.log(err);
      this.#items = [];
    }
    this._notify();
  }

  async getSpecificItem(itemId) {
    try {
      this.#specificItem = await this.#itemsApiService.getSpecificItem(itemId)
    }
    catch(err) {
      console.log(err);
      this.#specificItem = {};
    }
    console.log(this.#specificItem);
    return this.#specificItem;
  }

}
