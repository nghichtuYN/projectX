import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LocationComponent from "./LocationComponent";
import { Location } from "@/types/locations";
type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  locations: Location[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  field: any;
};
const ListLocationsComponent = ({
  setOpen,
  value,
  locations,
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
      ) : !locations || locations.length === 0 ? (
        <CommandEmpty>Không tìm thấy thành phố</CommandEmpty>
      ) : (
        <CommandGroup>
          {locations.map((location) => (
            <LocationComponent
              key={location.id}
              location={location}
              setOpen={setOpen}
              value={value}
              field={field}
            />
          ))}
        </CommandGroup>
      )}
    </CommandList>
  );
};

export default ListLocationsComponent;
