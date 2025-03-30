import { CommandItem } from "@/components/ui/command";
import { streamBusiness } from "@/data/steamBusiness";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";
type Props = {
  stream: streamBusiness;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
};
const StreamBusinessComponent = ({
  stream,
  setValue,
  setOpen,
  value,
}: Props) => {
  return (
    <CommandItem
      value={stream.label}
      onSelect={() => {
        setValue(stream.value === value ? "" : stream.value);
        setOpen(false);
      }}
      className={cn(
        "text-sm font-medium",
        value === stream.value && "text-secondaryColor"
      )}
    >
      {stream.label}
      <Check
        className={cn(
          "ml-auto",
          value === stream.value ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
};

export default StreamBusinessComponent;
