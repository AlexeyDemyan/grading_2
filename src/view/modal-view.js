import AbstractView from "../framework/view/abstract-view.js";
// import { MAX_SHOWN_DESCRIPTION, TYPE_HEADERS } from "../const.js";
// import { modals } from '../modals/init-modals.js'

// const formatDescription = (description) => {
//   if (description.length > MAX_SHOWN_DESCRIPTION) {
//     return `${description.slice(0, MAX_SHOWN_DESCRIPTION - 1)}...`;
//   }
//   return description;
// };

const createModalTemplate = (item) => {
  const { authorPhoto, previewImage, title, price, description } = item;

  return `<div><div class="image-slider swiper modal-product__slider">
  <div class="image-slides-list swiper-wrapper">
    <div class="image-slides-list__item swiper-slide">
      <div class="image-slide">
        <picture>
          <source type="image/webp" srcset="img/slides/slide-01.webp, img/slides/slide-01@2x.webp 2x"><img src="img/slides/slide-01.jpg" srcset="img/slides/slide-01@2x.jpg 2x" width="1274" height="1789" alt="">
        </picture><span class="image-author image-slide__author">Автор  фотографии:  «${authorPhoto}</span>
      </div>
    </div>
    <div class="image-slides-list__item swiper-slide">
      <div class="image-slide">
        <picture>
          <source type="image/webp" srcset="img/slides/slide-02.webp, img/slides/slide-02@2x.webp 2x"><img src="img/slides/slide-02.jpg" srcset="img/slides/slide-02@2x.jpg 2x" width="1274" height="1789" alt="">
        </picture>
      </div>
    </div>
    <div class="image-slides-list__item swiper-slide">
      <div class="image-slide">
        <picture>
          <source type="image/webp" srcset="img/slides/slide-03.webp, img/slides/slide-03@2x.webp 2x"><img src="img/slides/slide-03.jpg" srcset="img/slides/slide-03@2x.jpg 2x" width="1274" height="1789" alt="">
        </picture>
      </div>
    </div>
  </div>
  <button class="btn-round btn-round--to-left image-slider__button image-slider__button--prev" type="button">
    <svg width="80" height="85" aria-hidden="true" focusable="false">
      <use xlink:href="#icon-round-button"></use>
    </svg>
  </button>
  <button class="btn-round btn-round--to-right image-slider__button image-slider__button--next" type="button">
    <svg width="80" height="85" aria-hidden="true" focusable="false">
      <use xlink:href="#icon-round-button"></use>
    </svg>
  </button>
</div>
<div class="product-description">
  <div class="product-description__header">
    <h3 class="title title--h2">${title}</h3><b class="price price--size-big">${price}<span>Р</span></b>
  </div>
  <p class="text text--size-40">${description}</p>
  <button class="btn btn--outlined btn--full-width product-description__button" type="button" data-focus>отложить
  </button>
</div></div>`;
};

export default class ModalView extends AbstractView {
  #item = null;
  #handleFaveClick = null;
  #handleClose = null;

  constructor(item, onFaveClick, onClose) {
    super();
    this.#item = item;
    this.#handleFaveClick = onFaveClick;
    this.#handleClose = onClose;

    this.element
      .querySelector(".product-description__button")
      .addEventListener("click", this.#handleFaveClick);

    // this.element
    //   .querySelector(".modal-product__btn-close")
    //   .addEventListener("click", this.#handleClose);

    // this.element
    //   .querySelector(".modal-product__btn-close")
    //   .addEventListener("click", () => {console.log('clickedon close btn')});
  }

  get template() {
    return createModalTemplate(this.#item);
  }
}
