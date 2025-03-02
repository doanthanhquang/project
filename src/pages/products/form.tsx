import React, { useMemo } from 'react';
import { FormProps, Row, Col } from 'antd';
import type { ModalProps } from 'antd/es/modal/interface';
import { useTranslation } from '@refinedev/core';
import { ModalForm, ProFormDatePicker, ProFormMoney } from '@ant-design/pro-components';
import { IQuotation } from './model';

export const QuotationForm: React.FC<{
  formType: 'create' | 'edit' | 'show';
  formProps: FormProps<IQuotation>;
  modalProps: ModalProps;
  handler?: (values: any) => void;
  formLoading?: boolean;
}> = ({ formType, formProps, modalProps, handler, formLoading }) => {
  const { translate } = useTranslation();
  const formReadonly = useMemo(() => formType === 'show', [formType]);

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
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormDatePicker
            name="apply_date"
            label={translate('quotations.fields.quotationApplyDate')}
            required
            rules={[{ required: true }]}
          />
        </Col>
        <Col span={24}>
          <ProFormMoney
            name="price"
            label={translate('quotations.fields.price')}
            placeholder={translate('quotations.fields.price')}
            required
            rules={[{ required: true }]}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};
