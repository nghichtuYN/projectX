import { JobType } from "@/data/jobType";
import React from "react";
import JobCategoryComponent from "./JobCategoryComponent";
import { ScrollArea } from "@/components/ui/scroll-area";

const ListJobsCategoryComponent = () => {
  return (
    <ScrollArea className="w-full flex mt-2 h-28 flex-col pl-2 items-start gap-3">
      {JobType?.map((category, index) => (
        <JobCategoryComponent category={category} key={index} />
      ))}
    </ScrollArea>
  );
};

export default ListJobsCategoryComponent;
