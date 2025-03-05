import React, { useImperativeHandle } from "react";
import { useModalForm } from "@refinedev/antd";
import { ActorForm } from "./form";
import { IActor } from "./model";

export const ActorCreateModal: React.FC = React.forwardRef((props, ref) => {
  const {
    modalProps: modalProps,
    formProps: formProps,
    show: modalShow,
    formLoading: formLoading,
    open,
  } = useModalForm<IActor>({
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
    });
  };

  return (
    open && (
      <ActorForm
        formType="create"
        formProps={formProps}
        formLoading={formLoading}
        modalProps={modalProps}
        handler={handleCreate}
      />
    )
  );
});