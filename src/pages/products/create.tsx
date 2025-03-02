import React, { useImperativeHandle } from "react";
import { useModalForm } from "@refinedev/antd";
import { QuotationForm } from "./form";
import { IQuotation } from "./model";

export const SupplierCreateModal: React.FC = React.forwardRef((props, ref) => {
  const {
    modalProps: modalProps,
    formProps: formProps,
    show: modalShow,
    formLoading: formLoading,
    open,
  } = useModalForm<IQuotation>({
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
      <QuotationForm
        formType="create"
        formProps={formProps}
        formLoading={formLoading}
        modalProps={modalProps}
        handler={handleCreate}
      />
    )
  );
});