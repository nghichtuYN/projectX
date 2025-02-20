import { useEditorHook } from "@/hooks/useEditorHook";
import React, { useContext } from "react";
import { CvFormContext } from "../CvFormComponent";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
type Props = {
  handleChange: (field: string, value: string) => void;
};
const CareerGoalsComponent = ({ handleChange }: Props) => {
  const content = "";
  const placeholder =
    "Mục tiêu nghề nghiệp của bạn, bao gồm mục tiêu ngắn hạn và dài hạn";
  const { editor } = useEditorHook(
    content,
    placeholder,
    "career",
    handleChange
  );
  const context = useContext(CvFormContext);
  const { setActiveEditor } = context;

  return (
    <div className="w-full min-h-28 h-fit max-h-fit p-5">
      <div
        onFocus={() => setActiveEditor(editor)}
        className={cn(
          " max-h-fit w-full border-2 rounded-bl-md"
          //   !content && "border-2 border-dotted border-secondaryColor"
        )}
      >
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
      </div>
    </div>
  );
};

export default CareerGoalsComponent;
