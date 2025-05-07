import React from "react";
import { JobFormValues } from "../FormCreateJobComponent";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Service } from "@/types/Services";
type Props = {
  field: any;
  removeItem: (field: keyof JobFormValues, value: string) => void;
  labels: Service[] | undefined;
};
const SelectedLabel = ({ field, labels, removeItem }: Props) => {
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
            onClick={() => removeItem("serviceIds", label.id)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default SelectedLabel;
