import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Major } from "@/types/majors";
import { Check } from "lucide-react";
import React from "react";
type Props = {
  major: Major;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  field: any;
};
const MajorComponent = ({ major, value, setValue, setOpen, field }: Props) => {
  return (
    <CommandItem
      key={major.id}
      value={major.id}
      onSelect={(currentValue) => {
        const newValue = currentValue === value ? "" : currentValue;
        setValue(newValue);
        field.onChange(newValue);
        // setOpen(false);
      }}
    >
      {major.name}
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          value === major.id ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
};

export default MajorComponent;
