import { Levels } from "@/data/Level";
import React from "react";
import LevelComponent from "./LevelComponent";
import { RadioGroup } from "@radix-ui/react-radio-group";

const ListLeversComponent = () => {
  return (
    <RadioGroup className="flex flex-col gap-3 m-2" defaultValue="all">
      {Levels?.map((level, index) => (
        <LevelComponent key={index} level={level} />
      ))}
    </RadioGroup>
  );
};

export default ListLeversComponent;
