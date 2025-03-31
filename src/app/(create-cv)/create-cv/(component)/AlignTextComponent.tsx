import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import React from "react";
type Props = {
  editor: any;
};
const AlignTextComponent = ({ editor }: Props) => {
  return (
    <ToggleGroup type="multiple" className="flex gap-2 border-r-2 pr-2">
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("left").run();
        }}
        value="alignLeft"
        className={`p-2 rounded-md ${
          editor.isActive({ textAlign: "left" })
            ? "bg-secondaryColor text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="Toggle left"
      >
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("center").run();
        }}
        value="alignCenter"
        className={`p-2 rounded-md ${
          editor.isActive({ textAlign: "center" })
            ? "bg-secondaryColor text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="Toggle center"
      >
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("right").run();
        }}
        className={`p-2 rounded-md ${
          editor.isActive({ textAlign: "right" })
            ? "bg-secondaryColor text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="Toggle right"
        value="alignRight"
      >
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("justify").run();
        }}
        className={`p-2 rounded-md ${
          editor.isActive({ textAlign: "justify" })
            ? "bg-secondaryColor text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="Toggle justify"
        value="alignJustify"
      >
        <AlignJustify className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default AlignTextComponent;
