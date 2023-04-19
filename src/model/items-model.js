import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class ItemsModel extends Observable {
  #itemsApiService = null;
  #items = [];

  constructor({itemsApiService}) {
    super();
    this.#itemsApiService = itemsApiService;
  }

  get items() {
    return this.#items;
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

}
