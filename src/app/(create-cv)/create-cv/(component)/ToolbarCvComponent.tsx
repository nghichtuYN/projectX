"use client";
import React from "react";
import { type Editor } from "@tiptap/react";
import {
  // Bold,
  // Strikethrough,
  // Italic,
  // List,
  // ListOrdered,
  // Heading2,
  // Underline,
  // Code,
  // Quote,
  Undo,
  Redo,
  PanelsTopLeft,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { fontFamilies } from "@/data/fontFamily";
import { Input } from "../../../../components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../components/ui/tooltip";
import { Button } from "../../../../components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../../components/ui/sheet";

type Props = {
  handleChangeColor: (field: string, value: string) => void;
  color: string;
};

const ToolbarCvComponent = ({ handleChangeColor, color }: Props) => {
  return (
    <div className="px-4 bg-white py-3 rounded-tl-md rounded-tr-md flex justify-center items-center gap-5 w-full flex-wrap border-t-2 ">
      <div className="flex justify-end items-center w-full gap-2 lg:w-10/12 flex-wrap ">
        <div className="w-fit flex items-center flex-wrap gap-2 bg-white   border-r-2 ">
          <div className="pl-2">Màu chủ đề</div>
          <Input
            type="color"
            onInput={(event) => {
              const target = event.target as HTMLInputElement;
              handleChangeColor("color", target.value);
            }}
            value={color}
            data-testid="setColor"
            className="w-12 border-none  focus-visible:ring-0 placeholder:font-medium rounded-3xl"
          />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={"outline"}
              className="text-secondaryColor outline-secondaryColor border-secondaryColor"
            >
              <PanelsTopLeft />
              Tùy chỉnh bố cục
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Bố cục CV</SheetTitle>
              <SheetDescription>Tùy chỉnh bố cục</SheetDescription>
            </SheetHeader>

            <SheetFooter className="flex items-center justify-end gap-4">
              <SheetClose asChild>
                <Button>Hủy</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button>Lưu</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ToolbarCvComponent;
