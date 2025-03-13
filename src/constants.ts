import { IResourceItem } from '@refinedev/core';

export const RESOURCES = {
  LANGUAGES: 'v1/languages',
};
export const resources: IResourceItem[] = [
  {
    name: "v1/actors",
    list: "/actors",
    meta: {
      canDelete: true,
      label: "Diễn viên",
    },
  },
  {
    name: "v1/films",
    list: "/films",
    meta: {
      canDelete: true,
      label: "Phim",
    },
  },
];