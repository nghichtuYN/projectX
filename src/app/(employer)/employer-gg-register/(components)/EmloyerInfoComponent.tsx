/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import FormFieldComponent from "../../../(auth)/(components)/FormFieldComponent";

import {
  Building,
  Building2,
  Check,
  ChevronsUpDown,
  House,
  Phone,
  User,
} from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { Label } from "../../../../components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../components/ui/popover";
import { Button } from "../../../../components/ui/button";
import { JobType } from "@/data/jobType";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../components/ui/command";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  openWorkLocation: boolean;
  setOpenWorkLocation: (value: React.SetStateAction<boolean>) => void;
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  form: any;
};
const EmloyerInfoComponent = ({
  openWorkLocation,
  setOpenWorkLocation,
  open,
  setOpen,
  form,
}: Props) => {
  const errors = form.formState.errors;
  const isMobile = useIsMobile();
  return (
    <>
      <div className="flex items-center w-full gap-3">
        <div className="w-full">
          <FormFieldComponent
            control={form.control}
            name="name"
            icon={User}
            label="Họ và tên"
            requrie={true}
          >
            {(field) => (
              <Input
                className={cn(
                  errors.name && "border-red-500 focus-visible:ring-red-500"
                )}
                placeholder="Nhập họ tên"
                {...field}
              />
            )}
          </FormFieldComponent>
        </div>

        <div className="flex justify-end w-full">
          <FormFieldComponent
            control={form.control}
            name="gender"
            icon={User}
            label="Giới tính"
            requrie={true}
          >
            {(field) => (
              <RadioGroup
                className="flex gap-6"
                value={field.value}
                onValueChange={field.onChange} // Liên kết với react-hook-form
              >
                <div className="flex items-center">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Nam</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Nữ</Label>
                </div>
              </RadioGroup>
            )}
          </FormFieldComponent>
        </div>
      </div>

      <FormFieldComponent
        control={form.control}
        name="company"
        icon={Building}
        label="Công ty"
        requrie={true}
      >
        {(field) => (
          <Input
            className={cn(
              errors.name && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="Nhập tên công ty"
            {...field}
          />
        )}
      </FormFieldComponent>
      <FormFieldComponent
        control={form.control}
        name="phone"
        icon={Phone}
        label="Số điện thoại cá nhân"
        requrie={true}
      >
        {(field) => (
          <Input
            className={cn(
              errors.name && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="Nhập số điện thoại"
            type="phone"
            {...field}
          />
        )}
      </FormFieldComponent>

      <div
        className={cn(
          "flex md:items-center w-full gap-3",
          isMobile ? " flex-col items-center " : ""
        )}
      >
        <div className="w-full">
          <FormFieldComponent
            control={form.control}
            name="workLocation"
            icon={Building2}
            label="Địa điểm làm việc"
            requrie={true}
          >
            {(field) => (
              <Popover
                open={openWorkLocation}
                onOpenChange={setOpenWorkLocation}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openWorkLocation}
                    className={cn(
                      "w-[200px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? JobType?.find((job) => job.value === field.value)?.label
                      : "Chọn địa điểm..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {JobType.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              if (currentValue === field.value) {
                                form.setValue("workLocation", "");
                              } else {
                                form.setValue("workLocation", currentValue);
                              }
                              setOpenWorkLocation(false);
                            }}
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </FormFieldComponent>
        </div>

        <div className="flex  w-full">
          <FormFieldComponent
            control={form.control}
            name="district"
            icon={House}
            label="Quận/Huyện"
            requrie={true}
          >
            {(field) => (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {field.value
                      ? JobType.find(
                          (framework) => framework.value === field.value
                        )?.label
                      : "Chọn địa điểm..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {JobType.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              if (currentValue === field.value) {
                                form.setValue("district", "");
                              } else {
                                form.setValue("district", currentValue);
                              }
                              setOpen(false);
                            }}
                          >
                            {framework.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </FormFieldComponent>
        </div>
      </div>
    </>
  );
};

export default EmloyerInfoComponent;
