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
const HobbiesComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;
  const { editor: editorName } = useEditorHook(
    form.hobbies.name,
    "Kinh nghiệm làm việc",
    "hobbies",
    handleChange,
    "name"
  );
  const { editor: editorDetail } = useEditorHook(
    form.hobbies.details,
    "Điền các sở thích của bạn",
    "hobbies",
    handleChange,
    "details"
  );
  return (
    <div className="w-full flex flex-col gap-1 min-h-full h-fit rounded-md border hover:border-secondaryColor p-2">
      <div
        onFocus={() => setActiveEditor(editorName)}
        className={cn(
          "border p-2 rounded",
          !editorName?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          (form.experiences.name === "<p></p>" || !form.experiences.name) &&
            "border-dashed border-secondaryColor",
          editorName?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorName} />
      </div>
      <hr className="w-full border border-orange-500" />
      <div className="mb-2">
        <div
          onFocus={() => setActiveEditor(editorDetail)}
          className={cn(
            "border rounded p-1",
            !editorDetail?.isFocused &&
              "hover:border-dashed hover:border-secondaryColor",
            editorDetail?.isFocused && "border-solid border-green-500"
          )}
        >
          <EditorContent editor={editorDetail} />
        </div>
      </div>
    </div>
  );
};

export default HobbiesComponent;
