import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";
import React from "react";
import FiterByJobsCategoryComponent from "./FilterByJobCategories/FiterByJobsCategoryComponent";
import FilterByExperienceComponent from "./FilterByExperience/FilterByExperienceComponent";
import FilterByLeverComponent from "./FilterByLevel/FilterByLeverComponent";
import FilterBySalaryComponent from "./FilterBySalary/FilterBySalaryComponent";
import FilterByStreamBusinessComponent from "./FilterByStreamBusiness/FilterByStreamBusinessComponent";
import FilterByFormOfWorkComponent from "./FilterByFormOfWork/FilterByFormOfWorkComponent";

const FilterComponent = () => {
  return (
    <div className="flex flex-col items-center gap-2 justify-center h-full w-full">
      <div className="flex items-center justify-between w-full p-1">
        <div className="flex items-center gap-1 w-full">
          <Filter className="w-5 h-5 text-secondaryColor" />
          <p className="text-lg font-bold">Lọc nâng cao </p>
        </div>
        <Button
          variant={"outline"}
          className="rounded-full border-solid hover:border-secondaryColor"
          size={"default"}
        >
          Xóa lọc
        </Button>
      </div>
      <hr className="border w-full pl-1 pr-1 border-gray-300" />

      <ScrollArea className="w-full p-1 h-[80vh]">
        <FiterByJobsCategoryComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
        <FilterByExperienceComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
        <FilterByLeverComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
        <FilterBySalaryComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
        <FilterByStreamBusinessComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
        <FilterByFormOfWorkComponent />
        <hr className="border-dashed w-full p-1 border-gray-300" />
      </ScrollArea>
    </div>
  );
};

export default FilterComponent;
