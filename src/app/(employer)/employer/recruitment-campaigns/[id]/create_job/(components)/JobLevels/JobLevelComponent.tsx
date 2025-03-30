import { CommandItem } from "@/components/ui/command";
import { SelectItem } from "@/components/ui/select";
import { cn, handleSelect } from "@/lib/utils";
import { JobLevel } from "@/types/JobLevelType";
import { Check } from "lucide-react";
import React from "react";
type Props = {
  jobLevel: JobLevel;
  field: any;
};
const JobLevelComponent = ({ jobLevel, field }: Props) => {
  const isSelected = field.value?.includes(jobLevel.id);

  return (
    <CommandItem
      className="cursor-pointer"
      value={jobLevel.id}
      onSelect={() => handleSelect(field, isSelected, jobLevel?.id)}
    >
      <Check
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {jobLevel.name}
    </CommandItem>
  );
};

export default JobLevelComponent;
