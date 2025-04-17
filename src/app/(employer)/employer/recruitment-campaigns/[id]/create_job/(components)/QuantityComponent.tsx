import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import React from "react";
type Props = {
  form: any;
};
const QuantityComponent = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="quantity"
      label="Số lượng cần tuyển"
      requrie
      icon={null}
    >
      {(field) => (
        <Input
          type="number"
          {...field}
          value={field.value || 0}
          onChange={(e) => field.onChange(parseFloat(e.target.value))}
          placeholder="Nhập số lượng cần tuyển"
          className="bg-white"
        />
      )}
    </FormFieldComponent>
  );
};

export default QuantityComponent;
