import React, { useMemo } from 'react';
import { FormProps, Row, Col } from 'antd';
import type { ModalProps } from 'antd/es/modal/interface';
import { ModalForm, ProFormText } from '@ant-design/pro-components';

export const ActorForm: React.FC<{
  formType: 'create' | 'edit' | 'show';
  formProps: FormProps;
  modalProps: ModalProps;
  handler?: (values: any) => void;
  formLoading?: boolean;
}> = ({ formType, formProps, modalProps, handler, formLoading }) => {
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
      submitter={{
        submitButtonProps: formReadonly
          ? { style: { display: 'none' } }
          : {},
        resetButtonProps: {
          style: { display: 'inline-block' },
        },
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText name="firstName" label="First Name" required rules={[{ required: true }]} />
        </Col>
        <Col span={24}>
          <ProFormText name="lastName" label="Last Name" required rules={[{ required: true }]} />
        </Col>
      </Row>
    </ModalForm>
  );
};
