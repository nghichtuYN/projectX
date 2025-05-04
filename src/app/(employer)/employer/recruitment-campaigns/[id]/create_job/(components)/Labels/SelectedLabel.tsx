import React from "react";
import { JobFormValues } from "../FormCreateJobComponent";
import { Skills } from "@/types/skills";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ServiceJobs } from "@/services/services";
type Props = {
  field: any;
  removeItem: (field: keyof JobFormValues, value: string) => void;
  labels: ServiceJobs[] | undefined;
};
const SelectedLabel = ({ field, labels, removeItem }: Props) => {
  console.log(field.value)
  const selectedSkills =
  labels?.filter((label) => field?.value?.includes(label.id)) || [];
  return (
    <div className="w-full flex flex-wrap gap-2 mt-2">
      {selectedSkills?.map((label) => (
        <Badge key={label.id} variant="secondary">
          {label.name}
          <X
            size={14}
            className="ml-1 cursor-pointer"
            onClick={() => removeItem("labels", label.id)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default SelectedLabel;
