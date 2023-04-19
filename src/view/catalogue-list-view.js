import AbstractView from "../framework/view/abstract-view.js";

const createCatalogueListViewTemplate = () => `<ul class="catalogue__list"> </ul>`;

export default class CatalogueListView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createCatalogueListViewTemplate();
  }
}
