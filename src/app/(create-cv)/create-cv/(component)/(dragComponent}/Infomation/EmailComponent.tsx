"use client";
import { useEditorHook } from "@/hooks/useEditorHook";
import { EditorContent, type Editor } from "@tiptap/react";
import React, { useContext, useState } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  handleChange: (field: string, value: string) => void;
};

const EmailComponent = ({ handleChange }: Props) => {
  const content = "test@gmail.com";
  const placeholder = "abc@example.com";
  const { editor } = useEditorHook(content, placeholder, "email", handleChange);
  const context = useContext(CvFormContext);
  const { setActiveEditor } = context;

  return (
    <>
      <div className="flex items-center  w-full h-fit  min-h-[20px] rounded-md gap-2 hover:border-secondaryColor hover:border hover:border-dashed p-1">
        <div className="w-1/6 pl-1">
          <Mail className="w-4 h-4 text-secondaryColor " />
        </div>
        <div
          onFocus={() => setActiveEditor(editor)}
          className={cn(
            " h-full w-5/6 border-2 rounded-bl-md",
            "hover:border-2 hover:border-dotted hover:border-secondaryColor",
            !content && "border-2 border-dotted border-secondaryColor"
          )}
        >
          <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
        </div>
      </div>
    </>
  );
};

export default EmailComponent;
