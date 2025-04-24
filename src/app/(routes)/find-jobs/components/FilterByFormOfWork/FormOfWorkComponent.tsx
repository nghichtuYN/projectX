import { Checkbox } from "@/components/ui/checkbox";

import { ContractType } from "@/types/ContractType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
type Props = {
  contractType: ContractType;
};
const FormOfWorkComponent = ({ contractType }: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const contractTypes = searchParams.getAll("contractTypes");
  const handleSelectContractType = useCallback(
    (contractId: string, isSelected: boolean) => {
      const params = new URLSearchParams(searchParams);
      if (isSelected) {
        const updatedContracTypes = contractTypes.filter(
          (contracType) => contracType !== contractId
        );
        params.delete("contractTypes");
        updatedContracTypes.forEach((contracType) => params.append("contractTypes", contracType));
      } else {
        params.append("contractTypes", contractId);
      }
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    },
    [contractTypes, pathName, router, searchParams]
  );
  const isChecked = contractTypes.includes(contractType?.id);
  return (
    <div className="flex items-center space-x-2 mb-3">
      <Checkbox
        id={contractType?.id}
        checked={isChecked}
        onCheckedChange={(checked) => {
          handleSelectContractType(contractType?.id, isChecked);
        }}
      />
      <label
        htmlFor={contractType?.name}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {contractType?.name}
      </label>
    </div>
  );
};

export default FormOfWorkComponent;
