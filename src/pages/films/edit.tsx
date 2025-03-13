import React, { useImperativeHandle, useEffect } from 'react';
import { useModalForm } from '@refinedev/antd';
import { FilmForm } from './form';

export const FilmEditModal: React.FC = React.forwardRef((props, ref) => {
  const {
    modalProps: modalProps,
    formProps: formProps,
    show: modalShow,
    formLoading: formLoading,
    open,
  } = useModalForm({
    action: 'edit',
    syncWithLocation: false,
    redirect: false,
  });

  useEffect(() => {
    if (formProps.initialValues?.specialFeatures) {
      formProps.form?.setFieldsValue({
        ...formProps.initialValues,
        specialFeatures: formProps.initialValues.specialFeatures.split(","),
      });
    }
  }, [formProps.initialValues]);

  useImperativeHandle(ref, () => ({
    modalShow,
  }));

  const handleEdit = (values: any) => {
    formProps.onFinish?.({
      ...values,
      specialFeatures: values.specialFeatures?.join(",")
    });
  };

  return (
    open && (
      <FilmForm
        formType="edit"
        formProps={formProps}
        formLoading={formLoading}
        modalProps={modalProps}
        handler={handleEdit}
      />
    )
  );
});
