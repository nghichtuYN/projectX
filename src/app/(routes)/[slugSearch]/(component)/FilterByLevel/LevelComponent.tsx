import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Level } from "@/data/Level";
import React from "react";
type Props = {
  level: Level;
};
const LevelComponent = ({ level }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={level.value} id={level.label} />
      <Label htmlFor={level.label}>{level.label}</Label>
    </div>
  );
};

export default LevelComponent;
