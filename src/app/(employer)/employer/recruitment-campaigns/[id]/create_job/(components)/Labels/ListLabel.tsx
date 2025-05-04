import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Label from "./Label";
import { ServiceJobs } from "@/services/services";
type Props = {
  labels: ServiceJobs[] | undefined;
  isLoading?: boolean;
  isFetching?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  field: any;
};
const ListLabel = ({ labels, isLoading, isFetching, field }: Props) => {
  return (
    <CommandList>
      {/* {isLoading || isFetching ? (
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
      ) : !skills || skills.length === 0 ? (
        <CommandEmpty>Không tìm thấy loại công việc</CommandEmpty>
      ) : ( */}
      <CommandGroup>
        {labels &&
          labels.map((label) => (
            <Label key={label.id} label={label} field={field} />
          ))}
      </CommandGroup>
      {/* )} */}
    </CommandList>
  );
};

export default ListLabel;
