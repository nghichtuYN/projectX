import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoveDown, MoveUp } from "lucide-react";
import React from "react";
type Props = {
  index: number;
  handleMoveUp?: () => void;
  handleMoveDown?: () => void;
  length: number;
  handleDelete?: () => void;
};
const OptionsButtonComponent = ({
  index,
  handleMoveUp,
  handleMoveDown,
  length,
}: Props) => {
  return (
    <div className="absolute -top-8 rounded-t-md right-2 hidden group-hover/detail:flex group-hover/detail:items-center group-hover/detail:bg-hoverColor gap-2 p-1 ">
      {length && length > 1 && (
        <>
          {index > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={handleMoveUp} asChild>
                  <div className="p-1 bg-secondaryColor rounded-md">
                    <MoveUp className="w-4 h-4 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Di chuyển lên trên</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {index < length - 1 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={handleMoveDown} asChild>
                  <div className="p-1 bg-secondaryColor rounded-md">
                    <MoveDown className="w-4 h-4 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Di chuyển xuống dưới</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </>
      )}
    </div>
  );
};

export default OptionsButtonComponent;
