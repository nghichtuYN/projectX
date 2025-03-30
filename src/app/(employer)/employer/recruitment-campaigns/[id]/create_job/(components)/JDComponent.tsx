import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import React from "react";
type Props = {
  form: any;
};
const JDComponent = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="jobDescriptionFile"
      label="File mô tả công việc"
      icon={null}
    >
      {(field) => (
        <Input
          type="file"
          onChange={(e) => field.onChange(e.target.files?.[0])}
        />
      )}
    </FormFieldComponent>
  );
};

export default JDComponent;
