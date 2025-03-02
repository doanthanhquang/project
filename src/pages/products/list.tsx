import type { ProColumns } from '@ant-design/pro-components';
import { EditButton, List, useTable, CreateButton } from '@refinedev/antd';
import { useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { useParsed, BaseRecord } from '@refinedev/core';
import { Space } from 'antd';
import { QuotationEditModal } from './edit';
import { QuotationCreateModal } from './create';

export const QuotationList = () => {
  const { resource } = useParsed();

  const { tableProps } = useTable({
    syncWithLocation: false,
    pagination: {
      mode: 'server',
      pageSize: 100,
    },
  });

  const createModalRef = useRef();
  const editModalRef = useRef();

  const columns: ProColumns[] = [
    {
      dataIndex: 'index',
      title: '#',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Mã',
      dataIndex: 'product_type_2',
      search: false,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      search: false,
    },
    {
      title: 'Giá',
      align: 'right',
      dataIndex: 'price',
      valueType: 'money',
      fieldProps: { precision: 0 },
      search: false,
    },
    {
      width: 60,
      key: 'actions',
      valueType: 'option',
      render: (_, record: BaseRecord) => (
        <Space>
          <EditButton
            hideText
            size="small"
            recordItemId={record.id}
            onClick={() => editModalRef.current?.modalShow(record.id)}
          />
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
        scroll={{ x: 'max-content' }}
        options={{
          density: false,
          search: {
            name: 'q',
          },
        }}
      />
      </List>
      <QuotationEditModal ref={editModalRef} />
      <QuotationCreateModal ref={createModalRef} />
    </>
  );
};
