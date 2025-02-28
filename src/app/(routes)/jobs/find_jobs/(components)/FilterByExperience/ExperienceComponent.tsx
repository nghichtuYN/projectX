import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Experience } from "@/data/Expericence";
import React from "react";
type Props = {
  experience: Experience;
};
const ExperienceComponent = ({ experience }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={experience.value} id={experience.label} />
      <Label htmlFor={experience.label}>{experience.label}</Label>
    </div>
  );
};

export default ExperienceComponent;
