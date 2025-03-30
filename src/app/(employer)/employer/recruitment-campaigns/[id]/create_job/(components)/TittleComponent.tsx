import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import React from "react";
type Props = {
  form: any;
};
const TittleComponent = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="jobDescriptionId"
      label="Tiêu đề tin tuyển dụng"
      requrie
      icon={null}
    >
      {(field) => (
        <Input {...field} placeholder="Nhập tiêu đề tin" className="bg-white" />
      )}
    </FormFieldComponent>
  );
};

export default TittleComponent;
