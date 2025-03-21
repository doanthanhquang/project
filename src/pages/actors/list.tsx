import type { ProColumns } from '@ant-design/pro-components';
import { EditButton, DeleteButton, List, useTable, CreateButton, ShowButton } from '@refinedev/antd';
import { useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { useParsed, BaseRecord } from '@refinedev/core';
import { Space } from 'antd';
import { ActorEditModal } from './edit';
import { ActorCreateModal } from './create';
import { ActorShowModal } from './show';
import dayjs from 'dayjs';

export const ActorList = () => {
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
  const showModalRef = useRef();

  const columns: ProColumns[] = [
    {
      dataIndex: 'index',
      title: '#',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      search: false,
      ellipsis: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      search: false,
      ellipsis: true,
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdate',
      render: (_, entity) => dayjs(entity.lastUpdate).format('DD/MM/YYYY'),
      search: false,
      ellipsis: true,
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
            recordItemId={record.actorId}
            onClick={() => editModalRef.current?.modalShow(record.actorId)}
          />
          <ShowButton
            hideText
            size="small"
            recordItemId={record.filmId}
            onClick={() => showModalRef.current?.modalShow(record.actorId)}
          />
          <DeleteButton hideText size="small" recordItemId={record.actorId} />
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
          manualRequest={false}
          rowKey="id"
          columns={columns}
          defaultSize="small"
          dateFormatter="string"
          search={false}
          bordered
          scroll={{ x: 'max-content', y: '65vh' }}
          options={{
            density: false,
            search: false,
          }}
        />
      </List>
      <ActorEditModal ref={editModalRef} />
      <ActorCreateModal ref={createModalRef} />
      <ActorShowModal ref={showModalRef} />
    </>
  );
};
