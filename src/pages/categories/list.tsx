import type { ProColumns } from "@ant-design/pro-components";
import { DeleteButton, EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import { useParsed, type BaseRecord } from "@refinedev/core";
import { Space } from "antd";
import { ProTable } from "@ant-design/pro-components";

export const CategoryList = () => {
  const { resource } = useParsed();

  const { tableProps } = useTable({
    syncWithLocation: true,
    pagination: {
      mode: 'client',
      pageSize: 100,
    },
  });

  const columns: ProColumns[] = [
    {
      dataIndex: "index",
      title: "#",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "ID",
      dataIndex: "id",
      search: false,
    },
    {
      title: "Title",
      dataIndex: "title",
      search: false,
    },
    {
      width: 60,
      key: "actions",
      valueType: "option",
      render: (_, record: BaseRecord) => (
        <Space>
          <EditButton hideText size="small" recordItemId={record.id} />
          <ShowButton hideText size="small" recordItemId={record.id} />
          <DeleteButton hideText size="small" recordItemId={record.id} />
        </Space>
      ),
    },
  ];

  return (
    <List title={resource?.meta?.label}>
      <ProTable
        {...tableProps}
        manualRequest={true}
        rowKey="id"
        columns={columns}
        defaultSize="small"
        dateFormatter="string"
        search={false}
        bordered
        scroll={{ x: "max-content", y: '70%' }}
        options={{
          density: false,
          search: {
            name: "q",
          },
        }}
      />
    </List>
  );
};
