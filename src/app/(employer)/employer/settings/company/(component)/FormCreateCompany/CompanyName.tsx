import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  form: any;
};
const CompanyName = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      label="Tên công ty"
      name="companyName"
      requrie
      icon={null}
    >
      {(field) => (
        <Input
          className={cn("bg-white")}
          placeholder="Nhập tên công ty"
          {...field}
        />
      )}
    </FormFieldComponent>
  );
};

export default CompanyName;
