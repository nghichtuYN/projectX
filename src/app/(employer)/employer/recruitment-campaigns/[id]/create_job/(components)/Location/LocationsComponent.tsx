import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { useQueryHook } from "@/hooks/useQueryHook";

import React from "react";
type Props = {
  form: any;
};
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "use-debounce";
import ListLocationsComponent from "./ListLocationsComponent";
import { getAllLocation } from "@/services/location";
import { ListLocations } from "@/types/locations";
import { ChevronsUpDown } from "lucide-react";
const LocationsComponent = ({ form }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(search, 500);
  const {
    data: locations,
    isLoading,
    isFetching,
  } = useQueryHook<ListLocations>(
    ["locations", debouncedSearchTerm],
    () => getAllLocation(debouncedSearchTerm),
    {
      enabled: !!open,
    }
  );
  React.useEffect(() => {
    if (!open) {
      setSearch("");
    }
  }, [open]);
  return (
    <FormFieldComponent
      control={form.control}
      name="majorId"
      label="Thành phố"
      requrie
      icon={null}
    >
      {(field) => (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? locations?.items.find((major) => major.id === value)?.name
                : "Chọn thành phố..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Command shouldFilter={false}>
              <CommandInput
                value={search}
                onValueChange={setSearch}
                placeholder="Tìm thành phố"
                className="h-9"
              />
              <ListLocationsComponent
                setValue={setValue}
                setOpen={setOpen}
                value={value}
                locations={locations?.items}
                field={field}
                isLoading={isLoading}
                isFetching={isFetching}
              />
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </FormFieldComponent>
  );
};

export default LocationsComponent;
