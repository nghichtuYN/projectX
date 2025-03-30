import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
type Props = {
  form: any;
};
const schoolLevelOptions = ["Trung học", "Cử nhân", "Thạc sĩ", "Tiến sĩ"];

const EducationLevelComponent = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="schoolLevel"
      label="Trình độ học vấn"
      requrie
      icon={null}
    >
      {(field) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn trình độ học vấn" />
          </SelectTrigger>
          <SelectContent>
            {schoolLevelOptions.map((level, index) => (
              <SelectItem key={level} value={schoolLevelOptions[index]}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormFieldComponent>
  );
};

export default EducationLevelComponent;
