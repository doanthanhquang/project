import React, { useImperativeHandle } from 'react';
import { useModalForm } from '@refinedev/antd';
import { FilmForm } from './form';

export const FilmShowModal: React.FC = React.forwardRef((props, ref) => {
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
      <FilmForm
        formType="show"
        formProps={formProps}
        formLoading={formLoading}
        modalProps={{ ...modalProps, title: 'Xem diễn viên' }}
        handler={formProps.onFinish}
      />
    )
  );
});
