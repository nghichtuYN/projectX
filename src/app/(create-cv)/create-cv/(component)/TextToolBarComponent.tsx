import React from "react";
import { type Editor } from "@tiptap/react";
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
        <div className="w-44">
          <FontFamilyComponent editor={editor} />
        </div>
        <div className="border-l-gray-200 border-r-gray-200 ">
          <FontSizeComponent editor={editor} />
        </div>
        <div className="border-r-2">
          <AlignTextComponent editor={editor} />
        </div>
        <div className=" border-r-2">
          <BoldItalicUnderLine editor={editor} />
        </div>
        <div className="">
          <OrderTextComponent editor={editor} />
        </div>
        <div className="border-l-2 border-r-2">
          <ColorTextComponent editor={editor} />
        </div>
        <div className="border-r-2 pr-2">
          <UndoRedoComponent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default TextToolBarComponent;
