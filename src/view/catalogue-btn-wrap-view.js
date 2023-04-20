import AbstractView from "../framework/view/abstract-view.js";
import { ScrollUp } from "../const.js";

const createCatalogueButtonWrapViewTemplate =
  () => `<div class="catalogue__btn-wrap">
<button class="btn btn--outlined catalogue__show-more-btn" type="button">больше букетов
</button>
<button class="btn-round btn-round--to-top btn-round--size-small catalogue__to-top-btn" type="button" aria-label="наверх">
  <svg width="80" height="85" aria-hidden="true" focusable="false">
    <use xlink:href="#icon-round-button"></use>
  </svg>
</button>
</div>`;

export default class CatalogueButtonWrapView extends AbstractView {
  #handleClick = null;
  #handleScrollUpClik = null;

  constructor(onClick) {
    super();
    this.#handleClick = onClick;
    this.#handleScrollUpClik = () => {
      window.scrollTo({
        top: ScrollUp.TOP,
        behavior: ScrollUp.BEHAVIOUR,
      });
    };

    this.element
      .querySelector(".catalogue__show-more-btn")
      .addEventListener("click", this.#handleClick);
    this.element
      .querySelector(".catalogue__to-top-btn")
      .addEventListener("click", this.#handleScrollUpClik);
  }

  get template() {
    return createCatalogueButtonWrapViewTemplate();
  }
}
