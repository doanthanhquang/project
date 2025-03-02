import { IResourceItem } from '@refinedev/core';

export const resources: IResourceItem[] = [
  {
    name: "categories",
    list: "/categories",
    create: "/categories/create",
    edit: "/categories/edit/:id",
    show: "/categories/show/:id",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "products",
    list: "/products",
    meta: {
      canDelete: true,
    },
  },
];