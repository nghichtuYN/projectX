import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Major } from "@/types/majors";
import React from "react";
import MajorComponent from "./MajorComponent";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  majors: Major[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  field: any;
};
const ListMajorsComponent = ({
  setValue,
  setOpen,
  value,
  majors,
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
      ) : !majors || majors.length === 0 ? (
        <CommandEmpty>Không tìm thấy chuyên ngành</CommandEmpty>
      ) : (
        <CommandGroup>
          {majors.map((major) => (
            <MajorComponent
              key={major.id}
              major={major}
              setOpen={setOpen}
              value={value}
              field={field}
              setValue={setValue}
            />
          ))}
        </CommandGroup>
      )}
    </CommandList>
  );
};

export default ListMajorsComponent;
