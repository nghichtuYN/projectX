import React from "react";
type Props = {
  majors: Major[] | undefined;
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
import { Major } from "@/types/majors";
import MajorComponent from "./MajorComponent";
const ListMajors = ({ majors, isLoading, isFetching, field }: Props) => {
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
      ) : !majors || majors.length === 0 ? (
        <CommandEmpty>Không tìm thấy loại công việc</CommandEmpty>
      ) : (
        <CommandGroup>
          {majors.map((major) => (
            <MajorComponent key={major.id} major={major} field={field} />
          ))}
        </CommandGroup>
      )}
    </CommandList>
  );
};

export default ListMajors;
