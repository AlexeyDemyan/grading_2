import { FilterReason, FilterColor } from '../const.js';

const filterByReason = {
  [FilterReason.ALL]: (items) => items,
  [FilterReason.BIRTHDAY]: (items) => items.filter((item) => isitemExpired(item.dueDate) && !item.isArchive),
  [FilterReason.BRIDE]: (items) => items.filter((item) => isitemExpiringToday(item.dueDate) && !item.isArchive),
  [FilterReason.MOTHER]: (items) => items.filter((item) => item.isFavorite && !item.isArchive),
  [FilterReason.COLLEAGUE]: (items) => items.filter((item) => isitemRepeating(item.repeating) && !item.isArchive),
  [FilterReason.DARLING]: (items) => items.filter((item) => item.isArchive),
};

const filterByColor = {
  [FilterColor.ALL]: (items) => items,
  [FilterColor.RED]: (items) => items.filter((item) => isitemExpired(item.dueDate) && !item.isArchive),
  [FilterColor.WHITE]: (items) => items.filter((item) => isitemExpiringToday(item.dueDate) && !item.isArchive),
  [FilterColor.LILAC]: (items) => items.filter((item) => item.isFavorite && !item.isArchive),
  [FilterColor.YELLOW]: (items) => items.filter((item) => isitemRepeating(item.repeating) && !item.isArchive),
  [FilterColor.PINK]: (items) => items.filter((item) => item.isArchive),
}

export { filterByReason, filterByColor };
