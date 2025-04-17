import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  form: any;
};
const TaxCode = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      label="Mã số thuế"
      name="taxCode"
      requrie={true}
      icon={null}
    >
      {(field) => (
        <Input
          className={cn("bg-white")}
          placeholder="Nhập mã số thuế"
          {...field}
        />
      )}
    </FormFieldComponent>
  );
};

export default TaxCode;
