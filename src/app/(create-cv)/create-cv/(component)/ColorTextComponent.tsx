import { Input } from "@/components/ui/input";
import React from "react";
type Props = {
  editor: any;
};
const ColorTextComponent = ({ editor }: Props) => {
  const rgbToHex = (color: string) => {
    if (color.startsWith("#")) return color;
    const result = color.match(/\d+/g);
    if (!result) return "#000000";
    return `#${result
      .map((x) => Number(x).toString(16).padStart(2, "0"))
      .join("")}`;
  };
  return (
    <div className="w-fit flex items-center flex-wrap gap-2 bg-white border-l-2 border-r-2">
      <div className="pl-2">Màu sắc</div>
      <Input
        type="color"
        onInput={(event) => {
          const target = event.target as HTMLInputElement;
          editor
            .chain()
            .focus()
            .setMark("textStyle", { color: target.value })
            .run();
        }}
        value={rgbToHex(editor.getAttributes("textStyle").color || "#000000")}
        data-testid="setColor"
        className="w-12 border-none focus-visible:ring-0 placeholder:font-medium rounded-3xl"
      />
    </div>
  );
};

export default ColorTextComponent;
