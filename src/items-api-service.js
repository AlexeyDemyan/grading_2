import ApiService from '../src/framework/api-service.js'

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class ItemsApiService extends ApiService {
  get items() {
    return this._load({url: 'products'}).then(ApiService.parseResponse);
  }
}
