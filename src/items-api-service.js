import ApiService from "../src/framework/api-service.js";

const URL = "products";
const CART = "cart";

const Method = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

const ActionType = {
  REMOVE: "REMOVE",
  CLEAN: "CLEAN",
  REMOVE_ALL: "REMOVE_ALL",
};

export default class ItemsApiService extends ApiService {
  get items() {
    return this._load({ url: URL }).then(ApiService.parseResponse);
  }

  get shoppingCart() {
    return this._load({ url: CART }).then(ApiService.parseResponse);
  }

  async getSpecificItem(itemId) {
    return this._load({ url: `${URL}/${itemId}` }).then(
      ApiService.parseResponse
    );
  }

  async addItemToFaves(item) {
    const parsedResponse = await this._load({
      url: `${URL}/${item.id}`,
      method: Method.PUT,
      body: JSON.stringify(item),
      headers: new Headers({ "Content-Type": "application/json" }),
    }).then(ApiService.parseResponse);

    return parsedResponse;
  }

  async removeItemFromFaves(item, type) {
    let response;

    const shoppingCart = await this.shoppingCart;
    const amount = shoppingCart.products[item.id];
    const itemId = Object.keys(shoppingCart.products);

    switch (type) {
      case ActionType.REMOVE_ALL:
        for (let i = 0; i <= amount; i++) {
          response = this._load({
            url: `${URL}/${item.id}`,
            method: Method.DELETE,
          });
        }
        break;
      case ActionType.REMOVE:
        response = this._load({
          url: `${URL}/${item.id}`,
          method: Method.DELETE,
        });
        break;
      case ActionType.CLEAN:
        itemId.forEach((id) => {
          for (let i = 0; i <= shoppingCart.products[id]; i++) {
            response = this._load({
              url: `${URL}/${item.id}`,
              method: Method.DELETE,
            });
          }
        });
    }
    return response;
  }
}
