"use client";
import { useEditorHook } from "@/hooks/useEditorHook";
import { EditorContent, type Editor } from "@tiptap/react";
import React, { useContext, useState } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { Phone } from "lucide-react";
import { cn, moveElement } from "@/lib/utils";
import { FormType } from "@/types/formCvtype";
import OptionsButtonComponent from "./OptionsButtonComponent";
type Props = {
  index: number;
  length: number;
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
  setComponents: React.Dispatch<
    React.SetStateAction<
      (({
        handleChange,
        index,
        length,
        setComponents,
      }: Props) => React.JSX.Element)[]
    >
  >;
};
const PhoneComponent = ({ handleChange,index,length,setComponents }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;
  const { editor } = useEditorHook(
    form.phone,
    "0123456789",
    "phone",
    handleChange
  );
    const handleMoveUp = () => {
      if (index === 0) return;
      setComponents((prev) => (prev = moveElement(prev, index, index - 1)));
    };
    const handleMoveDown = () => {
      if (index === length - 1) return;
      setComponents((prev) => (prev = moveElement(prev, index, index + 1)));
    };
  return (
    <>
      <div
        style={{ background: form.color }}
        className="flex items-center group/detail relative w-full h-fit  min-h-[20px] rounded-md gap-2 hover:border-secondaryColor hover:border hover:border-dashed p-1"
      >
        <div className="w-1/6 pl-1">
          <Phone className="w-5 h-5 text-secondaryColor " />
        </div>
        <div
          onFocus={() => {
            setActiveEditor(editor);
          }}
          className={cn(
            " h-full w-5/6 border rounded-bl-md",
            !editor?.isFocused &&
              "hover:border-dashed hover:border-secondaryColor",
            (form.phone === "<p></p>" || !form.phone) &&
              "border-dashed border-secondaryColor",
            editor?.isFocused && "border-solid border-green-500"
          )}
        >
          <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
        </div>
        <OptionsButtonComponent
        handleMoveDown={handleMoveDown}
        handleMoveUp={handleMoveUp}
        length={length}
        index={index}
      />
      </div>
    </>
  );
};

export default PhoneComponent;
