import React, { useImperativeHandle } from "react";
import { useModalForm } from "@refinedev/antd";
import { FilmForm } from "./form";

export const FilmCreateModal: React.FC = React.forwardRef((props, ref) => {
  const {
    modalProps: modalProps,
    formProps: formProps,
    show: modalShow,
    formLoading: formLoading,
    open,
  } = useModalForm({
    action: 'create',
    syncWithLocation: false,
    redirect: false,
  });

  useImperativeHandle(ref, () => ({
    modalShow,
  }));

  const handleCreate = (values: any) => {
    formProps.onFinish?.({
      ...values,
      specialFeatures: values.specialFeatures?.join(",")
    });
  };

  return (
    open && (
      <FilmForm
        formType="create"
        formProps={formProps}
        formLoading={formLoading}
        modalProps={modalProps}
        handler={handleCreate}
      />
    )
  );
});