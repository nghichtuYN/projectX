import { Experience } from "@/data/Expericence";
import React from "react";
import ExperienceComponent from "./ExperienceComponent";
import { RadioGroup } from "@/components/ui/radio-group";

const ListExperiencesComponent = () => {
  return (
    <RadioGroup className="grid grid-cols-2 p-2 gap-3" defaultValue="all">
      {Experience?.map((experience, index) => (
        <ExperienceComponent experience={experience} key={index} />
      ))}
    </RadioGroup>
  );
};

export default ListExperiencesComponent;
