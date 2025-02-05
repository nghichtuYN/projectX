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

import { JobType } from "@/lib/jobType";
import React, { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const LocationDetailPageComponent = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const placeHolderComandInput = "Tìm kiếm ngành nghề...";
  return (
    <div className={cn("overflow-hidden w-2/6")}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={cn("h-full  rounded-l-none ")} asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("bg-white font-semibold w-full h-full leading-6 ")}
          >
            {value ? (
              JobType.find((framework) => framework.value === value)?.label
            ) : (
              <div className="flex items-center justify-start gap-2">
                <MapPin className="w-1/3" />
                <p
                  className="w-2/3 flex items-center gap-1"
                  title="Danh mục nghề"
                >
                  Địa điểm
                  {open ? <ChevronUp /> : <ChevronDown />}
                </p>
              </div>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0 ">
          <ScrollArea className="h-72 w-48 scrollbar-thin">
            <Command>
              <CommandInput
                placeholder={placeHolderComandInput}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>Không tìm thấy ngành nghề.</CommandEmpty>
                <CommandGroup>
                  {JobType.map((framework, index) => (
                    <CommandItem
                      key={index}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {framework.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === framework.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationDetailPageComponent;
