import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { List, ListOrdered } from "lucide-react";
import React from "react";
type Props = {
  editor: any;
};
const OrderTextComponent = ({ editor }: Props) => {
  return (
    <ToggleGroup type="multiple" className="flex gap-2 bg-white">
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        value="orderedList"
        className={`p-2 rounded-md ${
          editor.isActive("orderedList")
            ? "bg-secondaryColor text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="Toggle orderedList"
      >
        <ListOrdered className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        value="bulletList"
        className={`p-2 rounded-md ${
          editor.isActive("bulletList")
            ? "bg-secondaryColor text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="Toggle bulletList"
      >
        <List className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default OrderTextComponent;
