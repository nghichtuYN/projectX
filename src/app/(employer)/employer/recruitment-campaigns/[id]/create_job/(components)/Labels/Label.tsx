import { CommandItem } from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, handleSelect } from "@/lib/utils";
import { ServiceJobs } from "@/services/services";
import { Check, Info } from "lucide-react";
type Props = {
  label: ServiceJobs;
  field: any;
};
const Label = ({ label, field }: Props) => {
  const isSelected = field.value?.includes(label.id);

  return (
    <CommandItem
      className="cursor-pointer"
      value={label.id}
      onSelect={() => handleSelect(field, isSelected, label?.id)}
      title={label.description}
    >
      <Check
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {label.name}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-3.5 w-3.5 ml-1 text-gray-500 cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{label?.description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CommandItem>
  );
};

export default Label;
