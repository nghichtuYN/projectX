import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fontFamilies } from "@/data/fontFamily";
import React from "react";
type Props = {
  editor: any;
};
const FontFamilyComponent = ({ editor }: Props) => {
  return (
    <Select
      onValueChange={(font) => {
        editor.chain().focus().setMark("textStyle", { fontFamily: font }).run();
      }}
      value={editor.getAttributes("textStyle")?.fontFamily || "Inter"}
    >
      <SelectTrigger className="w-44 truncate">
        <SelectValue placeholder="Chọn font chữ" />
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={(event) => event.preventDefault()}>
        {fontFamilies.map((font) => (
          <SelectItem
            key={font.value}
            value={font.value}
            style={{ fontFamily: font.value }}
          >
            {font.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FontFamilyComponent;
