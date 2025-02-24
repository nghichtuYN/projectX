import { useEditorHook } from "@/hooks/useEditorHook";
import React, { useContext } from "react";
import { CvFormContext } from "../CvFormComponent";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import { FormType } from "@/types/fromCvtype";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const CareerGoalsComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;
  const placeholder =
    "Mục tiêu nghề nghiệp của bạn, bao gồm mục tiêu ngắn hạn và dài hạn";
  const { editor } = useEditorHook(
    form.careerGoals,
    placeholder,
    "careerGoals",
    handleChange
  );

  return (
    <div className="w-full min-h-8 h-fit border rounded-md hover:border-secondaryColor max-h-fit p-5">
      <div className="h-3/4">
        <div
          onFocus={() => setActiveEditor(editor)}
          className={cn(
            " max-h-fit w-full rounded-bl-md border",
            !editor?.isFocused &&
              "hover:border-dashed hover:border-secondaryColor",

            editor?.isFocused && "border-solid border-green-500"
          )}
        >
          <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default CareerGoalsComponent;
