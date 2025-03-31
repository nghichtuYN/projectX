import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fontFamilies } from "@/data/fontFamily";
import { Input } from "@/components/ui/input";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo,
  Underline,
  Undo,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import BoldItalicUnderLine from "./BoldItalicUnderLine";
import FontFamilyComponent from "./FontFamilyComponent";
import FontSizeComponent from "./FontSizeComponent";
import AlignTextComponent from "./AlignTextComponent";
import OrderTextComponent from "./OrderTextComponent";
import ColorTextComponent from "./ColorTextComponent";
import UndoRedoComponent from "./UndoRedoComponent";

type Props = {
  editor: Editor | null;
};

const TextToolBarComponent = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="px-4  bg-white py-3 rounded-tl-md rounded-tr-md flex justify-center items-center gap-5 w-full flex-wrap border-t-2">
      <div className="md:flex-row md:justify-center flex  items-center w-full gap-2 lg:w-10/12 flex-wrap">
        <FontFamilyComponent editor={editor} />
        <FontSizeComponent editor={editor} />
        <AlignTextComponent editor={editor} />
        <BoldItalicUnderLine editor={editor} />
        <OrderTextComponent editor={editor} />
        <ColorTextComponent editor={editor} />
        <UndoRedoComponent editor={editor} />
      </div>
    </div>
  );
};

export default TextToolBarComponent;
