import { Checkbox } from "@/components/ui/checkbox";
import { Job } from "@/types/Jobs";
import React from "react";
type Props = {
  category: Job;
};
const JobCategoryComponent = ({ category }: Props) => {
  return (
    <div className="flex items-center space-x-2 mb-3">
      <Checkbox id={category.value} />
      <label
        htmlFor={category.label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {category.label}
      </label>
    </div>
  );
};

export default JobCategoryComponent;
