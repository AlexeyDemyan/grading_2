// Импорт вендоров и утилит, не удаляйте его
import "./vendor";
import { ImageSlider } from "./utils/image-slider";
import { iosVhFix } from "./utils/ios-vh-fix";
import { modals, initModals } from "./modals/init-modals";
import HeaderPresenter from "./presenter/header-presenter";
import MainPresenter from "./presenter/main-presenter.js";
import ItemsModel from "./model/items-model";
import ItemsApiService from "./items-api-service";
import { ApiCredentials } from './const.js';
import ItemListPresenter from "./presenter/item-list-presenter";
import FiltersModel from "./model/filters-model.js";

// Ваши импорты...

// Код для работы попапов, не удаляйте его
window.addEventListener("DOMContentLoaded", () => {
  iosVhFix();

  window.addEventListener("load", () => {
    // Инициализация слайдера
    const imageSlider = new ImageSlider(".image-slider");
    imageSlider.init();

    // Инициализация попапов
    initModals();
  });

  // Пример кода для открытия попапа
  document
    .querySelector(".element-which-is-open-popup")
    .addEventListener("click", () => modals.open("popup-data-attr"));

  // Код отработает, если разметка попапа уже отрисована в index.html

  // Если вы хотите рисовать разметку попапа под каждое "открытие",
  // то не забудьте перенесети в код addEventListener инициализацию слайдера

  // ------------

  // Ваш код...

  const mainElement = document.querySelector("main");

  const itemsModel = new ItemsModel({
    itemsApiService: new ItemsApiService(
      ApiCredentials.END_POINT,
      ApiCredentials.AUTHORIZATION
    ),
  });

  const filtersModel = new FiltersModel();

  const headerPresenter = new HeaderPresenter(mainElement);
  const mainPresenter = new MainPresenter(mainElement, itemsModel, filtersModel);
  const itemListPresenter = new ItemListPresenter(mainElement, itemsModel, filtersModel)

  headerPresenter.init();
  mainPresenter.init();
  itemListPresenter.init();

  itemsModel.init();

});
