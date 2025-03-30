import { ContractType } from "@/types/ContractType";
import React from "react";
type Props = {
  contractTypes: ContractType[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  field: any;
};
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import ContractTypeComponent from "./ContractTypeComponent";
const ListContractTypes = ({
  contractTypes,
  isLoading,
  isFetching,
  field,
}: Props) => {
  return (
    <CommandList>
      {isLoading || isFetching ? (
        <CommandGroup>
          <CommandItem>
            <Skeleton className="w-full" />
          </CommandItem>
          <CommandItem>
            <Skeleton className="w-full" />
          </CommandItem>
          <CommandItem>
            <Skeleton className="w-full" />
          </CommandItem>
          <CommandItem>
            <Skeleton className="w-full" />
          </CommandItem>
        </CommandGroup>
      ) : !contractTypes || contractTypes.length === 0 ? (
        <CommandEmpty>Không tìm thấy loại công việc</CommandEmpty>
      ) : (
        <CommandGroup>
          {contractTypes.map((contractType) => (
            <ContractTypeComponent
              key={contractType.id}
              contractType={contractType}
              field={field}
            />
          ))}
        </CommandGroup>
      )}
    </CommandList>
  );
};

export default ListContractTypes;
