import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BusinessVerification } from "@/types/BusinessVerification";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
import DialogReject from "./DialogReject";
type Props = {
  row: BusinessVerification;
  handleAccept: (companyId: string) => void;
  handleReject: (companyId: string, reason: string) => void;
};
const ActionColumn = ({ row, handleAccept, handleReject }: Props) => {
  return (
    <div className="flex justify-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={() => handleAccept(row.companyId)} asChild>
            <CircleCheck className="w-5 h-5 text-green-500" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Duyệt</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogReject id={row.companyId} handleReject={handleReject} />
    </div>
  );
};

export default ActionColumn;
