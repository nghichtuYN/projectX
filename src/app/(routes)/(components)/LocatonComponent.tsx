"use client";
import {
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
} from "lucide-react";

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

import { JobType } from "@/data/jobType";
import React, { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
const LocatonComponent = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const placeHolderComandInput = "Nhập Thành phố";
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="p-5" asChild>
          <Button
            variant="outline"
            role="combobox"
            size={"lg"}
            aria-expanded={open}
            className={cn(
              "bg-accent font-semibold w-full overflow-hidden  leading-6 p-2 rounded-2xl",
              "focus:border-secondaryColor active:border-secondaryColor active:text-secondaryColor hover:text-secondaryColor shadow-md",
              open ? "text-secondaryColor border-secondaryColor" : ""
            )}
          >
            {value ? (
              JobType.find((framework) => framework.value === value)?.label
            ) : (
              <>
                <MapPin/> Địa điểm
              </>
            )}
            {open ? (
              <ChevronUp className="opacity-50" />
            ) : (
              <ChevronDown className="opacity-50" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0 ">
          <ScrollArea className="h-72 ">
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
    </>
  );
};

export default LocatonComponent;
