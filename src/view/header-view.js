import AbstractView from "../framework/view/abstract-view.js";

const createHeaderTemplate = () => `<header class="header">
<div class="container">
  <div class="header__wrapper">
    <div class="logo">
      <a class="logo__link" aria-label="Логотип">
        <svg width="86" height="84" aria-hidden="true">
          <use xlink:href="#icon-logo"></use>
        </svg>
      </a>
    </div>
    <div class="header__title">
      <h1 class="title title--header">Букетик</h1>
    </div>
    <div class="header__container">
      <div class="header-count">
        <button class="header-count__btn" type="button">
          <svg width="60" height="47" aria-hidden="true">
            <use xlink:href="#icon-heart-header"></use>
          </svg>
          <span class="visually-hidden">закрыть</span>
        </button>
        <div class="header-count__count">
          <p class="text text--size-20 header-count__counter">4</p>
        </div>
        <div class="header-count__block">
          <p class="text text--size-20 header-count__text">сумма</p>
          <b class="price price--size-min header-count__price">
            15 700
            <span>Р</span>
          </b>
        </div>
      </div>
    </div>
  </div>
</div>
</header>`;

export default class HeaderView extends AbstractView {
  get template() {
    return createHeaderTemplate;
  }
}
