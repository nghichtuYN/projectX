"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { JobType } from "@/types/JobType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
type Props = {
  jobType: JobType;
};
const JobCategoryComponent = ({ jobType }: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobTypes = searchParams.getAll("jobTypes");
  const handleSelectjobType = useCallback(
    (jobTypeId: string, isSelected: boolean) => {
      const params = new URLSearchParams(searchParams);
      if (isSelected) {
        const updatedJobTypes = jobTypes.filter(
          (jobType) => jobType !== jobTypeId
        );
        params.delete("jobTypes");
        updatedJobTypes.forEach((jobType) =>
          params.append("jobTypes", jobType)
        );
      } else {
        params.append("jobTypes", jobTypeId);
      }

      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    },
    [jobTypes, pathName, router, searchParams]
  );
  const isChecked = jobTypes.includes(jobType?.id);
  return (
    <div className="flex items-center space-x-2 mb-3">
      <Checkbox
        id={jobType?.id}
        checked={isChecked}
        onCheckedChange={(checked) => {
          handleSelectjobType(jobType?.id, isChecked);
        }}
      />
      <label
        htmlFor={jobType?.name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {jobType?.name}
      </label>
    </div>
  );
};

export default JobCategoryComponent;
