import React, { useImperativeHandle } from 'react';
import { useModalForm } from '@refinedev/antd';
import { ActorForm } from './form';

export const ActorShowModal: React.FC = React.forwardRef((props, ref) => {
  const {
    modalProps: modalProps,
    formProps: formProps,
    show: modalShow,
    formLoading: formLoading,
    open,
  } = useModalForm({
    action: 'show',
    syncWithLocation: false,
    redirect: false,
  });

  useImperativeHandle(ref, () => ({
    modalShow,
  }));

  return (
    open && (
      <ActorForm
        formType="show"
        formProps={formProps}
        formLoading={formLoading}
        modalProps={modalProps}
        handler={formProps.onFinish}
      />
    )
  );
});
