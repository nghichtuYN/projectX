import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { educationLevels } from "@/data/educationLevels";
import React from "react";
type Props = {
  form: any;
};
const educationLevels = [
  { name: "Trung học cơ sở", value: "1" },
  { name: "Trung học phổ thông", value: "2" },
  { name: "Trung cấp", value: "3" },
  { name: "Cao đẳng", value: "4" },
  { name: "Đại học", value: "5" },
  { name: "Thạc sĩ", value: "6" },
  { name: "Tiến sĩ", value: "7" },
];

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
