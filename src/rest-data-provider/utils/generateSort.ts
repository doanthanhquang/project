import { CrudSorting } from '@refinedev/core';

export const generateSort = (sorters?: CrudSorting) => {
  if (sorters && sorters.length > 0) {
    return sorters.map((item) => (item.order === 'desc' ? `-${item.field}` : item.field));
  }

  return [];
};
