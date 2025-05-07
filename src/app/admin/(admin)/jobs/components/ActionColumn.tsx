import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleCheck } from "lucide-react";
import React from "react";
import DialogReject from "./DialogReject";
import { Job } from "@/types/Jobs";
type Props = {
  row: Job;
  handleAccept: (id: string) => void;
  handleReject: (id: string, reason: string) => void;
};
const ActionColumn = ({ row, handleAccept, handleReject }: Props) => {
  return (
    <div className="flex justify-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => handleAccept(row.id)} asChild>
            <CircleCheck className="w-5 h-5 text-green-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Duyệt</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogReject id={row.id} handleReject={handleReject} />
    </div>
  );
};

export default ActionColumn;
