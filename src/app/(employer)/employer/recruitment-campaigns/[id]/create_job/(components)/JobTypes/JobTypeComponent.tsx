import { JobType } from "@/types/JobType";
import { CommandItem } from "@/components/ui/command";
import React from "react";
import { Check } from "lucide-react";
import { cn, handleSelect } from "@/lib/utils";

type Props = {
  jobType: JobType;
  field: any;
};

const JobTypeComponent = ({ jobType, field }: Props) => {
  const isSelected = field.value?.includes(jobType.id);

  return (
    <CommandItem
      value={jobType.id}
      onSelect={() => handleSelect(field, isSelected, jobType?.id)}
    >
      <Check
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {jobType.name}
    </CommandItem>
  );
};

export default JobTypeComponent;
