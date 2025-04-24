import React from "react";
import ListJobsCategoryComponent from "./ListJobsCategoryComponent";

const FiterByJobsCategoryComponent = () => {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full text-start">
        <p className="text-sm text-start w-full font-semibold">
          Theo loại công việc
        </p>
        <ListJobsCategoryComponent />
      </div>
    </div>
  );
};

export default FiterByJobsCategoryComponent;
