import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listSizeCompany } from "@/data/SizeCompany";
import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  form: any;
};
const SizeCompany = ({ form }: Props) => {
  return (
    <FormFieldComponent
      control={form.control}
      label="Quy mô"
      name="size"
      requrie
      icon={null}
    >
      {(field) => (
        <Select required onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Chọn quy mô công ty" />
          </SelectTrigger>
          <SelectContent>
            {listSizeCompany?.map((size) => (
              <SelectItem key={size.value} value={size.value}>{size.label} nhân viên</SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormFieldComponent>
  );
};

export default SizeCompany;
