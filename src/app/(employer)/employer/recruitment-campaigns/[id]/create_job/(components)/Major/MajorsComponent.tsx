import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { useQueryHook } from "@/hooks/useQueryHook";
import { getMajor } from "@/services/majors";
import { ListMajors } from "@/types/majors";
import React from "react";
type Props = {
  form: any;
};
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ListMajorsComponent from "./ListMajorsComponent";
import { useDebounce } from "use-debounce";
const MajorsComponent = ({ form }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(search, 500);
  const {
    data: majors,
    isLoading,
    isFetching,
  } = useQueryHook<ListMajors>(["majors", debouncedSearchTerm], () =>
    getMajor(debouncedSearchTerm)
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
      label="Chuyên ngành"
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
              className={cn("w-full justify-between")}
            >
              {field.value
                ? majors?.items.find((major) => major.id === field.value)?.name
                : "Chọn chuyên ngành..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Command shouldFilter={false}>
              <CommandInput
                value={search}
                onValueChange={setSearch}
                placeholder="Tìm chuyên ngành"
                className="h-9"
              />
              <ListMajorsComponent
                setOpen={setOpen}
                value={field.value}
                majors={majors?.items}
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

export default MajorsComponent;
