import React, { useImperativeHandle } from "react";
import { useModalForm } from "@refinedev/antd";
import { ProductForm } from "./form";
import { IProduct } from "./model";

export const ProductCreateModal: React.FC = React.forwardRef((props, ref) => {
  const {
    modalProps: modalProps,
    formProps: formProps,
    show: modalShow,
    formLoading: formLoading,
    open,
  } = useModalForm<IProduct>({
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
      <ProductForm
        formType="create"
        formProps={formProps}
        formLoading={formLoading}
        modalProps={modalProps}
        handler={handleCreate}
      />
    )
  );
});