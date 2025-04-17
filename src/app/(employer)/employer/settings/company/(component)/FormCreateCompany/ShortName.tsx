import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  form: any;
};
const ShortName = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      label="Tên rút gọn"
      name="shortName"
      requrie={false}
      icon={null}
    >
      {(field) => (
        <Input
          className={cn("bg-white")}
          placeholder="Nhập tên rút gọn công ty"
          {...field}
        />
      )}
    </FormFieldComponent>
  );
};

export default ShortName;
