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
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQueryHook } from "@/hooks/useQueryHook";
import { getAllLocation } from "@/services/location";
import { Skeleton } from "@/components/ui/skeleton";
import { ListLocations } from "@/types/locations";
type Props = {
  location: string[] | null;
  handleSelect: (locationId: string, isSelected: boolean) => void;
};
const LocationDetailPageComponent = ({ location, handleSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm] = useDebounce(search, 500);
  const placeHolderComandInput = "Nhập Thành phố";
  const {
    data: locations,
    isLoading,
    isFetching,
  } = useQueryHook<ListLocations>(["LocationId", debouncedSearchTerm], () =>
    getAllLocation(debouncedSearchTerm)
  );

  return (
    <div className={cn("overflow-hidden w-2/6")}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={cn("h-full rounded-l-none")} asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("bg-white font-semibold w-full h-full leading-6")}
          >
            <div className="flex items-center gap-2">
              {location && location?.length > 0 ? (
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

        <PopoverContent className="w-[200px] p-0">
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
              ) : !locations?.items || locations.items.length === 0 ? (
                <CommandEmpty>Không tìm thấy địa điểm</CommandEmpty>
              ) : (
                <CommandGroup>
                  {locations.items.map((loc) => {
                    const isSelected = location?.includes(loc.id) ?? false;
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
    </div>
  );
};

export default LocationDetailPageComponent;
