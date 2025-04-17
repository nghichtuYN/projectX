import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import React from "react";
type Props = {
  form: any;
};
const ExperienceComponent = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="yearOfExperience"
      label="Số năm kinh nghiệm tối thiểu"
      requrie
      icon={null}
    >
      {(field) => (
        <Input
          type="number"
          {...field}
          onChange={(e) => field.onChange(parseFloat(e.target.value))}
          placeholder="Nhập số năm kinh nghiệm tối thiểu"
          className="bg-white"
        />
      )}
    </FormFieldComponent>
  );
};

export default ExperienceComponent;
