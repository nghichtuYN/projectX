import React from "react";
import FormFieldComponent from "../../(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
type Props = {
  form: any;
  errors: any;
};
const FullName = ({ form, errors }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="fullName"
      icon={User}
      label="Họ và tên"
      requrie={true}
    >
      {(field) => (
        <Input
          className={cn(
            errors.fullName && "border-red-500 focus-visible:ring-red-500"
          )}
          placeholder="Nhập họ tên"
          {...field}
        />
      )}
    </FormFieldComponent>
  );
};

export default FullName;
