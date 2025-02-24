import { useEditorHook } from "@/hooks/useEditorHook";
import { cn } from "@/lib/utils";
import { FormType } from "@/types/fromCvtype";
import { EditorContent } from "@tiptap/react";
import React, { useContext } from "react";
import { CvFormContext } from "../CvFormComponent";
type Props = {
  handleChange: (
    field: keyof FormType,
    value: any,
    subField?: string,
    index?: number
  ) => void;
};
const SkillComponent = ({ handleChange }: Props) => {
  const context = useContext(CvFormContext);
  const { setActiveEditor, form } = context;
  const { editor: editorName } = useEditorHook(
    form.skills.name,
    "Kỹ năng",
    "skills",
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
          (form.skills.name === "<p></p>" || !form.skills.name) &&
            "border-dashed border-secondaryColor",
          editorName?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorName} />
      </div>
      {form.skills.details.map((experience: any, index: number) => {
        const { editor: editorNameSkill } = useEditorHook(
          experience.school,
          "Tên kỹ năng",
          "skills",
          handleChange,
          "name",
          index
        );

        const { editor: editorDescription } = useEditorHook(
          experience.description,
          "Mô tả kỹ năng",
          "skills",
          handleChange,
          "description",
          index
        );

        return (
          <div
            key={index}
            className="border-b flex flex-col items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2"
          >
            <div
              onFocus={() => setActiveEditor(editorNameSkill)}
              className={cn(
                "border rounded p-1 w-full",
                !editorNameSkill?.isFocused &&
                  "hover:border-dashed hover:border-secondaryColor",
                editorNameSkill?.isFocused && "border-solid border-green-500"
              )}
            >
              <EditorContent editor={editorNameSkill} />
            </div>

            {/* Mô tả kỹ năng */}
            <div
              onFocus={() => setActiveEditor(editorDescription)}
              className={cn(
                "border rounded p-1 w-full",
                !editorDescription?.isFocused &&
                  "hover:border-dashed hover:border-secondaryColor",
                editorDescription?.isFocused && "border-solid border-green-500"
              )}
            >
              <EditorContent editor={editorDescription} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillComponent;
