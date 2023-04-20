import { RenderPosition } from "../framework/render.js";
import { render } from "../framework/render.js";
import HeaderView from "../view/header-view.js";

export default class HeaderPresenter {
  #mainMenuContainer = null;
  #headerComponent = null;

  #data = null;

  constructor(mainMenuContainer) {
    this.#mainMenuContainer = mainMenuContainer;
  }

  init(data) {
    this.#data = data;
    this.#headerComponent = new HeaderView(this.#data);
    render(this.#headerComponent, this.#mainMenuContainer, RenderPosition.BEFOREBEGIN);
  }
}
