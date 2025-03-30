import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import React from "react";
import { JobFormValues } from "../FormCreateJobComponent";
import { JobType } from "@/types/JobType";

type Props = {
  field: any;
  removeItem: (field: keyof JobFormValues, value: string) => void;
  jobTypes: JobType[] | undefined;
};

const JobTypeSelected = ({ field, jobTypes, removeItem }: Props) => {
  const selectedJobTypes =
    jobTypes?.filter((jobType) => field?.value?.includes(jobType.id)) || [];
  return (
    <div className="w-full flex flex-wrap gap-2 mt-2">
      {selectedJobTypes?.map((type) => (
        <Badge key={type.id} variant="secondary">
          {type.name}
          <X
            size={14}
            className="ml-1 cursor-pointer"
            onClick={() => removeItem("jobTypes", type.id)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default JobTypeSelected;
