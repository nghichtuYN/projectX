import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  form: any;
};
const ContactPhone = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      label="Số điện thoại"
      name="contactPhone"
      requrie={false}
      icon={null}
    >
      {(field) => (
        <Input
          className={cn("bg-white")}
          placeholder="Nhập số điện thoại"
          {...field}
        />
      )}
    </FormFieldComponent>
  );
};

export default ContactPhone;
