import { CommandItem } from "@/components/ui/command";
import { cn, handleSelect } from "@/lib/utils";
import { Skills } from "@/types/skills";
import { Check } from "lucide-react";
import React from "react";
type Props = {
  skill: Skills;
  field: any;
};
const SkillComponent = ({ skill, field }: Props) => {
  const isSelected = field.value?.includes(skill.id);

  return (
    <CommandItem
      className="cursor-pointer"
      value={skill.id}
      onSelect={() => handleSelect(field, isSelected, skill?.id)}
      title={skill.description}
    >
      <Check
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {skill.name}
    </CommandItem>
  );
};

export default SkillComponent;
