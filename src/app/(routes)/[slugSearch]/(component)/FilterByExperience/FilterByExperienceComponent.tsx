import React from "react";
import ListExperiencesComponent from "./ListExperiencesComponent";

const FilterByExperienceComponent = () => {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full text-start">
        <p className="text-sm text-start w-full font-semibold">Kinh nghiệm</p>
        <ListExperiencesComponent />
      </div>
    </div>
  );
};

export default FilterByExperienceComponent;
