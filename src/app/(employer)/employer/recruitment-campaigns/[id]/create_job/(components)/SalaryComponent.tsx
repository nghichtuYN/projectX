import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Input } from "@/components/ui/input";
import React from "react";
type Props = {
  form: any;
};
const SalaryComponent = ({ form }: Props) => {
  return (
    <div className="flex items-center">
      <div className="w-1/2">
        <FormFieldComponent
          control={form.control}
          name="minSalary"
          label="Mức lương tối thiểu"
          requrie
          icon={null}
        >
          {(field) => (
            <Input
              type="number"
              {...field}
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
              placeholder="Nhập mức lương tối thiểu"
            />
          )}
        </FormFieldComponent>
      </div>
      <div className="w-1/2">
        <FormFieldComponent
          control={form.control}
          name="maxSalary"
          label="Mức lương tối đa"
          requrie
          icon={null}
        >
          {(field) => (
            <Input
              type="number"
              {...field}
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
              placeholder="Nhập mức lương tối đa"
            />
          )}
        </FormFieldComponent>
      </div>
    </div>
  );
};

export default SalaryComponent;
