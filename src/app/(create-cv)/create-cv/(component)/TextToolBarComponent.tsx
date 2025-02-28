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

type Props = {
  editor: Editor | null;
};

const TextToolBarComponent = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  const rgbToHex = (color: string) => {
    if (color.startsWith("#")) return color;
    const result = color.match(/\d+/g);
    if (!result) return "#000000";
    return `#${result
      .map((x) => Number(x).toString(16).padStart(2, "0"))
      .join("")}`;
  };

  return (
    <div className="px-4  bg-white py-3 rounded-tl-md rounded-tr-md flex justify-center items-center gap-5 w-full flex-wrap border-t-2">
      <div className="md:flex-row md:justify-center flex  items-center w-full gap-2 lg:w-10/12 flex-wrap">
        <Select
          onValueChange={(font) => {
            editor
              .chain()
              .focus()
              .setMark("textStyle", { fontFamily: font })
              .run();
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
              <SelectItem value="18">18px</SelectItem>
              <SelectItem value="20">20px</SelectItem>
              <SelectItem value="24">24px</SelectItem>
              <SelectItem value="30">30px</SelectItem>
              <SelectItem value="48">48px</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
        <ToggleGroup type="multiple" className="flex gap-2 ">
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
            value={rgbToHex(
              editor.getAttributes("textStyle").color || "#000000"
            )}
            data-testid="setColor"
            className="w-12 border-none focus-visible:ring-0 placeholder:font-medium rounded-3xl"
          />
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
      </div>
    </div>
  );
};

export default TextToolBarComponent;
