import React from "react";
import ListFormOfWorkComponent from "./ListFormOfWorkComponent";

const FilterByFormOfWorkComponent = () => {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full text-start">
        <p className="text-sm text-start w-full font-semibold">Hình thức làm việc</p>
        <ListFormOfWorkComponent />
      </div>
    </div>
  );
};

export default FilterByFormOfWorkComponent;
