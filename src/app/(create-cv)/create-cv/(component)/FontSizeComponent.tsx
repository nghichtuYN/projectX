import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
type Props = {
  editor: any;
};
const FontSizeComponent = ({ editor }: Props) => {
  return (
    <div className="h-fit flex items-center flex-wrap gap-2 bg-white border-l-2 border-r-2">
      <div className="pl-2">Cỡ chữ</div>
      <Select
        onValueChange={(size) => {
          editor
            .chain()
            .focus()
            .setMark("textStyle", { fontSize: `${size}px` })
            .run();
        }}
        value={
          editor.getAttributes("textStyle")?.fontSize?.replace("px", "") || "12"
        }
      >
        <SelectTrigger className="w-auto border-none focus-visible:ring-0 focus:ring-0">
          <SelectValue placeholder="Chọn kích thước" />
        </SelectTrigger>
        <SelectContent onCloseAutoFocus={(event) => event.preventDefault()}>
          <SelectItem value="12">12px</SelectItem>
          <SelectItem value="14">14px</SelectItem>
          <SelectItem value="16">16px</SelectItem>
          <SelectItem value="18">18px</SelectItem>
          <SelectItem value="20">20px</SelectItem>
          <SelectItem value="24">24px</SelectItem>
          <SelectItem value="30">30px</SelectItem>
          <SelectItem value="48">48px</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontSizeComponent;
