const getWeightForNullData = (dataA, dataB) => {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
};

const sortPriceUp = (itemA, itemB) => {
  const weight = getWeightForNullData(itemA.price, itemB.price);
  return weight ?? itemA.price - itemB.price;
};

const sortPriceDown = (itemA, itemB) => {
  const weight = getWeightForNullData(itemA.price, itemB.price);
  return weight ?? itemB.price - itemA.price;
};

export { sortPriceDown, sortPriceUp };
