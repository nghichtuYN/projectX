import React from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { JobFormValues } from "../FormCreateJobComponent";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { getAllJobTypes } from "@/queries/queries";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ListJobTypesComponent from "./ListJobTypesComponent";
import JobTypeSelected from "./JobTypeSelected";
import { ChevronsUpDown } from "lucide-react";
import { useDebounce } from "use-debounce";
type Props = {
  form: any;
  addItem: (field: keyof JobFormValues, value: string) => void;
  removeItem: (field: keyof JobFormValues, value: string) => void;
};

const JobTypesComponent = ({ form, addItem, removeItem }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(search, 500);

  const {
    data: jobTypes,
    isLoading,
    isFetching,
  } = getAllJobTypes(debouncedSearchTerm, 0, 1, open);

  return (
    <FormFieldComponent
      control={form.control}
      name="jobTypes"
      label="Loại công việc"
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
                    ? `${field.value.length} loại công việc được chọn`
                    : "Chọn loại công việc..."}
                </p>
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Tìm loại công việc"
                  className="h-9"
                />
                <ListJobTypesComponent
                  jobTypes={jobTypes?.items}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  field={field}
                />
              </Command>
            </PopoverContent>
          </Popover>
          <JobTypeSelected
            field={field}
            jobTypes={jobTypes?.items}
            removeItem={removeItem}
          />
        </div>
      )}
    </FormFieldComponent>
  );
};

export default JobTypesComponent;
