import React from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { CompanyFormValues } from "../FormCreateCompany";
import { Major } from "@/types/majors";
type Props = {
  field: any;
  removeItem: (field: keyof CompanyFormValues, value: string) => void;
  majors: Major[] | undefined;
};
const SelectedMajorsComponent = ({ field, removeItem, majors }: Props) => {
  const selectedMajors =
    majors?.filter((major) => field?.value?.includes(major.id)) || [];
  return (
    <div className="w-full flex flex-wrap gap-2 mt-2">
      {selectedMajors?.map((major) => (
        <Badge key={major.id} variant="secondary">
          {major.name}
          <X
            size={14}
            className="ml-1 cursor-pointer"
            onClick={() => removeItem("major", major.id)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default SelectedMajorsComponent;
