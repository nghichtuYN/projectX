import { useEditorHook } from "@/hooks/useEditorHook";
import { cn } from "@/lib/utils";
import { FormType } from "@/types/formCvtype";
import { EditorContent } from "@tiptap/react";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import SkillDetailComponent from "./SkillDetailComponent";
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
  const { setActiveEditor, form, setForm } = context;
  const { editor: editorName } = useEditorHook(
    form.skills.name,
    "Kỹ năng",
    "skills",
    handleChange,
    "name"
  );
  const handleAdd = () => {
    setForm((prevForm) => ({
      ...prevForm,
      skills: {
        ...prevForm.skills,
        details: [
          ...prevForm.skills.details,
          {
            name: "",
            description: "",
          },
        ],
      },
    }));
  };
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
      <div className="pt-1 pb-1">
        <hr className="w-full border border-orange-500 " />
      </div>

      {form.skills.details.map((skill: any, index: number) => (
        <SkillDetailComponent
          key={index}
          skill={skill}
          index={index}
          length={form?.skills?.details?.length}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />
      ))}
    </div>
  );
};

export default SkillComponent;
