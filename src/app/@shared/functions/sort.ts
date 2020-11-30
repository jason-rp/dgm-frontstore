import sortBy from 'lodash/sortBy';

/**
 * Sort by an ordered list
 * @param list list to be sorted
 * @param order ordered list
 * @param field sort field
 */
export const sortByOrder = (list: any[], order: string[], field: string) =>
  sortBy(list, (item) => {
    return order.indexOf(item[field]);
  });
