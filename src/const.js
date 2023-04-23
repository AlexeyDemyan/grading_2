const ApiCredentials = {
  END_POINT: "https://grading.objects.pages.academy/flowers-shop",
  AUTHORIZATION: "Basic hsie9309fjsidf322",
};

const FilterReason = {
  ALL: "for-all",
  BIRTHDAY: "birthdayboy",
  BRIDE: "bridge",
  MOTHER: "motherday",
  COLLEAGUE: "colleagues",
  DARLING: "forlove",
};

const FilterColor = {
  ALL: "all",
  RED: "red",
  WHITE: "white",
  LILAC: "lilac",
  YELLOW: "yellow",
  PINK: "pink",
};

const SortType = {
  DEFAULT: "default",
  PRICE_DOWN: "price-down",
  PRICE_UP: "price-up",
};

const ScrollUp = {
  TOP: 0,
  BEHAVIOUR: "smooth",
};

const TYPE_HEADERS = {
  birthdayboy: "имениннику",
  bridge: "невесте",
  motherday: "маме",
  colleagues: "коллеге",
  forlove: "любимой",
};

const UpdateType = {
  PATCH: "PATCH",
  MINOR: "MINOR",
  MAJOR: "MAJOR",
  INIT: "INIT",
};


const MAX_SHOWN_DESCRIPTION = 140;

const ITEMS_SHOW_COUNT = 6;

const ErrorMessage = {
  ADD_ITEM: 'Unable to add item',
  REMOVE_ITEM: 'Unable to remove item'
}

export {
  ApiCredentials,
  FilterReason,
  FilterColor,
  SortType,
  ITEMS_SHOW_COUNT,
  ScrollUp,
  MAX_SHOWN_DESCRIPTION,
  TYPE_HEADERS,
  ErrorMessage,
  UpdateType,
};
