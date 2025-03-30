import React from "react";
import { JobFormValues } from "../FormCreateJobComponent";
import { Skills } from "@/types/skills";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
type Props = {
  field: any;
  removeItem: (field: keyof JobFormValues, value: string) => void;
  skills: Skills[] | undefined;
};

const SelectedSkillsComponent = ({ field, skills, removeItem }: Props) => {
  const selectedSkills =
    skills?.filter((jobLevel) => field?.value?.includes(jobLevel.id)) || [];
  return (
    <div className="w-full flex flex-wrap gap-2 mt-2">
      {selectedSkills?.map((skill) => (
        <Badge key={skill.id} variant="secondary">
          {skill.name}
          <X
            size={14}
            className="ml-1 cursor-pointer"
            onClick={() => removeItem("skills", skill.id)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default SelectedSkillsComponent;
