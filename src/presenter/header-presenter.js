import { RenderPosition } from "../framework/render.js";
import { render } from "../framework/render.js";
import HeaderView from "../view/header-view.js";

export default class HeaderPresenter {
  #mainMenuContainer = null;
  #headerComponent = new HeaderView();

  constructor(mainMenuContainer) {
    this.#mainMenuContainer = mainMenuContainer;
  }

  #renderHeader() {
    render(this.#headerComponent, this.#mainMenuContainer, RenderPosition.BEFOREBEGIN);
  }

  init() {
    this.#renderHeader();
  }
}
