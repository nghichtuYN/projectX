import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Redo, Undo } from "lucide-react";
import React from "react";
type Props = {
  editor: any;
};
const UndoRedoComponent = ({ editor }: Props) => {
  return (
    <div className="flex items-center w-auto bg-white gap-2 border-r-2 pr-2">
      <span
        onClick={(e) => {
          e.preventDefault();
          if (editor.can().undo()) {
            editor.chain().focus().undo().run();
          }
        }}
        className={
          editor.can().undo()
            ? "text-gray-500 hover:text-red-500 p-2 rounded-lg"
            : "text-gray-300 p-2 rounded-lg cursor-not-allowed"
        }
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger disabled={!editor.can().undo()}>
              <Undo className="w-5 h-5" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo (Ctrl + Z)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
      <span
        onClick={(e) => {
          e.preventDefault();
          if (editor.can().redo()) {
            editor.chain().focus().redo().run();
          }
        }}
        className={
          editor.can().redo()
            ? "text-gray-500 hover:text-red-500 p-2 rounded-lg"
            : "text-gray-300 p-2 rounded-lg cursor-not-allowed"
        }
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger disabled={!editor.can().redo()}>
              <Redo className="w-5 h-5" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Redo (Ctrl + Shift + Z)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </span>
    </div>
  );
};

export default UndoRedoComponent;
