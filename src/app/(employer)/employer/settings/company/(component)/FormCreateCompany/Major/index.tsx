import React from "react";
import { CompanyFormValues } from "../FormCreateCompany";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandInput } from "@/components/ui/command";
import { useDebounce } from "use-debounce";
import { getAllMajors } from "@/queries/queries";
import ListMajors from "./ListMajors";
import SelectedMajorsComponent from "./SelectedMajorsComponent";
type Props = {
  form: any;
  removeItem: (field: any, value: string) => void;
};
const MajorsComponent = ({ form, removeItem }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(search, 500);
  const {
    data: majors,
    isLoading,
    isFetching,
  } = getAllMajors(debouncedSearchTerm, 0, 1, open);

  return (
    <FormFieldComponent
      control={form.control}
      name="major"
      label="Lĩnh vực công ty"
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
                    ? `${field.value.length} loại lĩnh vực được chọn`
                    : "Chọn lĩnh vực..."}
                </p>
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Tìm loại hợp đồng"
                  className="h-9"
                />
                <ListMajors
                  majors={majors?.items}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  field={field}
                />
              </Command>
            </PopoverContent>
          </Popover>
          <SelectedMajorsComponent
            field={field}
            majors={majors?.items}
            removeItem={removeItem}
          />
        </div>
      )}
    </FormFieldComponent>
  );
};

export default MajorsComponent;
