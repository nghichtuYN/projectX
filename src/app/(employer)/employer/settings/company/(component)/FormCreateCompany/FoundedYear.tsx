import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  form: any;
};
const FoundedYear = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      label="Năm sáng lập"
      name="foundedYear"
      requrie
      icon={null}
    >
      {(field) => (
        <Input
          className={cn("bg-white")}
          placeholder="Nhập năm sáng lập"
          {...field}
        />
      )}
    </FormFieldComponent>
  );
};

export default FoundedYear;
