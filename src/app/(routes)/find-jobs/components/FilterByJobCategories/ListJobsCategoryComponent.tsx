"use client";
import JobCategoryComponent from "./JobCategoryComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllJobTypes } from "@/queries/queries";

const ListJobsCategoryComponent = () => {
  const {
    data: jobTypes,
    isLoading,
    isFetching,
  } = getAllJobTypes("", 0, 1, true);
  return (
    <ScrollArea className="w-full flex mt-2 h-28 flex-col pl-2 items-start gap-3">
      {jobTypes?.items?.map((jobType) => (
        <JobCategoryComponent jobType={jobType} key={jobType?.id} />
      ))}
    </ScrollArea>
  );
};

export default ListJobsCategoryComponent;
