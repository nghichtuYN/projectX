import { useEditorHook } from "@/hooks/useEditorHook";
import React, { useContext } from "react";
import { CvFormContext } from "../CvFormComponent";
import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import { FormType } from "@/types/formCvtype";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const BusinessCard = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;

  const placeholderName = "Tên của bạn";
  const placeholderPosition = "Vị trí ứng tuyển";
  const { editor: nameEditor } = useEditorHook(
    form.name,
    placeholderName,
    "name",
    handleChange
  );
  const { editor: positionEditor } = useEditorHook(
    form.position,
    placeholderPosition,
    "position",
    handleChange
  );
  return (
    <div className="w-full min-h-40 h-fit border hover:border-secondaryColor  rounded-md flex flex-col gap-2 p-5">
      <div className="h-3/4 w-full max-w-full">
        <div
          className={cn(
            "h-full max-h-full pl-4 w-full pr-4 pt-4 pb-1 m-3 flex items-end border",
            !nameEditor?.isFocused &&
              "hover:border-dashed hover:border-secondaryColor",

            nameEditor?.isFocused && "border-solid border-green-500"
          )}
          onFocus={() => setActiveEditor(nameEditor)}
          tabIndex={0}
        >
          <EditorContent
            style={{ whiteSpace: "pre-line", height: "100%", width: "100%" }}
            editor={nameEditor}
          />
        </div>
      </div>

      <div
        className={cn(
          "h-1/4 m-3 max-w-full w-fit min-w-28 border ",
          !positionEditor?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",

          positionEditor?.isFocused && "border-solid border-green-500"
        )}
        onFocus={() => setActiveEditor(positionEditor)}
        tabIndex={0}
      >
        <EditorContent
          style={{ whiteSpace: "pre-line" }}
          editor={positionEditor}
        />
      </div>
    </div>
  );
};

export default BusinessCard;
