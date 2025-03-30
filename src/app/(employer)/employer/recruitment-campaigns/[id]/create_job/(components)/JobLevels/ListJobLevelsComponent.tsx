import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import JobLevelComponent from "./JobLevelComponent";
import { JobLevel } from "@/types/JobLevelType";
type Props = {
  jobLevels: JobLevel[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  field: any;
};
const ListJobLevelsComponent = ({
  jobLevels,
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
      ) : !jobLevels || jobLevels.length === 0 ? (
        <CommandEmpty>Không tìm thấy loại công việc</CommandEmpty>
      ) : (
        <CommandGroup>
          {jobLevels.map((jobLevel) => (
            <JobLevelComponent
              key={jobLevel.id}
              jobLevel={jobLevel}
              field={field}
            />
          ))}
        </CommandGroup>
      )}
    </CommandList>
  );
};

export default ListJobLevelsComponent;
