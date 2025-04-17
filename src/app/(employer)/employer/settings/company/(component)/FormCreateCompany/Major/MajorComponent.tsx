import { CommandItem } from "@/components/ui/command";
import { cn, handleSelect } from "@/lib/utils";
import { Major } from "@/types/majors";
import { Check } from "lucide-react";
import React from "react";
type Props = {
  major: Major;
  field: any;
};
const MajorComponent = ({ major, field }: Props) => {
  const isSelected = field.value?.includes(major.id);

  return (
    <CommandItem
      value={major.id}
      onSelect={() => handleSelect(field, isSelected, major?.id)}
    >
      <Check
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {major.name}
    </CommandItem>
  );
};

export default MajorComponent;
