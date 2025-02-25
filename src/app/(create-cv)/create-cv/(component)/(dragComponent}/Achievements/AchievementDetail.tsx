import { useEditorHook } from "@/hooks/useEditorHook";
import { FormType } from "@/types/fromCvtype";
import React, { useContext } from "react";
import { CvFormContext } from "../../CvFormComponent";
import { cn, moveElement } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import OptionsButtonComponent from "../OptionsButtonComponent";
type Props = {
  achievement: any;
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
const AchievementDetail = ({
  achievement,
  index,
  handleChange,
  handleAdd,
  length,
}: Props) => {
  const context = useContext(CvFormContext);

  const { setActiveEditor, setForm } = context;
  const { editor: editorTime } = useEditorHook(
    achievement.time,
    "Thời gian",
    "achievements",
    handleChange,
    "time",
    index
  );

  const { editor: editorNameCertificate } = useEditorHook(
    achievement.name,
    "Tên giải thưởng",
    "achievements",
    handleChange,
    "name",
    index
  );
  const handleMoveUp = () => {
    if (index === 0) return;
    setForm((prevForm: FormType) => ({
      ...prevForm,
      achievements: {
        ...prevForm.achievements,
        details: moveElement(prevForm.achievements.details, index, index - 1),
      },
    }));
  };
  const handleMoveDown = () => {
    if (index === length - 1) return;

    setForm((prevForm: FormType) => ({
      ...prevForm,
      achievements: {
        ...prevForm.achievements,
        details: moveElement(prevForm.achievements.details, index, index + 1),
      },
    }));
  };
  return (
    <div
      key={index}
      className="border-b group/detail relative flex flex-col items-start w-full gap-2 border hover:border-dashed hover:border-secondaryColor p-2"
    >
      <div
        onFocus={() => setActiveEditor(editorTime)}
        className={cn(
          "border rounded p-1 w-full",
          !editorTime?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          editorTime?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorTime} />
      </div>

      <div
        onFocus={() => setActiveEditor(editorNameCertificate)}
        className={cn(
          "border rounded p-1 w-full",
          !editorNameCertificate?.isFocused &&
            "hover:border-dashed hover:border-secondaryColor",
          editorNameCertificate?.isFocused && "border-solid border-green-500"
        )}
      >
        <EditorContent editor={editorNameCertificate} />
      </div>
      <OptionsButtonComponent
        index={index}
        length={length}
        handleAdd={handleAdd}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
      />
    </div>
  );
};

export default AchievementDetail;
