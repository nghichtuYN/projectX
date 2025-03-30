"use client";
import React from "react";
import { Box, Check, ChevronsUpDown } from "lucide-react";

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
import { streamBusiness } from "@/data/steamBusiness";
import ListStreamBusinessComponent from "./ListStreamBusinessComponent";

const FilterByStreamBusinessComponent = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("all");
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full text-start">
        <p className="text-sm text-start w-full font-semibold">
          Lĩnh vực công ty
        </p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="p-4" asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[300px] justify-between m-2 border hover:border-secondaryColor"
            >
              <div className="flex items-center gap-2">
                <Box />
                <p className="text-secondaryColor text-sm font-semibold">
                  {value
                    ? streamBusiness.find((stream) => stream.value === value)
                        ?.label
                    : "Tất cả lĩnh vực"}
                </p>
              </div>
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput
                placeholder="Tìm kiếm lĩnh vực..."
                className="h-9"
              />
              <ListStreamBusinessComponent
                setValue={setValue}
                setOpen={setOpen}
                value={value}
              />
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default FilterByStreamBusinessComponent;
