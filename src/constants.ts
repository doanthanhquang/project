import { IResourceItem } from '@refinedev/core';

export const resources: IResourceItem[] = [
  {
    name: "v1/actors",
    list: "/actors",
    meta: {
      canDelete: true,
      label: "Diễn viên",
    },
  },
];