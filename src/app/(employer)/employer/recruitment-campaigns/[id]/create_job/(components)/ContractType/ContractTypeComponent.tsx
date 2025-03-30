import { CommandItem } from "@/components/ui/command";
import { cn, handleSelect } from "@/lib/utils";
import { ContractType } from "@/types/ContractType";
import { Check } from "lucide-react";
import React from "react";
type Props = {
  contractType: ContractType;
  field: any;
};
const ContractTypeComponent = ({ contractType, field }: Props) => {
  const isSelected = field.value?.includes(contractType.id);

  return (
    <CommandItem
      value={contractType.id}
      onSelect={() => handleSelect(field, isSelected, contractType?.id)}
    >
      <Check
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {contractType.name}
    </CommandItem>
  );
};

export default ContractTypeComponent;
