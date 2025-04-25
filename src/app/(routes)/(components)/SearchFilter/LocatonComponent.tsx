"use client";
import { Check, ChevronDown, ChevronUp, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useDebounce } from "use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryHook } from "@/hooks/useQueryHook";
import { ListLocations } from "@/types/locations";
import { getAllLocation } from "@/services/location";
import { Dispatch, SetStateAction, useState } from "react";
type Props = {
  location: string[];
  setLocation: Dispatch<SetStateAction<string[]>>;
};
const LocatonComponent = ({ location, setLocation }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm] = useDebounce(search, 500);
  const placeHolderComandInput = "Nhập Thành phố";
  const {
    data: locations,
    isLoading,
    isFetching,
  } = useQueryHook<ListLocations>(
    ["LocationId", debouncedSearchTerm],
    () => getAllLocation(debouncedSearchTerm),
    {
      enabled: !!open,
    }
  );
  const handleSelect = (locationId: string, isSelected: boolean) => {
    if (isSelected) {
      // Remove the location if already selected
      setLocation((prev) => prev.filter((id) => id !== locationId));
    } else {
      // Add the location if not selected
      setLocation((prev) => [...prev, locationId]);
    }
  };
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="p-5 " asChild>
          <Button
            variant="outline"
            role="combobox"
            size={"lg"}
            aria-expanded={open}
            className={cn(
              "hover:bg-accent bg-white font-medium w-full overflow-hidden justify-between leading-6 p-2 rounded-2xl",
              " active:text-secondaryColor hover:text-secondaryColor ",
              open ? "text-secondaryColor" : ""
            )}
          >
            <div className="flex items-center gap-2">
              {location?.length > 0 ? (
                `${location?.length} địa điểm được chọn`
              ) : (
                <>
                  <MapPin /> Địa điểm
                </>
              )}
            </div>
            {open ? (
              <ChevronUp className="opacity-50" />
            ) : (
              <ChevronDown className="opacity-50" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0 ">
          <Command shouldFilter={false}>
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder={placeHolderComandInput}
              className="h-9"
            />
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
              ) : !locations?.items || locations?.items?.length === 0 ? (
                <CommandEmpty>Không tìm thấy loại công việc</CommandEmpty>
              ) : (
                <CommandGroup>
                  {locations?.items?.map((loc) => {
                    const isSelected = location?.includes(loc.id);
                    return (
                      <CommandItem
                        key={loc.id}
                        className="cursor-pointer"
                        value={loc.id}
                        onSelect={() => handleSelect(loc.id, isSelected)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {loc.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default LocatonComponent;
