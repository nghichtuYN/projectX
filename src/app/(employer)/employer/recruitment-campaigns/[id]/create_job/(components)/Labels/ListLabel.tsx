import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Label from "./Label";
import { Service } from "@/types/Services";
type Props = {
  labels: Service[] | undefined;
  isLoading?: boolean;
  isFetching?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  field: any;
};
const ListLabel = ({ labels, isLoading, isFetching, field }: Props) => {
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
      ) : !labels || labels.length === 0 ? (
        <CommandEmpty>Không tìm thấy loại công việc</CommandEmpty>
      ) : (
        <CommandGroup>
          {labels &&
            labels.map((label) => (
              <Label key={label.id} label={label} field={field} />
            ))}
        </CommandGroup>
      )}
    </CommandList>
  );
};

export default ListLabel;
