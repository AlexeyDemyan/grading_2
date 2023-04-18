import { render } from "../framework/render.js";
import ErrorView from "../view/error-view.js";
import HeroView from "../view/hero-view.js";
import AdvantagesView from "../view/advantages-view.js";
import MissionView from "../view/mission-view.js";
import FilterReasonView from "../view/filter-reason-view.js";
import FilterColorView from "../view/filter-color-view.js";
import CatalogueView from "../view/catalogue-view.js";
import PopupDeferredView from "../view/popup-deferred-view.js";


export default class MainPresenter {
  #mainMenuContainer = null;
  #errorMessageComponent = new ErrorView();
  #heroComponent = new HeroView();
  #advantagesComponent = new AdvantagesView();
  #missionComponent = new MissionView();
  #filterReasonComponent = new FilterReasonView();
  #filterColorComponent = new FilterColorView();
  #popupDeferredComponent = new PopupDeferredView();
  #catalogueViewComponent = new CatalogueView();

  constructor(mainMenuContainer) {
    this.#mainMenuContainer = mainMenuContainer;
  }

  #renderBoard() {
    render(this.#heroComponent, this.#mainMenuContainer);
    render(this.#missionComponent, this.#mainMenuContainer);
    render(this.#advantagesComponent, this.#mainMenuContainer);
    render(this.#filterReasonComponent, this.#mainMenuContainer);
    render(this.#errorMessageComponent, this.#mainMenuContainer);
    render(this.#filterColorComponent, this.#mainMenuContainer);
    render(this.#catalogueViewComponent, this.#mainMenuContainer)
    render(this.#popupDeferredComponent, this.#mainMenuContainer);
  }

  init() {
    this.#renderBoard();
  }

}
