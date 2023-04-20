const filterByReason = (items, reason) => {
  if (reason === 'for-all') {
    return items;
  }
  return items.filter(item => item.type === reason);
}

const filterByColor = (items, color) => {
  if (color === 'all') {
    return items;
  }
  return items.filter(item => item.color === color);
}

export { filterByReason, filterByColor };
