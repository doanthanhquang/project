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
      label: "Danh mục",
    },
  },
  {
    name: "v1/actors",
    list: "/products",
    meta: {
      canDelete: true,
      label: "Diễn viên",
    },
  },
];