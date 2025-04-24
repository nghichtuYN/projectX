import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import React from "react";
type Props = {
  form: any;
};
const FullName = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="fullName"
      label="Họ và tên"
      requrie
      icon={null}
    >
      {(field) => (
        <Input {...field} placeholder="Nhập họ tên" className="bg-white" />
      )}
    </FormFieldComponent>
  );
};

export default FullName;
