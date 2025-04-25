"use client";
import { Check, ChevronDown, ChevronUp, List } from "lucide-react";
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

import React, { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useDebounce } from "use-debounce";
import { getAllMajors } from "@/queries/queries";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {
  major: string[] | null;
  handleSelect: (locationId: string, isSelected: boolean) => void;
};
const JobTypeDetailPageComponent = ({ major, handleSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm] = useDebounce(search, 500);
  const placeHolderComandInput = "Tìm kiếm ngành nghề...";
  const {
    data: majors,
    isLoading,
    isFetching,
  } = getAllMajors(debouncedSearchTerm, 0, 1);
  return (
    <div
      className={cn(
        "col-span-1 overflow-hidden",
        open ? "text-secondaryColor border-2 border-secondaryColor" : "",
        "hover:text-secondaryColor  hover:border-secondaryColor"
      )}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={cn("h-full  rounded-r-none ")} asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              " bg-accent font-semibold w-full h-full leading-6 ",
              "hover:text-secondaryColor "
            )}
          >
            <div className="flex items-center gap-2">
              {major && major?.length > 0 ? (
                `${major?.length} ngành được chọn`
              ) : (
                <>
                  <List /> Danh mục nghề
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

        <PopoverContent className="w-[200px] p-0 ">
          <ScrollArea className="h-72 w-48 scrollbar-thin">
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
                ) : !majors?.items || majors.items.length === 0 ? (
                  <CommandEmpty>Không tìm thấy địa điểm</CommandEmpty>
                ) : (
                  <CommandGroup>
                    {majors.items.map((maj) => {
                      const isSelected = major?.includes(maj?.id) ?? false;
                      return (
                        <CommandItem
                          key={maj?.id}
                          className="cursor-pointer"
                          value={maj?.id}
                          onSelect={() => handleSelect(maj?.id, isSelected)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {maj?.name}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default JobTypeDetailPageComponent;
