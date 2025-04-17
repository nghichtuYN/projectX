import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  form: any;
};
const HeadQuarterAddress = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      label="Địa chỉ"
      name="headQuarterAddress"
      requrie
      icon={null}
    >
      {(field) => (
        <Input
          className={cn("bg-white")}
          placeholder="Nhập địa chỉ công ty"
          {...field}
        />
      )}
    </FormFieldComponent>
  );
};

export default HeadQuarterAddress;
