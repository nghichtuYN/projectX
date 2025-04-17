"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Redo, Undo } from "lucide-react";

type Props = {
  editor: any;
};

const UndoRedoComponent = ({ editor }: Props) => {
  return (
    <div className="flex gap-2 p-1 w-fit bg-white rounded-md">
      <Button
        onClick={(e) => {
          e.preventDefault();
          if (editor.can().undo()) {
            editor.chain().focus().undo().run();
          }
        }}
        className={`p-2 rounded-md transition-colors ${
          editor.can().undo()
            ? "bg-secondaryColor text-white hover:bg-secondaryColor/90"
            : "bg-gray-100 text-gray-600 cursor-not-allowed"
        }`}
        aria-label="Undo"
        disabled={!editor.can().undo()}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center justify-center">
                <Undo className="w-5 h-5" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Undo (Ctrl + Z)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>

      <Button
        onClick={(e) => {
          e.preventDefault();
          if (editor.can().redo()) {
            editor.chain().focus().redo().run();
          }
        }}
        className={`p-2 rounded-md transition-colors ${
          editor.can().redo()
            ? "bg-secondaryColor text-white hover:bg-secondaryColor/90"
            : "bg-gray-100 text-gray-600 cursor-not-allowed"
        }`}
        aria-label="Redo"
        disabled={!editor.can().redo()}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center justify-center">
                <Redo className="w-5 h-5" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Redo (Ctrl + Shift + Z)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
    </div>
  );
};

export default UndoRedoComponent;
