import React from "react";
import { ChevronsUpDown } from "lucide-react";
import { JobFormValues } from "../FormCreateJobComponent";
import { useDebounce } from "use-debounce";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import ListContractTypes from "./ListContractTypes";
import SelectedContractType from "./SelectedContractType";
import { getAllContractType } from "@/queries/queries";
type Props = {
  form: any;
  removeItem: (field: keyof JobFormValues, value: string) => void;
};

const ContractsTypeComponent = ({ form, removeItem }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(search, 500);

  const {
    data: contractTypes,
    isLoading,
    isFetching,
  } = getAllContractType(debouncedSearchTerm, 0, 1, open);

  return (
    <FormFieldComponent
      control={form.control}
      name="contractTypes"
      label="Loại hợp đồng"
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
                    ? `${field.value.length} loại hợp đồng được chọn`
                    : "Chọn loại hợp đồng..."}
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
                <ListContractTypes
                  contractTypes={contractTypes?.items}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  field={field}
                />
              </Command>
            </PopoverContent>
          </Popover>
          <SelectedContractType
            field={field}
            contractTypes={contractTypes?.items}
            removeItem={removeItem}
          />
        </div>
      )}
    </FormFieldComponent>
  );
};

export default ContractsTypeComponent;
