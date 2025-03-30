import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import JobTypeComponent from "./JobTypeComponent";
import { JobType } from "@/types/JobType";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
type Props = {
  jobTypes: JobType[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  field: any;
};
const ListJobTypesComponent = ({
  jobTypes,
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
      ) : !jobTypes || jobTypes.length === 0 ? (
        <CommandEmpty>Không tìm thấy loại công việc</CommandEmpty>
      ) : (
        <CommandGroup>
          {jobTypes.map((jobType) => (
            <JobTypeComponent
              key={jobType.id}
              jobType={jobType}
              field={field}
            />
          ))}
        </CommandGroup>
      )}
    </CommandList>
  );
};

export default ListJobTypesComponent;
