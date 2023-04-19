import AbstractView from "../framework/view/abstract-view.js";

const createCatalogueContainerViewTemplate = () => `<div class="container"> </div>`;

export default class CatalogueContainerView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createCatalogueContainerViewTemplate();
  }
}
