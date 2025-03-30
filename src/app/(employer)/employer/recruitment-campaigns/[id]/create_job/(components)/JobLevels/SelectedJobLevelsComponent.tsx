import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import React from "react";
import { JobFormValues } from "../FormCreateJobComponent";
import { JobLevel } from "@/types/JobLevelType";

type Props = {
  field: any;
  removeItem: (field: keyof JobFormValues, value: string) => void;
  jobLevels: JobLevel[] | undefined;
};

const SelectedJobLevelsComponent = ({
  field,
  jobLevels,
  removeItem,
}: Props) => {
  const selectedjobLevels =
    jobLevels?.filter((jobLevel) => field?.value?.includes(jobLevel.id)) || [];
  return (
    <div className="w-full flex flex-wrap gap-2 mt-2">
      {selectedjobLevels?.map((type) => (
        <Badge key={type.id} variant="secondary">
          {type.name}
          <X
            size={14}
            className="ml-1 cursor-pointer"
            onClick={() => removeItem("jobLevels", type.id)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default SelectedJobLevelsComponent;
