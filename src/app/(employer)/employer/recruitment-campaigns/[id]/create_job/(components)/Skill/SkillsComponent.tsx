import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { JobFormValues } from "../FormCreateJobComponent";
import FormFieldComponent from "@/app/(auth)/(components)/FormFieldComponent";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandInput } from "@/components/ui/command";
import { useDebounce } from "use-debounce";
import { getAllSkills } from "@/queries/queries";
import ListSkillsComponent from "./ListSkillsComponent";
import SelectedSkillsComponent from "./SelectedSkillsComponent";
type Props = {
  form: any;
  addItem: (field: keyof JobFormValues, value: string) => void;
  removeItem: (field: keyof JobFormValues, value: string) => void;
};
const SkillsComponent = ({ form, addItem, removeItem }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [debouncedSearchTerm] = useDebounce(search, 500);

  const {
    data: skills,
    isLoading,
    isFetching,
  } = getAllSkills(debouncedSearchTerm, 0, 1, open);

  return (
    <FormFieldComponent
      control={form.control}
      name="skills"
      label="Kỹ năng yêu cầu"
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
                    ? `${field.value.length} kỹ năng được chọn`
                    : "Chọn yêu cầu kỹ năng..."}
                </p>
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Tìm yêu cầu kỹ năng"
                  className="h-9"
                />
                <ListSkillsComponent
                  setOpen={setOpen}
                  skills={skills?.items}
                  isLoading={isLoading}
                  isFetching={isFetching}
                  field={field}
                />
              </Command>
            </PopoverContent>
          </Popover>
          <SelectedSkillsComponent
            field={field}
            skills={skills?.items}
            removeItem={removeItem}
          />
        </div>
      )}
    </FormFieldComponent>
  );
};

export default SkillsComponent;
