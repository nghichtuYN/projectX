import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
type Props<T extends Record<string, any>> = {
  filterBy: string;
  onChangeFilterByValue: (value: string) => void;
  dataOptions: T[];
  placeholder: string;
};
const FilterComponent = <T extends Record<string, any>>({
  onChangeFilterByValue,
  filterBy,
  dataOptions,
  placeholder,
}: Props<T>) => {
  console.log(filterBy);
  return (
    <div className=" flex gap-4 items-center">
      <Select onValueChange={onChangeFilterByValue} value={filterBy}>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {dataOptions?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterComponent;
