import React, { useImperativeHandle } from 'react';
import { useModalForm } from '@refinedev/antd';
import { ActorForm } from './form';

export const ActorEditModal: React.FC = React.forwardRef((props, ref) => {
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

  useImperativeHandle(ref, () => ({
    modalShow,
  }));

  return (
    open && (
      <ActorForm
        formType="edit"
        formProps={formProps}
        formLoading={formLoading}
        modalProps={modalProps}
        handler={formProps.onFinish}
      />
    )
  );
});
