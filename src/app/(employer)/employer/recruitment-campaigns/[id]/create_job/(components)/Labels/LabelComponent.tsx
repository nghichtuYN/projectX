import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { JobFormValues } from "../FormCreateJobComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandInput } from "@/components/ui/command";
import { useDebounce } from "use-debounce";
import ListLabel from "./ListLabel";
import SelectedLabel from "./SelectedLabel";
import { JobServices } from "@/data/JobServices";
type Props = {
  form: any;
  removeItem: (field: keyof JobFormValues, value: string) => void;
};
const LabelComponent = ({ form, removeItem }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm] = useDebounce(search, 500);
  return (
    <FormFieldComponent
      control={form.control}
      name="labels"
      label="Dịch vụ thêm"
      requrie={false}
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
                    ? `${field.value.length} dịch vụ được chọn`
                    : "Chọn dịch vụ..."}
                </p>
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Tìm dịch vụ"
                  className="h-9"
                />
                <ListLabel
                  setOpen={setOpen}
                  labels={JobServices?.items}
                  // isLoading={isLoading}
                  // isFetching={isFetching}
                  field={field}
                />
              </Command>
            </PopoverContent>
          </Popover>
          <SelectedLabel
            field={field}
            labels={JobServices?.items}
            removeItem={removeItem}
          />
        </div>
      )}
    </FormFieldComponent>
  );
};

export default LabelComponent;
