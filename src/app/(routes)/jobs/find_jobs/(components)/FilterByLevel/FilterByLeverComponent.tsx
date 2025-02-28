import React from "react";
import ListLeversComponent from "./ListLeversComponent";

const FilterByLeverComponent = () => {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full text-start">
        <p className="text-sm text-start w-full font-semibold">Cấp bậc</p>
      </div>
      <ListLeversComponent />
    </div>
  );
};

export default FilterByLeverComponent;
