import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import React from "react";
type Props = {
  editor: any;
};
const BoldItalicUnderLine = ({ editor }: Props) => {
  return (
    <ToggleGroup type="multiple" className="flex gap-2 border-r-2 pr-2">
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        value="bold"
        className={`p-2 rounded-md ${
          editor.isActive("bold")
            ? "bg-secondaryColor text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        value="italic"
        className={`p-2 rounded-md ${
          editor.isActive("italic")
            ? "bg-secondaryColor text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="Toggle italic"
      >
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        className={`p-2 rounded-md ${
          editor.isActive("underline")
            ? "bg-secondaryColor text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="Toggle underline"
        value="underline"
      >
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default BoldItalicUnderLine;
