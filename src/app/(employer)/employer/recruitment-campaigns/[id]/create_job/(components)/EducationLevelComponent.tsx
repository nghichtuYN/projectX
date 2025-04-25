import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { educationLevels } from "@/data/educationLevels";
// import { educationLevels } from "@/data/educationLevels";
import React from "react";
type Props = {
  form: any;
};


const EducationLevelComponent = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      name="educationLevelRequire"
      label="Trình độ học vấn"
      requrie
      icon={null}
    >
      {(field) => (
       <Select
       value={field.value ? field.value.toString() : undefined} // Chỉ gán value khi field.value tồn tại
       onValueChange={(value) => field.onChange(value)} // Chuyển thành số khi thay đổi
     >
       <SelectTrigger className="bg-white">
         <SelectValue placeholder="Chọn trình độ học vấn..." />
       </SelectTrigger>
       <SelectContent>
         {educationLevels.map((level) => (
           <SelectItem key={level.name} value={level.value}>
             {level.name}
           </SelectItem>
         ))}
       </SelectContent>
     </Select>
      )}
    </FormFieldComponent>
  );
};

export default EducationLevelComponent;
