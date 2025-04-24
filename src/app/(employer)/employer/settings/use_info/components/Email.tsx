import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import React from "react";
type Props = {
  form: any;
};
const Email = ({ form }: Props) => {
  return (
    <FormFieldComponent control={form.control} name="email" icon={null}>
      {(field) => (
        <Input
          {...field}
          disabled
          placeholder="Nhập tiêu đề tin"
          className="bg-white"
        />
      )}
    </FormFieldComponent>
  );
};

export default Email;
