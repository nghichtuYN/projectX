import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ChevronsUpDown, X } from "lucide-react";
import { JobFormValues } from "../FormCreateJobComponent";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { getAllJobLevels } from "@/queries/queries";
import { Command, CommandInput } from "@/components/ui/command";

import ListJobLevelsComponent from "./ListJobLevelsComponent";
import SelectedJobLevelsComponent from "./SelectedJobLevelsComponent";
import { Button } from "@/components/ui/button";
import { useDebounce } from "use-debounce";

type Props = {
  form: any;
  addItem: (field: keyof JobFormValues, value: string) => void;
  removeItem: (field: keyof JobFormValues, value: string) => void;
};

const JobLevelsComponent = ({ form, addItem, removeItem }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(search, 500);
  const {
    data: jobLevels,
    isLoading,
    isFetching,
  } = getAllJobLevels(debouncedSearchTerm, 0, 1, open);

  return (
    <FormFieldComponent
      control={form.control}
      name="jobLevels"
      label="Chức vụ công việc"
      requrie
      icon={null}
    >
      {(field) => (
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                <p className="text-sm">
                  {field.value?.length > 0
                    ? `${field.value.length} chức vụ được chọn`
                    : "Chọn chức vụ công việc..."}
                </p>
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Tìm chức vụ công việc"
                  className="h-9"
                />
                <ListJobLevelsComponent
                  jobLevels={jobLevels?.items}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  field={field}
                />
              </Command>
            </PopoverContent>
          </Popover>
          <SelectedJobLevelsComponent
            field={field}
            jobLevels={jobLevels?.items}
            removeItem={removeItem}
          />
        </div>
      )}
    </FormFieldComponent>
  );
};

export default JobLevelsComponent;
