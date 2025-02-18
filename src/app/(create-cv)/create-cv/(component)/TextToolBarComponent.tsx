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
import { Bold, Italic, Redo, Underline, Undo } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Props = {
  editor: Editor | null;
};
const TextToolBarComponent = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  console.log(editor.isActive("redo"));
  return (
    <div className="px-4 bg-white py-3 rounded-tl-md rounded-tr-md flex justify-center items-center gap-5 w-full flex-wrap border-t-2 ">
      <div className="flex justify-center items-center w-full gap-2 lg:w-10/12 flex-wrap ">
        <Select
          onValueChange={(font) => {
            if (editor) {
              editor
                .chain()
                .focus()
                .setMark("textStyle", { fontFamily: font })
                .run();
            }
          }}
          value={editor.getAttributes("textStyle")?.fontFamily || "Inter"}
        >
          <SelectTrigger className="w-[220px]">
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
        <div className="h-fit flex items-center flex-wrap gap-2 bg-white  border-l-2 border-r-2  ">
          <div className="pl-2">Cỡ chữ</div>
          <Select
            onValueChange={(size) => {
              if (editor) {
                console.log("run");
                editor
                  .chain()
                  .focus()
                  .setMark("textStyle", { fontSize: `${size}px` })
                  .run();
              }
            }}
            value={
              editor.getAttributes("textStyle")?.fontSize?.replace("px", "") ||
              "12"
            }
          >
            <SelectTrigger className="w-[80px] border-none focus-visible:ring-0 focus:ring-0">
              <SelectValue placeholder="Chọn kích thước" />
            </SelectTrigger>
            <SelectContent onCloseAutoFocus={(event) => event.preventDefault()}>
              <SelectItem value="12">12px</SelectItem>
              <SelectItem value="14">14px</SelectItem>
              <SelectItem value="16">16px</SelectItem>
              <SelectItem value="20">20px</SelectItem>
              <SelectItem value="24">24px</SelectItem>
              <SelectItem value="30">30px</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3 w-fit ">
          <span
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBold().run();
            }}
            className={cn(
              editor.isActive("bold")
                ? "bg-secondaryColor text-white p-2 rounded-lg"
                : "text-secondaryColor"
            )}
          >
            <Bold className="w-4 h-4" />
          </span>
          <span
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleItalic().run();
            }}
            className={cn(
              editor.isActive("italic")
                ? "bg-secondaryColor text-white p-2 rounded-lg"
                : "text-secondaryColor"
            )}
          >
            <Italic className="w-4 h-4" />
          </span>
          <span
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleUnderline().run();
            }}
            className={cn(
              editor.isActive("underline")
                ? "bg-secondaryColor text-white p-2 rounded-lg"
                : "text-secondaryColor"
            )}
          >
            <Underline className="w-4 h-4" />
          </span>
        </div>

        <div className="w-fit flex items-center flex-wrap gap-2 bg-white  border-l-2 border-r-2 ">
          <div className="pl-2">Màu sắc</div>
          <Input
            type="color"
            onInput={(event) => {
              const target = event.target as HTMLInputElement;
              editor
                .chain()
                .focus()
                .setMark("textStyle", { color: target.value }) // Correct usage of setMark for setting color
                .run();
            }}
            value={editor.getAttributes("textStyle").color || "#000000"} // Get the current color value
            data-testid="setColor"
            className="w-12 border-none focus-visible:ring-0 placeholder:font-medium rounded-3xl"
          />
        </div>
        <div className="h-fit flex items-center flex-wrap gap-2 bg-white  border-l-2 border-r-2 ">
          <div className="pl-2">Khoảng cách dòng</div>
          <Select
            onValueChange={(size) => {
              if (editor) {
                editor
                  .chain()
                  .focus()
                  .setMark("textStyle", { lineHeight: `${size}px` })
                  .run();
              }
            }}
            value={"12"}
          >
            <SelectTrigger className="w-[80px] border-none focus-visible:ring-0 focus:ring-0">
              <SelectValue placeholder="Chọn kích thước" />
            </SelectTrigger>
            <SelectContent onCloseAutoFocus={(event) => event.preventDefault()}>
              <SelectItem value="12">12px</SelectItem>
              <SelectItem value="14">14px</SelectItem>
              <SelectItem value="16">16px</SelectItem>
              <SelectItem value="20">20px</SelectItem>
              <SelectItem value="24">24px</SelectItem>
              <SelectItem value="30">30px</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 border-r-2 pr-2">
          <span
            onClick={(e) => {
              e.preventDefault();
              if (editor.can().undo()) {
                editor.chain().focus().undo().run();
              }
            }}
            className={
              editor.isActive("undo")
                ? "text-secondaryColor hover:bg-secondaryColor hover:text-white"
                : "text-gray-500 p-2 rounded-lg"
            }
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger disabled={!editor.can().undo()}>
                  <Undo className="w-5 h-5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Undo(Ctrl + Z)</p>
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
              editor.isActive("redo")
                ? "text-secondaryColor hover:bg-secondaryColor hover:text-white "
                : " text-gray-500 p-2 rounded-lg"
            }
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Redo className="w-5 h-5" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Redo(Ctrl + Shift + Z)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TextToolBarComponent;
