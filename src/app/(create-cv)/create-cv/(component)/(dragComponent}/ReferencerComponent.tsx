import { FormType } from "@/types/fromCvtype";
import React, { useContext } from "react";
import { CvFormContext } from "../CvFormComponent";
import { useEditorHook } from "@/hooks/useEditorHook";
import { EditorContent } from "@tiptap/react";
import { cn } from "@/lib/utils";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const ReferencerComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;
  const { editor: editorName } = useEditorHook(
    form.referencer.name,
    "Kinh nghiệm làm việc",
    "referencer",
    handleChange,
    "name"
  );
  return (
    <div className="w-full min-h-full h-fit rounded-md border hover:border-secondaryColor p-2">
      <div
        onFocus={() => setActiveEditor(editorName)}
        className={cn(
          "border p-2 rounded",
          !editorName?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          (form.referencer.name === "<p></p>" || !form.referencer.name) &&
            "border-dashed border-secondaryColor",
          editorName?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorName} />
      </div>
      {form.referencer.details.map((referencer: any, index: number) => {
        const { editor: editorInfo } = useEditorHook(
          referencer.position,
          "Thông tin người tham chiếu bao gồm tên, chức vự và thông tin liên hệ",
          "referencer",
          handleChange,
          "info",
          index
        );
        return (
          <div
            key={index}
            className="border-b flex items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2"
          >
            <div
              onFocus={() => setActiveEditor(editorInfo)}
              className={cn(
                "border rounded p-1 min-h-20 w-full",
                !editorInfo?.isFocused &&
                  "hover:border-dashed hover:border-secondaryColor",
                editorInfo?.isFocused && "border-solid border-green-500"
              )}
            >
              <EditorContent editor={editorInfo} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReferencerComponent;
