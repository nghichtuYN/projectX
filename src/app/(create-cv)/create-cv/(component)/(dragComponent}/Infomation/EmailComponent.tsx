"use client";
import { useEditorHook } from "@/hooks/useEditorHook";
import { EditorContent, type Editor } from "@tiptap/react";
import React, { useContext, useState } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormType } from "@/types/fromCvtype";

type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};

const EmailComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;
  const placeholder = "abc@example.com";
  const { editor } = useEditorHook(
    form.email,
    placeholder,
    "email",
    handleChange
  );
  return (
    <>
      <div className="flex items-center  w-full h-fit  min-h-[20px] rounded-md gap-2 hover:border-secondaryColor hover:border hover:border-dashed p-1">
        <div className="w-1/6 pl-1">
          <Mail className="w-5 h-5 text-secondaryColor " />
        </div>
        <div
          onFocus={() => {
            setActiveEditor(editor);
          }}
          className={cn(
            "h-full w-5/6 border rounded-bl-md",
            !editor?.isFocused &&
              "hover:border-dashed hover:border-secondaryColor",
            (form.email === "<p></p>" || !form.email) &&
              "border-dashed border-secondaryColor",
            editor?.isFocused && "border-solid border-green-500"
          )}
        >
          <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
        </div>
      </div>
    </>
  );
};

export default EmailComponent;
