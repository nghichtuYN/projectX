import React, { useContext } from "react";
import { FormType } from "@/types/formCvtype";
import { useEditorHook } from "@/hooks/useEditorHook";
import { CvFormContext } from "../../CvFormComponent";
import { cn, moveElement, removeElement } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import OptionsButtonComponent from "../OptionsButtonComponent";
type Props = {
  skill: any;
  index: number;
  length: number;
  handleChange: (
    field: keyof FormType,
    value: string,
    subField?: string,
    index?: number
  ) => void;
  handleAdd: () => void;
};
const SkillDetailComponent = ({
  skill,
  index,
  handleChange,
  handleAdd,
  length,
}: Props) => {
  const context = useContext(CvFormContext);

  const { setActiveEditor, setForm } = context;
  const { editor: editorNameSkill } = useEditorHook(
    skill.name,
    "Tên kỹ năng",
    "skills",
    handleChange,
    "name",
    index
  );

  const { editor: editorDescription } = useEditorHook(
    skill.description,
    "Mô tả kỹ năng",
    "skills",
    handleChange,
    "description",
    index
  );
  const handleMoveUp = () => {
    if (index === 0) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      skills: {
        ...prevForm.skills,
        details: moveElement(prevForm.skills.details, index, index - 1),
      },
    }));
  };
  const handleMoveDown = () => {
    if (index === length - 1) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      skills: {
        ...prevForm.skills,
        details: moveElement(prevForm.skills.details, index, index + 1),
      },
    }));
  };
  const handleDelete = () => {
    setForm((prevForm: FormType) => ({
      ...prevForm,
      skills: {
        ...prevForm.skills,
        details: removeElement(prevForm.skills.details, index),
      },
    }));
  };
  return (
    <div className="border-b  group/detail relative flex flex-col items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2">
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
      <OptionsButtonComponent
        index={index}
        length={length}
        handleAdd={handleAdd}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default SkillDetailComponent;
