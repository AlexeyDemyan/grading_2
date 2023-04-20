const ApiCredentials = {
  END_POINT: 'https://grading.objects.pages.academy/flowers-shop',
  AUTHORIZATION: 'Basic hsie9309fjsidf322',
}

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const FilterReason = {
  ALL: 'for-all',
  BIRTHDAY: 'birthdayboy',
  BRIDE: 'bridge',
  MOTHER: 'motherday',
  COLLEAGUE: 'colleagues',
  DARLING: 'forlove',
};

const FilterColor = {
  ALL: 'all',
  RED: 'red',
  WHITE: 'white',
  LILAC: 'lilac',
  YELLOW: 'yellow',
  PINK: 'pink',
};

const SortType = {
  DEFAULT: 'default',
  PRICE_DOWN: 'price-down',
  PRICE_UP: 'price-up',
};

const ScrollUp = {
  TOP: 0,
  BEHAVIOUR: 'smooth'
}

const ITEMS_SHOW_COUNT = 6;

export { ApiCredentials, UpdateType, FilterReason, FilterColor, SortType, ITEMS_SHOW_COUNT, ScrollUp }
