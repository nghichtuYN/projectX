import { CommandItem } from "@/components/ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, handleSelect } from "@/lib/utils";
import { Service } from "@/types/Services";
import { Check, Info } from "lucide-react";
type Props = {
  label: Service;
  field: any;
};
const Label = ({ label, field }: Props) => {
  const isSelected = field.value?.includes(label.id);
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
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
      <div className="flex-1">
        <span>{label.name}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3.5 w-3.5 ml-1 text-gray-500 cursor-help inline-block" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>{label?.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
        <span className="text-blue-600">
          {label.xTokenPrice?.toLocaleString()} Token
        </span>
        <span className="text-green-600">
          {formatCurrency(label.cashPrice || 0)}
        </span>
      </div>
    </CommandItem>
  );
};

export default Label;
