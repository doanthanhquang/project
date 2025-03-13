import React, { useMemo } from 'react';
import { FormProps, Row, Col } from 'antd';
import type { ModalProps } from 'antd/es/modal/interface';
import { ModalForm, ProFormText, ProFormDigit, ProFormSelect, ProFormDatePicker } from '@ant-design/pro-components';
import { useList } from '@refinedev/core';
import { RESOURCES } from '../../constants';

export const FilmForm: React.FC<{
  formType: 'create' | 'edit' | 'show';
  formProps: FormProps;
  modalProps: ModalProps;
  handler?: (values: any) => void;
  formLoading?: boolean;
}> = ({ formType, formProps, modalProps, handler, formLoading }) => {
  const formReadonly = useMemo(() => formType === 'show', [formType]);

  const { data: languages } = useList({
    resource: RESOURCES.LANGUAGES,
  });

  const rating = [
    { value: 'G', label: 'G' },
    { value: 'PG', label: 'PG' },
    { value: 'PG-13', label: 'PG-13' },
    { value: 'R', label: 'R' },
    { value: 'NC-17', label: 'NC-17' },
  ];

  const specialFeatures = [
    { value: 'Trailers', label: 'Trailers' },
    { value: 'Commentaries', label: 'Commentaries' },
    { value: 'Deleted Scenes', label: 'Deleted Scenes' },
    { value: 'Behind the Scenes', label: 'Behind the Scenes' },
  ];

  return (
    <ModalForm
      {...formProps}
      title={modalProps.title}
      open={modalProps.open}
      loading={formLoading}
      modalProps={{
        ...modalProps,
        destroyOnClose: true,
        width: 800,
      }}
      onFinish={handler}
      readonly={formReadonly}
      labelAlign="left"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      layout="horizontal"
      submitter={{
        submitButtonProps: formReadonly ? { style: { display: 'none' } } : {},
        resetButtonProps: {
          style: { display: 'inline-block' },
        },
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText name="title" label="Title" required rules={[{ required: true }]} />
        </Col>
        <Col span={24}>
          <ProFormSelect
            name="languageId"
            label="Language"
            options={languages?.data?.map((item) => ({
              label: item.name,
              value: item.languageId,
            }))}
            required
            rules={[{ required: true }]}
          />
        </Col>
        <Col span={24}>
          <ProFormText name="description" label="Description" />
        </Col>
        <Col span={24}>
          <ProFormDatePicker
            name="releaseYear"
            label="Release Year"
            width="100%"
            fieldProps={{ picker: 'year', format: 'YYYY' }}
          />
        </Col>
        <Col span={24}>
          <ProFormDigit name="rentalRate" label="Rental Rate" fieldProps={{ precision: 2 }} />
        </Col>
        <Col span={24}>
          <ProFormDigit name="length" label="Length" />
        </Col>
        <Col span={24}>
          <ProFormDigit name="replacementCost" label="Replacement Cost" fieldProps={{ precision: 2 }} />
        </Col>
        <Col span={24}>
          <ProFormSelect name="rating" label="Rating" options={rating} />
        </Col>
        <Col span={24}>
          <ProFormSelect
            name="specialFeatures"
            label="Special Features"
            options={specialFeatures}
            fieldProps={{ mode: 'multiple' }}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};
