import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Location } from "@/types/locations";
import { Check } from "lucide-react";
import React from "react";
type Props = {
  location: Location;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  field: any;
};
const LocationComponent = ({
  location,
  value,
  setValue,
  setOpen,
  field,
}: Props) => {
  return (
    <CommandItem
      key={location.id}
      value={location.id}
      onSelect={(currentValue) => {
        const newValue = currentValue === value ? "" : currentValue;
        setValue(newValue);
        field.onChange(newValue);
        setOpen(false);
      }}
    >
      {location.name}
      <Check
        className={cn(
          "mr-2 h-4 w-4",
          value === location.id ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
};

export default LocationComponent;
