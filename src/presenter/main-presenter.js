import { render } from "../framework/render.js";
import ErrorView from "../view/error-view.js";
import HeroView from "../view/hero-view.js";
import AdvantagesView from "../view/advantages-view.js";
import MissionView from "../view/mission-view.js";
import FilterReasonView from "../view/filter-reason-view.js";
import FilterColorView from "../view/filter-color-view.js";
import CatalogueView from "../view/catalogue-view.js";
import PopupDeferredView from "../view/popup-deferred-view.js";
import CatalogueContainerView from "../view/catalogue-container-view.js";
import CatalogueHeaderView from "../view/catalogue-header-view.js";
import CatalogueListView from "../view/catalogue-list-view.js";
import ItemListPresenter from "./item-list-presenter.js";
import { SortType } from "../const.js";

export default class MainPresenter {
  #chosenSortType = SortType.PRICE_UP;

  #mainMenuContainer = null;
  #modalContainer = null;
  #itemsModel = null;
  #filtersModel = null;
  #errorMessageComponent = new ErrorView();
  #heroComponent = new HeroView();
  #advantagesComponent = new AdvantagesView();
  #missionComponent = new MissionView();
  #filterReasonComponent = new FilterReasonView();
  #filterColorComponent = new FilterColorView();
  #popupDeferredComponent = new PopupDeferredView();
  #catalogueViewComponent = new CatalogueView();
  #catalogueContainerView = new CatalogueContainerView();
  #catalogueHeaderView = new CatalogueHeaderView();
  #catalogueListView = new CatalogueListView();

  constructor(mainMenuContainer, modalContainer, itemsModel, filtersModel) {
    this.#mainMenuContainer = mainMenuContainer;
    this.#modalContainer = modalContainer;
    this.#itemsModel = itemsModel;
    this.#filtersModel = filtersModel;

    this.#itemsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  #renderBoard() {
    const itemListPresenter = new ItemListPresenter(
      this.#catalogueListView.element,
      this.#modalContainer,
      this.#itemsModel,
      this.#filtersModel,
      this.#chosenSortType
    );

    render(this.#heroComponent, this.#mainMenuContainer);
    render(this.#missionComponent, this.#mainMenuContainer);
    render(this.#advantagesComponent, this.#mainMenuContainer);
    render(this.#filterReasonComponent, this.#mainMenuContainer);
    render(this.#errorMessageComponent, this.#mainMenuContainer);
    render(this.#filterColorComponent, this.#mainMenuContainer);
    render(this.#catalogueViewComponent, this.#mainMenuContainer);
    render(this.#catalogueContainerView, this.#catalogueViewComponent.element);
    render(this.#catalogueHeaderView, this.#catalogueContainerView.element);
    render(this.#catalogueListView, this.#catalogueContainerView.element);
    render(this.#popupDeferredComponent, this.#mainMenuContainer);

    itemListPresenter.init();
  }

  #handleModelEvent = () => {
    this.init();
  };

  init() {
    this.#renderBoard();
  }
}
