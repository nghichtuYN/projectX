import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  form: any;
};
const Website = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      label="Website"
      name="website"
      requrie={false}
      icon={null}
    >
      {(field) => (
        <Input className={cn("bg-white")} placeholder="https://" {...field} />
      )}
    </FormFieldComponent>
  );
};

export default Website;
