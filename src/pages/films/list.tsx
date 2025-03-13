import type { ProColumns } from '@ant-design/pro-components';
import { EditButton, DeleteButton, List, useTable, CreateButton, ShowButton } from '@refinedev/antd';
import { useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import { useParsed, BaseRecord } from '@refinedev/core';
import { Space } from 'antd';
import { FilmEditModal } from './edit';
import { FilmCreateModal } from './create';
import { FilmShowModal } from './show';
import dayjs from 'dayjs';

export const FilmList = () => {
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
      title: 'Title',
      dataIndex: 'title',
      search: false,
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      search: false,
      ellipsis: true,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      search: false,
      width: 100,
      align: 'center',
    },
    {
      title: 'Release Year',
      dataIndex: 'releaseYear',
      search: false,
      width: 100,
      align: 'center',
    },
    {
      title: 'Rental Duration',
      dataIndex: 'rentalDuration',
      search: false,
      width: 140,
      align: 'center',
    },
    {
      title: 'Rental Rate',
      dataIndex: 'rentalRate',
      search: false,
      width: 120,
      align: 'center',
    },
    {
      title: 'Replacement Cost',
      dataIndex: 'replacementCost',
      search: false,
      width: 140,
      align: 'center',
    },
    {
      title: 'Special Features',
      dataIndex: 'specialFeatures',
      search: false,
      ellipsis: true,
    },
    {
      title: 'Last Update',
      dataIndex: 'lastUpdate',
      render: (_, entity) => dayjs(entity.lastUpdate).format('DD/MM/YYYY'),
      search: false,
      width: 120,
      align: 'center',
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
            recordItemId={record.filmId}
            onClick={() => editModalRef.current?.modalShow(record.filmId)}
          />
          <ShowButton
            hideText
            size="small"
            recordItemId={record.filmId}
            onClick={() => showModalRef.current?.modalShow(record.filmId)}
          />
          <DeleteButton hideText size="small" recordItemId={record.filmId} />
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
      <FilmEditModal ref={editModalRef} />
      <FilmCreateModal ref={createModalRef} />
      <FilmShowModal ref={showModalRef} />
    </>
  );
};
