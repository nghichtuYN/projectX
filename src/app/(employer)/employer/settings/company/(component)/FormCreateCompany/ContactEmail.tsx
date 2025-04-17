import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  form: any;
};
const ContactEmail = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      label="Email"
      name="contactEmail"
      requrie
      icon={null}
    >
      {(field) => (
        <Input className={cn("bg-white")} placeholder="Nhập email công ty" {...field} />
      )}
    </FormFieldComponent>
  );
};

export default ContactEmail;
