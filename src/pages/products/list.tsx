import type { ProColumns } from "@ant-design/pro-components";
import { EditButton, DeleteButton, List, useTable, CreateButton } from "@refinedev/antd";
import { useRef } from "react";
import { ProTable } from "@ant-design/pro-components";
import { useParsed, BaseRecord } from "@refinedev/core";
import { Space } from "antd";
import { ProductEditModal } from "./edit";
import { ProductCreateModal } from "./create";

export const ProductList = () => {
  const { resource } = useParsed();

  const { tableProps } = useTable({
    syncWithLocation: false,
    pagination: {
      mode: "server",
      pageSize: 100,
    },
  });

  const createModalRef = useRef();
  const editModalRef = useRef();

  const columns: ProColumns[] = [
    {
      dataIndex: "index",
      title: "#",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Material",
      dataIndex: "material",
      search: false,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      search: false,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      search: false,
      ellipsis: true,
    },
    {
      title: "Price",
      align: "right",
      dataIndex: "price",
      valueType: "money",
      fieldProps: { precision: 0 },
      search: false,
    },
    {
      width: 60,
      key: "actions",
      valueType: "option",
      render: (_, record: BaseRecord) => (
        <Space>
          <EditButton hideText size="small" recordItemId={record.id} onClick={() => editModalRef.current?.modalShow(record.id)} />
          <DeleteButton hideText size="small" recordItemId={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <List
        title={resource?.meta?.label}
        headerButtons={
          <>
            <CreateButton
              size="middle"
              onClick={() => {
                createModalRef.current?.modalShow();
              }}
            />
          </>
        }
      >
        <ProTable
          {...tableProps}
          manualRequest={true}
          rowKey="id"
          columns={columns}
          defaultSize="small"
          dateFormatter="string"
          search={false}
          bordered
          scroll={{ x: "max-content", y: "65vh" }}
          options={{
            density: false,
            search: {
              name: "q",
            },
          }}
        />
      </List>
      <ProductEditModal ref={editModalRef} />
      <ProductCreateModal ref={createModalRef} />
    </>
  );
};
