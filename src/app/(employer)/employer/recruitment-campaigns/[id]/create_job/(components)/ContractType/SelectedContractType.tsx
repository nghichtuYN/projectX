import React from "react";
import { JobFormValues } from "../FormCreateJobComponent";
import { ContractType } from "@/types/ContractType";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
type Props = {
  field: any;
  removeItem: (field: keyof JobFormValues, value: string) => void;
  contractTypes: ContractType[] | undefined;
};
const SelectedContractType = ({ field, contractTypes, removeItem }: Props) => {
  const selectecContractTypes =
    contractTypes?.filter((contractType) =>
      field?.value?.includes(contractType.id)
    ) || [];
  return (
    <div className="w-full flex flex-wrap gap-2 mt-2">
      {selectecContractTypes?.map((type) => (
        <Badge key={type.id} variant="secondary">
          {type.name}
          <X
            size={14}
            className="ml-1 cursor-pointer"
            onClick={() => removeItem("contractTypes", type.id)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default SelectedContractType;
