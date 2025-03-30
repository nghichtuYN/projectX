import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import React from "react";
type Props = {
  form: any;
};
const AddressComponent = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="locationId"
      label="Địa điểm"
      requrie
      icon={null}
    >
      {(field) => (
        <Input {...field} placeholder="Nhập  địa điểm" className="bg-white" />
      )}
    </FormFieldComponent>
  );
};

export default AddressComponent;
